import { FirebaseDB } from "../../libs/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore/lite";

const collectionName = "reviews";

export const getReviewsByProductId = async (productId) => {
  try {
    const productRef = doc(FirebaseDB, "productos", productId); // Correct reference
    const reviewsRef = collection(FirebaseDB, collectionName);
    const q = query(reviewsRef, where("productId", "==", productRef)); // Correct filter

    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((reviewDoc) => ({
      id: reviewDoc.id,
      ...reviewDoc.data(),
    }));

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
