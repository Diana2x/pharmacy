import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts, getProductById } from "../../api/products/apiProducts";
import StarRating from "./StarRating";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";


const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

const handleAddToCart = () => {
  addToCart(product);
};
  useEffect(() => {
    // Fetch related products (first 5)
    getProducts()
      .then((data) => setProducts(data.slice(0, 5)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const productData = await getProductById(id);
        if (!productData) {
          throw new Error("Producto no encontrado");
        }
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
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
            <StarRating
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
              productId={product.id}
            />
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="text-xl font-bold text-green-600 mb-6">
              Precio: ${product.price}
            </div>

            <button
  onClick={handleAddToCart}
  className="flex justify-center items-center py-2 w-full text-sm font-medium text-white bg-green-500 rounded-md transition-colors duration-300 hover:bg-green-600 mb-4"
>
  <FaShoppingCart className="mr-2 w-4 h-4" />
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
