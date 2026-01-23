import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { auth } from './firebase'; // Importation de l'auth Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Composants
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Commander from './pages/Commander'; 
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

// Nouvelles Pages
import Admin from './pages/Admin';
import Auth from './pages/Auth'; 
import ContactPage from './pages/ContactPage'; 
import Profile from './pages/Profile';
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  
  // État initial pour GOATSTORE
  const initialCategory = { type: 'All', value: 'La Collection' };
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // 1. Suivre l'état de connexion de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fonction pour reset le catalogue (utilisée par le logo)
  const handleResetHome = () => {
    setActiveCategory(initialCategory);
    setSearchQuery("");
  };

  // 3. Gestion du scroll lors de l'ouverture des menus
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
        
        {/* Header avec user prop pour afficher profil ou login */}
        <Header 
          onOpenCart={() => setIsCartOpen(true)} 
          onSearch={setSearchQuery} 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          onLogoClick={handleResetHome}
          user={user}
        />

        {/* Menu latéral */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onCategorySelect={(cat) => setActiveCategory({ type: 'filter', value: cat })}
          onReset={handleResetHome}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} activeCategory={activeCategory} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/commander" element={<Commander />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-gs" element={<Admin />} />
          </Routes>
        </main>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;