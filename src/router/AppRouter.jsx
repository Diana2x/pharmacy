import { Route, Routes } from "react-router-dom";
import PharmacyRoutes from "../pharmacy/routes/PharmacyRoutes";
import PharmacyLayout from "../pharmacy/layouts/PharmacyLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path="/*" element={<PharmacyLayout />}>
        <Route path="*" element={<PharmacyRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
