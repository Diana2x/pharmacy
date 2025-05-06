import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "@/api/products/apiProducts";
import {
  FaFilter,
  FaSearch,
  FaSlidersH,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";
import { MdGridView, MdViewList } from "react-icons/md";
const { VITE_API_URL } = import.meta.env;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Categorías simuladas - en una app real vendrían de la API
  const categories = [
    { id: 1, name: "Medicamentos" },
    { id: 2, name: "Vitaminas" },
    { id: 3, name: "Cuidado personal" },
    { id: 4, name: "Bebés" },
    { id: 5, name: "Ortopedia" },
  ];

  const [filters, setFilters] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 5000,
    category: "",
    sort: "default", // default, price-asc, price-desc, name-asc
  });

  // Fetch products
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesMinPrice = product.price >= filters.minPrice;
      const matchesMaxPrice = product.price <= filters.maxPrice;
      const matchesCategory =
        !filters.category || (product.category && product.category.toString() === filters.category);
      return matchesName && matchesMinPrice && matchesMaxPrice && matchesCategory;
    });

    // Aplicar ordenamiento
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // no sorting or default sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name.includes("Price") ? parseFloat(value) : value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      name: "",
      minPrice: 0,
      maxPrice: 5000,
      category: "",
      sort: "default",
    });
    setMobileFiltersOpen(false);
  };

  // Toggle sort
  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({
      ...prev,
      sort: sortValue,
    }));
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="container mx-auto">
      {/* Header con título y botones de acción */}
      <div className="flex flex-col gap-4 justify-between items-start mb-6 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Catálogo de Productos</h1>

        <div className="flex flex-wrap gap-2 items-center sm:gap-4">
          {/* Botón para mostrar/ocultar filtros en móvil */}
          <button
            className="flex items-center px-3 py-2 text-gray-700 bg-white rounded-lg border border-gray-300 shadow-sm sm:hidden hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FaFilter className="mr-2" /> Filtros
          </button>

          {/* Selector de vista (grid/lista) */}
          <div className="hidden overflow-hidden items-center bg-white rounded-lg border border-gray-300 sm:flex">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Vista de cuadrícula"
            >
              <MdGridView className="w-5 h-5" />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list" ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="Vista de lista"
            >
              <MdViewList className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de ordenamiento */}
          <select
            value={filters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 text-gray-700 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A-Z</option>
          </select>
        </div>
      </div>

      {/* Búsqueda rápida para móvil/tablet */}
      <div className="relative mb-6 sm:mb-8">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="px-4 py-3 pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Buscar productos por nombre..."
        />
        <FaSearch className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filtros para desktop (visible solo en pantallas grandes) */}
        <div className="hidden flex-shrink-0 lg:block lg:w-1/4 xl:w-1/5 h-max">
          <div className="sticky top-20 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
              <button
                onClick={resetFilters}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="mr-1" /> Limpiar
              </button>
            </div>

            {/* Filter by Categories */}
            <div className="mb-6">
              <h3 className="pb-2 mb-2 text-sm font-semibold text-gray-600 border-b">Categorías</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    value=""
                    checked={filters.category === ""}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                    Todas las categorías
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.id}`}
                      name="category"
                      value={category.id.toString()}
                      checked={filters.category === category.id.toString()}
                      onChange={handleFilterChange}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div className="mb-6">
              <h3 className="pb-2 mb-2 text-sm font-semibold text-gray-600 border-b">Precio</h3>
              <div className="mt-2 space-y-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Mínimo: ${filters.minPrice}
                  </label>
                  <input
                    type="range"
                    name="minPrice"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Máximo: ${filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="flex-1">
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="px-2 py-1 w-full text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Min"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="px-2 py-1 w-full text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="px-4 py-2 w-full font-medium text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              onClick={resetFilters}
            >
              Aplicar filtros
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="overflow-hidden flex-1">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-green-500 animate-spin"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              className={`md:max-h-[calc(100vh-200px)] overflow-auto ${
                viewMode === "grid"
                  ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6`
                  : `flex flex-col space-y-4`
              }`}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className={viewMode === "list" ? "w-full" : ""}>
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
              <p className="mb-4 text-lg text-gray-600">
                No se encontraron productos que coincidan con los filtros.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              >
                <FaTimes className="mr-2" /> Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Overlay (solo visible en móvil cuando está abierto) */}
      {mobileFiltersOpen && (
        <div className="overflow-hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>
          <div className="flex fixed inset-y-0 left-0 max-w-full">
            <div className="relative w-full max-w-xs">
              <div className="flex overflow-y-auto flex-col p-4 h-full bg-white shadow-xl">
                <div className="flex justify-between items-center pb-2 mb-4 border-b">
                  <h2 className="flex items-center text-lg font-bold">
                    <FaSlidersH className="mr-2 text-green-600" /> Filtros
                  </h2>
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Cerrar filtros"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Categories Filter */}
                <div className="mb-6">
                  <h3 className="pb-2 mb-2 text-sm font-semibold text-gray-600 border-b">
                    Categorías
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="m-category-all"
                        name="category"
                        value=""
                        checked={filters.category === ""}
                        onChange={handleFilterChange}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="m-category-all" className="ml-2 text-sm text-gray-700">
                        Todas las categorías
                      </label>
                    </div>
                    {categories.map((category) => (
                      <div key={`m-${category.id}`} className="flex items-center">
                        <input
                          type="radio"
                          id={`m-category-${category.id}`}
                          name="category"
                          value={category.id.toString()}
                          checked={filters.category === category.id.toString()}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <label
                          htmlFor={`m-category-${category.id}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Filter */}
                <div className="mb-6">
                  <h3 className="pb-2 mb-2 text-sm font-semibold text-gray-600 border-b">Precio</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <label className="block mb-1 text-xs text-gray-500">
                        Mínimo: ${filters.minPrice}
                      </label>
                      <input
                        type="range"
                        name="minPrice"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-500">
                        Máximo: ${filters.maxPrice}
                      </label>
                      <input
                        type="range"
                        name="maxPrice"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    className="flex justify-center items-center px-4 py-3 mb-2 w-full font-medium text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Aplicar filtros ({filteredProducts.length} resultados)
                  </button>
                  <button
                    className="px-4 py-3 w-full text-gray-600 rounded-lg border border-gray-300 transition-colors hover:bg-gray-50"
                    onClick={resetFilters}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
