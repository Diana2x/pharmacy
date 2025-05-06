import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../libs/firebase/config";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Panel de Administrador</h1>
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Información del Usuario</h2>
          <p className="mb-1"><span className="font-medium">Nombre:</span> {currentUser?.displayName || "No disponible"}</p>
          <p className="mb-1"><span className="font-medium">Email:</span> {currentUser?.email}</p>
          <p className="mb-1"><span className="font-medium">Rol:</span> {currentUser?.isAdmin ? "Administrador" : "Usuario"}</p>
          <p className="mb-1"><span className="font-medium">UID:</span> {currentUser?.uid}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Funcionalidades de Administrador</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Gestión de Productos</h3>
              <p className="text-sm text-gray-600">Agregar, editar y eliminar productos</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Gestión de Usuarios</h3>
              <p className="text-sm text-gray-600">Administrar usuarios y roles</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Órdenes y Ventas</h3>
              <p className="text-sm text-gray-600">Ver y administrar pedidos</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
