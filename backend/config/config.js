// Fichier de configuration pour le serveur
const config = {
  port: process.env.PORT || 5000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  apiKey: process.env.API_KEY || 'YOUR_API_KEY',
  apiEndpoint: process.env.API_ENDPOINT || 'https://api.example.com/v1'
};

module.exports = config;
