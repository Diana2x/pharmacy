import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white z-10 shadow-md w-full">
      <div className="container mx-auto lg:block">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title on the Left */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="sm:w-[40] sm:h-[40]"
            />
            <h1 className="lg:text-2xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 text-transparent bg-clip-text sm:text-lg">
              Farmacias Ciudad del Sol
            </h1>
          </div>

          {/* Navigation Links to the Right */}
          <div className="space-x-6 flex items-center">
            <Link
              to="/contact"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              <GrContact className="w-6 h-6" />
            </Link>
            <Link to="/login" className="text-gray-900 hover:text-green-600">
              <FaCircleUser className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="text-gray-900 hover:text-green-600">
              <FaShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="bg-gray-100 border-t">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-2">
            {/* Category Links */}
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-green-600 font-medium hover:underline"
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Catálogo de Productos
              </Link>
              <Link
                to="/aboutUs"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                ¿Quiénes Somos?
              </Link>
              <Link
                to="/mission"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Misión y Visión
              </Link>
              <Link
                to="/policies"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Políticas
              </Link>
              <Link
                to="/address"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Ubicación
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Preguntas Frecuentes
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Contacto
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
