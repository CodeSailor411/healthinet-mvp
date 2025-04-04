import React from 'react';
import { MedicalConditionSuggestion } from '../services/AIService';
import { MedicalCondition } from '../types';

// Composant pour les tests unitaires
const TestRunner: React.FC = () => {
  // Tests pour le service AIService
  const testAIService = () => {
    console.log('Exécution des tests pour AIService...');
    
    // Test d'analyse des symptômes
    const testSymptomAnalysis = async () => {
      try {
        const AIService = (await import('../services/AIService')).default;
        const result = await AIService.analyzeSymptoms('J\'ai des maux de tête sévères depuis 3 jours et des nausées');
        
        console.log('Test d\'analyse des symptômes:', result);
        
        // Vérifier que le résultat contient des conditions
        if (result.conditions && Array.isArray(result.conditions) && result.conditions.length > 0) {
          console.log('✅ Test d\'analyse des symptômes réussi');
          return true;
        } else {
          console.error('❌ Test d\'analyse des symptômes échoué: pas de conditions retournées');
          return false;
        }
      } catch (error) {
        console.error('❌ Test d\'analyse des symptômes échoué:', error);
        return false;
      }
    };
    
    // Test de recommandation de spécialiste
    const testSpecialistRecommendation = async () => {
      try {
        const AIService = (await import('../services/AIService')).default;
        const conditions: MedicalConditionSuggestion[] = [
          {
            name: "Migraine",
            description: "Céphalée intense et récurrente",
            probability: "élevé"
          }
        ];
        
        const result = await AIService.recommendSpecialist(conditions);
        
        console.log('Test de recommandation de spécialiste:', result);
        
        // Vérifier que le résultat contient un spécialiste
        if (result.specialist && result.specialist.type && result.specialist.title) {
          console.log('✅ Test de recommandation de spécialiste réussi');
          return true;
        } else {
          console.error('❌ Test de recommandation de spécialiste échoué: pas de spécialiste retourné');
          return false;
        }
      } catch (error) {
        console.error('❌ Test de recommandation de spécialiste échoué:', error);
        return false;
      }
    };
    
    // Test d'évaluation d'urgence
    const testUrgencyEvaluation = async () => {
      try {
        const AIService = (await import('../services/AIService')).default;
        const result = await AIService.evaluateUrgency('J\'ai des maux de tête sévères depuis 3 jours et des nausées');
        
        console.log('Test d\'évaluation d\'urgence:', result);
        
        // Vérifier que le résultat contient un niveau d'urgence
        if (result.urgencyLevel && typeof result.urgencyLevel === 'string') {
          console.log('✅ Test d\'évaluation d\'urgence réussi');
          return true;
        } else {
          console.error('❌ Test d\'évaluation d\'urgence échoué: pas de niveau d\'urgence retourné');
          return false;
        }
      } catch (error) {
        console.error('❌ Test d\'évaluation d\'urgence échoué:', error);
        return false;
      }
    };
    
    // Exécuter les tests
    return Promise.all([
      testSymptomAnalysis(),
      testSpecialistRecommendation(),
      testUrgencyEvaluation()
    ]).then(results => {
      const success: boolean = results.every(result => result);
      console.log(`Tests AIService: ${success ? 'RÉUSSIS' : 'ÉCHOUÉS'}`);
      return success;
    });
  };
  
  // Tests pour les agents
  const testAgents = () => {
    console.log('Exécution des tests pour les agents...');
    
    // Test de l'agent de diagnostic
    const testDiagnosticAgent = async () => {
      try {
        const DiagnosticAgent = (await import('../agents/DiagnosticAgent')).default;
        const agent = new DiagnosticAgent();
        
        const result = await agent.process({
          message: 'J\'ai des maux de tête sévères depuis 3 jours et des nausées',
          context: { messages: [] }
        });
        
        console.log('Test de l\'agent de diagnostic:', result);
        
        // Vérifier que le résultat contient un message et un agent suivant
        if (result.message && result.nextAgent) {
          console.log('✅ Test de l\'agent de diagnostic réussi');
          return true;
        } else {
          console.error('❌ Test de l\'agent de diagnostic échoué: réponse incomplète');
          return false;
        }
      } catch (error) {
        console.error('❌ Test de l\'agent de diagnostic échoué:', error);
        return false;
      }
    };
    
    // Test de l'agent de recommandation de spécialiste
    const testSpecialistRecommendationAgent = async () => {
      try {
        const SpecialistRecommendationAgent = (await import('../agents/SpecialistRecommendationAgent')).default;
        const agent = new SpecialistRecommendationAgent();
        
        // Create test conditions that satisfy both interfaces
        const aiCondition: MedicalConditionSuggestion = {
          name: "Migraine",
          description: "Céphalée intense et récurrente",
          probability: "élevé"
        };
        
        const medicalCondition: MedicalCondition = {
          name: "Migraine",
          description: "Céphalée intense et récurrente",
          symptoms: ["Maux de tête", "Nausées", "Sensibilité à la lumière"],
          urgencyLevel: "medium",
          specialistType: "neurologist"
        };
        
        const result = await agent.process({
          analysisResult: {
            conditions: [aiCondition]
          },
          updatedContext: { 
            messages: [],
            suggestedConditions: [medicalCondition]
          }
        });
        
        console.log('Test de l\'agent de recommandation de spécialiste:', result);
        
        // Vérifier que le résultat contient un message et un agent suivant
        if (result.message && result.nextAgent) {
          console.log('✅ Test de l\'agent de recommandation de spécialiste réussi');
          return true;
        } else {
          console.error('❌ Test de l\'agent de recommandation de spécialiste échoué: réponse incomplète');
          return false;
        }
      } catch (error) {
        console.error('❌ Test de l\'agent de recommandation de spécialiste échoué:', error);
        return false;
      }
    };
    
    // Test de l'agent d'urgence
    const testEmergencyAgent = async () => {
      try {
        const EmergencyAgent = (await import('../agents/EmergencyAgent')).default;
        const agent = new EmergencyAgent();
        
        // Create proper medical condition for emergency agent
        const medicalCondition: MedicalCondition = {
          name: "Migraine",
          description: "Céphalée intense et récurrente",
          symptoms: ["Maux de tête", "Nausées", "Sensibilité à la lumière"],
          urgencyLevel: "medium",
          specialistType: "neurologist"
        };
        
        const result = await agent.process({
          message: 'J\'ai des maux de tête sévères depuis 3 jours et des nausées',
          updatedContext: { 
            messages: [],
            suggestedConditions: [medicalCondition]
          }
        });
        
        console.log('Test de l\'agent d\'urgence:', result);
        
        // Vérifier que le résultat contient un agent suivant
        if (result.nextAgent) {
          console.log('✅ Test de l\'agent d\'urgence réussi');
          return true;
        } else {
          console.error('❌ Test de l\'agent d\'urgence échoué: pas d\'agent suivant');
          return false;
        }
      } catch (error) {
        console.error('❌ Test de l\'agent d\'urgence échoué:', error);
        return false;
      }
    };
    
    // Exécuter les tests
    return Promise.all([
      testDiagnosticAgent(),
      testSpecialistRecommendationAgent(),
      testEmergencyAgent()
    ]).then(results => {
      const success: boolean = results.every(result => result);
      console.log(`Tests agents: ${success ? 'RÉUSSIS' : 'ÉCHOUÉS'}`);
      return success;
    });
  };
  
  // Tests pour le gestionnaire d'agents
  const testAgentManager = () => {
    console.log('Exécution des tests pour le gestionnaire d\'agents...');
    
    // Test du traitement d'un message utilisateur
    const testProcessUserMessage = async () => {
      try {
        const AgentManager = (await import('../agents/AgentManager')).default;
        const manager = new AgentManager();
        
        const result = await manager.processUserMessage('J\'ai des maux de tête sévères depuis 3 jours et des nausées');
        
        console.log('Test du traitement d\'un message utilisateur:', result);
        
        // Vérifier que le résultat contient une réponse et un contexte
        if (result.response && result.context) {
          console.log('✅ Test du traitement d\'un message utilisateur réussi');
          return true;
        } else {
          console.error('❌ Test du traitement d\'un message utilisateur échoué: réponse incomplète');
          return false;
        }
      } catch (error) {
        console.error('❌ Test du traitement d\'un message utilisateur échoué:', error);
        return false;
      }
    };
    
    // Exécuter les tests
    return Promise.all([
      testProcessUserMessage()
    ]).then(results => {
      const success: boolean = results.every(result => result);
      console.log(`Tests gestionnaire d'agents: ${success ? 'RÉUSSIS' : 'ÉCHOUÉS'}`);
      return success;
    });
  };
  
  // Tests pour la géolocalisation
  const testGeolocation = () => {
    console.log('Exécution des tests pour la géolocalisation...');
    
    // Test du hook useGeolocation
    const testUseGeolocation = async () => {
      try {
        // Simuler l'API de géolocalisation du navigateur
        if (!navigator.geolocation) {
          Object.defineProperty(navigator, 'geolocation', {
            value: {
              getCurrentPosition: (success: PositionCallback) => {
                success({
                  coords: {
                    latitude: 48.8566,
                    longitude: 2.3522,
                    accuracy: 100
                  }
                } as GeolocationPosition);
              }
            }
          });
        }
        
        // Tester le hook
        const useGeolocation = (await import('../hooks/useGeolocation')).default;
        
        console.log('Test du hook useGeolocation: hook importé avec succès');
        console.log('✅ Test du hook useGeolocation réussi');
        return true;
      } catch (error) {
        console.error('❌ Test du hook useGeolocation échoué:', error);
        return false;
      }
    };
    
    // Exécuter les tests
    return Promise.all([
      testUseGeolocation()
    ]).then(results => {
      const success: boolean = results.every(result => result);
      console.log(`Tests géolocalisation: ${success ? 'RÉUSSIS' : 'ÉCHOUÉS'}`);
      return success;
    });
  };
  
  // Exécuter tous les tests
  const runAllTests = async () => {
    console.log('=== DÉBUT DES TESTS ===');
    
    const results = await Promise.all([
      testAIService(),
      testAgents(),
      testAgentManager(),
      testGeolocation()
    ]);
    
    const success: boolean = results.every(result => result);
    
    console.log('=== FIN DES TESTS ===');
    console.log(`Résultat global: ${success ? 'TOUS LES TESTS RÉUSSIS' : 'CERTAINS TESTS ONT ÉCHOUÉ'}`);
    
    return success;
  };
  
  // Exécuter les tests au chargement du composant
  React.useEffect(() => {
    runAllTests();
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tests de l'application HealthiNet</h1>
      <p className="mb-4">Veuillez ouvrir la console du navigateur pour voir les résultats des tests.</p>
      <div className="p-4 bg-gray-100 rounded-md">
        <pre>Exécution des tests en cours...</pre>
      </div>
    </div>
  );
};

export default TestRunner;