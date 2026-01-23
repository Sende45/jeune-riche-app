import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, orderBy, query, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { Package, ShoppingCart, Plus, Trash2, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('orders'); // 'orders' ou 'products'
  const [loading, setLoading] = useState(false);

  // Sécurité : Remplace par ton mail
  const adminEmail = "yohannesende@gmail.com"; 
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.email === adminEmail) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch Commandes
    const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapOrders = await getDocs(qOrders);
    setOrders(snapOrders.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    // Fetch Produits (pour la gestion de stock)
    const snapProds = await getDocs(collection(db, "products"));
    setProducts(snapProds.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const markAsDelivered = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "Livré" });
    fetchData(); // Rafraîchir
  };

  if (!user || user.email !== adminEmail) {
    return (
      <div className="pt-40 text-center font-black uppercase tracking-tighter">
        <h2 className="text-red-500 text-3xl">Accès Interdit</h2>
        <p className="text-slate-400 text-xs mt-2">Seul l'administrateur GOATSTORE peut voir cette page.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
      {/* HEADER ADMIN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Panel <span className="text-orange-600">G.S</span></h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Gestion du Store & Logistique</p>
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
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${order.status === 'Livré' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600 animate-pulse'}`}>
                    {order.status}
                  </span>
                  <span className="text-slate-300 font-bold text-[10px]">ID: {order.id.slice(0, 8)}</span>
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight">{order.customerName}</h3>
                <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                  <span className="text-blue-600 font-bold underline">{order.whatsapp}</span> — {order.address}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {order.items?.map((item, i) => (
                    <span key={i} className="text-[10px] bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg font-bold">
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4 min-w-[200px]">
                <div>
                  <p className="font-black text-2xl tracking-tighter">{order.total?.toLocaleString()} FCFA</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                </div>
                
                {order.status !== 'Livré' && (
                  <button 
                    onClick={() => markAsDelivered(order.id)}
                    className="bg-black text-white text-[10px] px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <CheckCircle size={14} /> Marquer Livré
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VUE PRODUITS (Stock simple) */}
      {view === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <img src={product.image} alt="" className="w-full h-40 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform" />
              <h4 className="font-black uppercase italic">{product.name}</h4>
              <p className="text-orange-600 font-black">{product.price?.toLocaleString()} FCFA</p>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase">
                Stock: {product.category}
              </div>
            </div>
          ))}
          <div className="border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-10 text-slate-300 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer">
            <Plus size={40} />
            <span className="font-black uppercase text-[10px] mt-2 tracking-widest">Ajouter un produit</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;