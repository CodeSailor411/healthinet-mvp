import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">HealthiNet</h3>
            <p className="text-gray-400 mt-1">Votre assistant médical intelligent</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} HealthiNet. Tous droits réservés.</p>
            <p className="text-gray-400 mt-1">
              <span className="text-xs">Ceci est un MVP et ne remplace pas l'avis d'un professionnel de santé.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
