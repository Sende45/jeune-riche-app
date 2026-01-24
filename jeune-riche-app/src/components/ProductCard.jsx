import React from 'react';
import { ShoppingCart, Download, ArrowRight, Plus, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, category, image, type, subCategory, stock }) => {
  const { addToCart } = useCart();

  // Fonction pour gérer les liens d'images morts
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80"; // Une image de mode neutre en secours
  };

  return (
    <div className="group cursor-pointer">
      {/* Container Image avec Effet de Zoom */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-2xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <Link to={`/product/${id}`} className="block h-full w-full">
          <img 
            src={image || "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800"} 
            alt={name}
            onError={handleImageError} // Sécurité ici
            loading="lazy" // Performance ici
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${stock === 0 ? 'grayscale opacity-60' : ''}`}
          />
        </Link>
        
        {/* Badges (Catégorie & Type) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-sm text-slate-900">
            {subCategory || category}
          </span>
          {type === 'digital' && (
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg animate-pulse">
              <Download className="w-3 h-3" /> DIGITAL
            </span>
          )}
          
          {/* NOUVEAU : Badge Rupture de Stock */}
          {stock === 0 && (
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
          <button 
            disabled={stock === 0}
            onClick={(e) => {
              e.preventDefault();
              if (stock > 0) {
                addToCart({ id, name, price, image, category, type });
              }
            }}
            className={`w-full py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 ${
              stock === 0 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-white/95 backdrop-blur-md text-slate-900 hover:bg-orange-600 hover:text-white'
            }`}
          >
            {stock === 0 ? 'Indisponible' : <><Plus size={14} /> Ajouter au panier</>}
          </button>
        </div>
      </div>

      {/* Détails du Produit */}
      <div className="space-y-2 px-1 text-center">
        
        {/* NOUVEAU : Alerte Stock Bas */}
        <div className="h-4 flex items-center justify-center mb-1">
          {stock <= 5 && stock > 0 && (
            <div className="flex items-center gap-1 animate-pulse">
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              <p className="text-[9px] font-black text-red-600 uppercase">Plus que {stock} articles !</p>
            </div>
          )}
        </div>

        <Link to={`/product/${id}`}>
          <h3 className="text-slate-900 font-black uppercase text-sm tracking-tighter leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
              <span className="text-slate-400 line-through text-[10px] font-medium italic">
                {(price * 1.2).toLocaleString()} <span className="text-[8px]">FCFA</span>
              </span>
              <span className="text-slate-900 font-black text-base tracking-tighter">
                {Number(price).toLocaleString()} <span className="text-[10px] ml-0.5">FCFA</span>
              </span>
          </div>
          
          <Link 
            to={`/product/${id}`}
            className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] hover:text-orange-500 transition-colors flex items-center gap-1 mt-1"
          >
            Détails <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;