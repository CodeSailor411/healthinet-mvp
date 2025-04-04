require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'HealthiNet API is running' });
});

// API route pour le chatbot
app.post('/api/chat', (req, res) => {
  // Cette route sera implémentée plus tard avec l'intégration de l'API Gemini ou GPT
  const { message, userInfo } = req.body;
  
  // Réponse simulée pour le MVP
  res.status(200).json({
    response: `Réponse simulée du chatbot médical pour: "${message}"`,
    possibleConditions: ["Condition 1", "Condition 2"],
    recommendedSpecialist: "Spécialiste recommandé"
  });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
