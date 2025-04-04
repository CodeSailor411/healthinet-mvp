// Service pour l'intégration de l'API Gemini ou GPT
import axios from 'axios';

// Type pour la requête du chatbot
interface ChatRequest {
  message: string;
  userInfo?: {
    age?: string;
    gender?: string;
    pastConditions?: string;
  };
}

// Type pour la réponse du chatbot
interface ChatResponse {
  response: string;
  possibleConditions?: string[];
  recommendedSpecialist?: string;
  specialistType?: string;
}

// Classe pour gérer les appels à l'API
class ChatbotService {
  private apiUrl: string;
  
  constructor() {
    // URL de l'API backend
    this.apiUrl = 'http://localhost:5000/api';
  }
  
  // Méthode pour envoyer un message au chatbot
  async sendMessage(message: string, userInfo?: any): Promise<ChatResponse> {
    try {
      // Récupérer les informations de santé du localStorage si disponibles
      let healthRecord = null;
      const savedRecord = localStorage.getItem('healthRecord');
      if (savedRecord) {
        healthRecord = JSON.parse(savedRecord);
      }
      
      // Préparer la requête
      const request: ChatRequest = {
        message,
        userInfo: userInfo || healthRecord
      };
      
      // Appeler l'API backend
      const response = await axios.post(`${this.apiUrl}/chat`, request);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message au chatbot:', error);
      
      // Retourner une réponse par défaut en cas d'erreur
      return {
        response: "Désolé, j'ai rencontré un problème lors de l'analyse de votre message. Veuillez réessayer.",
      };
    }
  }
}

export default new ChatbotService();
