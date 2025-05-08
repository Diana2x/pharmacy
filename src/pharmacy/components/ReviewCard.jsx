import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle, FaThumbsUp, FaCalendarAlt } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

const ReviewCard = ({ review }) => {
  const { rating, comment, user, timestamp, helpful = 0, title = "" } = review;

  // Format date if available
  const formattedDate = timestamp ? formatDistanceToNow(new Date(timestamp.seconds * 1000), { addSuffix: true }) : "";

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

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name || name === "Anonymous") return "A";
    return name.split(" ").map(part => part[0]).join("").toUpperCase();
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white border border-gray-100 hover:border-green-100 transition-colors">
      {/* Review header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          {/* User avatar */}
          <div className="mr-3 bg-green-100 text-green-800 w-10 h-10 rounded-full flex items-center justify-center font-semibold">
            {getInitials(user)}
          </div>
          
          <div>
            <div className="font-semibold text-gray-800">{user || "Anonymous"}</div>
            {formattedDate && (
              <div className="text-xs text-gray-500 flex items-center mt-0.5">
                <FaCalendarAlt className="mr-1 w-3 h-3" />
                {formattedDate}
              </div>
            )}
          </div>
        </div>
        
        {/* Star rating */}
        <div className="flex">{stars}</div>
      </div>
      
      {/* Review title - if available */}
      {title && (
        <h3 className="font-semibold text-green-800 mb-2">{title}</h3>
      )}
      
      {/* Review content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{comment}</p>
      </div>
      
      {/* Review footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <button className="flex items-center text-sm text-gray-500 hover:text-green-600 transition-colors">
          <FaThumbsUp className="mr-1" />
          <span>Helpful ({helpful})</span>
        </button>
        
        <div className="text-xs text-gray-400">
          Verified purchase
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
