import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import Card from '../components/Card';
import ChatbotService from '../services/ChatbotService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour, je suis votre assistant médical HealthiNet. Comment puis-je vous aider aujourd\'hui?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{
    conditions: string[];
    specialist: string;
    specialistType: string;
  } | null>(null);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAnalyzing(true);
    
    try {
      // Appeler le service chatbot
      const response = await ChatbotService.sendMessage(inputMessage);
      
      // Ajouter la réponse du bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Mettre à jour le diagnostic si disponible
      if (response.possibleConditions && response.recommendedSpecialist && response.specialistType) {
        setDiagnosis({
          conditions: response.possibleConditions,
          specialist: response.recommendedSpecialist,
          specialistType: response.specialistType
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Message d'erreur en cas d'échec
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, j'ai rencontré un problème lors de l'analyse de votre message. Veuillez réessayer.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <div className="w-full md:w-2/3 flex flex-col h-[80vh] md:h-auto">
          <div className="bg-blue-600 text-white p-4 shadow-md">
            <h1 className="text-xl font-bold">Consultation Médicale</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isAnalyzing && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-500 rounded-lg p-3 shadow-md rounded-bl-none flex items-center">
                  <div className="mr-2">Analyse en cours</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <ChatInput 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onSend={handleSendMessage}
          />
        </div>
        
        <div className="w-full md:w-1/3 p-4">
          {diagnosis ? (
            <div className="space-y-4">
              <Card title="Conditions possibles" className="mb-4">
                <ul className="list-disc pl-5 space-y-1">
                  {diagnosis.conditions.map((condition, index) => (
                    <li key={index} className="text-gray-700">{condition}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Ces suggestions sont basées sur vos symptômes et ne constituent pas un diagnostic médical.
                </p>
              </Card>
              
              <Card title="Spécialiste recommandé">
                <p className="text-gray-700 mb-4">
                  Nous vous recommandons de consulter un <strong>{diagnosis.specialist}</strong>.
                </p>
                <a 
                  href={`/specialist-info/${diagnosis.specialistType}`}
                  className="text-blue-600 hover:underline block text-center py-2 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  En savoir plus sur ce spécialiste
                </a>
              </Card>
            </div>
          ) : (
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
