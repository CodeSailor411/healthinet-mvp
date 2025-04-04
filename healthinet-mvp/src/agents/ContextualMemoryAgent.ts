import BaseAgent from './BaseAgent';
import { AgentResponse, ConversationContext } from '../types';

class ContextualMemoryAgent extends BaseAgent {
  constructor() {
    super('ContextualMemoryAgent');
  }

  async process(input: { 
    newData: any;
    context: ConversationContext 
  }): Promise<AgentResponse> {
    const { newData, context } = input;
    
    this.logAgentAction('Updating conversation context', { newData });
    
    try {
      // Mettre à jour le contexte de la conversation avec les nouvelles données
      const updatedContext = this.updateContext(context, newData);
      
      // Déterminer l'agent suivant en fonction du contexte
      const nextAgent = this.determineNextAgent(updatedContext);
      
      return this.formatResponse(
        'Contexte de conversation mis à jour',
        {
          updatedContext
        },
        undefined,
        nextAgent
      );
    } catch (error) {
      return this.formatResponse(
        'Erreur lors de la mise à jour du contexte',
        undefined,
        error instanceof Error ? error.message : 'Erreur inconnue'
      );
    }
  }
  
  private updateContext(context: ConversationContext, newData: any): ConversationContext {
    // Créer une copie du contexte pour éviter de modifier l'original
    const updatedContext: ConversationContext = {
      ...context,
      messages: [...(context.messages || [])],
      userInfo: { ...(context.userInfo || {}) },
      currentSymptoms: [...(context.currentSymptoms || [])],
      suggestedConditions: [...(context.suggestedConditions || [])],
    };
    
    // Mettre à jour les différentes parties du contexte en fonction des nouvelles données
    if (newData.message) {
      updatedContext.messages.push({
        id: Date.now().toString(),
        text: newData.message,
        sender: newData.sender || 'bot',
        timestamp: new Date()
      });
    }
    
    if (newData.detectedSymptoms) {
      updatedContext.currentSymptoms = newData.detectedSymptoms;
    }
    
    if (newData.possibleConditions) {
      updatedContext.suggestedConditions = newData.possibleConditions;
    }
    
    if (newData.recommendedSpecialist) {
      updatedContext.recommendedSpecialist = newData.recommendedSpecialist;
    }
    
    if (newData.nearbyFacilities) {
      updatedContext.nearbyFacilities = newData.nearbyFacilities;
    }
    
    if (newData.isEmergency) {
      updatedContext.emergencyDetected = newData.isEmergency;
    }
    
    if (newData.userInfo) {
      updatedContext.userInfo = {
        ...updatedContext.userInfo,
        ...newData.userInfo
      };
    }
    
    // Limiter la taille de l'historique des messages pour éviter une croissance excessive
    if (updatedContext.messages.length > 20) {
      updatedContext.messages = updatedContext.messages.slice(-20);
    }
    
    return updatedContext;
  }
  
  private determineNextAgent(context: ConversationContext): string {
    // Logique pour déterminer l'agent suivant en fonction du contexte actuel
    
    // Si une urgence a été détectée, revenir à l'agent d'urgence
    if (context.emergencyDetected) {
      return 'EmergencyAgent';
    }
    
    // Si un spécialiste a été recommandé, passer à l'agent de géolocalisation
    if (context.recommendedSpecialist) {
      return 'GeoLocationAgent';
    }
    
    // Si des symptômes ont été détectés mais pas de conditions suggérées,
    // revenir à l'agent de diagnostic
    if (context.currentSymptoms && context.currentSymptoms.length > 0 && 
        (!context.suggestedConditions || context.suggestedConditions.length === 0)) {
      return 'DiagnosticAgent';
    }
    
    // Par défaut, revenir à l'agent de diagnostic pour continuer l'analyse
    return 'DiagnosticAgent';
  }
}

export default ContextualMemoryAgent;
