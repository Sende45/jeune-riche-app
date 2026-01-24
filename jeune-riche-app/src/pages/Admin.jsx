import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, orderBy, query, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { Package, ShoppingCart, Plus, Trash2, CheckCircle, ExternalLink, RefreshCw, X } from 'lucide-react';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('orders'); // 'orders' ou 'products'
  const [loading, setLoading] = useState(false);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Chaussures',
    image: '',
    description: '',
    type: 'physique'
  });

  const adminEmail = "yohannesende@gmail.com"; 
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.email === adminEmail) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapOrders = await getDocs(qOrders);
      setOrders(snapOrders.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const snapProds = await getDocs(collection(db, "products"));
      setProducts(snapProds.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Erreur fetch:", error);
    }
    setLoading(false);
  };

  const markAsDelivered = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Livré" });
      fetchData();
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price),
        createdAt: new Date()
      });
      setShowAddForm(false);
      setNewProduct({ name: '', price: '', category: 'Chaussures', image: '', description: '', type: 'physique' });
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'ajout");
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    if(window.confirm("Supprimer cet article du stock ?")) {
      await deleteDoc(doc(db, "products", id));
      fetchData();
    }
  };

  if (!user || user.email !== adminEmail) {
    return (
      <div className="pt-40 text-center font-black uppercase tracking-tighter">
        <h2 className="text-red-500 text-3xl">Accès Interdit</h2>
        <p className="text-slate-400 text-xs mt-2">Seul l'administrateur GOATSTORE peut voir cette page.</p>
      </div>
    );
  }

  // Calcul du Chiffre d'Affaires total (Commandes livrées)
  const totalRevenue = orders
    .filter(o => o.status === 'Livré')
    .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
      {/* HEADER ADMIN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Panel <span className="text-orange-600">G.S</span></h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Logistique & Business</p>
            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-black">
              CA: {totalRevenue.toLocaleString()} F
            </span>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setView('orders')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'orders' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
          >
            Commandes ({orders.length})
          </button>
          <button 
            onClick={() => setView('products')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'products' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
          >
            Stock Produits
          </button>
        </div>
      </div>

      {loading && <RefreshCw className="animate-spin mx-auto text-orange-600 mb-10" />}

      {/* VUE COMMANDES */}
      {view === 'orders' && (
        <div className="grid gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-orange-200 transition-all">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${order.status === 'Livré' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white animate-pulse'}`}>
                    {order.status || 'En attente'}
                  </span>
                  <span className="text-slate-300 font-bold text-[10px]">ID: {order.id.slice(0, 8)}</span>
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight">{order.customerName || "Client G.S"}</h3>
                
                {/* Modif : Lien WhatsApp dynamique */}
                <a 
                  href={`https://wa.me/${order.whatsapp?.replace(/\s/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 font-medium text-sm flex items-center gap-2 hover:text-green-600 transition-colors group"
                >
                  <span className="text-blue-600 font-bold underline decoration-blue-200 group-hover:decoration-green-500">{order.whatsapp}</span> 
                  <span className="text-slate-300">|</span> 
                  <span className="uppercase font-black text-[11px] tracking-tighter">{order.address || order.selectedCommune}</span>
                </a>

                <div className="mt-4 flex flex-wrap gap-2">
                  {order.items?.map((item, i) => (
                    <span key={i} className="text-[10px] bg-slate-900 text-white border border-slate-800 px-3 py-1 rounded-lg font-bold">
                      {item.name} <span className="text-orange-400 ml-1">x{item.quantity}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4 min-w-[200px]">
                <div>
                  <p className="font-black text-2xl tracking-tighter">{order.total?.toLocaleString()} FCFA</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('fr-FR') : 'Date inconnue'}
                  </p>
                </div>
                
                {order.status !== 'Livré' && (
                  <button 
                    onClick={() => markAsDelivered(order.id)}
                    className="bg-black text-white text-[10px] px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <CheckCircle size={14} /> Valider Livraison
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VUE PRODUITS */}
      {view === 'products' && (
        <>
          {showAddForm && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in duration-300">
                <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black">
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter text-orange-600 italic">Ajouter au Stock</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input required placeholder="Nom du produit" className="w-full p-4 bg-slate-100 rounded-xl font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="number" placeholder="Prix FCFA" className="w-full p-4 bg-slate-100 rounded-xl font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                    <select className="w-full p-4 bg-slate-100 rounded-xl font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all appearance-none" onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                      <option value="Chaussures">👟 Chaussures</option>
                      <option value="Digital">⚡ Digital</option>
                      <option value="Vêtements">👕 Vêtements</option>
                    </select>
                  </div>
                  <input required placeholder="URL de l'image (Firebase ou ImgBB)" className="w-full p-4 bg-slate-100 rounded-xl font-bold outline-none border-2 border-transparent focus:border-orange-500 transition-all" onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  <textarea placeholder="Description (Pointures, Couleurs...)" className="w-full p-4 bg-slate-100 rounded-xl font-bold outline-none h-24 border-2 border-transparent focus:border-orange-500 transition-all" onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                    Publier sur GOATSTORE
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => setShowAddForm(true)}
              className="group border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-10 text-slate-300 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer bg-white"
            >
              <div className="bg-slate-50 p-6 rounded-full group-hover:bg-orange-50 transition-colors">
                <Plus size={40} />
              </div>
              <span className="font-black uppercase text-[10px] mt-4 tracking-widest">Nouvel Arrivage</span>
            </div>

            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                <img src={product.image} alt="" className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500" />
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h4 className="font-black uppercase italic text-sm tracking-tighter">{product.name}</h4>
                    <p className="text-orange-600 font-black text-sm">{product.price?.toLocaleString()} FCFA</p>
                  </div>
                  <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors bg-slate-50 rounded-xl">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter">
                  {product.category}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;