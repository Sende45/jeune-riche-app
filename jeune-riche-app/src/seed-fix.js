import { db } from './firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const productsData = [
  // --- MODE & VÊTEMENTS ---
  {
    name: "T-shirt JR Signature Gold",
    price: 25000,
    category: "Vêtements",
    subCategory: "Homme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "Édition limitée, coton 240g, logo brodé or."
  },
  {
    name: "Chemise Lin Riviera",
    price: 35000,
    category: "Vêtements",
    subCategory: "Homme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1594932224010-74f43a071062?auto=format&fit=crop&w=800&q=80",
    description: "Coupe ajustée, idéale pour les soirées."
  },
  {
    name: "Ensemble Satin Luxe",
    price: 45000,
    category: "Vêtements",
    subCategory: "Femme",
    type: "physique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    description: "Confort et élégance, soie italienne."
  },

  // --- CHAUSSURES DE LUXE (MOCCASINS) ---
  { name: "Mocassin Versace", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80" },
  { name: "Mocassin Gucci", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1473437705/406994_BLM00_1000_001_100_0000_Light-Mens-Gucci-Jordaan-leather-loafer.jpg" },
  { name: "Mocassin Ferragamo", price: 25000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=800&q=80" },
  { name: "Berlutti Original", price: 120000, category: "Chaussures", subCategory: "Luxe", type: "physique", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80", description: "Qualité originale, cuir de maître." },

  // --- SNEAKERS & BASKETS ---
  { name: "Nike Air Force", price: 13000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png", description: "Pointures: 38-45" },
  { name: "Nike TN", price: 16000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e922b918-07e5-472e-8e81-2a6285223c34/AIR+MAX+PLUS.png", description: "Pointures: 40-45" },
  { name: "Adidas Samba", price: 15000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7cd26033486a45429ed2903e7e0e4708_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg", description: "Pointures: 38-44" },
  { name: "New Balance 9060", price: 25000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1688631313210-630230626388?auto=format&fit=crop&w=800&q=80", description: "Pointures: 38-45" },
  { name: "Asics Gel Kayano 14", price: 25000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&w=800&q=80", description: "Pointures: 40-45" },
  { name: "Off White", price: 23000, category: "Chaussures", subCategory: "Baskets", type: "physique", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", description: "Pointures: 40-45" },

  // --- IPHONES NEUFS SCELLÉS ---
  { name: "iPhone 16 Pro Max 256GB", price: 610000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1722541131105" },
  { name: "iPhone 15 Pro Max 256GB", price: 540000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708" },
  { name: "iPhone 13 128GB", price: 235000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654901323055" },
  { name: "iPhone X 64GB", price: 100000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80" },

  // --- IPHONES QUASI NEUFS ---
  { name: "iPhone 14 Pro Max 128GB (Quasi Neuf)", price: 375000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80" },
  { name: "iPhone 12 Pro Max 128GB (Quasi Neuf)", price: 245000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1611791484670-ce19b801d192?auto=format&fit=crop&w=800&q=80" },
  { name: "iPhone 11 64GB (Quasi Neuf)", price: 125000, category: "Digital", subCategory: "Téléphones", condition: "Quasi Neuf", type: "digital", image: "https://images.unsplash.com/photo-1591337676887-a217a6970c8a?auto=format&fit=crop&w=800&q=80" },

  // --- SAMSUNG & GOOGLE PIXEL ---
  { name: "Samsung Z Fold 7 256GB", price: 850000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80" },
  { name: "Google Pixel 10 Pro XL", price: 710000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80" },

  // --- TECNO ---
  { name: "Tecno Pop 10", price: 70000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" },
  { name: "Tecno Spark 40 Pro", price: 150000, category: "Digital", subCategory: "Téléphones", condition: "Neuf Scellé", type: "digital", image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80" },

  // --- GAMING & ORDINATEURS ---
  { name: "PlayStation 5 Neuf", price: 400000, category: "Digital", subCategory: "Gaming", type: "digital", image: "https://media.direct.playstation.com/is/image/psdirect/ps5-slim-disc-console-featured-image" },
  { name: "PlayStation 4 Neuf", price: 270000, category: "Digital", subCategory: "Gaming", type: "digital", image: "https://images.unsplash.com/photo-1507450491953-20e7f53ec16a?auto=format&fit=crop&w=800&q=80" },
  { name: "MacBook Pro M3 14\"", price: 1350000, category: "Digital", subCategory: "Ordinateurs", type: "digital", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697304094142" },

  // --- ACCESSOIRES ---
  { name: "Chargeur Original iPhone", price: 10000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80" },
  { name: "Écouteur sans fil iOS Compatible", price: 20000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985" },
  { name: "Écouteur avec fil iOS", price: 2000, category: "Digital", subCategory: "Accessoires", type: "digital", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" }
];

export const uploadAllProducts = async () => {
  const colRef = collection(db, "products");

  // Nettoyage complet
  const snapshot = await getDocs(colRef);
  for (const docItem of snapshot.docs) {
    await deleteDoc(doc(db, "products", docItem.id));
  }
  console.log("🧹 Base de données nettoyée !");

  for (const product of productsData) {
    try {
      const formattedProduct = {
        ...product,
        price: Number(product.price),
        createdAt: new Date()
      };
      
      await addDoc(colRef, formattedProduct);
      console.log(`✅ ${product.name} ajouté avec succès !`);
    } catch (e) {
      console.error("Erreur d'ajout :", e);
    }
  }
  alert("Catalogue Jeune Riche mis à jour ! Relance ton application.");
};