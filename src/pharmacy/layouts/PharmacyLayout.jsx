import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ChatModal from "../components/ChatModal";
import { ChatProvider } from "../context/ChatContext";

const PharmacyLayout = () => {
  return (
    <div className="flex h-full flex-col w-full">
      <Navbar />
      <Outlet />
      <ChatProvider>
      <ChatModal />
      </ChatProvider>
      <Footer />
    </div>
  );
};

export default PharmacyLayout;
