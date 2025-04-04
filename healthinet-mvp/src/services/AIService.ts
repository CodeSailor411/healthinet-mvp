import axios from 'axios';
import { MedicalCondition } from '../types';

// Define interfaces for the service
interface UserInfo {
  age?: string;
  gender?: string;
  pastConditions?: string[];
  allergies?: string[];
  medications?: string[];
}

interface MedicalConditionSuggestion {
  name: string;
  description: string;
  probability: string; // "faible", "modéré", "élevé"
}

interface SpecialistRecommendation {
  specialist: {
    type: string;
    title: string;
    description: string;
  };
  reasoning: string;
}

interface UrgencyEvaluation {
  urgencyLevel: "low" | "medium" | "high" | "emergency";
  reasoning: string;
  recommendations: string;
}

interface AIApiResponse {
  text?: string;
  [key: string]: any;
}

// Configuration pour l'API d'IA
const API_CONFIG = {
  // Utilisation de variables d'environnement pour les clés API
  apiKey: process.env.REACT_APP_AI_API_KEY || 'YOUR_API_KEY',
  // Point de terminaison de l'API (Gemini ou GPT)
  endpoint: process.env.REACT_APP_AI_ENDPOINT || 'https://api.example.com/v1',
  // Modèle à utiliser
  model: process.env.REACT_APP_AI_MODEL || 'gemini-pro',
  // Température pour la génération (0.0 à 1.0)
  temperature: 0.3,
  // Nombre maximum de tokens à générer
  maxTokens: 1024
};

// Service pour l'intégration avec les API d'IA
class AIService {
  // Analyser les symptômes et obtenir des suggestions
  static async analyzeSymptoms(symptoms: string, userInfo: UserInfo = {}): Promise<any> {
    try {
      // Construction du prompt pour l'analyse des symptômes
      const prompt = this.buildSymptomAnalysisPrompt(symptoms, userInfo);
      
      // Appel à l'API d'IA
      const response = await this.callAIAPI(prompt);
      
      // Traiter la réponse
      return this.parseSymptomAnalysisResponse(response);
    } catch (error) {
      console.error('Erreur lors de l\'analyse des symptômes:', error);
      throw new Error('Impossible d\'analyser les symptômes. Veuillez réessayer.');
    }
  }
  
  // Recommander un spécialiste en fonction des conditions suggérées
  static async recommendSpecialist(conditions: MedicalConditionSuggestion[], userInfo: UserInfo = {}): Promise<SpecialistRecommendation> {
    try {
      // Construction du prompt pour la recommandation de spécialiste
      const prompt = this.buildSpecialistRecommendationPrompt(conditions, userInfo);
      
      // Appel à l'API d'IA
      const response = await this.callAIAPI(prompt);
      
      // Traiter la réponse
      return this.parseSpecialistRecommendationResponse(response);
    } catch (error) {
      console.error('Erreur lors de la recommandation de spécialiste:', error);
      throw new Error('Impossible de recommander un spécialiste. Veuillez réessayer.');
    }
  }
  
  // Évaluer l'urgence des symptômes
  static async evaluateUrgency(symptoms: string, conditions: MedicalConditionSuggestion[] = []): Promise<UrgencyEvaluation> {
    try {
      // Construction du prompt pour l'évaluation de l'urgence
      const prompt = this.buildUrgencyEvaluationPrompt(symptoms, conditions);
      
      // Appel à l'API d'IA
      const response = await this.callAIAPI(prompt);
      
      // Traiter la réponse
      return this.parseUrgencyEvaluationResponse(response);
    } catch (error) {
      console.error('Erreur lors de l\'évaluation de l\'urgence:', error);
      throw new Error('Impossible d\'évaluer l\'urgence. Veuillez réessayer.');
    }
  }
  
  // Construire le prompt pour l'analyse des symptômes
  static buildSymptomAnalysisPrompt(symptoms: string, userInfo: UserInfo): string {
    // Informations de l'utilisateur
    const age = userInfo.age || 'non spécifié';
    const gender = userInfo.gender || 'non spécifié';
    const pastConditions = userInfo.pastConditions?.join(', ') || 'aucune';
    const allergies = userInfo.allergies?.join(', ') || 'aucune';
    const medications = userInfo.medications?.join(', ') || 'aucun';
    
    return `
      Tu es un assistant médical IA qui aide à analyser les symptômes et à suggérer des conditions médicales possibles.
      
      Informations du patient :
      - Âge : ${age}
      - Genre : ${gender}
      - Conditions préexistantes : ${pastConditions}
      - Allergies : ${allergies}
      - Médicaments actuels : ${medications}
      
      Symptômes décrits par le patient :
      "${symptoms}"
      
      Basé sur ces symptômes et informations, suggère 2 à 4 conditions médicales possibles. Pour chaque condition, indique :
      1. Le nom de la condition
      2. Une brève description
      3. Un niveau de probabilité (faible, modéré, élevé)
      
      Format de réponse :
      {
        "conditions": [
          {
            "name": "Nom de la condition",
            "description": "Brève description",
            "probability": "faible|modéré|élevé"
          }
        ]
      }
      
      IMPORTANT : Inclure uniquement la réponse JSON, sans texte supplémentaire. Ajouter un disclaimer indiquant que ces suggestions ne constituent pas un diagnostic médical.
    `;
  }
  
  // Construire le prompt pour la recommandation de spécialiste
  static buildSpecialistRecommendationPrompt(conditions: MedicalConditionSuggestion[], userInfo: UserInfo): string {
    // Convertir les conditions en texte
    const conditionsText = conditions.map((c: MedicalConditionSuggestion) => `${c.name} (probabilité: ${c.probability})`).join(', ');
    
    return `
      Tu es un assistant médical IA qui aide à recommander des spécialistes médicaux appropriés.
      
      Conditions médicales possibles :
      ${conditionsText}
      
      Basé sur ces conditions possibles, recommande le type de spécialiste médical que le patient devrait consulter.
      
      Format de réponse :
      {
        "specialist": {
          "type": "type_de_spécialiste",
          "title": "Titre du spécialiste",
          "description": "Brève description du rôle de ce spécialiste"
        },
        "reasoning": "Explication du raisonnement derrière cette recommandation"
      }
      
      Types de spécialistes possibles : general, cardiologist, neurologist, dermatologist, gastroenterologist, ophthalmologist, etc.
      
      IMPORTANT : Inclure uniquement la réponse JSON, sans texte supplémentaire.
    `;
  }
  
  // Construire le prompt pour l'évaluation de l'urgence
  static buildUrgencyEvaluationPrompt(symptoms: string, conditions: MedicalConditionSuggestion[]): string {
    // Convertir les conditions en texte
    const conditionsText = conditions.map((c: MedicalConditionSuggestion) => c.name).join(', ');
    
    return `
      Tu es un assistant médical IA qui aide à évaluer le niveau d'urgence des symptômes.
      
      Symptômes décrits par le patient :
      "${symptoms}"
      
      Conditions médicales possibles :
      ${conditionsText}
      
      Évalue le niveau d'urgence de ces symptômes et conditions sur une échelle de 4 niveaux :
      - "low" : Non urgent, peut attendre une consultation régulière
      - "medium" : Semi-urgent, devrait consulter dans les prochains jours
      - "high" : Urgent, devrait consulter rapidement (24-48h)
      - "emergency" : Très urgent, nécessite une attention médicale immédiate
      
      Format de réponse :
      {
        "urgencyLevel": "low|medium|high|emergency",
        "reasoning": "Explication du niveau d'urgence",
        "recommendations": "Recommandations immédiates pour le patient"
      }
      
      IMPORTANT : Inclure uniquement la réponse JSON, sans texte supplémentaire.
    `;
  }
  
  // Appel à l'API d'IA (Gemini ou GPT)
  static async callAIAPI(prompt: string): Promise<AIApiResponse> {
    // Déterminer quelle API utiliser en fonction de la configuration
    if (API_CONFIG.model.includes('gemini')) {
      return this.callGeminiAPI(prompt);
    } else {
      return this.callGPTAPI(prompt);
    }
  }
  
  // Appel à l'API Gemini
  static async callGeminiAPI(prompt: string): Promise<AIApiResponse> {
    try {
      // Dans une implémentation réelle, nous ferions un appel à l'API Gemini
      // Pour cette démonstration, nous simulons une réponse
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler une réponse basée sur le prompt
      if (prompt.includes('analyser les symptômes') || prompt.includes('symptômes décrits')) {
        return this.mockSymptomAnalysisResponse();
      } else if (prompt.includes('recommander des spécialistes')) {
        return this.mockSpecialistRecommendationResponse();
      } else if (prompt.includes('évaluer le niveau d\'urgence')) {
        return this.mockUrgencyEvaluationResponse();
      }
      
      // Réponse par défaut
      return { text: '{"error": "Prompt non reconnu"}' };
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Gemini:', error);
      throw error;
    }
  }
  
  // Appel à l'API GPT
  static async callGPTAPI(prompt: string): Promise<AIApiResponse> {
    try {
      // Dans une implémentation réelle, nous ferions un appel à l'API OpenAI
      // Pour cette démonstration, nous simulons une réponse
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler une réponse basée sur le prompt
      if (prompt.includes('analyser les symptômes') || prompt.includes('symptômes décrits')) {
        return this.mockSymptomAnalysisResponse();
      } else if (prompt.includes('recommander des spécialistes')) {
        return this.mockSpecialistRecommendationResponse();
      } else if (prompt.includes('évaluer le niveau d\'urgence')) {
        return this.mockUrgencyEvaluationResponse();
      }
      
      // Réponse par défaut
      return { text: '{"error": "Prompt non reconnu"}' };
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API GPT:', error);
      throw error;
    }
  }
  
  // Mock pour l'analyse des symptômes
  static mockSymptomAnalysisResponse(): AIApiResponse {
    return {
      text: JSON.stringify({
        conditions: [
          {
            name: "Migraine",
            description: "Céphalée intense et récurrente, souvent accompagnée de nausées et de sensibilité à la lumière",
            probability: "élevé"
          },
          {
            name: "Sinusite",
            description: "Inflammation des sinus paranasaux, souvent causée par une infection",
            probability: "modéré"
          },
          {
            name: "Hypertension artérielle",
            description: "Pression artérielle anormalement élevée dans les vaisseaux sanguins",
            probability: "faible"
          }
        ]
      })
    };
  }
  
  // Mock pour la recommandation de spécialiste
  static mockSpecialistRecommendationResponse(): AIApiResponse {
    return {
      text: JSON.stringify({
        specialist: {
          type: "neurologist",
          title: "Neurologue",
          description: "Un neurologue est un médecin spécialisé dans le diagnostic et le traitement des maladies du système nerveux."
        },
        reasoning: "Compte tenu des symptômes de maux de tête sévères et récurrents, une consultation avec un neurologue est recommandée pour évaluer la possibilité de migraines ou d'autres troubles neurologiques."
      })
    };
  }
  
  // Mock pour l'évaluation d'urgence
  static mockUrgencyEvaluationResponse(): AIApiResponse {
    return {
      text: JSON.stringify({
        urgencyLevel: "medium",
        reasoning: "Les maux de tête persistants avec nausées méritent une attention médicale, mais ne semblent pas présenter de signes de danger immédiat en l'absence d'autres symptômes alarmants.",
        recommendations: "Il est recommandé de consulter un médecin dans les prochains jours. En attendant, repos, hydratation et analgésiques en vente libre peuvent aider à soulager les symptômes."
      })
    };
  }
  
  // Traiter la réponse de l'analyse des symptômes
  static parseSymptomAnalysisResponse(response: AIApiResponse): any {
    try {
      // Extraire le JSON de la réponse
      const jsonResponse = typeof response === 'string' 
        ? JSON.parse(response) 
        : (response.text ? JSON.parse(response.text) : response);
      
      // Ajouter un disclaimer
      jsonResponse.disclaimer = "Ces suggestions sont basées sur les symptômes décrits et ne constituent pas un diagnostic médical. Consultez un professionnel de santé pour un avis médical.";
      
      return jsonResponse;
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error);
      throw new Error('Format de réponse invalide');
    }
  }
  
  // Traiter la réponse de la recommandation de spécialiste
  static parseSpecialistRecommendationResponse(response: AIApiResponse): SpecialistRecommendation {
    try {
      // Extraire le JSON de la réponse
      const jsonResponse = typeof response === 'string' 
        ? JSON.parse(response) 
        : (response.text ? JSON.parse(response.text) : response);
      
      return jsonResponse;
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error);
      throw new Error('Format de réponse invalide');
    }
  }
  
  // Traiter la réponse de l'évaluation de l'urgence
  static parseUrgencyEvaluationResponse(response: AIApiResponse): UrgencyEvaluation {
    try {
      // Extraire le JSON de la réponse
      const jsonResponse = typeof response === 'string' 
        ? JSON.parse(response) 
        : (response.text ? JSON.parse(response.text) : response);
      
      return jsonResponse;
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error);
      throw new Error('Format de réponse invalide');
    }
  }
}

export default AIService;
export type { MedicalConditionSuggestion };