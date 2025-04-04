# Guide d'installation - HealthiNet

Ce guide vous aidera à installer et exécuter l'application HealthiNet sur votre environnement local.

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Installation

### Backend

1. Naviguez vers le dossier backend
   ```
   cd HealthiNet/backend
   ```

2. Installez les dépendances
   ```
   npm install
   ```

3. Créez un fichier .env à partir du modèle .env.example
   ```
   cp .env.example .env
   ```
   
   Modifiez le fichier .env pour configurer vos propres clés API si nécessaire.

4. Démarrez le serveur
   ```
   node server.js
   ```
   
   Le serveur sera accessible à l'adresse http://localhost:5000

### Frontend

1. Naviguez vers le dossier frontend
   ```
   cd HealthiNet/frontend
   ```

2. Installez les dépendances
   ```
   npm install
   ```

3. Démarrez l'application en mode développement
   ```
   npm start
   ```
   
   L'application sera accessible à l'adresse http://localhost:3000

## Résolution des problèmes courants

### Problème de configuration TailwindCSS

Si vous rencontrez des erreurs liées à TailwindCSS lors de la compilation, essayez les solutions suivantes :

1. Vérifiez que les fichiers de configuration de TailwindCSS sont correctement configurés :
   - tailwind.config.js
   - postcss.config.js

2. Assurez-vous que les directives TailwindCSS sont présentes dans votre fichier CSS principal :
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Si le problème persiste, vous pouvez réinstaller TailwindCSS :
   ```
   npm uninstall tailwindcss postcss autoprefixer
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

## Déploiement

Pour déployer l'application en production :

1. Construisez le frontend
   ```
   cd frontend
   npm run build
   ```

2. Servez les fichiers statiques depuis le backend en ajoutant ces lignes à server.js :
   ```javascript
   const path = require('path');
   app.use(express.static(path.join(__dirname, '../frontend/build')));
   
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
   });
   ```

3. Démarrez le serveur backend
   ```
   node server.js
   ```

## Support

Pour toute question ou problème, veuillez consulter la documentation complète dans le dossier `/docs` ou créer une issue sur le dépôt du projet.
