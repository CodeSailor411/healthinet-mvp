import BaseAgent from './BaseAgent';
import { AgentResponse, Location, MedicalFacility, ConversationContext, Specialist } from '../types';

class GeoLocationAgent extends BaseAgent {
  constructor() {
    super('GeoLocationAgent');
  }

  async process(input: { 
    specialist: Specialist;
    context: ConversationContext 
  }): Promise<AgentResponse> {
    const { specialist, context } = input;
    
    this.logAgentAction('Finding nearby specialists', { specialistType: specialist.type });
    
    try {
      // Obtenir la localisation de l'utilisateur
      const userLocation = await this.getUserLocation();
      
      if (!userLocation) {
        return this.formatResponse(
          'Impossible d\'obtenir votre localisation. Veuillez autoriser l\'accès à votre position pour trouver des spécialistes à proximité.',
          {
            locationError: true
          }
        );
      }
      
      // Rechercher des établissements médicaux à proximité
      const nearbyFacilities = await this.findNearbyFacilities(userLocation, specialist.type);
      
      // Générer un message pour l'utilisateur
      const responseMessage = this.generateResponseMessage(specialist, nearbyFacilities);
      
      return this.formatResponse(
        responseMessage,
        {
          userLocation,
          nearbyFacilities
        },
        undefined,
        'ContextualMemoryAgent' // Mettre à jour le contexte avec les informations de géolocalisation
      );
    } catch (error) {
      return this.formatResponse(
        'Erreur lors de la recherche de spécialistes à proximité',
        undefined,
        error instanceof Error ? error.message : 'Erreur inconnue'
      );
    }
  }
  
  private async getUserLocation(): Promise<Location | null> {
    // Dans une implémentation réelle, ceci utiliserait l'API de géolocalisation du navigateur
    // Pour cette démonstration, nous simulons une position pour Tunis, Tunisie
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latitude: 36.8065,  // Tunis, Tunisia
          longitude: 10.1815,
          accuracy: 100
        });
      }, 500);
    });
  }
  
  private async findNearbyFacilities(location: Location, specialistType: string): Promise<MedicalFacility[]> {
    // Dans une implémentation réelle, ceci appellerait l'API Google Maps
    // Pour cette démonstration, nous simulons des résultats
    
    // Simuler un délai de recherche
    return new Promise((resolve) => {
      setTimeout(() => {
        // Données simulées d'établissements médicaux à Tunis
        const facilities: MedicalFacility[] = [
          {
            name: 'Centre Médical El Manzah',
            address: '15 Avenue Habib Bourguiba, Tunis',
            specialties: ['general', 'cardiology', 'neurology'],
            distance: 1.2,
            rating: 4.5,
            location: {
              lat: 36.8165,
              lng: 10.1915
            }
          },
          {
            name: 'Clinique La Soukra',
            address: '42 Rue de Carthage, Tunis',
            specialties: ['neurology', 'dermatology', 'ophthalmology'],
            distance: 2.3,
            rating: 4.8,
            location: {
              lat: 36.8265,
              lng: 10.2015
            }
          },
          {
            name: 'Hôpital Charles Nicolle',
            address: '78 Boulevard Bab Saadoun, Tunis',
            specialties: ['general', 'cardiology', 'neurology', 'oncology', 'emergency'],
            distance: 3.1,
            rating: 4.2,
            location: {
              lat: 36.7965,
              lng: 10.1715
            }
          },
          {
            name: 'Dr. Ahmed Ben Salah',
            address: '150 Rue de Marseille, Tunis',
            specialties: ['dermatology', 'general'],
            distance: 1.9,
            rating: 4.9,
            location: {
              lat: 36.8365,
              lng: 10.1615
            }
          }
        ];
        
        // Filtrer les établissements qui proposent le type de spécialiste recherché
        const filteredFacilities = facilities.filter(facility => 
          facility.specialties.some(specialty => 
            specialty.toLowerCase() === specialistType.toLowerCase()
          )
        );
        
        // Trier par distance
        filteredFacilities.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        resolve(filteredFacilities);
      }, 1000);
    });
  }
  
  private generateResponseMessage(specialist: Specialist, facilities: MedicalFacility[]): string {
    if (facilities.length === 0) {
      return `Je n'ai pas trouvé d'établissements proposant des consultations avec un ${specialist.title} à proximité. Vous pouvez élargir votre recherche ou consulter l'annuaire des professionnels de santé.`;
    }
    
    const facilitiesList = facilities.slice(0, 3).map(f => 
      `- ${f.name} (${f.distance} km) - ${f.address}`
    ).join('\n');
    
    return `J'ai trouvé ${facilities.length} établissements proposant des consultations avec un ${specialist.title} à proximité de votre position :\n\n${facilitiesList}\n\nVous pouvez cliquer sur "Voir sur la carte" pour localiser ces établissements.`;
  }
}

export default GeoLocationAgent;
