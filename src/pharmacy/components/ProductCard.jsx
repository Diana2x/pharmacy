import { Link } from "react-router-dom";
import Slider from "react-slick";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
  const settings = {
    dots: true, // Muestra los puntos de paginación
    infinite: true, // Desliza infinitamente
    speed: 500, // Velocidad de deslizamiento
    slidesToShow: 1, // Muestra una imagen por vez
    slidesToScroll: 1, // Desliza una imagen por vez
    autoplay: false, // Activa el deslizamiento automático
    autoplaySpeed: 3000, // Intervalo entre deslizamientos (en ms)
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-full sm:max-w-sm border border-gray-200">
      {/* Product Carousel */}
      <div className="relative w-full h-48 sm:h-60 lg:h-72 mb-4">
        <Slider {...settings}>
          {product.images &&
            product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            ))}
        </Slider>
      </div>

      {/* Product Info */}
      <div className="mt-4 sm:mt-6">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {product.description}
        </p>
        <p className="text-lg font-bold text-green-600 mt-4">
          ${product.price.toString()} MXN
        </p>
        <StarRating
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
          productId={product.id}
        />
      </div>

      {/* Product Actions */}
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/product/${product.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm sm:text-base"
        >
          Ver más
        </Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
