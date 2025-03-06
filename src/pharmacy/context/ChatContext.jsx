import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hola, soy el asistente de la Farmacia. ¿En qué puedo ayudarte? Elige una opción:" },
  ]);

  return (
    <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, chatHistory, setChatHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
