import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

// Données des spécialistes
const specialistsData = {
  'general': {
    type: 'general',
    title: 'Médecin généraliste',
    description: 'Un médecin généraliste est un professionnel de santé qui prend en charge le suivi médical global des patients et les oriente vers des spécialistes si nécessaire.',
    expertise: [
      'Soins de santé primaires',
      'Prévention et dépistage',
      'Traitement des affections courantes',
      'Suivi des maladies chroniques',
      'Coordination des soins'
    ],
    whenToConsult: [
      'Symptômes généraux ou non spécifiques',
      'Maladies courantes',
      'Suivi médical régulier',
      'Besoin d\'orientation vers un spécialiste',
      'Renouvellement d\'ordonnances'
    ],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  'neurologist': {
    type: 'neurologist',
    title: 'Neurologue',
    description: 'Un neurologue est un médecin spécialisé dans le diagnostic et le traitement des troubles du système nerveux, qui comprend le cerveau, la moelle épinière et les nerfs périphériques.',
    expertise: [
      'Migraines et céphalées',
      'Épilepsie',
      'Accidents vasculaires cérébraux',
      'Maladies neurodégénératives (Parkinson, Alzheimer)',
      'Troubles du sommeil'
    ],
    whenToConsult: [
      'Maux de tête sévères ou persistants',
      'Étourdissements ou vertiges fréquents',
      'Engourdissements ou faiblesse',
      'Problèmes d\'équilibre ou de coordination',
      'Troubles de la mémoire'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
  },
  'cardiologist': {
    type: 'cardiologist',
    title: 'Cardiologue',
    description: 'Un cardiologue est un médecin spécialisé dans le diagnostic et le traitement des maladies et des affections du système cardiovasculaire, qui comprend le cœur et les vaisseaux sanguins.',
    expertise: [
      'Maladies cardiaques',
      'Hypertension artérielle',
      'Arythmies cardiaques',
      'Insuffisance cardiaque',
      'Maladies des artères coronaires'
    ],
    whenToConsult: [
      'Douleurs thoraciques',
      'Essoufflement inexpliqué',
      'Palpitations cardiaques',
      'Étourdissements fréquents',
      'Antécédents familiaux de maladies cardiaques'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  'dermatologist': {
    type: 'dermatologist',
    title: 'Dermatologue',
    description: 'Un dermatologue est un médecin spécialisé dans le diagnostic et le traitement des affections de la peau, des cheveux et des ongles.',
    expertise: [
      'Acné et rosacée',
      'Eczéma et dermatite',
      'Psoriasis',
      'Infections cutanées',
      'Dépistage du cancer de la peau'
    ],
    whenToConsult: [
      'Éruptions cutanées persistantes',
      'Changements dans l\'apparence des grains de beauté',
      'Problèmes de peau chroniques',
      'Chute de cheveux anormale',
      'Problèmes d\'ongles'
    ],
    image: 'https://images.unsplash.com/photo-1590611936760-eae5d8f3f713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
};

const SpecialistInfoPage: React.FC = () => {
  const { specialistType } = useParams<{ specialistType: string }>();
  
  // Récupérer les informations du spécialiste
  const specialist = specialistsData[specialistType as keyof typeof specialistsData] || specialistsData.general;
  
  // Animations pour les éléments de la page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      
      <main className="flex-grow bg-gray-50 p-4 md:p-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center mb-6"
            variants={itemVariants}
          >
            <Link 
              to="/chat" 
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour à la consultation
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            variants={itemVariants}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={specialist.image} 
                alt={specialist.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{specialist.title}</h1>
              <p className="text-gray-600 mb-6">{specialist.description}</p>
              
              <div className="flex justify-center">
                <Link
                  to="/chat"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Consulter maintenant
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card title="Domaines d'expertise">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {specialist.expertise.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card title="Quand consulter">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {specialist.whenToConsult.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Comment se préparer à une consultation
            </h3>
            <p className="text-blue-700 mb-4">
              Pour tirer le meilleur parti de votre consultation avec un {specialist.title}, 
              il est recommandé de :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Préparer une liste de vos symptômes et de leur évolution</li>
              <li>Apporter vos résultats d'examens précédents</li>
              <li>Noter les médicaments que vous prenez actuellement</li>
              <li>Préparer vos questions à l'avance</li>
              <li>Être prêt à discuter de vos antécédents médicaux</li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialistInfoPage;
