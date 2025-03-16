import { FirebaseDB } from "../../libs/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  increment,
  getDoc,
} from "firebase/firestore/lite";

// ✅ 1️⃣ Add a New Review
export const addReview = async (productId, userId, rating, comment) => {
  try {
    const reviewsRef = collection(FirebaseDB, "reviews");

    // Add new review to "reviews" collection
    const newReviewRef = await addDoc(reviewsRef, {
      productId,
      userId,
      rating,
      comment,
      timestamp: new Date(),
    });

    // Log to verify the new review was added
    console.log("Review added successfully with ID: ", newReviewRef.id);

    // After adding the review, update the product's average rating and total reviews count
    await updateProductRating(productId);

    console.log("Product rating updated successfully!");
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// ✅ 2️⃣ Get Reviews by Product ID
export const getReviewsByProductId = async (productId) => {
  try {
    const reviewsRef = collection(FirebaseDB, "reviews");
    const q = query(reviewsRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    // Fetch reviews and resolve productId reference
    const reviews = [];
    for (const doc of querySnapshot.docs) {
      const reviewData = doc.data();
      // Get product data from reference (productId is a reference to the product document)
      const productSnapshot = await getDoc(reviewData.productId);
      const productData = productSnapshot.data();

      reviews.push({
        id: doc.id,
        ...reviewData,
        productName: productData.name, // Add product name to review
        productPrice: productData.price, // Add product price to review (or other fields you want)
      });
    }

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// ✅ 3️⃣ Update Product Rating After Adding a Review
export const updateProductRating = async (productId) => {
  try {
    const reviewsRef = collection(FirebaseDB, "reviews");
    const q = query(reviewsRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    // Calculate the new average rating and total review count
    let totalRating = 0;
    let totalReviews = 0;

    querySnapshot.docs.forEach((doc) => {
      totalRating += doc.data().rating;
      totalReviews += 1;
    });

    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Update the product's document in the "products" collection
    const productRef = doc(FirebaseDB, "productos", productId);
    await updateDoc(productRef, {
      averageRating,
      totalReviews: totalReviews,
    });

    console.log("Product rating and review count updated!");
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
};
