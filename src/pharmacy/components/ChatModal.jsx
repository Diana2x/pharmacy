import { useChat } from "../context/ChatContext";
import { useState } from "react";

const ChatModal = () => {
  const { isChatOpen, setIsChatOpen, chatHistory, setChatHistory } = useChat();
  const [message, setMessage] = useState("");
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const sendMessage = (text, sender = "user") => {
    setChatHistory((prev) => [...prev, { sender, text }]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, "user");
      handleBotResponse(message.trim());
      setMessage("");
    }
  };

  const handleOptionClick = (option) => {
    sendMessage(option, "user");
    handleBotResponse(option);
  };

  const renderMenuOptions = () => {
    return (
      <div className="space-y-2">
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("¿Cómo hago un pedido?")}
        >
          📦 ¿Cómo hago un pedido?
        </button>
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("📦 Estado de mi pedido")}
        >
          📦 Estado de mi pedido
        </button>
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("📄 Facturación")}
        >
          📄 Facturación
        </button>
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("📞 Contactar agente")}
        >
          📞 Contactar agente
        </button>
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("📋 Horarios de atención")}
        >
          📋 Horarios de atención
        </button>
        <button
          className="w-full text-left p-2 bg-gray-100 rounded-lg"
          onClick={() => handleOptionClick("🚚 Zonas de entrega")}
        >
          🚚 Zonas de entrega
        </button>
      </div>
    );
  };

  const handleBotResponse = (userMessage) => {
    var normalized = userMessage.toLowerCase().trim();

    var response =
      "Lo siento, no entendí tu mensaje. Por favor elige una opción válida.";
    var si = false;
    var def = false;

    if (waitingForConfirmation) {
      if (normalized === "sí" || normalized === "si") {
        si = true;
        response = renderMenuOptions();
        sendMessage(response, "bot");
        console.log(response);
        normalized = userMessage.toLowerCase().trim();
        setWaitingForConfirmation(true);
      }
    }

    switch (normalized) {
      case "¿cómo hago un pedido?":
      case "como hago un pedido":
        response =
          "Puedes hacer un pedido seleccionando productos desde nuestra tienda en línea y siguiendo el proceso de compra.";
        break;

      case "📦 estado de mi pedido":
      case "estado de mi pedido":
        response = "Visita la sección de estado de mi pedido.";
        break;

      case "📄 facturación":
      case "facturación":
        response =
          "Para solicitar tu factura, por favor envíanos el número de tu pedido y tus datos fiscales al correo facturas@farmacia-cd-sol.com.";
        break;

      case "📞 contactar agente":
      case "contactar agente":
        response = "En un momento un agente se pondrá en contacto contigo.";
        break;

      case "📋 horarios de atención":
      case "horarios de atención":
        response =
          "Nuestros horarios de atención son de lunes a viernes de 8:00 a 20:00 y sábados de 9:00 a 14:00.";
        break;

      case "🚚 zonas de entrega":
      case "zonas de entrega":
        response =
          "Realizamos entregas a domicilio en toda la Ciudad de México y Área Metropolitana.";
        break;

      case "si":
      case "Si":
      case "sí":
      case "Sí":
      case "SÍ":
      case "SI":
        break;

      default:
        response =
          "Lo siento, no entendí tu mensaje. Por favor elige una opción válida.";
        def = true;
        sendMessage(response, "bot");
        response = renderMenuOptions();

        break;
    }
    if (si === false) {
      sendMessage(response, "bot");
      if (def === false) {
        sendMessage(
          "¿Puedo ayudarte con algo más? (Responde 'sí' para ver el menú nuevamente)",
          "bot"
        );
      }
    }

    setWaitingForConfirmation(true);
  };

  return (
    <div>
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 cursor-pointer bg-green-600 p-4 rounded-full shadow-lg z-50"
      >
        <img src="/images/chat-icon.png" alt="Chat" className="w-12 h-12" />
      </div>

      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg z-50 border-t-4 border-green-600 flex flex-col">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <h2 className="font-semibold">Asistente Farmacia</h2>
            <button onClick={toggleChat} className="text-white">
              X
            </button>
          </div>

          <div className="flex-1 p-2 overflow-auto space-y-2">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {chatHistory.length === 1 && renderMenuOptions()}
          </div>

          <div className="p-2 border-t flex">
            <textarea
              className="flex-1 border p-2 rounded-lg"
              rows="2"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-green-600 text-white p-2 rounded-lg"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
