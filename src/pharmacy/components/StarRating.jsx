import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const StarRating = ({ averageRating, totalReviews, productId }) => {
  const stars = [];
  const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-yellow-500 w-5 h-5" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 w-5 h-5" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400 w-5 h-5" />);
    }
  }

  return (
    <div className="flex items-center group">
      <div className="flex">{stars}</div>
      {productId ? (
        <Link 
          to={`/product/${productId}/reviews`} 
          className="ml-2 text-gray-600 text-sm hover:text-green-600 hover:underline transition-colors"
        >
          ({totalReviews} reviews)
        </Link>
      ) : (
        <span className="ml-2 text-gray-600 text-sm">
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default StarRating;
