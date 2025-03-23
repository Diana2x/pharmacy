import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { rating, comment, user } = review;

  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-yellow-500 w-4 h-4" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 w-4 h-4" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400 w-4 h-4" />);
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center mb-2">
        {stars}
        <span className="ml-2 text-gray-600 text-sm">
          by {user || "Anonymous"}
        </span>
      </div>
      <p className="text-gray-800">{comment}</p>
    </div>
  );
};

export default ReviewCard;
