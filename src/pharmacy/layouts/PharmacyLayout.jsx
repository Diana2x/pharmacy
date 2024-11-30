import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ChatModal from "../components/ChatModal";

const PharmacyLayout = () => {
  return (
    <div className="flex h-full flex-col w-full">
      <Navbar />
      <Outlet />
      <ChatModal />
      <Footer />
    </div>
  );
};

export default PharmacyLayout;
