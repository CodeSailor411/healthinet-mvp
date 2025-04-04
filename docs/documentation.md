# Documentation HealthiNet

## Présentation du projet

HealthiNet est une plateforme d'assistance médicale qui propose un chatbot simulant un médecin généraliste. L'application aide les utilisateurs à décrire leurs symptômes, identifie les conditions médicales possibles et suggère le type de spécialiste à consulter.

## Architecture technique

### Frontend
- **Framework** : React avec TypeScript
- **Styling** : TailwindCSS
- **Animations** : Framer Motion
- **Requêtes HTTP** : Axios
- **Routing** : React Router DOM

### Backend
- **Framework** : Node.js avec Express
- **Middleware** : CORS pour les requêtes cross-origin
- **Configuration** : dotenv pour les variables d'environnement

## Structure du projet

```
HealthiNet/
├── frontend/                # Application React
│   ├── public/              # Fichiers statiques
│   └── src/                 # Code source
│       ├── components/      # Composants réutilisables
│       ├── pages/           # Pages principales
│       ├── services/        # Services (API, etc.)
│       ├── context/         # Contextes React
│       └── assets/          # Images et autres ressources
├── backend/                 # Serveur Node.js
│   ├── config/              # Configuration
│   ├── controllers/         # Contrôleurs
│   ├── routes/              # Routes API
│   ├── models/              # Modèles de données
│   └── utils/               # Utilitaires
└── docs/                    # Documentation
```

## Fonctionnalités principales

1. **Page d'accueil**
   - Présentation de HealthiNet
   - Appel à l'action pour accéder au chatbot

2. **Interface de chat**
   - Conversation en temps réel avec le chatbot
   - Analyse des symptômes décrits
   - Suggestion de conditions médicales possibles
   - Recommandation de spécialistes

3. **Dossier médical**
   - Formulaire pour saisir l'âge, le genre et les antécédents médicaux
   - Stockage local des informations pour personnaliser les recommandations

4. **Information sur les spécialistes**
   - Description du rôle du spécialiste
   - Domaines d'expertise
   - Situations nécessitant une consultation

## Instructions d'installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Installation du backend
1. Naviguer vers le dossier backend
   ```
   cd HealthiNet/backend
   ```

2. Installer les dépendances
   ```
   npm install
   ```

3. Créer un fichier .env à partir du modèle .env.example
   ```
   cp .env.example .env
   ```

4. Démarrer le serveur
   ```
   node server.js
   ```
   Le serveur sera accessible à l'adresse http://localhost:5000

### Installation du frontend
1. Naviguer vers le dossier frontend
   ```
   cd HealthiNet/frontend
   ```

2. Installer les dépendances
   ```
   npm install
   ```

3. Démarrer l'application
   ```
   npm start
   ```
   L'application sera accessible à l'adresse http://localhost:3000

## Guide d'utilisation

### Consultation médicale
1. Accéder à la page d'accueil et cliquer sur "Parler à notre Médecin IA"
2. Décrire vos symptômes dans la zone de texte
3. Le chatbot analysera vos symptômes et suggérera des conditions possibles
4. Une recommandation de spécialiste sera affichée si nécessaire

### Gestion du dossier médical
1. Accéder à la page "Dossier Médical" depuis le menu de navigation
2. Remplir les informations demandées (âge, genre, antécédents médicaux)
3. Cliquer sur "Enregistrer" pour sauvegarder les informations
4. Ces informations seront utilisées pour personnaliser les recommandations du chatbot

### Information sur les spécialistes
1. Après une consultation, cliquer sur "En savoir plus sur ce spécialiste"
2. Consulter les informations détaillées sur le spécialiste recommandé
3. Découvrir ses domaines d'expertise et les situations nécessitant une consultation

## Problèmes connus et limitations

1. **Configuration de TailwindCSS**
   - Un problème de configuration empêche actuellement la compilation optimisée du frontend
   - Solution temporaire : utiliser le mode développement pour les tests

2. **Analyse des symptômes simplifiée**
   - L'analyse actuelle utilise une correspondance de mots-clés basique
   - Pour une version production, intégrer une véritable API d'IA comme Gemini ou GPT

3. **Stockage local des données**
   - Les informations de santé sont stockées uniquement en local
   - Pour une version production, implémenter un système d'authentification et de stockage sécurisé

## Améliorations futures

1. **Intégration d'une IA avancée**
   - Remplacer la logique de correspondance de mots-clés par une API Gemini ou GPT
   - Améliorer la précision des diagnostics et recommandations

2. **Authentification des utilisateurs**
   - Ajouter un système de connexion pour sécuriser les données
   - Permettre l'accès au dossier médical depuis différents appareils

3. **Historique des consultations**
   - Sauvegarder l'historique des conversations avec le chatbot
   - Permettre aux utilisateurs de suivre l'évolution de leurs symptômes

4. **Prise de rendez-vous**
   - Intégrer un système de prise de rendez-vous avec des spécialistes
   - Connecter l'application à des annuaires de professionnels de santé

## Conclusion

HealthiNet est un MVP fonctionnel qui démontre le potentiel d'une application d'assistance médicale basée sur l'IA. Bien que certaines fonctionnalités soient simulées pour cette version, l'architecture est en place pour intégrer des technologies plus avancées dans les futures itérations.
