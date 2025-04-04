import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Animations
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  return (
    <motion.footer 
      className="bg-gray-800 text-white py-8"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">À propos de HealthiNet</h3>
            <p className="text-gray-300 mb-4">
              HealthiNet est une plateforme d'assistance médicale qui utilise l'intelligence artificielle 
              pour analyser vos symptômes et vous orienter vers le bon spécialiste.
            </p>
          </motion.div>
          
          {/* Liens rapides */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-300 hover:text-white transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link to="/health-records" className="text-gray-300 hover:text-white transition-colors">
                  Dossier Médical
                </Link>
              </li>
              <li>
                <Link to="/nearby-specialists" className="text-gray-300 hover:text-white transition-colors">
                  Spécialistes à proximité
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Avertissement */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Avertissement</h3>
            <p className="text-gray-300">
              HealthiNet fournit des informations à titre indicatif uniquement et ne remplace pas 
              l'avis d'un professionnel de santé. En cas d'urgence médicale, contactez immédiatement 
              les services d'urgence.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} HealthiNet. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Conditions d'utilisation
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Politique de confidentialité
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
