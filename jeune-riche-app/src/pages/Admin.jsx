import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
  }, []);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10">Gestion des Commandes</h1>
      <div className="grid gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{order.status}</span>
              <h3 className="text-lg font-black uppercase">{order.customerName}</h3>
              <p className="text-sm text-slate-500">{order.whatsapp} — {order.address}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-xl">{order.total?.toLocaleString()} FCFA</p>
              <p className="text-[10px] text-slate-400">{order.items?.length} article(s)</p>
              <button className="mt-2 bg-slate-900 text-white text-[10px] px-4 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-green-600 transition-colors">
                Livrer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;