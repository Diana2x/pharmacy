import { FirebaseDB } from "../../libs/firebase/config";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore/lite";

const collectionName = "productos";

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(FirebaseDB, collectionName));
  console.log(querySnapshot);
  const products = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(products);
  return products;
};

export const getProductById = async (id) => {
  const docRef = doc(FirebaseDB, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.error("No such document!");
    return null;
  }
};
