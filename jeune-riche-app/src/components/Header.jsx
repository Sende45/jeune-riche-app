import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = ({ onOpenCart, onSearch, onOpenSidebar }) => { 
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BOUTON CATALOGUE (Celui qui te manque) */}
        <button 
          onClick={onOpenSidebar} 
          className="flex items-center gap-2 hover:text-orange-600 transition-colors group"
        >
          <Menu className="w-6 h-6" />
          <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">Catalogue</span>
        </button>

        {/* Logo Central */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">
            JEUNE<span className="text-orange-600 underline decoration-2">RICHE</span>
          </h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-orange-600" />
          
          {/* Panier */}
          <div className="relative cursor-pointer p-2" onClick={onOpenCart}>
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;