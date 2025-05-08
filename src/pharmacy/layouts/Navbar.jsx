import { FaShoppingCart, FaSearch, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../libs/firebase/config";
import { getProducts } from "../../api/products/apiProducts";
import ProfileModal from "../components/ProfileModal";
import CartSidebar from "../components/CartSidebar";

// Define searchable pages with their metadata
const websitePages = [
  { path: "/", title: "Inicio", content: "Página principal de Farmacias Ciudad del Sol." },
  { path: "/products", title: "Catálogo de Productos", content: "Explorar nuestro catálogo completo de productos farmacéuticos." },
  { path: "/aboutUs", title: "¿Quiénes Somos?", content: "Información sobre Farmacias Ciudad del Sol, nuestra historia y compromiso." },
  { path: "/mission", title: "Misión y Visión", content: "Nuestra misión y visión como empresa farmacéutica." },
  { path: "/policies", title: "Políticas", content: "Políticas de privacidad, devoluciones y términos de servicio." },
  { path: "/address", title: "Ubicación", content: "Información sobre nuestras ubicaciones y horarios de atención." },
  { path: "/faq", title: "Preguntas Frecuentes", content: "Respuestas a preguntas comunes sobre nuestros servicios y productos." },
  { path: "/contact", title: "Contacto", content: "Información de contacto y formulario para consultas." },
  { path: "/forum", title: "Foro", content: "Foro de discusión para clientes y comunidad." },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ products: [], pages: [] });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const searchResultsRef = useRef(null);
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
      
      // Cerrar los resultados de búsqueda al hacer clic fuera
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowSearchResults(false);
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
    setSearchOpen(false);
    setShowSearchResults(false);
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
  
  // Buscar productos y páginas
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({ products: [], pages: [] });
      setShowSearchResults(false);
      return;
    }
    
    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      // Buscar en productos
      const allProducts = await getProducts();
      
      // Para propósitos de depuración
      console.log("Término de búsqueda:", query);
      console.log("Total de productos:", allProducts.length);
      
      // Función para normalizar texto (quitar acentos y convertir a minúsculas)
      const normalizeText = (text) => {
        return text
          ? text.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          : "";
      };
      
      // Búsqueda normalizada y más flexible
      const searchTerm = normalizeText(query);
      
      // Imprimir los primeros productos para depuración
      if (allProducts.length > 0) {
        console.log("Ejemplo de estructura de producto:", allProducts[0]);
      }
      
      const filteredProducts = allProducts.filter(product => {
        // Normalizar los campos potenciales (tanto name como nombre)
        const productName = normalizeText(product.name || product.nombre || "");
        const productDesc = normalizeText(product.description || product.descripcion || "");
        const productCategory = normalizeText(product.category || product.categoria || "");
        
        // Comprobar término por término para una búsqueda más flexible
        const searchTerms = searchTerm.split(" ").filter(term => term.length > 0);
        
        // Si no hay términos de búsqueda válidos, no incluir el producto
        if (searchTerms.length === 0) return false;
        
        // Registrar productos específicos para depuración
        if (productName.includes("bioyet") || 
            (product.name && product.name.toLowerCase().includes("bioyet")) ||
            (product.nombre && product.nombre.toLowerCase().includes("bioyet"))) {
          console.log("Encontrado producto con nombre similar a Bioyetin:", product);
        }
        
        // Un producto coincide si al menos uno de los términos de búsqueda coincide
        // con al menos uno de los campos del producto
        return searchTerms.some(term => 
          productName.includes(term) || 
          productDesc.includes(term) || 
          productCategory.includes(term)
        );
      }).slice(0, 5); // Limitar a 5 resultados
      
      console.log("Productos filtrados:", filteredProducts.length);
      
      // Buscar en páginas del sitio
      const filteredPages = websitePages.filter(page => 
        normalizeText(page.title).includes(searchTerm) ||
        normalizeText(page.content).includes(searchTerm)
      ).slice(0, 4); // Limitar a 4 resultados
      
      setSearchResults({ products: filteredProducts, pages: filteredPages });
    } catch (error) {
      console.error("Error al buscar:", error);
      setSearchResults({ products: [], pages: [] });
    } finally {
      setIsSearching(false);
    }
  };
  
  // Manejar cambios en el campo de búsqueda
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults({ products: [], pages: [] });
        setShowSearchResults(false);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  
  // Manejar cambios en el campo de búsqueda móvil
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (mobileSearchQuery) {
        handleSearch(mobileSearchQuery);
      } else {
        setSearchResults({ products: [], pages: [] });
        setShowSearchResults(false);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [mobileSearchQuery]);
  
  // Navegar a la página del producto o página
  const handleSearchResultClick = (path) => {
    setSearchQuery("");
    setMobileSearchQuery("");
    setShowSearchResults(false);
    setSearchOpen(false);
    navigate(path);
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
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  />
                  <button 
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
                  >
                    <FaSearch />
                  </button>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults({ products: [], pages: [] });
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Caja de resultados de búsqueda */}
                {showSearchResults && (
                  <div 
                    ref={searchResultsRef}
                    className="absolute z-50 mt-2 w-96 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden max-h-96 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h3 className="font-medium text-gray-700">Resultados de búsqueda</h3>
                      <button
                        onClick={() => setShowSearchResults(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {isSearching ? (
                      <div className="p-6 text-center text-gray-500">
                        <div className="animate-pulse">Buscando...</div>
                      </div>
                    ) : searchResults.products.length === 0 && searchResults.pages.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <p>No se encontraron resultados para &quot;{searchQuery}&quot;</p>
                      </div>
                    ) : (
                      <>
                        {searchResults.products.length > 0 && (
                          <div className="p-3">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Productos</h4>
                            <div className="space-y-2">
                              {searchResults.products.map(product => (
                                <button
                                  key={product.id}
                                  onClick={() => handleSearchResultClick(`/product/${product.id}`)}
                                  className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-md flex items-center transition-colors duration-150"
                                >
                                  <div className="w-12 h-12 mr-3 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img 
                                      src={
                                        // Intentar usar la imagen directamente si está disponible
                                        product.imagen || product.image || 
                                        // Casos especiales para productos con nombres especiales
                                        ((product.nombre || product.name || "").toLowerCase().includes("xigduo") ?
                                          "/images/XigDuo2.jpg" :
                                        (product.nombre || product.name || "").toLowerCase().includes("vitamina d3") ||
                                        (product.nombre || product.name || "").toLowerCase().includes("vitaminad3") ?
                                          "/images/VitaminaD3.jpg" :
                                          // Para otros productos, ruta basada en el nombre
                                          (product.nombre || product.name ? 
                                            `/images/${(product.nombre || product.name).replace(/\s+/g, '_')}.jpg` : 
                                            null))
                                      }
                                      alt={product.nombre || product.name || "Producto"} 
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        const productName = product.nombre || product.name || "";
                                        console.log("Trying to load image for product:", productName);
                                        
                                        // Casos especiales para productos con nombres especiales
                                        if (productName.toLowerCase().includes("xigduo")) {
                                          e.target.src = `/images/XigDuo2.jpg`;
                                          e.target.onerror = (err) => {
                                            console.log("Trying XigDuo2_2.jpg");
                                            err.target.onerror = null;
                                            err.target.src = `/images/XigDuo2_2.jpg`;
                                          };
                                          return;
                                        }
                                        
                                        if (productName.toLowerCase().includes("vitamina d3") ||
                                            productName.toLowerCase().includes("vitaminad3")) {
                                          e.target.src = `/images/VitaminaD3.jpg`;
                                          e.target.onerror = (err) => {
                                            console.log("Trying VitaminaD3_2.jpg");
                                            err.target.onerror = null;
                                            err.target.src = `/images/VitaminaD3_2.jpg`;
                                          };
                                          return;
                                        }
                                        
                                        // Si la imagen principal falla, intentar con variante _2
                                        if (!e.target.src.includes('_2.jpg')) {
                                          const formattedName = productName.replace(/\s+/g, '_');
                                          console.log("Trying alternate image: ", `/images/${formattedName}_2.jpg`);
                                          e.target.src = `/images/${formattedName}_2.jpg`;
                                          e.target.onerror = (err) => {
                                            err.target.onerror = null;
                                            // Intentar con primera letra mayúscula como último recurso
                                            err.target.src = "/images/logo.png";
                                          };
                                        } else {
                                          e.target.onerror = null;
                                          e.target.src = "/images/logo.png";
                                        }
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm text-gray-800">{product.nombre || product.name}</p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {product.categoria || product.category}{' '}
                                      {product.price || product.precio ? 
                                        <span className="font-semibold text-green-600">
                                          ${parseFloat(product.price || product.precio).toFixed(2)}
                                        </span> : ''
                                      }
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {searchResults.pages.length > 0 && (
                          <div className="p-3 border-t border-gray-100">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Páginas</h4>
                            <div className="space-y-2">
                              {searchResults.pages.map(page => (
                                <button
                                  key={page.path}
                                  onClick={() => handleSearchResultClick(page.path)}
                                  className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-md transition-colors duration-150"
                                >
                                  <p className="font-medium text-sm text-gray-800">{page.title}</p>
                                  <p className="text-xs text-gray-500 truncate">{page.content}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {(searchResults.products.length > 4 || searchResults.pages.length > 3) && (
                          <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
                            <button 
                              onClick={() => handleSearchResultClick(`/search?q=${encodeURIComponent(searchQuery)}`)}
                              className="text-sm text-green-600 hover:text-green-800 font-medium"
                            >
                              Ver todos los resultados
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar - Solo visible cuando se activa */}
        {searchOpen && (
          <div className="md:hidden py-2 px-4 border-t border-gray-200 bg-white z-30">
            <div className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onFocus={() => mobileSearchQuery && setShowSearchResults(true)}
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button 
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
                >
                  <FaSearch />
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => {
                    setSearchOpen(false);
                    setShowSearchResults(false);
                  }}
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              
              {/* Caja de resultados de búsqueda móvil */}
              {showSearchResults && searchOpen && (
                <div 
                  ref={searchResultsRef}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden max-h-96 overflow-y-auto"
                >
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">Resultados de búsqueda</h3>
                    <button
                      onClick={() => setShowSearchResults(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {isSearching ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="animate-pulse">Buscando...</div>
                    </div>
                  ) : searchResults.products.length === 0 && searchResults.pages.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <p>No se encontraron resultados para &quot;{mobileSearchQuery}&quot;</p>
                    </div>
                  ) : (
                    <>
                      {searchResults.products.length > 0 && (
                        <div className="p-3">
                          <h4 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Productos</h4>
                          <div className="space-y-2">
                            {searchResults.products.map(product => (
                              <button
                                key={product.id}
                                onClick={() => handleSearchResultClick(`/product/${product.id}`)}
                                className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-md flex items-center transition-colors duration-150"
                              >
                                <div className="w-12 h-12 mr-3 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img 
                                    src={
                                      // Intentar usar la imagen directamente si está disponible
                                      product.imagen || product.image || 
                                      // Si no, construir ruta basada en el nombre del producto
                                      (product.nombre || product.name ? 
                                        `/images/${(product.nombre || product.name).replace(/\s+/g, '_')}.jpg` : 
                                        null)
                                    }
                                    alt={product.nombre || product.name || "Producto"} 
                                    className="h-full w-full object-cover object-center"
                                    onError={(e) => {
                                      // Si la imagen principal falla, intentar con variante _2
                                      if (!e.target.src.includes('_2.jpg') && (product.nombre || product.name)) {
                                        const productName = (product.nombre || product.name).replace(/\s+/g, '_');
                                        e.target.src = `/images/${productName}_2.jpg`;
                                      } else {
                                        e.target.onerror = null;
                                        e.target.src = product.nombre || product.name ?
                                          `/images/${(product.nombre || product.name).charAt(0).toUpperCase()}.png` :
                                          "/images/logo.png";
                                      }
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-sm text-gray-800">{product.nombre || product.name}</p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {product.categoria || product.category}{' '}
                                    {product.price || product.precio ? 
                                      <span className="font-semibold text-green-600">
                                        ${parseFloat(product.price || product.precio).toFixed(2)}
                                      </span> : ''
                                    }
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {searchResults.pages.length > 0 && (
                        <div className="p-3 border-t border-gray-100">
                          <h4 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Páginas</h4>
                          <div className="space-y-2">
                            {searchResults.pages.map(page => (
                              <button
                                key={page.path}
                                onClick={() => handleSearchResultClick(page.path)}
                                className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-md transition-colors duration-150"
                              >
                                <p className="font-medium text-sm text-gray-800">{page.title}</p>
                                <p className="text-xs text-gray-500 truncate">{page.content}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(searchResults.products.length > 4 || searchResults.pages.length > 3) && (
                        <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
                          <button 
                            onClick={() => handleSearchResultClick(`/search?q=${encodeURIComponent(mobileSearchQuery)}`)}
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            Ver todos los resultados
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
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
