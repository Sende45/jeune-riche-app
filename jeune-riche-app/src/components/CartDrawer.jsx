import { X, Truck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const COMMunes = [
  { name: "Cocody (Angré, Riviera, II Plateaux)", price: 2000 },
  { name: "Marcory / Zone 4", price: 2000 },
  { name: "Plateau", price: 1500 },
  { name: "Yopougon", price: 3000 },
  { name: "Abobo", price: 3000 },
  { name: "Koumassi / Treichville", price: 2000 },
];

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, cartTotal } = useCart();
  const [deliveryFee, setDeliveryFee] = useState(0);

  if (!isOpen) return null;

  const finalTotal = cartTotal + deliveryFee;

  // Fonction pour envoyer la commande sur WhatsApp
  const sendWhatsApp = () => {
    const message = `Bonjour Jeune Riche ! Je souhaite commander :\n` + 
      cart.map(item => `- ${item.name} (x${item.quantity})`).join('\n') +
      `\n\nTotal articles : ${cartTotal} FCFA` +
      `\nLivraison : ${deliveryFee} FCFA` +
      `\nTOTAL À PAYER : ${finalTotal} FCFA`;
    
    window.open(`https://wa.me/2250000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay noir transparent */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Panneau du panier */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">MON PANIER</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-grow overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Votre panier est vide.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-4 border-b pb-2 text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-bold">{item.price * item.quantity} FCFA</span>
              </div>
            ))
          )}
        </div>

        {/* SECTION DISTRIBUTION ABIDJAN */}
        {cart.length > 0 && (
          <div className="border-t pt-4">
            <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Zone de livraison (Abidjan)</label>
            <select 
              className="w-full p-3 border rounded-lg mb-4 text-sm bg-gray-50"
              onChange={(e) => setDeliveryFee(parseInt(e.target.value))}
            >
              <option value="0">Choisir votre commune...</option>
              {COMMunes.map((c, i) => (
                <option key={i} value={c.price}>{c.name}</option>
              ))}
            </select>

            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{cartTotal} FCFA</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frais de livraison</span>
                <span>{deliveryFee} FCFA</span>
              </div>
              <div className="flex justify-between text-xl font-black border-t pt-2">
                <span>TOTAL</span>
                <span className="text-orange-600">{finalTotal} FCFA</span>
              </div>
            </div>

            <button 
              onClick={sendWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <MessageCircle size={20} />
              COMMANDER VIA WHATSAPP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;