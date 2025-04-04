import React, { useState, useEffect } from "react";
import { FaShippingFast, FaCreditCard } from "react-icons/fa"; // Importar íconos
import { getProducts } from "@/api/products/apiProducts";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    country: "México",
    state: "",
    street: "",
    number: "",
    neighborhood: "",
    phone: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const items = data.slice(0, 2).map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(items);
      })
      .catch(() => {
        setError("No se pudieron cargar los productos");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleIncreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };



  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in shippingAddress) {
      setShippingAddress({
        ...shippingAddress,
        [name]: value,
      });
    } else {
      switch (name) {
        case "paymentMethod":
          setPaymentMethod(value);
          break;
        case "cardNumber":
          setCardNumber(value);
          break;
        case "cardExpiry":
          setCardExpiry(value);
          break;
        case "cardCvc":
          setCardCvc(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !shippingAddress.country ||
      !shippingAddress.state ||
      !shippingAddress.street ||
      !shippingAddress.number ||
      !shippingAddress.neighborhood ||
      !shippingAddress.phone ||
      !shippingAddress.postalCode ||
      !paymentMethod ||
      !cardNumber ||
      !cardExpiry ||
      !cardCvc
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    console.log("Pedido enviado:", {
      cartItems,
      shippingAddress,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCvc,
    });

    alert("¡Pedido realizado con éxito!");
    setCartItems([]);
    setShippingAddress({
      country: "México",
      state: "",
      street: "",
      number: "",
      neighborhood: "",
      phone: "",
      postalCode: "",
    });
    setPaymentMethod("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
  };

  if (isLoading) {
    return <p className="text-center text-xl">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (parseFloat(item.price) || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center border-b-4 border-green-500 pb-2">
        Carrito de Compras
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Precio: ${item.price}</p>
                </div>

                <div className="flex items-center space-x-2 ml-auto">
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                  <p className="text-lg">{item.quantity}</p>
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    -
                  </button>
                  <button
                    // onClick={() => handleDeleteItem(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center font-semibold text-xl">
            <h3>Total:</h3>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaShippingFast className="mr-2 text-green-600" /> Información de
            Envío
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-lg font-medium text-gray-700"
              >
                País:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu país"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="state"
                className="text-lg font-medium text-gray-700"
              >
                Estado:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingAddress.state}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu estado"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="neighborhood"
                className="text-lg font-medium text-gray-700"
              >
                Colonia:
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={shippingAddress.neighborhood}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu colonia"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="street"
                className="text-lg font-medium text-gray-700"
              >
                Calle:
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={shippingAddress.street}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu calle"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="number"
                className="text-lg font-medium text-gray-700"
              >
                Número:
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={shippingAddress.number}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu número"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-lg font-medium text-gray-700"
              >
                Teléfono:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu número de teléfono"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="postalCode"
                className="text-lg font-medium text-gray-700"
              >
                Código Postal:
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresa tu código postal"
              />
            </div>
          </form>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCreditCard className="mr-2 text-green-600" /> Método de Pago
          </h3>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="paymentMethod"
                className="text-lg font-medium text-gray-700"
              >
                Método de Pago:
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona método de pago</option>
                <option value="creditCard">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {paymentMethod === "creditCard" && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="cardNumber"
                    className="text-lg font-medium text-gray-700"
                  >
                    Número de Tarjeta:
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Ingresa tu número de tarjeta"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="cardExpiry"
                    className="text-lg font-medium text-gray-700"
                  >
                    Fecha de Expiración:
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={cardExpiry}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="MM/AA"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="cardCvc"
                    className="text-lg font-medium text-gray-700"
                  >
                    CVC:
                  </label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={cardCvc}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="CVC"
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
      >
        Realizar Pago
      </button>
    </div>
  );
};

export default ShoppingCart;
