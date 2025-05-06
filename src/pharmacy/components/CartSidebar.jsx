import React from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaTrashAlt, FaPlus, FaMinus, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, itemCount, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay de fondo */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
          <h2 className="flex items-center text-lg font-bold">
            <FaShoppingCart className="mr-2 text-green-600" />
            Mi Carrito
            <span className="ml-2 text-sm text-gray-500">
              ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-6 h-full text-center">
              <FaShoppingCart className="mb-4 w-16 h-16 text-gray-300" />
              <p className="mb-4 text-gray-500">Tu carrito está vacío</p>
              <Link
                to="/products"
                className="px-4 py-2 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
                onClick={onClose}
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex space-x-4">
                    {/* Imagen del producto */}
                    {item.images && item.images[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="object-cover w-16 h-16 rounded-md border border-gray-200"
                      />
                    )}

                    {/* Info del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} MXN</p>

                      {/* Controles de cantidad */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center rounded-md border border-gray-300">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-sm text-center">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar producto"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con resumen y botón */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${totalPrice.toFixed(2)} MXN</span>
              </div>
              <div className="text-xs text-gray-500">
                El envío y los impuestos se calcularán al finalizar la compra
              </div>
            </div>

            <Link
              to="/cart"
              className="flex justify-center items-center py-3 w-full text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              onClick={onClose}
            >
              Finalizar compra <FaArrowRight className="ml-2" />
            </Link>

            <button
              onClick={onClose}
              className="mt-3 w-full text-sm text-center text-green-600 hover:text-green-800"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
