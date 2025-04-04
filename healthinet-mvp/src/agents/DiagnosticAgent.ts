import AIService from '../services/AIService';
import BaseAgent from './BaseAgent';
import { AgentResponse, ConversationContext } from '../types';

class DiagnosticAgent extends BaseAgent {
  constructor() {
    super('DiagnosticAgent');
  }

  async process(input: { 
    message: string; 
    context: ConversationContext 
  }): Promise<AgentResponse> {
    const { message, context } = input;
    
    this.logAgentAction('Analyzing symptoms', { message });
    
    try {
      // Extraire les informations de l'utilisateur du contexte
      const userInfo = context.userInfo || {};
      
      // Analyser les symptômes avec le service d'IA
      const analysisResult = await AIService.analyzeSymptoms(message, userInfo);
      
      // Vérifier si des conditions ont été suggérées
      if (!analysisResult.conditions || analysisResult.conditions.length === 0) {
        return this.formatResponse(
          'Je n\'ai pas pu identifier de conditions médicales possibles à partir de votre description. Pourriez-vous fournir plus de détails sur vos symptômes?',
          undefined,
          'Aucune condition identifiée',
          'EmergencyAgent' // Passer à l'agent d'urgence pour vérifier s'il y a des symptômes critiques
        );
      }
      
      // Préparer la réponse pour l'utilisateur
      const responseMessage = this.generateResponseMessage(analysisResult);
      
      // Mettre à jour le contexte avec les conditions suggérées
      const updatedContext = {
        ...context,
        currentSymptoms: [{ description: message, severity: 'unknown', date: new Date() }],
        suggestedConditions: analysisResult.conditions
      };
      
      return this.formatResponse(
        responseMessage,
        {
          analysisResult,
          updatedContext
        },
        undefined,
        'SpecialistRecommendationAgent' // Passer à l'agent de recommandation de spécialistes
      );
    } catch (error) {
      return this.formatResponse(
        'Désolé, j\'ai rencontré un problème lors de l\'analyse de vos symptômes. Veuillez réessayer.',
        undefined,
        error instanceof Error ? error.message : 'Erreur inconnue'
      );
    }
  }
  
  private generateResponseMessage(analysisResult: any): string {
    const { conditions, disclaimer } = analysisResult;
    
    // Formater les conditions suggérées
    const conditionsText = conditions.map((condition: any) => 
      `- **${condition.name}**: ${condition.description} (Probabilité: ${condition.probability})`
    ).join('\n');
    
    // Construire le message de réponse
    return `
D'après votre description, voici les conditions médicales possibles :

${conditionsText}

${disclaimer}

Je vais maintenant vous recommander le type de spécialiste à consulter.
    `.trim();
  }
}

export default DiagnosticAgent;
