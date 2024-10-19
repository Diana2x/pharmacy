import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const PharmacyLayout = () => {
  return (
    <div className="flex h-full flex-col w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PharmacyLayout;
