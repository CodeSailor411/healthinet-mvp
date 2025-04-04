import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAgentSystem from '../hooks/useAgentSystem';
import useGeolocation from '../hooks/useGeolocation';
import MapComponent from '../components/MapComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { MedicalFacility } from '../types'; // Import the type from types/index.ts

// Only define interfaces that aren't already defined in types/index.ts
interface Specialist {
  type: string;
  title: string;
  description?: string;
}

interface Diagnosis {
  conditions: any[];
  specialist: Specialist;
  urgencyLevel: string;
}

const NearbySpecialistsPage: React.FC = () => {
  // Get data from hook
  const { 
    diagnosis, 
    nearbyFacilities: rawFacilities, 
    findNearbyFacilities 
  } = useAgentSystem() as {
    diagnosis: Diagnosis | null;
    nearbyFacilities: Array<{
      name: string;
      address: string;
      distance?: number;
      rating?: number;
      latitude?: number;
      longitude?: number;
    }>;
    findNearbyFacilities: (specialistType: string) => Promise<{
      facilities?: Array<{
        name: string;
        address: string;
        distance: number;
        rating: number;
        latitude: number;
        longitude: number;
      }>;
      error?: string;
    }>;
  };
  
  // Transform the facilities to match the required MedicalFacility type
  const nearbyFacilities: MedicalFacility[] = rawFacilities.map(facility => ({
    name: facility.name,
    address: facility.address,
    specialties: [], // Add required property
    distance: facility.distance,
    rating: facility.rating,
    location: {
      lat: facility.latitude || 0,
      lng: facility.longitude || 0
    }
  }));
  
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  
  // Set a default specialist type for testing purposes
  const [specialistType, setSpecialistType] = useState('general');
  const [isSearching, setIsSearching] = useState(false);
  
  // Utiliser le type de spécialiste du diagnostic s'il est disponible
  useEffect(() => {
    if (diagnosis && diagnosis.specialist && diagnosis.specialist.type) {
      setSpecialistType(diagnosis.specialist.type);
    }
  }, [diagnosis]);
  
  // Rechercher des établissements à proximité lorsque la position est disponible
  useEffect(() => {
    const searchNearbyFacilities = async () => {
      if (latitude && longitude && specialistType && !isSearching) {
        console.log('Searching for facilities with type:', specialistType);
        setIsSearching(true);
        await findNearbyFacilities(specialistType);
        setIsSearching(false);
      }
    };
    
    searchNearbyFacilities();
  }, [latitude, longitude, specialistType, findNearbyFacilities, isSearching]);
  
  // Trigger search immediately when component mounts
  useEffect(() => {
    if (specialistType && !nearbyFacilities.length) {
      findNearbyFacilities(specialistType);
    }
  }, []);
  
  // Animations pour les éléments de la page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  // Rendu du contenu principal
  const renderContent = () => {
    if (geoLoading) {
      return (
        <div className="text-center p-8">
          <motion.div
            className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Détection de votre position...</p>
        </div>
      );
    }
    
    if (geoError) {
      return (
        <Card>
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur de géolocalisation</h3>
            <p className="text-gray-600 mb-4">{geoError}</p>
            <p className="text-gray-600">
              Pour utiliser cette fonctionnalité, veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur.
            </p>
          </div>
        </Card>
      );
    }
    
    if (nearbyFacilities.length === 0) {
      return (
        <Card>
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun établissement trouvé</h3>
            <p className="text-gray-600">
              Nous n'avons pas trouvé d'établissements proposant des consultations avec ce type de spécialiste à proximité.
            </p>
          </div>
        </Card>
      );
    }
    
    return (
      <div>
        <Card title="Carte des établissements à proximité" className="mb-6">
          <MapComponent 
            facilities={nearbyFacilities} 
            userLocation={{ latitude, longitude }}
          />
        </Card>
        
        <Card title="Liste des établissements">
          <div className="space-y-4">
            {nearbyFacilities.map((facility, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 text-lg">{facility.name}</h3>
                <p className="text-gray-600 mb-2">{facility.address}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {facility.distance} km • {facility.rating} ★
                  </span>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-4 md:p-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Spécialistes à proximité
          </motion.h1>
          
          <motion.div variants={itemVariants}>
            <Card title="Type de spécialiste" className="mb-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="specialistType" className="block text-sm font-medium text-gray-700 mb-1">
                    Sélectionnez un type de spécialiste
                  </label>
                  <select
                    id="specialistType"
                    value={specialistType}
                    onChange={(e) => setSpecialistType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un spécialiste</option>
                    <option value="general">Médecin généraliste</option>
                    <option value="neurologist">Neurologue</option>
                    <option value="cardiologist">Cardiologue</option>
                    <option value="dermatologist">Dermatologue</option>
                    <option value="ophthalmologist">Ophtalmologue</option>
                    <option value="gastroenterologist">Gastro-entérologue</option>
                  </select>
                </div>
                
                {diagnosis && diagnosis.specialist && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <p className="text-blue-700">
                      <strong>Recommandation :</strong> D'après l'analyse de vos symptômes, nous vous recommandons de consulter un {diagnosis.specialist.title}.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {renderContent()}
          </motion.div>
          
          <motion.div 
            className="mt-8 p-4 bg-gray-100 border border-gray-200 rounded-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Comment utiliser cette fonctionnalité
            </h3>
            <p className="text-gray-600 mb-2">
              Cette page vous permet de trouver des établissements médicaux proposant des consultations avec le type de spécialiste sélectionné à proximité de votre position.
            </p>
            <p className="text-gray-600">
              Pour obtenir des résultats précis, assurez-vous d'autoriser l'accès à votre position dans les paramètres de votre navigateur.
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NearbySpecialistsPage;
