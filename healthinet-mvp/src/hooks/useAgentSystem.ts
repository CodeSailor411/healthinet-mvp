import { useState, useEffect, useCallback } from 'react';
import AgentManager from '../agents/AgentManager';

// Define types for all the data structures
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
  latitude?: number;
  longitude?: number;
}

interface ConversationContext {
  messages: Message[];
  suggestedConditions?: Condition[];
  recommendedSpecialist?: Specialist;
  urgencyLevel?: string;
  nearbyFacilities?: Facility[];
}

// Hook personnalisé pour utiliser le système d'agents
const useAgentSystem = () => {
  // Initialiser le gestionnaire d'agents
  const [agentManager] = useState(() => new AgentManager());
  
  // État pour stocker les messages de la conversation
  const [messages, setMessages] = useState<Message[]>([]);
  
  // État pour stocker les informations de diagnostic
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  
  // État pour indiquer si une analyse est en cours
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // État pour stocker les établissements médicaux à proximité
  const [nearbyFacilities, setNearbyFacilities] = useState<Facility[]>([]);
  
  // Fonction pour envoyer un message à l'agent
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    // Mettre à jour l'état pour indiquer qu'une analyse est en cours
    setIsAnalyzing(true);
    
    try {
      // Traiter le message avec le gestionnaire d'agents
      const result = await agentManager.processUserMessage(message);
      
      // Mettre à jour les messages
      setMessages(result.context.messages as Message[]);
      
      // Mettre à jour le diagnostic si disponible
      if (result.context.suggestedConditions && result.context.recommendedSpecialist) {
        setDiagnosis({
          conditions: result.context.suggestedConditions as Condition[],
          specialist: result.context.recommendedSpecialist as Specialist,
          urgencyLevel: (result.context as any).urgencyLevel || 'low'
        });
      }
      
      // Mettre à jour les établissements à proximité si disponibles
      if (result.context.nearbyFacilities) {
        setNearbyFacilities(result.context.nearbyFacilities as Facility[]);
      }
    } catch (error) {
      console.error('Erreur lors du traitement du message:', error);
      
      // Ajouter un message d'erreur
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Désolé, j'ai rencontré un problème lors de l'analyse de votre message. Veuillez réessayer.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      // Mettre à jour l'état pour indiquer que l'analyse est terminée
      setIsAnalyzing(false);
    }
  }, [agentManager]);
  
  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = useCallback((userInfo: Record<string, any>) => {
    agentManager.updateUserProfile(userInfo);
  }, [agentManager]);
  
  // Fonction pour rechercher des établissements à proximité
  const findNearbyFacilities = useCallback(async (specialistType: string) => {
    try {
      // In a real implementation, we would call the GeoLocationAgent
      // For testing, we'll use mock data directly
      console.log('Finding nearby facilities for specialist type:', specialistType);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock facilities data - this would normally come from the agent
      const mockFacilities = [
        {
          name: `Centre Médical El Manzah - ${specialistType}`,
          address: '15 Avenue Habib Bourguiba, Tunis',
          distance: 1.2,
          rating: 4.5,
          latitude: 36.8165,
          longitude: 10.1915
        },
        {
          name: `Clinique La Soukra - ${specialistType}`,
          address: '45 Rue de Carthage, Tunis',
          distance: 2.3,
          rating: 4.8,
          latitude: 36.8265,
          longitude: 10.2015
        },
        {
          name: `Hôpital Charles Nicolle - ${specialistType}`,
          address: '78 Boulevard Bab Saadoun, Tunis',
          distance: 3.1,
          rating: 4.2,
          latitude: 36.7965,
          longitude: 10.1715
        },
        {
          name: `Dr. Ahmed Ben Salah - ${specialistType}`,
          address: '150 Rue de Marseille, Tunis',
          distance: 1.9,
          rating: 4.9,
          latitude: 36.8365,
          longitude: 10.1615
        }
      ];
      
      // Filter facilities by specialist type (in a real app, this would be more sophisticated)
      const filteredFacilities = specialistType ? 
        mockFacilities.filter(f => f.name.toLowerCase().includes(specialistType.toLowerCase())) : 
        mockFacilities;
      
      setNearbyFacilities(filteredFacilities);
      return { facilities: filteredFacilities };
    } catch (error) {
      console.error('Erreur lors de la recherche d\'établissements:', error);
      return { error: 'Erreur lors de la recherche d\'établissements' };
    }
  }, []);
  
  // Initialiser les messages avec un message de bienvenue
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Bonjour, je suis votre assistant médical HealthiNet. Comment puis-je vous aider aujourd\'hui?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);
  
  return {
    messages,
    isAnalyzing,
    diagnosis,
    nearbyFacilities,
    sendMessage,
    updateUserProfile,
    findNearbyFacilities
  };
};

export default useAgentSystem;