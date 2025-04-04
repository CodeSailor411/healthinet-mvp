import BaseAgent from './BaseAgent';
import { AgentResponse, ConversationContext, Symptom } from '../types';

// Extend the ConversationContext interface with the properties we need
interface ExtendedContext extends ConversationContext {
  healthData?: HealthData;
  currentSymptoms?: Symptom[]; // Use the Symptom type from types file
}

// Define types for health data tracking
interface HealthData {
  symptoms: Array<{ description: string; severity: "mild" | "moderate" | "severe"; date: Date }>;
  consultations: Array<{ date: Date; specialist: string; notes: string }>;
  medications: any[];
  measurements: Array<{ type: string; value: number; unit: string; date: Date }>;
}

// Define types for insights
interface HealthInsights {
  frequentSymptoms: Array<{ description: string; count: number }>;
  trends: any[];
  recommendations: string[];
}

class HealthTrackerAgent extends BaseAgent {
  constructor() {
    super('HealthTrackerAgent');
  }

  async process(input: { 
    context: ConversationContext;
    trackingData?: any;
  }): Promise<AgentResponse> {
    const { context, trackingData } = input;
    
    this.logAgentAction('Tracking health data', { trackingData });
    
    try {
      // Cast the context to our extended type
      const extendedContext = context as ExtendedContext;
      
      // Enregistrer les données de suivi de santé
      const updatedTrackingData = this.updateHealthData(extendedContext, trackingData);
      
      // Générer des insights basés sur les données de santé
      const insights = this.generateInsights(updatedTrackingData);
      
      // Préparer un message pour l'utilisateur
      const responseMessage = this.prepareResponseMessage(insights);
      
      return this.formatResponse(
        responseMessage,
        {
          healthData: updatedTrackingData,
          insights
        },
        undefined,
        'ContextualMemoryAgent' // Mettre à jour le contexte avec les données de suivi
      );
    } catch (error) {
      return this.formatResponse(
        'Erreur lors du suivi des données de santé',
        undefined,
        error instanceof Error ? error.message : 'Erreur inconnue'
      );
    }
  }
  
  private updateHealthData(context: ExtendedContext, newData?: any): HealthData {
    // Récupérer les données de santé existantes ou initialiser
    const existingData: HealthData = context.healthData || {
      symptoms: [],
      consultations: [],
      medications: [],
      measurements: []
    };
    
    // Mettre à jour avec les nouvelles données si fournies
    if (newData) {
      if (newData.symptoms) {
        existingData.symptoms = [...existingData.symptoms, ...newData.symptoms];
      }
      
      if (newData.consultation) {
        existingData.consultations.push({
          date: new Date(),
          specialist: newData.consultation.specialist,
          notes: newData.consultation.notes
        });
      }
      
      if (newData.medication) {
        existingData.medications.push(newData.medication);
      }
      
      if (newData.measurement) {
        existingData.measurements.push({
          type: newData.measurement.type,
          value: newData.measurement.value,
          unit: newData.measurement.unit,
          date: new Date()
        });
      }
    }
    
    // Si des symptômes ont été détectés dans la conversation actuelle, les ajouter
    if (context.currentSymptoms && context.currentSymptoms.length > 0) {
      const newSymptoms = context.currentSymptoms.map(symptom => ({
        description: symptom.description,
        severity: symptom.severity || "moderate", // Default to moderate if not specified
        date: new Date()
      }));
      
      existingData.symptoms = [...existingData.symptoms, ...newSymptoms];
    }
    
    return existingData;
  }
  
  private generateInsights(healthData: HealthData): HealthInsights {
    // Logique simplifiée pour générer des insights basés sur les données de santé
    const insights: HealthInsights = {
      frequentSymptoms: [],
      trends: [],
      recommendations: []
    };
    
    // Identifier les symptômes fréquents
    if (healthData.symptoms && healthData.symptoms.length > 0) {
      const symptomCounts: Record<string, number> = {};
      
      healthData.symptoms.forEach((symptom) => {
        const description = symptom.description.toLowerCase();
        symptomCounts[description] = (symptomCounts[description] || 0) + 1;
      });
      
      // Trouver les symptômes les plus fréquents
      const frequentSymptoms = Object.entries(symptomCounts)
        .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
        .slice(0, 3)
        .map(([description, count]) => ({ description, count }));
      
      insights.frequentSymptoms = frequentSymptoms;
    }
    
    // Générer des recommandations basées sur les symptômes fréquents
    if (insights.frequentSymptoms.length > 0) {
      const topSymptom = insights.frequentSymptoms[0];
      
      if (topSymptom.description.includes('tête')) {
        insights.recommendations.push('Pensez à surveiller votre consommation d\'eau et votre exposition aux écrans');
      } else if (topSymptom.description.includes('fatigue')) {
        insights.recommendations.push('Assurez-vous de dormir suffisamment et de maintenir une activité physique régulière');
      }
    }
    
    // Ajouter une recommandation générale
    insights.recommendations.push('Continuez à suivre vos symptômes pour obtenir des insights plus précis');
    
    return insights;
  }
  
  private prepareResponseMessage(insights: HealthInsights): string {
    let message = 'Suivi de santé mis à jour. ';
    
    if (insights.frequentSymptoms && insights.frequentSymptoms.length > 0) {
      message += `Vos symptômes les plus fréquents sont : ${insights.frequentSymptoms.map(s => s.description).join(', ')}. `;
    }
    
    if (insights.recommendations && insights.recommendations.length > 0) {
      message += `Recommandations : ${insights.recommendations.join(' ')}`;
    }
    
    return message;
  }
}

export default HealthTrackerAgent;