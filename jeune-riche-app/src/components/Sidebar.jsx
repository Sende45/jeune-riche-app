import React from 'react';
import { Shirt, Smartphone, Footprints, ChevronRight, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onCategorySelect }) => {
  // Digital est maintenant en première position
  const categories = [
    {
      name: "Digital",
      icon: <Smartphone className="w-5 h-5" />,
      sub: ["Téléphones", "Ordinateurs", "Consoles", "Accessoires"]
    },
    {
      name: "Vêtements",
      icon: <Shirt className="w-5 h-5" />,
      sub: ["Homme", "Femme", "Enfant"]
    },
    {
      name: "Chaussures",
      icon: <Footprints className="w-5 h-5" />,
      sub: ["Baskets", "Luxe", "Sport"]
    }
  ];

  return (
    <>
      {/* 1. OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 2. SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-[70] w-80 bg-white shadow-2xl transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        
        {/* Header G.S */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
            G.S <span className="text-orange-600">Catalogue</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Liste des catégories (Digital en premier) */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1 mb-4">
              <div className="flex items-center gap-3 p-3 font-bold text-gray-900 bg-gray-50 rounded-lg">
                <span className="text-orange-600">{cat.icon}</span>
                <span className="flex-1 uppercase text-xs tracking-wider">{cat.name}</span>
              </div>
              
              <div className="ml-9 flex flex-col space-y-1 border-l-2 border-gray-100 pl-4 mt-2">
                {cat.sub.map(s => (
                  <button 
                    key={s}
                    onClick={() => { 
                        onCategorySelect(s); 
                        onClose(); 
                    }}
                    className="flex items-center justify-between w-full p-2 text-sm text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all group"
                  >
                    {s}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Pied du menu */}
        <div className="absolute bottom-0 w-full p-6 border-t bg-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
          GOATSTORE Premium - Abidjan
        </div>
      </div>
    </>
  );
};

export default Sidebar;