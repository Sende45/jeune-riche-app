import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle, ShoppingBag } from 'lucide-react';

const Commander = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customerName: e.target[0].value,
      whatsapp: e.target[1].value,
      address: e.target[2].value,
      items: cart,
      total: cartTotal,
      status: "Nouveau",
      createdAt: serverTimestamp() // Très important pour le tri admin
    };

    try {
      await addDoc(collection(db, "orders"), orderData); // Envoi à Firebase
      setSubmitted(true);
      clearCart(); // Vide le panier après l'achat
    } catch (err) {
      console.error("Erreur Firebase:", err);
      alert("Problème de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="pt-40 text-center uppercase font-black">
      <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
      <h2>Commande enregistrée !</h2>
      <p className="text-[10px] tracking-widest mt-2">Vérifie ton Admin maintenant.</p>
    </div>
  );

  return (
    <div className="pt-32 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-black mb-8 uppercase italic">Finaliser ma commande</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nom complet" className="w-full p-4 bg-slate-100 rounded-2xl outline-none" required />
        <input type="tel" placeholder="Numéro WhatsApp" className="w-full p-4 bg-slate-100 rounded-2xl outline-none" required />
        <textarea placeholder="Lieu de livraison à Abidjan" className="w-full p-4 bg-slate-100 rounded-2xl outline-none h-32" required></textarea>
        <button disabled={loading} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest">
          {loading ? "Envoi en cours..." : "Confirmer l'achat"}
        </button>
      </form>
    </div>
  );
};

export default Commander;