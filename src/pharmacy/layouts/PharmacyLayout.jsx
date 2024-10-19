import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const PharmacyLayout = () => {
  return (
    <div className="flex h-full flex-col w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PharmacyLayout;
