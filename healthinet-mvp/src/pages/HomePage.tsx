import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const HomePage: React.FC = () => {
  // Animations pour les éléments de la page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Section Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <motion.div 
            className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              variants={itemVariants}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Votre assistant médical intelligent
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                HealthiNet utilise l'intelligence artificielle pour analyser vos symptômes, 
                suggérer des conditions possibles et vous orienter vers le bon spécialiste.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/chat" 
                  className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                >
                  Parler à notre Médecin IA
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              variants={itemVariants}
            >
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="HealthiNet Medical Assistant" 
                  className="rounded-lg w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Section Fonctionnalités */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Comment HealthiNet peut vous aider
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Analyse de symptômes</h3>
                    <p className="text-gray-600">
                      Décrivez vos symptômes en langage naturel et notre IA les analysera pour vous suggérer des conditions possibles.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Recommandation de spécialistes</h3>
                    <p className="text-gray-600">
                      Recevez des recommandations sur le type de spécialiste à consulter en fonction de vos symptômes.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Card>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Localisation de médecins</h3>
                    <p className="text-gray-600">
                      Trouvez des spécialistes et des établissements médicaux à proximité de votre position.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Section Appel à l'action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Prêt à consulter notre assistant médical ?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Décrivez vos symptômes et obtenez des recommandations personnalisées en quelques secondes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/chat" 
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                Commencer maintenant
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Section Avertissement */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <p className="text-gray-600 text-sm text-center">
                <strong>Avertissement :</strong> HealthiNet fournit des informations à titre indicatif uniquement et ne remplace pas l'avis d'un professionnel de santé. 
                En cas d'urgence médicale, contactez immédiatement les services d'urgence.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
