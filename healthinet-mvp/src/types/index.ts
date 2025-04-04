// Types pour les agents
export interface Agent {
  process: (input: any) => Promise<any>;
  name: string;
}

// Interface pour les symptômes
export interface Symptom {
  description: string;
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  location?: string;
  triggers?: string[];
  relievers?: string[];
}

// Interface pour les conditions médicales
export interface MedicalCondition {
  name: string;
  description: string;
  symptoms: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  specialistType: string;
}

// Interface pour les spécialistes
export interface Specialist {
  type: string;
  title: string;
  description: string;
  expertise: string[];
  whenToConsult: string[];
}

// Interface pour la géolocalisation
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  address?: string;
}

// Interface pour les établissements médicaux
export interface MedicalFacility {
  name: string;
  address: string;
  specialties: string[];
  distance?: number;
  rating?: number;
  location: {
    lat: number;
    lng: number;
  };
}

// Interface pour le contexte de conversation
export interface ConversationContext {
  messages: Array<{
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>;
  userInfo?: {
    age?: string;
    gender?: string;
    pastConditions?: string[];
  };
  currentSymptoms?: Symptom[];
  suggestedConditions?: MedicalCondition[];
  recommendedSpecialist?: Specialist;
  nearbyFacilities?: MedicalFacility[];
  emergencyDetected?: boolean;
}

// Interface pour les réponses des agents
export interface AgentResponse {
  message: string;
  data?: any;
  error?: string;
  nextAgent?: string;
}

// Interface pour les paramètres de l'API IA
export interface AIServiceParams {
  message: string;
  context?: ConversationContext;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
}

// Interface pour les réponses de l'API IA
export interface AIServiceResponse {
  response: string;
  analysis?: {
    detectedSymptoms?: Symptom[];
    possibleConditions?: MedicalCondition[];
    recommendedSpecialist?: string;
    urgencyLevel?: 'low' | 'medium' | 'high' | 'emergency';
    followUpQuestions?: string[];
  };
}
