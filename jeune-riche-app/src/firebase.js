import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. On ajoute l'import pour Firestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuNvNcUT4oDCwTk9UsMq2eRFC6rpL7mig",
  authDomain: "jeune-riche-app.firebaseapp.com",
  projectId: "jeune-riche-app",
  storageBucket: "jeune-riche-app.firebasestorage.app",
  messagingSenderId: "40639360294",
  appId: "1:40639360294:web:fdd9542e8e09e56073a5e7",
  measurementId: "G-EX6FY1PTC1"
};

// 2. Initialisation
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3. ON EXPORTE LA VARIABLE DB (C'est ce qui manque !)
export const db = getFirestore(app);