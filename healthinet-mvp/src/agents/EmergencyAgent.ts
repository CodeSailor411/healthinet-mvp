import AIService from '../services/AIService';
import BaseAgent from './BaseAgent';
import { AgentResponse, ConversationContext } from '../types';

class EmergencyAgent extends BaseAgent {
  constructor() {
    super('EmergencyAgent');
  }

  async process(input: { 
    message?: string;
    analysisResult?: any;
    recommendationResult?: any;
    updatedContext: ConversationContext 
  }): Promise<AgentResponse> {
    const { message, analysisResult, recommendationResult, updatedContext } = input;
    
    this.logAgentAction('Evaluating urgency', { message, analysisResult });
    
    try {
      // Récupérer les symptômes et les conditions
      const symptoms = message || updatedContext.currentSymptoms?.[0]?.description || '';
      const conditions = analysisResult?.conditions || updatedContext.suggestedConditions || [];
      
      if (!symptoms) {
        return this.formatResponse(
          '',
          {
            urgencyLevel: 'low',
            updatedContext
          },
          'Aucun symptôme à évaluer',
          'ContextualMemoryAgent' // Passer à l'agent de mémoire contextuelle
        );
      }
      
      // Évaluer l'urgence avec le service d'IA
      const urgencyResult = await AIService.evaluateUrgency(symptoms, conditions);
      
      // Vérifier si un niveau d'urgence a été déterminé
      if (!urgencyResult.urgencyLevel) {
        return this.formatResponse(
          '',
          {
            urgencyLevel: 'low',
            updatedContext
          },
          'Niveau d\'urgence non déterminé',
          'ContextualMemoryAgent' // Passer à l'agent de mémoire contextuelle
        );
      }
      
      // Préparer la réponse pour l'utilisateur en fonction du niveau d'urgence
      let responseMessage = '';
      
      if (urgencyResult.urgencyLevel === 'emergency') {
        responseMessage = this.generateEmergencyMessage(urgencyResult);
      } else if (urgencyResult.urgencyLevel === 'high') {
        responseMessage = this.generateHighUrgencyMessage(urgencyResult);
      } else {
        // Pour les niveaux d'urgence moyen et faible, ne pas ajouter de message supplémentaire
        responseMessage = '';
      }
      
      // Mettre à jour le contexte avec le niveau d'urgence
      const updatedContextWithUrgency = {
        ...updatedContext,
        urgencyLevel: urgencyResult.urgencyLevel,
        urgencyRecommendations: urgencyResult.recommendations
      };
      
      return this.formatResponse(
        responseMessage,
        {
          urgencyResult,
          updatedContext: updatedContextWithUrgency
        },
        undefined,
        'ContextualMemoryAgent' // Passer à l'agent de mémoire contextuelle
      );
    } catch (error) {
      return this.formatResponse(
        '',
        {
          urgencyLevel: 'low',
          updatedContext
        },
        error instanceof Error ? error.message : 'Erreur inconnue',
        'ContextualMemoryAgent' // Passer à l'agent de mémoire contextuelle malgré l'erreur
      );
    }
  }
  
  private generateEmergencyMessage(urgencyResult: any): string {
    return `
⚠️ **ATTENTION - URGENCE MÉDICALE POSSIBLE** ⚠️

${urgencyResult.reasoning}

${urgencyResult.recommendations}

Si vous présentez ces symptômes, veuillez contacter immédiatement les services d'urgence (15, 18 ou 112) ou rendez-vous aux urgences les plus proches.
    `.trim();
  }
  
  private generateHighUrgencyMessage(urgencyResult: any): string {
    return `
⚠️ **Attention - Consultation rapide recommandée**

${urgencyResult.reasoning}

${urgencyResult.recommendations}

Il est recommandé de consulter un médecin dans les 24 à 48 heures.
    `.trim();
  }
}

export default EmergencyAgent;
