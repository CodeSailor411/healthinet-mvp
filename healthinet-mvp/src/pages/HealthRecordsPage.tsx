import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import useAgentSystem from '../hooks/useAgentSystem';

const HealthRecordsPage: React.FC = () => {
  const { updateUserProfile } = useAgentSystem();
  
  // États pour les informations de l'utilisateur
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [pastConditions, setPastConditions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  
  // État pour indiquer si les informations ont été enregistrées
  const [saved, setSaved] = useState(false);
  
  // Gérer l'enregistrement du profil
  const handleSaveProfile = () => {
    // Convertir les conditions passées en tableau
    const pastConditionsArray = pastConditions
      .split(',')
      .map(condition => condition.trim())
      .filter(condition => condition !== '');
    
    // Convertir les allergies en tableau
    const allergiesArray = allergies
      .split(',')
      .map(allergy => allergy.trim())
      .filter(allergy => allergy !== '');
    
    // Convertir les médicaments en tableau
    const medicationsArray = medications
      .split(',')
      .map(medication => medication.trim())
      .filter(medication => medication !== '');
    
    // Mettre à jour le profil utilisateur
    updateUserProfile({
      age,
      gender,
      pastConditions: pastConditionsArray,
      allergies: allergiesArray,
      medications: medicationsArray
    });
    
    // Indiquer que les informations ont été enregistrées
    setSaved(true);
    
    // Réinitialiser l'indicateur après 3 secondes
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
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
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Dossier Médical
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            Les informations que vous fournissez ici nous aideront à personnaliser nos recommandations médicales. 
            Vos données sont stockées uniquement sur votre appareil et ne sont pas partagées avec des tiers.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Card title="Informations Personnelles" className="mb-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Âge
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre âge"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez votre genre</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                    <option value="prefer_not_to_say">Je préfère ne pas préciser</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card title="Antécédents Médicaux" className="mb-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="pastConditions" className="block text-sm font-medium text-gray-700 mb-1">
                    Conditions médicales préexistantes
                  </label>
                  <textarea
                    id="pastConditions"
                    value={pastConditions}
                    onChange={(e) => setPastConditions(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez vos conditions médicales préexistantes, séparées par des virgules"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Par exemple : diabète, hypertension, asthme
                  </p>
                </div>
                
                <div>
                  <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                  </label>
                  <textarea
                    id="allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez vos allergies, séparées par des virgules"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                    Médicaments actuels
                  </label>
                  <textarea
                    id="medications"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez les médicaments que vous prenez actuellement, séparés par des virgules"
                    rows={2}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <button
              onClick={handleSaveProfile}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enregistrer
            </button>
          </motion.div>
          
          {saved && (
            <motion.div
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-center text-green-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Vos informations ont été enregistrées avec succès !
            </motion.div>
          )}
          
          <motion.div 
            className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Pourquoi ces informations sont-elles importantes ?
            </h3>
            <p className="text-blue-700">
              Les informations de votre dossier médical nous permettent de personnaliser nos recommandations 
              en fonction de votre profil de santé. Par exemple, certains symptômes peuvent avoir des 
              significations différentes selon l'âge, le genre ou les antécédents médicaux.
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthRecordsPage;
