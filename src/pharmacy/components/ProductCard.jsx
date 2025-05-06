import { Link } from "react-router-dom";
import Slider from "react-slick";
import StarRating from "./StarRating";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart, FaEye, FaHeart } from "react-icons/fa";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-gray-200 ${
          viewMode === "list"
            ? "flex flex-row"
            : "flex flex-col h-full transform hover:-translate-y-1"
        }`}
      >
        {/* Product Carousel with Hover Actions */}
        <div
          className={`relative overflow-hidden ${
            viewMode === "list"
              ? "w-[100px] sm:w-[140px] md:w-[160px]"
              : "w-full h-48 sm:h-56 md:h-64 lg:h-60 xl:h-64"
          }`}
        >
          <Slider {...settings}>
            {product.images &&
              product.images.map((image, index) => (
                <div
                  key={index}
                  className={
                    viewMode === "list"
                      ? "w-full h-[120px]"
                      : "w-full h-48 sm:h-56 md:h-64 lg:h-60 xl:h-64"
                  }
                >
                  <img src={image} alt={product.name} className="object-cover w-full h-full" />
                </div>
              ))}
          </Slider>

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              -{product.discount}%
            </div>
          )}

          {/* Hover Actions */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite ? "bg-red-500" : "bg-white"
              } transition-colors duration-300`}
            >
              <FaHeart className={`w-4 h-4 ${isFavorite ? "text-white" : "text-red-500"}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full transition-colors duration-300 hover:bg-green-500 hover:text-white"
            >
              <FaShoppingCart className="w-4 h-4" />
            </button>
            <button
              className="p-2 bg-white rounded-full transition-colors duration-300 hover:bg-blue-500 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <FaEye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`p-4 flex flex-col ${viewMode === "list" ? "flex-1" : "flex-grow"}`}>
          <h2
            className={`text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 ${
              viewMode === "list" ? "" : "line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]"
            }`}
          >
            {product.name}
          </h2>
          <p
            className={`text-gray-600 text-xs sm:text-sm mt-1 ${
              viewMode === "list" ? "line-clamp-3" : "line-clamp-2 flex-grow"
            }`}
          >
            {product.description}
          </p>
          <div className="mt-2 sm:mt-3">
            <StarRating
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
              productId={product.id}
            />
          </div>
          <div className="flex justify-between items-end mt-2 sm:mt-3">
            <div>
              {product.originalPrice && (
                <span className="mr-2 text-xs text-gray-500 line-through sm:text-sm">
                  ${product.originalPrice} MXN
                </span>
              )}
              <p className="inline-block text-base font-bold text-green-600 sm:text-lg">
                ${product.price.toString()} MXN
              </p>
            </div>
            <div className="hidden sm:block">
              <button
                onClick={handleAddToCart}
                className="p-2 text-white bg-green-500 rounded-full transition-colors duration-300 hover:bg-green-600"
              >
                <FaShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cart Button */}
        {viewMode === "list" ? (
          <div className="flex justify-end items-end px-4 pb-4">
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md transition-colors duration-300 hover:bg-green-600"
            >
              <FaShoppingCart className="mr-2 w-4 h-4" />
              Añadir al carrito
            </button>
          </div>
        ) : (
          <div className="px-4 pb-4 sm:hidden">
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center py-2 w-full text-sm font-medium text-white bg-green-500 rounded-md transition-colors duration-300 hover:bg-green-600"
            >
              <FaShoppingCart className="mr-2 w-4 h-4" />
              Añadir al carrito
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
