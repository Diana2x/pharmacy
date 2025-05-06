import { FaShoppingCart, FaSearch, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../libs/firebase/config";
import ProfileModal from "../components/ProfileModal";
import CartSidebar from "../components/CartSidebar";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const navigate = useNavigate();
  
  // Cerrar dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      // Cerrar el menú móvil al hacer clic fuera de él
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }

      // Cerrar el menú de categorías al hacer clic fuera de él
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Cerrar los menús cuando cambia la ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryMenuOpen(false);
  }, [location.pathname]);
  
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
    <>
      <div className="sticky top-0 bg-white z-30 shadow-md w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo and Title on the Left */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <img
              src="/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
            <h1 className="text-sm md:text-lg lg:text-2xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Farmacias Ciudad del Sol
            </h1>
          </div>
          
          {/* Hamburger menu for mobile */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              className="text-gray-600 hover:text-green-600 focus:outline-none"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch className="w-5 h-5" />
            </button>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                setCartSidebarOpen(true);
              }} 
              className="text-gray-900 hover:text-green-600 relative"
            >
              <FaShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            <button 
              className="text-gray-600 hover:text-green-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links to the Right - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/contact"
              className="text-gray-900 hover:text-green-600 font-medium hover:underline"
            >
              <GrContact className="w-6 h-6" />
            </Link>
            
            {/* Usuario: Login/Profile */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="w-8 h-8 overflow-hidden rounded-full border-2 border-green-500">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Perfil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                        {currentUser.displayName ? (
                          <span className="text-sm font-bold">
                            {currentUser.displayName.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <FaCircleUser className="w-5 h-5" />
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">
                    {currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Usuario'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    {currentUser.isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Panel de Administrador
                      </Link>
                    )}
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false);
                        setProfileModalOpen(true);
                      }}
                    >
                      Mi Perfil
                    </button>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-900 hover:text-green-600 flex items-center space-x-1">
                <FaCircleUser className="w-6 h-6" />
                <span className="hidden md:inline text-sm">Iniciar Sesión</span>
              </Link>
            )}
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                setCartSidebarOpen(true);
              }} 
              className="text-gray-900 hover:text-green-600 relative"
            >
              <FaShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categorias - Solo visible en desktop */}
        <div className="bg-gray-100 border-t hidden md:block">
          <div className="container mx-auto">
            <div className="flex justify-between items-center py-2">
            {/* Category Links */}
              <div className="flex flex-wrap space-x-4 lg:space-x-8">
              <Link
                to="/"
                className={`font-medium hover:underline text-sm lg:text-base ${location.pathname === '/' ? 'text-green-600 font-semibold' : 'text-gray-900 hover:text-green-600'}`}
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/products' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Catálogo
              </Link>
              <Link
                to="/aboutUs"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/aboutUs' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                ¿Quiénes Somos?
              </Link>
              <Link
                to="/mission"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/mission' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Misión y Visión
              </Link>
              <Link
                to="/policies"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/policies' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Políticas
              </Link>
              <Link
                to="/address"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/address' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Ubicación
              </Link>
              <Link
                to="/faq"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/faq' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Preguntas Frecuentes
              </Link>
              <Link
                to="/contact"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/contact' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Contacto
              </Link>
              <Link
                to="/forum"
                className={`font-medium text-sm lg:text-base ${location.pathname === '/forum' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
              >
                Foro
              </Link>
            </div>

            {/* Search Bar - Solo visible en desktop */}
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
        
        {/* Mobile Search Bar - Solo visible cuando se activa */}
        {searchOpen && (
          <div className="md:hidden py-2 px-4 border-t border-gray-200 bg-white z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setSearchOpen(false)}
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Menu - Solo visible en móvil cuando está abierto */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out overflow-auto md:hidden"
          >
            <div className="bg-white h-full w-full px-4 py-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-green-600">Menú</h2>
                <button 
                  className="text-gray-600 hover:text-green-600 focus:outline-none" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* User login/profile section for mobile */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                {currentUser ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-green-500">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Perfil" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                          {currentUser.displayName ? (
                            <span className="text-sm font-bold">
                              {currentUser.displayName.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <FaCircleUser className="w-6 h-6" />
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {currentUser.displayName || 'Usuario'}
                      </p>
                      <div className="flex flex-col space-y-2 mt-2">
                        {currentUser.isAdmin && (
                          <Link 
                            to="/admin" 
                            className="text-sm text-gray-700 hover:text-green-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Panel de Administrador
                          </Link>
                        )}
                        <button 
                          className="text-sm text-gray-700 hover:text-green-600 text-left"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setProfileModalOpen(true);
                          }}
                        >
                          Mi Perfil
                        </button>
                        <button 
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="text-sm text-red-600 hover:text-red-800 text-left flex items-center"
                        >
                          <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 text-gray-800 hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCircleUser className="w-6 h-6" />
                    <span>Iniciar Sesión</span>
                  </Link>
                )}
              </div>

              {/* Navigation Links for Mobile */}
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/' ? 'text-green-600 font-semibold' : 'text-gray-900 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/products" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/products' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catálogo de Productos
                </Link>
                <Link 
                  to="/aboutUs" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/aboutUs' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ¿Quiénes Somos?
                </Link>
                <Link 
                  to="/mission" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/mission' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Misión y Visión
                </Link>
                <Link 
                  to="/policies" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/policies' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Políticas
                </Link>
                <Link 
                  to="/address" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/address' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ubicación
                </Link>
                <Link 
                  to="/faq" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/faq' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preguntas Frecuentes
                </Link>
                <Link 
                  to="/contact" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/contact' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
                <Link 
                  to="/forum" 
                  className={`py-2 font-medium border-b border-gray-100 ${location.pathname === '/forum' ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Foro
                </Link>
                <button 
                  className="py-2 text-gray-700 hover:text-green-600 font-medium border-b border-gray-100 flex items-center justify-between w-full text-left"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartSidebarOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <FaShoppingCart className="mr-2" /> Carrito de Compras
                  </div>
                  {itemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de Perfil */}
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
      
      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={cartSidebarOpen} 
        onClose={() => setCartSidebarOpen(false)} 
      />
    </>
  );
};

export default Navbar;
