import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/products/apiProducts";
import ProductCard from "../../components/ProductCard";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

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

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [products, setProducts] = useState([]);
  const [pageResults, setPageResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      
      // Search in products
      try {
        const allProducts = await getProducts();
        const filteredProducts = allProducts.filter(product => 
          product.nombre.toLowerCase().includes(query.toLowerCase()) ||
          (product.descripcion && product.descripcion.toLowerCase().includes(query.toLowerCase())) ||
          (product.categoria && product.categoria.toLowerCase().includes(query.toLowerCase()))
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      }
      
      // Search in website pages
      const filteredPages = websitePages.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.content.toLowerCase().includes(query.toLowerCase())
      );
      setPageResults(filteredPages);
      
      setIsLoading(false);
    };

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setPageResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const totalResults = products.length + pageResults.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 text-gray-600 hover:text-green-600"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      </div>
      
      {/* Search box */}
      <div className="relative max-w-xl mb-8">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => navigate(`/search?q=${encodeURIComponent(e.target.value)}`)}
          className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : query ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'} para &quot;{query}&quot;
            </p>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("all")}
                className={`mr-8 py-4 px-1 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Todo ({totalResults})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`mr-8 py-4 px-1 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Productos ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("pages")}
                className={`py-4 px-1 font-medium text-sm ${
                  activeTab === "pages"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Páginas ({pageResults.length})
              </button>
            </nav>
          </div>
          
          {/* Results list */}
          {(activeTab === "all" || activeTab === "pages") && pageResults.length > 0 && (
            <div className={activeTab === "all" && products.length > 0 ? "mb-8" : ""}>
              {activeTab === "all" && <h2 className="text-xl font-semibold mb-4">Páginas</h2>}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {pageResults.map((page, index) => (
                  <div 
                    key={page.path}
                    className={`
                      ${index !== pageResults.length - 1 ? "border-b border-gray-100" : ""}
                    `}
                  >
                    <button
                      onClick={() => navigate(page.path)}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-medium text-green-600">{page.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{page.content}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(activeTab === "all" || activeTab === "products") && products.length > 0 && (
            <div>
              {activeTab === "all" && <h2 className="text-xl font-semibold mb-4">Productos</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          
          {totalResults === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">😕</div>
              <h2 className="text-2xl font-medium text-gray-800 mb-2">No se encontraron resultados</h2>
              <p className="text-gray-600 mb-6">
                No hemos encontrado resultados para &quot;{query}&quot;. Intenta con otros términos.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FaSearch className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-600">
            Ingresa un término para buscar
          </h2>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
