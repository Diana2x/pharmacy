import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Inicializar estado desde localStorage si existe
    const savedCart = localStorage.getItem("pharmacyCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [itemCount, setItemCount] = useState(0);

  // Actualizar localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem("pharmacyCart", JSON.stringify(cartItems));
    
    // Calcular el número total de productos en el carrito
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        // Si el producto ya existe, incrementar cantidad
        const updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success(`${product.name} añadido al carrito (${existing.quantity + 1})`);
        return updatedItems;
      }
      // Si el producto no existe, añadirlo con cantidad 1
      toast.success(`${product.name} añadido al carrito`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const product = updatedItems.find(item => item.id === id);
      if (product) {
        toast.success(`${product.name} actualizado (${product.quantity})`);
      }
      return updatedItems;
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const product = updatedItems.find(item => item.id === id);
      if (product && product.quantity > 1) {
        toast.success(`${product.name} actualizado (${product.quantity - 1})`);
      }
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const product = prevItems.find(item => item.id === id);
      if (product) {
        toast.success(`${product.name} eliminado del carrito`);
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.success("Carrito vaciado correctamente");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
