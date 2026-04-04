import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHu90nH0kTqhcnhg9mpOeE-HKbzi-J24k",
  authDomain: "cusb-backend.firebaseapp.com",
  projectId: "cusb-backend",
  storageBucket: "cusb-backend.firebasestorage.app",
  messagingSenderId: "120273485140",
  appId: "1:120273485140:web:45edbc89940f6942021cc1",
  measurementId: "G-85Z4Q74WWV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
