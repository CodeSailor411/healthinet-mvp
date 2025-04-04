import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { useParams, Link } from 'react-router-dom';

interface SpecialistInfo {
  type: string;
  title: string;
  description: string;
  expertise: string[];
  whenToConsult: string[];
}

const specialistData: Record<string, SpecialistInfo> = {
  cardiologist: {
    type: 'cardiologist',
    title: 'Cardiologue',
    description: 'Un cardiologue est un médecin spécialisé dans le diagnostic et le traitement des maladies et des affections du système cardiovasculaire, qui comprend le cœur et les vaisseaux sanguins.',
    expertise: [
      'Maladies cardiaques',
      'Hypertension artérielle',
      'Arythmies cardiaques',
      'Insuffisance cardiaque',
      'Maladies des artères coronaires'
    ],
    whenToConsult: [
      'Douleurs thoraciques',
      'Essoufflement inexpliqué',
      'Palpitations cardiaques',
      'Étourdissements fréquents',
      'Antécédents familiaux de maladies cardiaques'
    ]
  },
  neurologist: {
    type: 'neurologist',
    title: 'Neurologue',
    description: 'Un neurologue est un médecin spécialisé dans le diagnostic et le traitement des troubles du système nerveux, qui comprend le cerveau, la moelle épinière et les nerfs périphériques.',
    expertise: [
      'Migraines et céphalées',
      'Épilepsie',
      'Accidents vasculaires cérébraux',
      'Maladies neurodégénératives (Parkinson, Alzheimer)',
      'Troubles du sommeil'
    ],
    whenToConsult: [
      'Maux de tête sévères ou persistants',
      'Étourdissements ou vertiges fréquents',
      'Engourdissements ou faiblesse',
      'Problèmes d\'équilibre ou de coordination',
      'Troubles de la mémoire'
    ]
  },
  dermatologist: {
    type: 'dermatologist',
    title: 'Dermatologue',
    description: 'Un dermatologue est un médecin spécialisé dans le diagnostic et le traitement des affections de la peau, des cheveux et des ongles.',
    expertise: [
      'Acné',
      'Eczéma',
      'Psoriasis',
      'Infections cutanées',
      'Dépistage du cancer de la peau'
    ],
    whenToConsult: [
      'Éruptions cutanées persistantes',
      'Changements dans l\'apparence des grains de beauté',
      'Perte de cheveux inexpliquée',
      'Problèmes d\'ongles chroniques',
      'Démangeaisons sévères'
    ]
  }
};

const SpecialistInfoPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [specialist, setSpecialist] = useState<SpecialistInfo | null>(null);
  
  useEffect(() => {
    if (type && specialistData[type]) {
      setSpecialist(specialistData[type]);
    } else {
      // Fallback pour un type non reconnu
      setSpecialist({
        type: 'unknown',
        title: 'Spécialiste Médical',
        description: 'Information sur ce spécialiste médical non disponible actuellement.',
        expertise: [],
        whenToConsult: []
      });
    }
  }, [type]);
  
  if (!specialist) {
    return <div className="p-8 text-center">Chargement...</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Link to="/chat" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Retour à la consultation
          </Link>
          
          <Card className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{specialist.title}</h1>
            <p className="text-gray-700 mb-6">{specialist.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Domaines d'expertise</h2>
              <ul className="list-disc pl-5 space-y-1">
                {specialist.expertise.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Quand consulter</h2>
              <ul className="list-disc pl-5 space-y-1">
                {specialist.whenToConsult.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </Card>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Rappel important</h2>
            <p className="text-blue-700">
              Cette information est fournie à titre indicatif uniquement. Consultez toujours un professionnel de la santé pour un diagnostic et un traitement appropriés.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/chat'}
            >
              Retourner à la consultation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialistInfoPage;
