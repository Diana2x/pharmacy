import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByProductId } from "../../../api/reviews/apiReviews";
import ReviewCard from "../../components/ReviewCard"; // Make sure this is correct

const ProductReviews = () => {
  const { id } = useParams(); // Get product ID from URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getReviewsByProductId(id);
        setReviews(data);
      } catch (err) {
        setError("Error loading reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  if (loading) return <p className="text-center">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Reviews
      </h1>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
