import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = ({ onOpenCart, onSearch, onOpenSidebar, onLogoClick, user }) => { 
  const { cartCount } = useCart();
  // État pour savoir si on affiche la barre de recherche
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* BOUTON CATALOGUE - Masqué si recherche ouverte sur mobile */}
        {!isSearchOpen && (
          <button 
            onClick={onOpenSidebar} 
            className="flex items-center gap-2 hover:text-orange-600 transition-colors group"
          >
            <Menu className="w-6 h-6" />
            <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">Catalogue</span>
          </button>
        )}

        {/* Logo Central - Masqué si recherche ouverte sur mobile */}
        <Link 
          to="/" 
          onClick={() => {
            onLogoClick();
            setIsSearchOpen(false);
          }}
          className={`${isSearchOpen ? 'hidden md:flex' : 'flex'} absolute left-1/2 -translate-x-1/2 flex-col items-center hover:opacity-80 transition-opacity`}
        >
          <h1 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">
            GOAT<span className="text-orange-600 underline decoration-2">STORE</span>
          </h1>
        </Link>
        
        <div className={`flex items-center space-x-2 md:space-x-5 ${isSearchOpen ? 'w-full md:w-auto justify-end' : ''}`}>
          
          {/* BARRE DE RECHERCHE DYNAMIQUE */}
          {isSearchOpen ? (
            <div className="flex items-center bg-slate-100 px-4 py-2 rounded-2xl w-full md:w-64 animate-in slide-in-from-right-5 duration-300">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Rechercher..."
                className="bg-transparent border-none outline-none w-full px-3 text-xs font-bold"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button onClick={() => { setIsSearchOpen(false); onSearch(""); }}>
                <X className="w-4 h-4 text-slate-400 hover:text-orange-600" />
              </button>
            </div>
          ) : (
            <Search 
              onClick={() => setIsSearchOpen(true)}
              className="w-5 h-5 cursor-pointer hover:text-orange-600 transition-colors" 
            />
          )}

          {/* AUTHENTICATION (Ton icône dynamique) */}
          {!isSearchOpen && (
            <Link to={user ? "/profile" : "/login"} className="p-2 hover:bg-slate-50 rounded-full transition-all group">
              {user ? (
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                      <User className="w-4 h-4 text-orange-600" />
                   </div>
                </div>
              ) : (
                <User className="w-6 h-6 text-slate-700 group-hover:text-orange-600" />
              )}
            </Link>
          )}

          {/* Panier */}
          {!isSearchOpen && (
            <div className="relative cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-all group" onClick={onOpenCart}>
              <ShoppingBag className="w-6 h-6 text-slate-700 group-hover:text-orange-600" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;