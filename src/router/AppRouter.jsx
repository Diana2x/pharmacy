import { Route, Routes } from "react-router-dom";
import PharmacyRoutes from "../pharmacy/routes/PharmacyRoutes";
import PharmacyLayout from "../pharmacy/layouts/PharmacyLayout";
import { AuthProvider } from "../pharmacy/context/AuthContext";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route path="/*" element={<PharmacyLayout />}>
          <Route path="*" element={<PharmacyRoutes />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
