import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const productsToUpload = [
  // VÊTEMENTS
  { 
    name: "T-shirt Signature JR Noir", 
    price: 15000, 
    mainCategory: "Vêtements", 
    subCategory: "Homme", 
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
    type: "physique"
  },
  // CHAUSSURES
  { 
    name: "Sneakers Luxe Abidjan", 
    price: 45000, 
    mainCategory: "Chaussures", 
    subCategory: "Luxe", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    type: "physique"
  },
  // DIGITAL
  { 
    name: "iPhone 15 Pro Max 256GB", 
    price: 850000, 
    mainCategory: "Digital", 
    subCategory: "Téléphones", 
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500",
    type: "digital"
  },
  
];

export const seedDatabase = async () => {
  try {
    const colRef = collection(db, "products");
    for (const product of productsToUpload) {
      await addDoc(colRef, product);
      console.log(`Produit ${product.name} ajouté !`);
    }
    alert("Tous les produits ont été envoyés à Firebase !");
  } catch (e) {
    console.error("Erreur lors de l'ajout : ", e);
  }
};