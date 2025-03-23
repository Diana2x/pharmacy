import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ChatModal from "../components/ChatModal";
import { ChatProvider } from "../context/ChatContext";

const PharmacyLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      {/* Content will grow and push the footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <ChatProvider>
        <ChatModal />
      </ChatProvider>

      <Footer />
    </div>
  );
};

export default PharmacyLayout;
