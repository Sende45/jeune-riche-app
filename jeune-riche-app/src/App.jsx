import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Commander from './pages/Commander'; 
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import Admin from './pages/Admin';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [activeCategory, setActiveCategory] = useState({ type: 'All', value: 'La Collection' });

  // Empêche le défilement quand un menu est ouvert
  useEffect(() => {
    if (isCartOpen || isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen, isSidebarOpen]);

  return (
    <CartProvider>
      <div className="font-sans antialiased text-slate-900 flex flex-col min-h-screen bg-white">
        
        {/* Header unique avec fonctions de recherche et catalogue */}
        <Header 
          onOpenCart={() => setIsCartOpen(true)} 
          onSearch={setSearchQuery} 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
        />

        {/* Menu Catalogue latéral */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onCategorySelect={(cat) => setActiveCategory({ type: 'filter', value: cat })}
          onReset={() => setActiveCategory({ type: 'All', value: 'La Collection' })}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} activeCategory={activeCategory} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/commander" element={<Commander />} />
            <Route path="/admin-jr" element={<Admin />} />
          </Routes>
        </main>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {/* Footer unique */}
        <Footer />
      </div>
    </CartProvider>
  );
}

// CETTE LIGNE EST LA PLUS IMPORTANTE POUR RÉPARER TON ERREUR
export default App;