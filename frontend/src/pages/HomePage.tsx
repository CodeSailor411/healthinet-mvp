import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="min-h-[70vh] bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">HealthiNet</h1>
            <p className="text-xl text-gray-600 mb-8">
              Votre assistant médical intelligent pour vous aider à comprendre vos symptômes et vous orienter vers les bons spécialistes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary"
                className="text-xl py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105"
                onClick={() => window.location.href = '/chat'}
              >
                Parler à notre Médecin IA
              </Button>
              
              <Button 
                variant="outline"
                className="text-lg py-3 px-6 rounded-full"
                onClick={() => window.location.href = '/health-records'}
              >
                Gérer mon dossier médical
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">Décrivez vos symptômes</h2>
              <p className="text-gray-600 text-center">
                Expliquez simplement ce que vous ressentez à notre assistant médical intelligent.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">Obtenez des informations</h2>
              <p className="text-gray-600 text-center">
                Recevez des informations sur les conditions possibles basées sur vos symptômes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">Trouvez le bon spécialiste</h2>
              <p className="text-gray-600 text-center">
                Découvrez quel type de médecin spécialiste consulter en fonction de votre situation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Comment ça fonctionne</h2>
            <p className="text-lg text-gray-700 mb-12">
              HealthiNet utilise l'intelligence artificielle pour vous aider à mieux comprendre vos symptômes et vous orienter vers les soins appropriés.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Décrivez</h3>
                <p className="text-gray-600">Expliquez vos symptômes en détail</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Analysez</h3>
                <p className="text-gray-600">Notre IA analyse vos symptômes</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Consultez</h3>
                <p className="text-gray-600">Obtenez des recommandations de spécialistes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
