import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ShieldCheck, Truck, Download, LayoutGrid } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Erreur récupération produit:", error);
      }
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Chargement du luxe...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION IMAGE HERO (Comme ton image de référence) */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src={product.image} 
            className="w-full h-full object-cover opacity-50" 
            alt={product.name}
          />
          {/* Dégradé pour le fondu vers le bas */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>

        <div className="relative z-10 text-center px-4 mt-20">
          <button 
            onClick={() => navigate(-1)}
            className="absolute -top-24 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
          >
            <ChevronLeft size={16} /> Retour au catalogue
          </button>
          
          <span className="text-orange-500 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
            {product.subCategory || "Exclusivité"}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
            {product.name}
          </h1>
          <div className="h-1 w-24 bg-orange-600 mx-auto mt-6"></div>
        </div>
      </section>

      {/* SECTION INFOS ET ACHAT */}
      <section className="max-w-6xl mx-auto px-6 pb-24 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Colonne Gauche : Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <LayoutGrid size={16} /> Détails du produit
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description || "Une pièce d'exception sélectionnée pour son style unique et sa qualité supérieure. Disponible uniquement chez Jeune Riche Store Abidjan."}
              </p>

              {product.type === 'digital' && product.specs && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{key}</span>
                      <span className="text-sm font-black text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600"><Truck size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm uppercase">Livraison Express</h5>
                  <p className="text-xs text-slate-500 mt-1">Abidjan en 24h, intérieur 48h.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600"><ShieldCheck size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm uppercase">Authenticité</h5>
                  <p className="text-xs text-slate-500 mt-1">Produit certifié 100% original.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Panier Fixe (sur desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Prix Final</span>
                  <div className="text-4xl font-black text-slate-900 mt-1">
                    {Number(product.price).toLocaleString()} <span className="text-sm font-medium">FCFA</span>
                  </div>
                </div>
                {product.type === 'digital' && (
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase">
                    <Download size={12} /> Digital
                  </div>
                )}
              </div>

              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 active:scale-95"
              >
                Ajouter au panier
              </button>

              <p className="text-center text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
                Paiement sécurisé par Mobile Money & Carte
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProductDetails;