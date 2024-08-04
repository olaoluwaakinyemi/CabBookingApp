import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCYr7Ab_txYBmIGQIfL8GaOTWzpeMLlO-Y",
  authDomain: "cablebooking.firebaseapp.com",
  projectId: "cablebooking",
  storageBucket: "cablebooking.appspot.com",
  messagingSenderId: "1034141207919",
  appId: "1:1034141207919:web:03cf375f4772257f03ac9a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
