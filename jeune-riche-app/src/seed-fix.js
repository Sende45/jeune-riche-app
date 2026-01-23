import { db } from './firebase'; 
import { collection, addDoc } from "firebase/firestore";

const productsData = [
  // --- MODE & VÊTEMENTS ---
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
    description: "Coupe ajustée, idéale pour les soirées."
  },
  {
    name: "Ensemble Satin Luxe",
    price: 45000,
    category: "Vêtements",
    subCategory: "Femme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    description: "Confort et élégance, soie italienne."
  },

  // --- CHAUSSURES DE LUXE (MOCCASINS) ---
  { name: "Mocassin Versace", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800" },
  { name: "Mocassin Gucci", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800" },
  { name: "Mocassin Ferragamo", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800" },
  { name: "Berlutti Original", price: 120000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800", description: "Qualité originale, cuir de maître." },

  // --- SNEAKERS & BASKETS ---
  { name: "Nike Air Force", price: 13000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800", description: "Pointures: 38-45" },
  { name: "Nike TN", price: 16000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", description: "Pointures: 40-45" },
  { name: "Adidas Samba", price: 15000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1721203204961-00624a73788a?w=800", description: "Pointures: 38-44" },
  { name: "New Balance 9060", price: 25000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1688631313210-630230626388?w=800", description: "Pointures: 38-45" },
  { name: "Asics Gel Kayano 14", price: 25000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?w=800", description: "Pointures: 40-45" },
  { name: "Off White", price: 23000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", description: "Pointures: 40-45" },

  // --- IPHONES NEUFS SCELLÉS ---
  { name: "iPhone 16 Pro Max 256GB", price: 610000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1727189145399-7033777d4c9d?w=800" },
  { name: "iPhone 15 Pro Max 256GB", price: 540000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800" },
  { name: "iPhone 13 128GB", price: 235000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1633113089631-6456cccaadad?w=800" },
  { name: "iPhone X 64GB", price: 100000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800" },

  // --- IPHONES QUASI NEUFS ---
  { name: "iPhone 14 Pro Max 128GB (Quasi Neuf)", price: 375000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800" },
  { name: "iPhone 12 Pro Max 128GB (Quasi Neuf)", price: 245000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1611791484670-ce19b801d192?w=800" },
  { name: "iPhone 11 64GB (Quasi Neuf)", price: 125000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1591337676887-a217a6970c8a?w=800" },

  // --- SAMSUNG & GOOGLE PIXEL ---
  { name: "Samsung Z Fold 7 256GB", price: 850000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800" },
  { name: "Google Pixel 10 Pro XL", price: 710000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800" },

  // --- TECNO ---
  { name: "Tecno Pop 10", price: 70000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" },
  { name: "Tecno Spark 40 Pro", price: 150000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800" },

  // --- GAMING & ORDINATEURS ---
  { name: "PlayStation 5 Neuf", price: 400000, category: "Digital", subCategory: "Gaming", type: "digital", image: "https://images.unsplash.com/photo-1606813907291-d86ebb9474ad?w=800" },
  { name: "PlayStation 4 Neuf", price: 270000, category: "Digital", subCategory: "Gaming", type: "digital", image: "https://images.unsplash.com/photo-1507450491953-20e7f53ec16a?w=800" },
  { name: "MacBook Pro M3 14\"", price: 1350000, category: "Digital", subCategory: "Ordinateurs", type: "digital", image: "https://images.unsplash.com/photo-1517336714460-4c50d917805d?w=800" },

  // --- ACCESSOIRES ---
  { name: "Chargeur Original iPhone", price: 10000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800" },
  { name: "Écouteur sans fil iOS Compatible", price: 20000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://images.unsplash.com/photo-1588423770503-d1d527338571?w=800" },
  { name: "Écouteur avec fil iOS", price: 2000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" }
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
  alert("Félicitations Yohanne ! Ton catalogue Jeune Riche complet est maintenant en ligne.");
};