import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import AboutUsPage from "../pages/aboutUs/AboutUs";
import ContactPage from "../pages/contact/Contact";
import LoginPage from "../pages/login/Login";
import ShoppingCartPage from "../pages/shoppingCart/ShoppingCart";
import ProductsPage from "../pages/products/Products";
import PolicyPage from "../pages/policies/Policies";
import AddressPage from "../pages/address/Address";
import FaqPage from "../pages/faq/Faq";
import MissionVision from "../pages/missionVision/MissionVision";
import ProductDetail from "../components/ProductDetail";
import { Navigate } from "react-router-dom";
import ProductReviews from "../pages/products/ProductReviews";
import Forum from "../pages/forum/forum";
import RegisterPage from "../pages/login/Register";
import AdminPage from "../pages/admin/AdminPage";
import { PrivateRoute } from "../components/PrivateRoute";
import SearchResults from "../pages/search/SearchResults";

const PharmacyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/aboutUs" element={<AboutUsPage />} />
      <Route path="/policies" element={<PolicyPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/mission" element={<MissionVision />} />
      <Route path="/forum" element={<Forum />} />
      
      {/* Protected Admin Route - requires admin privileges */}
      <Route path="/admin" element={
        <PrivateRoute adminOnly={true}>
          <AdminPage />
        </PrivateRoute>
      } />
      
      {/* Product detail route should be placed before the fallback route */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product/:id/reviews" element={<ProductReviews />} />
      {/* Search route */}
      <Route path="/search" element={<SearchResults />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default PharmacyRoutes;
