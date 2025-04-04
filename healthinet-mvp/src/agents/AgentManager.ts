import BaseAgent from './BaseAgent';
import DiagnosticAgent from './DiagnosticAgent';
import SpecialistRecommendationAgent from './SpecialistRecommendationAgent';
import EmergencyAgent from './EmergencyAgent';
import ContextualMemoryAgent from './ContextualMemoryAgent';
import GeoLocationAgent from './GeoLocationAgent';
import HealthTrackerAgent from './HealthTrackerAgent';
import { ConversationContext } from '../types';

// Gestionnaire central qui coordonne les différents agents
class AgentManager {
  private agents: Record<string, BaseAgent>;
  private context: ConversationContext;

  constructor() {
    // Initialiser les agents
    this.agents = {
      'DiagnosticAgent': new DiagnosticAgent(),
      'SpecialistRecommendationAgent': new SpecialistRecommendationAgent(),
      'EmergencyAgent': new EmergencyAgent(),
      'ContextualMemoryAgent': new ContextualMemoryAgent(),
      'GeoLocationAgent': new GeoLocationAgent(),
      'HealthTrackerAgent': new HealthTrackerAgent()
    };

    // Initialiser le contexte de conversation
    this.context = {
      messages: []
    };
  }

  // Point d'entrée principal pour traiter un message utilisateur
  async processUserMessage(message: string): Promise<{
    response: string;
    context: ConversationContext;
  }> {
    try {
      // Ajouter le message de l'utilisateur au contexte
      this.context.messages.push({
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      });

      // Commencer par l'agent de diagnostic
      let currentAgent = 'DiagnosticAgent';
      let input = { message, context: this.context };
      let finalResponse = '';

      // Boucle de traitement des agents
      while (currentAgent) {
        console.log(`Exécution de l'agent: ${currentAgent}`);
        
        const agent = this.agents[currentAgent];
        if (!agent) {
          throw new Error(`Agent non trouvé: ${currentAgent}`);
        }

        // Exécuter l'agent actuel
        const result = await agent.process(input);
        
        // Mettre à jour le contexte via l'agent de mémoire contextuelle
        if (currentAgent !== 'ContextualMemoryAgent') {
          const memoryAgent = this.agents['ContextualMemoryAgent'];
          const memoryResult = await memoryAgent.process({
            newData: result.data,
            context: this.context
          });
          
          this.context = memoryResult.data.updatedContext;
        }

        // Si c'est un message destiné à l'utilisateur, le conserver
        if (result.message && !result.message.startsWith('Contexte de conversation mis à jour')) {
          finalResponse = result.message;
        }

        // Passer à l'agent suivant ou terminer
        currentAgent = result.nextAgent || '';
        input = { ...result.data, context: this.context };
      }

      // Ajouter la réponse finale au contexte
      this.context.messages.push({
        id: (Date.now() + 1).toString(),
        text: finalResponse,
        sender: 'bot',
        timestamp: new Date()
      });

      return {
        response: finalResponse,
        context: this.context
      };
    } catch (error) {
      console.error('Erreur dans le gestionnaire d\'agents:', error);
      
      const errorMessage = 'Désolé, j\'ai rencontré un problème lors de l\'analyse de votre message. Veuillez réessayer.';
      
      // Ajouter le message d'erreur au contexte
      this.context.messages.push({
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      });

      return {
        response: errorMessage,
        context: this.context
      };
    }
  }

  // Méthode pour obtenir le contexte actuel
  getContext(): ConversationContext {
    return this.context;
  }

  // Méthode pour mettre à jour le profil utilisateur
  updateUserProfile(userInfo: any): void {
    this.context.userInfo = {
      ...this.context.userInfo,
      ...userInfo
    };
  }

  // Méthode pour rechercher des établissements à proximité
  async findNearbyFacilities(specialistType: string): Promise<any> {
    const geoAgent = this.agents['GeoLocationAgent'];
    
    if (!this.context.recommendedSpecialist) {
      return {
        error: 'Aucun spécialiste recommandé'
      };
    }
    
    const result = await geoAgent.process({
      specialist: this.context.recommendedSpecialist,
      context: this.context
    });
    
    // Mettre à jour le contexte
    const memoryAgent = this.agents['ContextualMemoryAgent'];
    const memoryResult = await memoryAgent.process({
      newData: result.data,
      context: this.context
    });
    
    this.context = memoryResult.data.updatedContext;
    
    return {
      message: result.message,
      facilities: result.data.nearbyFacilities
    };
  }
}

export default AgentManager;
