# HealthiNet - Assistant Médical Intelligent

HealthiNet est une plateforme d'assistance médicale qui propose un chatbot simulant un médecin généraliste. L'application aide les utilisateurs à décrire leurs symptômes, identifie les conditions médicales possibles et suggère le type de spécialiste à consulter.

## Fonctionnalités principales

- **Interface de chat interactive** pour décrire vos symptômes
- **Analyse des symptômes** et suggestion de conditions médicales possibles
- **Recommandation de spécialistes** adaptée à vos symptômes
- **Dossier médical personnalisé** pour des recommandations plus précises
- **Informations détaillées** sur les différents types de spécialistes

## Documentation

La documentation complète du projet est disponible dans le dossier `docs` :

- [Documentation générale](./docs/documentation.md) - Présentation complète du projet
- [Guide d'installation](./docs/installation.md) - Instructions pour installer et exécuter l'application
- [Guide d'utilisation](./docs/user_guide.md) - Comment utiliser efficacement l'application

## Installation rapide

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application sera accessible à l'adresse http://localhost:3000

## Technologies utilisées

- **Frontend** : React, TypeScript, TailwindCSS, Framer Motion, Axios
- **Backend** : Node.js, Express

## Statut du projet

Ce projet est un MVP (Minimum Viable Product) développé pour démontrer les fonctionnalités de base d'une application d'assistance médicale. Certaines fonctionnalités sont simulées et seraient remplacées par des intégrations réelles d'IA dans une version de production.

## Problèmes connus

- Un problème de configuration avec TailwindCSS peut empêcher la compilation optimisée du frontend. Voir le guide d'installation pour les solutions.

## Licence

Ce projet est distribué sous licence MIT.
