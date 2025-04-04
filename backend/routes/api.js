const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route pour vérifier l'état de l'API
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'HealthiNet API is running' });
});

// Route pour le chatbot
router.post('/chat', chatController.processMessage);

module.exports = router;
