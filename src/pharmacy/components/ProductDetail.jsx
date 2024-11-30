import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Asegúrate de que esta ruta sea correcta

const ProductDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 5))) // Solo muestra los primeros 5 productos
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found or failed to fetch.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-lg text-gray-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-4 gap-6">
      <div className="max-w-7xl mx-auto p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:w-1/2 p-4">
            <img
              src={product.images?.[0] || "default-image.jpg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < 4 ? "yellow" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 17.27l4.18 2.73-1.64-5.03 4.12-3.73-5.19-.42L12 2 10.53 11.82l-5.19.42 4.12 3.73-1.64 5.03L12 17.27z"
                  />
                </svg>
              ))}
            </div>

            <div className="text-xl font-bold text-green-600 mb-6">
              Precio: ${product.price}
            </div>

            <button className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 mb-4">
              Añadir al carrito
            </button>

            <a href="/" className="text-sm text-blue-600 hover:underline">
              Regresar a la tienda
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto flex flex-col items-center container mt-6">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-left border-b-4 border-green-500 pb-2">
          Otros clientes también compraron
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
