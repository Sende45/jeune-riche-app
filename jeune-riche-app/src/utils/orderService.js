import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createOrder = async (cart, total, deliveryFee, commune, user = null) => {
  try {
    const orderData = {
      customerName: user?.displayName || "Client Anonyme",
      customerEmail: user?.email || "Non renseigné",
      whatsapp: user?.phoneNumber || "À vérifier sur WA",
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subTotal: total,
      deliveryFee: deliveryFee,
      total: total + deliveryFee,
      address: commune,
      status: "En attente", // Status initial
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    return docRef.id;
  } catch (error) {
    console.error("Erreur création commande Firestore:", error);
    return null;
  }
};