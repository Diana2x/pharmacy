import React, { useState, useEffect } from "react";
import {
  FaShippingFast,
  FaCreditCard,
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaMoneyBillWave,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaGift,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";
import { FirebaseDB, auth } from "../../../libs/firebase/config";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const [isIntentionalSubmit, setIsIntentionalSubmit] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isIntentionalSubmit) {
      return;
    }

    setIsIntentionalSubmit(false);

    const isShippingValid = Object.values(shippingAddress).every((val) => val.trim() !== "");
    if (!isShippingValid) {
      alert("Por favor, complete todos los campos de dirección.");
      return;
    }

    if (!paymentMethod) {
      alert("Por favor, seleccione un método de pago.");
      return;
    }

    if (paymentMethod === "creditCard") {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        alert("Por favor, complete los datos de la tarjeta.");
        return;
      }

      try {
        const orderData = {
          userId: auth.currentUser ? auth.currentUser.uid : "guest",
          userEmail: auth.currentUser ? auth.currentUser.email : "invitado",
          userName: auth.currentUser ? auth.currentUser.displayName : "Invitado",
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
          shippingAddress,
          paymentMethod,
          paymentDetails:
            paymentMethod === "creditCard"
              ? {
                  cardNumber: cardNumber.replace(/\d(?=\d{4})/g, "*"),
                  cardExpiry,
                }
              : {
                  method: "paypal",
                },
          status: "pendiente",
          totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
          shippingCost:
            cartItems.reduce((total, item) => total + item.price * item.quantity, 0) > 500 ? 0 : 99,
          taxes: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.16,
          createdAt: serverTimestamp(),
          orderNumber: `ORD-${Date.now()}`,
        };

        const docRef = await addDoc(collection(FirebaseDB, "sales"), orderData);

        console.log("Pedido guardado con ID:", docRef.id);

        alert(`¡Pedido realizado con éxito! Tu número de orden es: ${orderData.orderNumber}`);
        clearCart();

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

        navigate("/", { state: { orderCompleted: true, orderNumber: orderData.orderNumber } });
      } catch (error) {
        console.error("Error al guardar el pedido:", error);
        alert("Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.");
      }
    } else {
      try {
        const orderData = {
          userId: auth.currentUser ? auth.currentUser.uid : "guest",
          userEmail: auth.currentUser ? auth.currentUser.email : "invitado",
          userName: auth.currentUser ? auth.currentUser.displayName : "Invitado",
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
          shippingAddress,
          paymentMethod,
          paymentDetails: {
            method: "paypal",
          },
          status: "pendiente",
          totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
          shippingCost:
            cartItems.reduce((total, item) => total + item.price * item.quantity, 0) > 500 ? 0 : 99,
          taxes: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.16,
          createdAt: serverTimestamp(),
          orderNumber: `ORD-${Date.now()}`,
        };

        const docRef = await addDoc(collection(FirebaseDB, "sales"), orderData);

        console.log("Pedido guardado con ID:", docRef.id);

        alert(`¡Pedido realizado con éxito! Tu número de orden es: ${orderData.orderNumber}`);
        clearCart();

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

        navigate("/", { state: { orderCompleted: true, orderNumber: orderData.orderNumber } });
      } catch (error) {
        console.error("Error al guardar el pedido:", error);
        alert("Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.");
      }
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
        <h2 className="flex items-center text-2xl font-bold text-green-600 sm:text-3xl">
          <FaShoppingCart className="mr-2" /> Carrito de Compras
        </h2>
        <Link
          to="/products"
          className="flex items-center font-medium text-green-600 transition-colors hover:text-green-800"
        >
          <FaArrowLeft className="mr-1" /> Seguir comprando
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 rounded-xl shadow-sm">
          <div className="mx-auto mb-4 w-24 h-24 text-gray-300">
            <FaShoppingCart className="w-full h-full" />
          </div>
          <p className="mb-6 text-xl text-gray-600">Tu carrito está vacío.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Lista de productos */}
          <div className="lg:w-2/3">
            <div className="overflow-hidden mb-6 bg-white rounded-xl shadow-sm">
              <div className="hidden grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500 bg-gray-50 border-b sm:grid">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>

              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col p-4 transition-colors sm:py-6 sm:px-4 sm:flex-row sm:items-center sm:grid sm:grid-cols-12 sm:gap-4 hover:bg-gray-50"
                  >
                    {/* Producto */}
                    <div className="flex col-span-6 items-center mb-3 sm:mb-0">
                      {item.images && item.images[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="object-cover mr-4 w-16 h-16 rounded-md border"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="block mt-1 text-sm text-gray-500 sm:hidden">
                          ${item.price.toFixed(2)} MXN
                        </p>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="hidden col-span-2 text-center sm:block">
                      <p className="font-medium">${item.price.toFixed(2)} MXN</p>
                    </div>

                    {/* Cantidad */}
                    <div className="flex col-span-2 justify-between items-center mb-3 sm:justify-center sm:mb-0">
                      <span className="block text-gray-500 sm:hidden">Cantidad:</span>
                      <div className="flex overflow-hidden items-center rounded-lg border border-gray-300">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 text-gray-600 bg-gray-100 transition-colors hover:bg-gray-200"
                          aria-label="Disminuir cantidad"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="py-1 w-10 font-medium text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 text-gray-600 bg-gray-100 transition-colors hover:bg-gray-200"
                          aria-label="Aumentar cantidad"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex col-span-2 justify-between items-center mb-3 sm:justify-center sm:mb-0">
                      <span className="block text-gray-500 sm:hidden">Subtotal:</span>
                      <p className="font-medium text-green-600">
                        ${(item.price * item.quantity).toFixed(2)} MXN
                      </p>
                    </div>

                    {/* Eliminar (solo visible en vista móvil) */}
                    <div className="flex justify-end sm:hidden">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 transition-colors hover:text-red-700"
                        aria-label="Eliminar producto"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    {/* Eliminar (oculto en vista móvil) */}
                    <div className="hidden justify-center sm:flex">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 transition-colors hover:text-red-700"
                        aria-label="Eliminar producto"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center p-4 bg-gray-50">
                <button
                  onClick={clearCart}
                  className="flex items-center text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                >
                  <FaTrashAlt className="mr-1" /> Vaciar carrito
                </button>
                <Link
                  to="/products"
                  className="flex items-center text-sm font-medium text-green-600 transition-colors hover:text-green-800"
                >
                  <FaPlus className="mr-1" /> Añadir más productos
                </Link>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="sticky top-20 p-6 mb-6 bg-white rounded-xl shadow-sm">
              <h3 className="pb-2 mb-4 text-lg font-bold border-b">Resumen del pedido</h3>

              <div className="mb-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{totalPrice > 500 ? "Gratis" : "$99.00 MXN"}</span>
                </div>
                {totalPrice <= 500 && (
                  <div className="mt-1 text-xs italic text-gray-500">
                    Obtén envío gratis en compras mayores a $500 MXN
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Impuestos</span>
                  <span>${(totalPrice * 0.16).toFixed(2)} MXN</span>
                </div>
              </div>

              <div className="py-3 my-4 border-t border-b">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">
                    ${(totalPrice + (totalPrice > 500 ? 0 : 99) + totalPrice * 0.16).toFixed(2)} MXN
                  </span>
                </div>
              </div>

              {/* Código promocional */}
              <div className="flex items-center mt-4 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Código promocional"
                    className="px-3 py-2 w-full rounded-l-lg border border-gray-300"
                  />
                  <FaGift className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
                </div>
                <button className="px-4 py-2 font-medium text-gray-800 bg-gray-200 rounded-r-lg transition-colors hover:bg-gray-300">
                  Aplicar
                </button>
              </div>

              <button
                onClick={() =>
                  document.getElementById("checkout-form").scrollIntoView({ behavior: "smooth" })
                }
                className="flex justify-center items-center py-3 w-full font-medium text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="overflow-hidden mt-8 bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 mb-6 bg-gray-50 border-b">
            <h3 className="text-xl font-bold">Completar tu pedido</h3>
            <p className="mt-1 text-sm text-gray-500">Ingresa tus datos para finalizar la compra</p>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
            {/* Información de Envío */}
            <div>
              <h3 className="flex items-center mb-4 text-lg font-semibold">
                <FaShippingFast className="mr-2 text-green-600" /> Información de Envío
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { name: "country", label: "País", span: true },
                  { name: "state", label: "Estado" },
                  { name: "postalCode", label: "Código Postal" },
                  { name: "neighborhood", label: "Colonia", span: true },
                  { name: "street", label: "Calle", span: true },
                  { name: "number", label: "Número" },
                  { name: "phone", label: "Teléfono" },
                ].map(({ name, label, span }) => (
                  <div className={`flex flex-col ${span ? "md:col-span-2" : ""}`} key={name}>
                    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
                      {label}:
                    </label>
                    <input
                      type="text"
                      id={name}
                      name={name}
                      value={shippingAddress[name]}
                      onChange={handleInputChange}
                      className="px-3 py-2 rounded-lg border border-gray-300 transition-all focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={`Ingresa tu ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Método de Pago */}
            <div>
              <h3 className="flex items-center mb-4 text-lg font-semibold">
                <FaCreditCard className="mr-2 text-green-600" /> Método de Pago
              </h3>
              <div className="space-y-5">
                <div className="mb-5">
                  <label
                    htmlFor="paymentMethod"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Selecciona tu método de pago:
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("creditCard")}
                      className={`flex items-center justify-center p-3 border rounded-lg transition-all ${
                        paymentMethod === "creditCard"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex mr-2 space-x-1">
                          <FaCcVisa className="text-lg text-blue-700" />
                          <FaCcMastercard className="text-lg text-red-500" />
                          <FaCcAmex className="text-lg text-blue-500" />
                        </div>
                        <span className="font-medium">Tarjeta</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex items-center justify-center p-3 border rounded-lg transition-all ${
                        paymentMethod === "paypal"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaPaypal className="mr-2 text-lg text-blue-600" />
                        <span className="font-medium">PayPal</span>
                      </div>
                    </button>
                  </div>
                </div>

                {paymentMethod === "creditCard" && (
                  <div className="p-4 space-y-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col">
                      <label
                        htmlFor="cardNumber"
                        className="mb-1 text-sm font-medium text-gray-700"
                      >
                        Número de Tarjeta:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={cardNumber}
                          onChange={handleInputChange}
                          className="px-3 py-2 pl-10 w-full rounded-lg border border-gray-300 transition-all focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        <FaCreditCard className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="cardExpiry"
                          className="mb-1 text-sm font-medium text-gray-700"
                        >
                          Fecha de Expiración:
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={cardExpiry}
                          onChange={handleInputChange}
                          className="px-3 py-2 rounded-lg border border-gray-300 transition-all focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cardCvc" className="mb-1 text-sm font-medium text-gray-700">
                          CVC:
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={cardCvc}
                          onChange={handleInputChange}
                          className="px-3 py-2 rounded-lg border border-gray-300 transition-all focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="CVC"
                          maxLength="4"
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <FaMoneyBillWave className="mr-2 text-green-500" />
                      <span>Transacción segura con cifrado SSL</span>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="p-4 text-center bg-gray-50 rounded-lg">
                    <div className="mb-2 font-medium text-blue-600">
                      Serás redirigido a PayPal para completar el pago
                    </div>
                    <div className="text-sm text-gray-500">
                      Podrás utilizar tu saldo de PayPal o vincular tus tarjetas para realizar el
                      pago
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center p-6 bg-gray-50 border-t md:flex-row">
            <Link
              to="/"
              className="font-medium text-gray-600 transition-colors hover:text-gray-800"
            >
              <FaArrowLeft className="inline mr-1" /> Volver al inicio
            </Link>

            <button
              type="submit"
              className="flex justify-center items-center px-8 py-3 w-full font-medium text-white bg-green-600 rounded-lg transition-colors md:w-auto hover:bg-green-700"
              disabled={!cartItems.length}
              onClick={() => setIsIntentionalSubmit(true)}
            >
              <FaCreditCard className="mr-2" /> Completar Compra
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShoppingCart;
