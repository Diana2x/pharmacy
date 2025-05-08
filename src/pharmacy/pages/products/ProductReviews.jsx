import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReviewsByProductId } from "../../../api/reviews/apiReviews";
import { getProductById } from "../../../api/products/apiProducts";
import ReviewCard from "../../components/ReviewCard";
import { FaStar, FaChevronLeft, FaRegSmileBeam, FaPencilAlt } from "react-icons/fa";

const ProductReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewStats, setReviewStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0] // 5-star to 1-star counts
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch product details
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Fetch reviews
        const reviewsData = await getReviewsByProductId(id);
        setReviews(reviewsData);
        
        // Calculate review statistics
        if (reviewsData.length > 0) {
          const total = reviewsData.length;
          const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
          const average = sum / total;
          
          // Count reviews for each star rating
          const distribution = [0, 0, 0, 0, 0];
          reviewsData.forEach(review => {
            const index = Math.floor(review.rating) - 1;
            if (index >= 0 && index < 5) distribution[4 - index]++;
          });
          
          setReviewStats({ average, total, distribution });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
          <p>{error}</p>
          <Link to={`/product/${id}`} className="inline-block mt-3 text-red-600 hover:text-red-800 underline">
            Return to product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back link */}
      <Link 
        to={`/product/${id}`} 
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors"
      >
        <FaChevronLeft className="mr-2" /> Back to {product?.name || 'Product'}
      </Link>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 mb-8 shadow-sm">
        <h1 className="text-3xl font-bold text-green-800 mb-3">
          Customer Reviews
        </h1>
        
        {product && (
          <div className="flex items-center">
            <img 
              src={product.imagen || product.image || `/images/${(product.name || '').replace(/\s+/g, '_')}.jpg`} 
              alt={product.name} 
              className="w-16 h-16 object-cover rounded-md mr-4" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/logo.png";
              }}
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.category || product.categoria}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Review stats and list */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Review stats */}
        <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
          <div className="text-center mb-4">
            <div className="flex justify-center items-baseline">
              <span className="text-5xl font-bold text-green-600">{reviewStats.average.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">/ 5</span>
            </div>
            
            <div className="flex justify-center mt-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(reviewStats.average) ? "text-yellow-500 w-5 h-5" : "text-gray-300 w-5 h-5"} />
              ))}
            </div>
            
            <p className="text-gray-600">{reviewStats.total} {reviewStats.total === 1 ? 'review' : 'reviews'}</p>
          </div>
          
          {/* Rating distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => {
              const count = reviewStats.distribution[i];
              const percentage = reviewStats.total > 0 ? (count / reviewStats.total) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">{star} ★</span>
                  <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
          
          {/* Write review button */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              <FaPencilAlt className="mr-2" /> Write a Review
            </button>
          </div>
        </div>
        
        {/* Reviews list */}
        <div className="md:w-2/3">
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaRegSmileBeam className="mx-auto text-green-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your experience with this product!</p>
              <button className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
