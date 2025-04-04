// Agent de base qui définit l'interface commune pour tous les agents
import { Agent, AgentResponse, ConversationContext } from '../types';

abstract class BaseAgent implements Agent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract process(input: any): Promise<AgentResponse>;

  protected formatResponse(
    message: string,
    data?: any,
    error?: string,
    nextAgent?: string
  ): AgentResponse {
    return {
      message,
      data,
      error,
      nextAgent
    };
  }

  protected logAgentAction(action: string, details?: any): void {
    console.log(`[Agent: ${this.name}] ${action}`, details || '');
  }
}

export default BaseAgent;
