import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// Ajout de Eye et EyeOff pour l'icône de visibilité
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", res.user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date()
        });
      }
      window.location.href = "/";
    } catch (err) {
      setError("Erreur : Vérifiez vos identifiants");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            {isLogin ? 'Bon retour chez G.S' : 'Rejoindre le Club'}
          </h2>
          <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-bold">
            {isLogin ? 'Accédez à votre espace GOAT' : 'Créez votre compte premium'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Nom complet" required
                className="w-full bg-slate-50 border-none px-12 py-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" placeholder="Email" required
              className="w-full bg-slate-50 border-none px-12 py-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Champ Mot de passe modifié */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type={showPassword ? "text" : "password"} // Type dynamique
              placeholder="Mot de passe" 
              required
              className="w-full bg-slate-50 border-none px-12 py-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {/* Bouton pour afficher/masquer */}
            <button
              type="button" // Important pour ne pas soumettre le formulaire
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
            {isLogin ? 'Se connecter' : "S'inscrire"} <ArrowRight size={18} />
          </button>
        </form>

        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setShowPassword(false); // Reset la visibilité quand on change de mode
          }}
          className="w-full mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors"
        >
          {isLogin ? "Nouveau ici ? Créer un compte" : "Déjà membre ? Se connecter"}
        </button>
      </div>
    </div>
  );
};

export default Auth;