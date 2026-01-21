const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4 italic">JEUNE RICHE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            La marque qui définit l'élégance urbaine à Abidjan. Portez le succès.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Livraison</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Cocody & Marcory : 2.000 FCFA</li>
            <li>Yopougon & Abobo : 3.000 FCFA</li>
            <li>Intérieur : Expédition Express</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Contact</h4>
          <p className="text-gray-400 text-sm">WhatsApp : +225 07 67 79 31 20</p>
          <p className="text-gray-400 text-sm">Boutique : Cocody </p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        © 2026 JEUNE RICHE - Made in Côte d'Ivoire.
      </div>
    </footer>
  );
};

export default Footer;