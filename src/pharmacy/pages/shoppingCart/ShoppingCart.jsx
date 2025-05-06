import React, { useState } from "react";
import { FaShippingFast, FaCreditCard } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

const ShoppingCart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in shippingAddress) {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
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

    // Validar dirección
    const isShippingValid = Object.values(shippingAddress).every((val) => val.trim() !== "");
    if (!isShippingValid) {
      alert("Por favor, complete todos los campos de dirección.");
      return;
    }

    // Validar método de pago
    if (!paymentMethod) {
      alert("Por favor, seleccione un método de pago.");
      return;
    }

    if (paymentMethod === "creditCard") {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        alert("Por favor, complete los datos de la tarjeta.");
        return;
      }
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
    clearCart();

    // Resetear formulario
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
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
                    onClick={() => increaseQuantity(item.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                  <p className="text-lg">{item.quantity}</p>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
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

      
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaShippingFast className="mr-2 text-green-600" /> Información de Envío
          </h3>
          <div className="space-y-4">
            {[
              { name: "country", label: "País" },
              { name: "state", label: "Estado" },
              { name: "neighborhood", label: "Colonia" },
              { name: "street", label: "Calle" },
              { name: "number", label: "Número" },
              { name: "phone", label: "Teléfono" },
              { name: "postalCode", label: "Código Postal" },
            ].map(({ name, label }) => (
              <div className="flex flex-col" key={name}>
                <label htmlFor={name} className="text-lg font-medium text-gray-700">
                  {label}:
                </label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={shippingAddress[name]}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder={`Ingresa tu ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCreditCard className="mr-2 text-green-600" /> Método de Pago
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="paymentMethod" className="text-lg font-medium text-gray-700">
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
                  <label htmlFor="cardNumber" className="text-lg font-medium text-gray-700">
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
                  <label htmlFor="cardExpiry" className="text-lg font-medium text-gray-700">
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
                  <label htmlFor="cardCvc" className="text-lg font-medium text-gray-700">
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
          </div>
        </div>

        
      </form>

      <button
        type="submit"
        form="checkout-form"
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
      >
        Realizar Pago
      </button>
    </div>
  );
};

export default ShoppingCart;
