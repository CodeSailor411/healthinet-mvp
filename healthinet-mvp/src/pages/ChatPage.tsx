import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAgentSystem from '../hooks/useAgentSystem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import Card from '../components/Card';

// Define interfaces for type safety
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Specialist {
  type: string;
  title: string;
  description?: string;
}

interface Condition {
  name: string;
  description?: string;
  probability?: string;
}

interface Diagnosis {
  conditions: Condition[];
  specialist: Specialist;
  urgencyLevel: string;
}

interface Facility {
  name: string;
  address: string;
  distance: number;
  rating: number;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Add type annotations to the useAgentSystem hook return values
  const {
    messages,
    isAnalyzing,
    diagnosis,
    nearbyFacilities,
    sendMessage,
    findNearbyFacilities
  } = useAgentSystem() as {
    messages: Message[];
    isAnalyzing: boolean;
    diagnosis: Diagnosis | null;
    nearbyFacilities: Facility[];
    sendMessage: (message: string) => Promise<void>;
    findNearbyFacilities: (specialistType: string) => Promise<{
      facilities?: Facility[];
      error?: string;
    }>;
  };
  
  const [inputMessage, setInputMessage] = useState('');
  const [showMap, setShowMap] = useState(false);
  
  // Gérer l'envoi d'un message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Envoyer le message à l'agent
    await sendMessage(inputMessage);
    
    // Réinitialiser le champ de saisie
    setInputMessage('');
  };
  
  // Rechercher des établissements à proximité lorsqu'un diagnostic est disponible
  useEffect(() => {
    if (diagnosis && diagnosis.specialist && !nearbyFacilities.length) {
      findNearbyFacilities(diagnosis.specialist.type);
    }
  }, [diagnosis, nearbyFacilities.length, findNearbyFacilities]);
  
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
      
      <main className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <motion.div 
          className="w-full md:w-2/3 flex flex-col h-[80vh] md:h-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-blue-600 text-white p-4 shadow-md">
            <h1 className="text-xl font-bold">Consultation Médicale</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div key={message.id} variants={itemVariants}>
                <ChatMessage message={message} />
              </motion.div>
            ))}
            
            {isAnalyzing && (
              <motion.div 
                className="flex justify-start mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white text-gray-500 rounded-lg p-3 shadow-md rounded-bl-none flex items-center">
                  <div className="mr-2">Analyse en cours</div>
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <ChatInput 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onSend={handleSendMessage}
          />
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/3 p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {diagnosis ? (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card title="Conditions possibles" className="mb-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {diagnosis.conditions.map((condition: Condition, index: number) => (
                      <li key={index} className="text-gray-700">{condition.name}</li>
                    ))}
                  </ul>
                  
                  {diagnosis.urgencyLevel === 'high' || diagnosis.urgencyLevel === 'emergency' ? (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 font-semibold">
                        ⚠️ Cette condition peut nécessiter une attention médicale rapide.
                      </p>
                    </div>
                  ) : null}
                  
                  <p className="mt-4 text-sm text-gray-500">
                    Ces suggestions sont basées sur vos symptômes et ne constituent pas un diagnostic médical.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card title="Spécialiste recommandé">
                  <p className="text-gray-700 mb-4">
                    Nous vous recommandons de consulter un <strong>{diagnosis.specialist.title}</strong>.
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => navigate(`/specialist-info/${diagnosis.specialist.type}`)}
                      className="text-blue-600 hover:underline block text-center py-2 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                    >
                      En savoir plus sur ce spécialiste
                    </button>
                    
                    <button 
                      onClick={() => setShowMap(!showMap)}
                      className="text-green-600 hover:underline block text-center py-2 border border-green-600 rounded-md hover:bg-green-50 transition"
                    >
                      {showMap ? 'Masquer la carte' : 'Trouver un spécialiste près de chez moi'}
                    </button>
                  </div>
                </Card>
              </motion.div>
              
              {showMap && nearbyFacilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Établissements à proximité">
                    <div className="space-y-3">
                      {nearbyFacilities.map((facility: Facility, index: number) => (
                        <div key={index} className="p-3 bg-white border rounded-md shadow-sm">
                          <h3 className="font-semibold text-gray-800">{facility.name}</h3>
                          <p className="text-gray-600 text-sm">{facility.address}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">
                              {facility.distance} km • {facility.rating} ★
                            </span>
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Voir sur Google Maps
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card title="Comment utiliser la consultation">
                <p className="text-gray-700 mb-4">
                  Décrivez vos symptômes de manière détaillée pour obtenir les meilleures recommandations possibles.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Soyez précis sur la localisation de vos symptômes</li>
                  <li>Indiquez depuis quand vous les ressentez</li>
                  <li>Mentionnez leur intensité et fréquence</li>
                  <li>Signalez tout facteur aggravant ou soulageant</li>
                </ul>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;