import AIService from '../services/AIService';
import BaseAgent from './BaseAgent';
import { AgentResponse, ConversationContext } from '../types';

class SpecialistRecommendationAgent extends BaseAgent {
  constructor() {
    super('SpecialistRecommendationAgent');
  }

  async process(input: { 
    analysisResult?: any;
    updatedContext: ConversationContext 
  }): Promise<AgentResponse> {
    const { analysisResult, updatedContext } = input;
    
    this.logAgentAction('Recommending specialist', { analysisResult });
    
    try {
      // Récupérer les conditions suggérées
      const conditions = analysisResult?.conditions || updatedContext.suggestedConditions || [];
      
      if (conditions.length === 0) {
        return this.formatResponse(
          'Je n\'ai pas assez d\'informations pour recommander un spécialiste. Veuillez fournir plus de détails sur vos symptômes.',
          undefined,
          'Aucune condition identifiée',
          'ContextualMemoryAgent' // Passer à l'agent de mémoire contextuelle
        );
      }
      
      // Extraire les informations de l'utilisateur du contexte
      const userInfo = updatedContext.userInfo || {};
      
      // Recommander un spécialiste avec le service d'IA
      const recommendationResult = await AIService.recommendSpecialist(conditions, userInfo);
      
      // Vérifier si un spécialiste a été recommandé
      if (!recommendationResult.specialist) {
        return this.formatResponse(
          'Je n\'ai pas pu déterminer quel spécialiste vous devriez consulter. Je vous recommande de consulter un médecin généraliste qui pourra vous orienter.',
          {
            specialist: {
              type: 'general',
              title: 'Médecin généraliste',
              description: 'Un médecin généraliste est un professionnel de santé qui prend en charge le suivi médical global des patients et les oriente vers des spécialistes si nécessaire.'
            }
          },
          'Aucun spécialiste recommandé',
          'EmergencyAgent' // Passer à l'agent d'urgence
        );
      }
      
      // Préparer la réponse pour l'utilisateur
      const responseMessage = this.generateResponseMessage(recommendationResult);
      
      // Mettre à jour le contexte avec le spécialiste recommandé
      const updatedContextWithSpecialist = {
        ...updatedContext,
        recommendedSpecialist: recommendationResult.specialist
      };
      
      return this.formatResponse(
        responseMessage,
        {
          recommendationResult,
          updatedContext: updatedContextWithSpecialist
        },
        undefined,
        'EmergencyAgent' // Passer à l'agent d'urgence
      );
    } catch (error) {
      return this.formatResponse(
        'Désolé, j\'ai rencontré un problème lors de la recommandation d\'un spécialiste. Veuillez réessayer.',
        undefined,
        error instanceof Error ? error.message : 'Erreur inconnue'
      );
    }
  }
  
  private generateResponseMessage(recommendationResult: any): string {
    const { specialist, reasoning } = recommendationResult;
    
    // Construire le message de réponse
    return `
Je vous recommande de consulter un **${specialist.title}**.

${specialist.description}

${reasoning}

Vous pouvez trouver des ${specialist.title}s à proximité de votre position en utilisant notre fonctionnalité de géolocalisation.
    `.trim();
  }
}

export default SpecialistRecommendationAgent;
