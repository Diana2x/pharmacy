import { useState } from "react";

const ChatModal = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState(""); // User's current message
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hola, ¿en qué puedo ayudarte?" }, // Initial greeting from bot
  ]); // Chat history, including the initial greeting

  // Toggle the chat window visibility
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user's message to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", text: message },
      ]);

      // Add bot response after a delay (simulating a response)
      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            sender: "bot",
            text: "Un momento, estamos contactándote con un agente...",
          },
        ]);
      }, 1000); // Simulate a delay of 1 second for the bot's response

      // Clear the input field after sending the message
      setMessage("");
    }
  };

  return (
    <div>
      {/* Chat Icon Button */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 cursor-pointer bg-green-600 p-4 rounded-full shadow-lg z-50"
      >
        <img
          src="/images/chat-icon.png"
          alt="Chat con nosotros"
          className="w-12 h-12"
        />
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg z-50 border-t-4 border-green-600 flex flex-col"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          {/* Chat window header */}
          <div className="flex justify-between items-center bg-green-600 text-white p-3">
            <h2 className="font-semibold">Chatea con nosotros</h2>
            <button onClick={toggleChat} className="text-white">
              X
            </button>
          </div>

          {/* Chat history */}
          <div className="flex-1 p-4 overflow-auto space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Text input and send button */}
          <div className="flex items-center p-3 border-t border-gray-200">
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={handleMessageChange}
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 14l8-8 8 8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
