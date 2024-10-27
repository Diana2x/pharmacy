import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import AboutUsPage from "../pages/aboutUs/AboutUs";
import ServicesPage from "../pages/services/Services";
import ContactPage from "../pages/contact/Contact";
import LoginPage from "../pages/login/Login";
import ShoppingCartPage from "../pages/shoppingCart/ShoppingCart";
import { Navigate } from "react-router-dom";

const PharmacyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/nosotros" element={<AboutUsPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default PharmacyRoutes;
