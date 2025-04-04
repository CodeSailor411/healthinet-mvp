import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

interface HealthRecord {
  age: string;
  gender: string;
  pastConditions: string;
}

const HealthRecordsPage: React.FC = () => {
  const [healthRecord, setHealthRecord] = useState<HealthRecord>({
    age: '',
    gender: '',
    pastConditions: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);
  
  // Charger les données sauvegardées si elles existent
  useEffect(() => {
    const savedRecord = localStorage.getItem('healthRecord');
    if (savedRecord) {
      setHealthRecord(JSON.parse(savedRecord));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHealthRecord(prev => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sauvegarder les données dans le localStorage
    localStorage.setItem('healthRecord', JSON.stringify(healthRecord));
    setIsSaved(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Vos Informations de Santé</h1>
          
          <Card className="max-w-md mx-auto">
            <p className="text-gray-600 mb-6">
              Ces informations nous aideront à personnaliser nos recommandations médicales. Elles resteront confidentielles et sont stockées uniquement sur votre appareil.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                  Âge
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={healthRecord.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 35"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                  Genre
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={healthRecord.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                  <option value="prefer-not-to-say">Je préfère ne pas préciser</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="pastConditions" className="block text-gray-700 font-medium mb-2">
                  Antécédents médicaux
                </label>
                <textarea
                  id="pastConditions"
                  name="pastConditions"
                  value={healthRecord.pastConditions}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: diabète, hypertension, allergies..."
                ></textarea>
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Enregistrer
                </Button>
                
                {isSaved && (
                  <span className="text-green-600 font-medium">
                    Informations enregistrées!
                  </span>
                )}
              </div>
            </form>
          </Card>
          
          <div className="mt-8 max-w-md mx-auto">
            <Card title="Pourquoi ces informations sont importantes">
              <p className="text-gray-700 mb-4">
                Fournir ces informations permet à notre assistant médical de mieux comprendre votre profil et d'adapter ses recommandations en fonction de votre âge, genre et antécédents médicaux.
              </p>
              <p className="text-gray-700">
                Ces données sont stockées uniquement sur votre appareil et ne sont pas partagées avec des tiers.
              </p>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/chat'}
            >
              Aller à la consultation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthRecordsPage;
