import { db } from './firebase'; 
import { collection, addDoc } from "firebase/firestore";

const productsData = [
  // --- VÊTEMENTS HOMME ---
  {
    name: "T-shirt JR Signature Gold",
    price: 25000,
    category: "Vêtements",
    subCategory: "Homme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    description: "Édition limitée, coton 240g, logo brodé or."
  },
  {
    name: "Chemise Lin Riviera",
    price: 35000,
    category: "Vêtements",
    subCategory: "Homme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    description: "Coupe ajustée, idéale pour les soirées en bord de mer."
  },

  // --- VÊTEMENTS FEMME ---
  {
    name: "Ensemble Satin Luxe",
    price: 45000,
    category: "Vêtements",
    subCategory: "Femme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    description: "Confort et élégance, soie italienne."
  },

  // --- CHAUSSURES (BASKET, LUXE, SPORT) ---
  {
    name: "Sneakers JR Cloud One",
    price: 65000,
    category: "Chaussures",
    subCategory: "Baskets",
    type: "physique",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description: "Semelle amortissante, design futuriste."
  },
  {
    name: "Mocassins Cuir Croco",
    price: 120000,
    category: "Chaussures",
    subCategory: "Luxe",
    type: "physique",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
    description: "Cuir véritable fait main."
  },

  // --- DIGITAL : TÉLÉPHONES ---
  {
    name: "iPhone 15 Pro Max 256GB",
    price: 850000,
    category: "Digital",
    subCategory: "Téléphones",
    type: "digital",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800",
    specs: { "Stockage": "256GB", "Couleur": "Titane Naturel", "Garantie": "12 mois" }
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 780000,
    category: "Digital",
    subCategory: "Téléphones",
    type: "digital",
    image: "https://images.unsplash.com/photo-1707231439251-0943969f688e?w=800",
    specs: { "RAM": "12GB", "Stockage": "512GB", "S-Pen": "Inclus" }
  },
  {
    name: "Tecno Phantom V Flip",
    price: 450000,
    category: "Digital",
    subCategory: "Téléphones",
    type: "digital",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800",
    description: "Le pliable premium de chez Tecno."
  },

  // --- DIGITAL : ORDINATEURS ---
  {
    name: "MacBook Pro M3 14\"",
    price: 1350000,
    category: "Digital",
    subCategory: "Ordinateurs",
    type: "digital",
    image: "https://images.unsplash.com/photo-1517336714460-4c50d917805d?w=800",
    specs: { "Processeur": "M3", "RAM": "16GB", "SSD": "512GB" }
  },

  // --- ACCESSOIRES ---
  {
    name: "AirPods Pro 2",
    price: 165000,
    category: "Digital",
    subCategory: "Accessoires",
    type: "digital",
    image: "https://images.unsplash.com/photo-1588423770503-d1d527338571?w=800",
    description: "Réduction de bruit active, son spatial."
  }
];

export const uploadAllProducts = async () => {
  const colRef = collection(db, "products");
  for (const product of productsData) {
    try {
      await addDoc(colRef, product);
      console.log(`✅ ${product.name} ajouté !`);
    } catch (e) {
      console.error("Erreur d'ajout :", e);
    }
  }
  alert("Félicitations Yohanne ! Ton catalogue Jeune Riche est en ligne.");
};