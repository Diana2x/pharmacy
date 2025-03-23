import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "@/api/products/apiProducts";
const { VITE_API_URL } = import.meta.env;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 5000,
  });

  // Fetch products
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesMinPrice = product.price >= filters.minPrice;
      const matchesMaxPrice = product.price <= filters.maxPrice;
      return matchesName && matchesMinPrice && matchesMaxPrice;
    });
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

  return (
    <div className="flex w-full p-4 gap-6">
      {/* Filter Sidebar */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros</h2>
        {/* Filter by Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Buscar por nombre"
          />
        </div>
        {/* Filter by Price */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Precio mínimo
          </label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Min"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Precio máximo
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Max"
          />
        </div>
        <button
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => setFilters({ name: "", minPrice: 0, maxPrice: 5000 })}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Products Grid */}
      <div className="w-3/4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
