/* ProductReviews.jsx
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

export default ProductReviews; */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Reusable StarRating Component (with half stars, filled stars, and outline stars)
const StarRating = ({
  averageRating,
  totalReviews,
  productId,
  userRating = null,
}) => {
  const stars = [];
  const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

  for (let i = 1; i <= 5; i++) {
    if (userRating !== null) {
      // If userRating is passed, we display the user's rating in the review card
      if (i <= userRating) {
        stars.push(<FaStar key={i} className="text-yellow-500 w-5 h-5" />);
      } else if (i - 0.5 === userRating) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-500 w-5 h-5" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400 w-5 h-5" />);
      }
    } else {
      // If userRating is null, show the average rating for the product
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} className="text-yellow-500 w-5 h-5" />);
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-500 w-5 h-5" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400 w-5 h-5" />);
      }
    }
  }

  return (
    <Link
      to={`/product/${productId}/reviews`}
      className="flex items-center group hover:underline"
    >
      <div className="flex">{stars}</div>
      {!userRating && (
        <span className="ml-2 text-gray-600 text-sm group-hover:text-blue-500">
          ({totalReviews} reseñas)
        </span>
      )}
    </Link>
  );
};

const ProductReviews = () => {
  const { id } = useParams(); // Get product ID from URL (even though it's not used for hardcoded data)

  // Hardcoded reviews for now
  const reviews = [
    {
      id: 1,
      userId: "Joseph Chero",
      rating: 4,
      comment: "Buen producto, pero creo que otro funciona mejor.",
      timestamp: "15 de marzo de 2025",
    },
    {
      id: 2,
      userId: "Maria Lopez",
      rating: 5,
      comment: "¡Calidad increíble! Muy satisfecha con la compra.",
      timestamp: "14 de marzo de 2025",
    },
    {
      id: 3,
      userId: "John Smith",
      rating: 3,
      comment: "Está bien, pero podría mejorar en algunas áreas.",
      timestamp: "13 de marzo de 2025",
    },
  ];

  // Calculate average rating and total reviews
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Simulating loading data, you can replace it with real API calls later.
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las reseñas.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center">Cargando reseñas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Reseñas del Producto
      </h1>

      {/* Display Star Rating for the average rating and total reviews */}
      <div className="mb-6 text-center">
        <StarRating
          averageRating={averageRating}
          totalReviews={totalReviews}
          productId={id}
        />
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{review.userId}</h3>

              {/* Display the user's star rating for each individual review */}
              <div className="flex items-center mb-2">
                <StarRating userRating={review.rating} />
              </div>

              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.timestamp}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay reseñas aún.</p>
      )}
    </div>
  );
};

export default ProductReviews;
