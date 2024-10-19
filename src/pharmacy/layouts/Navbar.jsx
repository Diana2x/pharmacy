import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white z-10 shadow-md w-full">
      <div className="container mx-auto px-4 lg:block">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title on the Left */}
          <div className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="logo" width={80} height={80} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Farmacias Ciudad del Sol
            </h1>
          </div>

          {/* Navigation Links to the Right */}
          <div className="space-x-6 flex items-center">
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              Nosotros
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              Servicios
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              Contacto
            </a>
            <a href="#" className="text-gray-900 hover:text-green-600">
              <FaCircleUser className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-900 hover:text-green-600">
              <FaShoppingCart className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="bg-gray-100 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            {/* Category Links */}
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Medicina
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Vitaminas y suplementos
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Cuidado personal
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Ayuda
              </a>
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
