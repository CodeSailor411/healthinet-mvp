// Contrôleur pour gérer les requêtes du chatbot
const config = require('../config/config');

// Fonction pour analyser les symptômes et suggérer des conditions possibles
const analyzeSymptoms = (message) => {
  // Cette fonction simule l'analyse des symptômes
  // Dans une version réelle, elle utiliserait l'API Gemini ou GPT
  
  const symptoms = message.toLowerCase();
  
  // Logique simple de correspondance de mots-clés pour la démonstration
  if (symptoms.includes('tête') || symptoms.includes('migraine') || symptoms.includes('céphalée')) {
    return {
      conditions: ['Migraine', 'Céphalée de tension', 'Sinusite'],
      specialist: 'Neurologue',
      specialistType: 'neurologist'
    };
  } else if (symptoms.includes('cœur') || symptoms.includes('poitrine') || symptoms.includes('essoufflement')) {
    return {
      conditions: ['Angine de poitrine', 'Hypertension', 'Arythmie cardiaque'],
      specialist: 'Cardiologue',
      specialistType: 'cardiologist'
    };
  } else if (symptoms.includes('peau') || symptoms.includes('éruption') || symptoms.includes('démangeaison')) {
    return {
      conditions: ['Eczéma', 'Dermatite', 'Urticaire'],
      specialist: 'Dermatologue',
      specialistType: 'dermatologist'
    };
  } else {
    // Réponse par défaut si aucun symptôme spécifique n'est identifié
    return {
      conditions: ['Condition non identifiée'],
      specialist: 'Médecin généraliste',
      specialistType: 'general'
    };
  }
};

// Fonction pour générer une réponse basée sur l'analyse des symptômes
const generateResponse = (message, userInfo, analysis) => {
  // Personnalisation de la réponse en fonction des informations de l'utilisateur
  let personalizedGreeting = '';
  
  if (userInfo && userInfo.age) {
    personalizedGreeting = `Pour une personne de ${userInfo.age} ans, `;
  }
  
  // Génération de la réponse
  return {
    response: `${personalizedGreeting}d'après votre description, je pense que vous pourriez souffrir de l'une des conditions suivantes : ${analysis.conditions.join(', ')}. Je vous recommande de consulter un ${analysis.specialist} pour un diagnostic précis.`,
    possibleConditions: analysis.conditions,
    recommendedSpecialist: analysis.specialist,
    specialistType: analysis.specialistType
  };
};

// Contrôleur pour la route /api/chat
const chatController = {
  processMessage: (req, res) => {
    try {
      const { message, userInfo } = req.body;
      
      // Vérifier si le message est fourni
      if (!message) {
        return res.status(400).json({ error: 'Le message est requis' });
      }
      
      // Analyser les symptômes
      const analysis = analyzeSymptoms(message);
      
      // Générer une réponse
      const response = generateResponse(message, userInfo, analysis);
      
      // Envoyer la réponse
      res.status(200).json(response);
    } catch (error) {
      console.error('Erreur lors du traitement du message:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }
};

module.exports = chatController;
