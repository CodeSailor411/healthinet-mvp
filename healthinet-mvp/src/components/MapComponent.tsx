import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MedicalFacility } from '../types';
import L from 'leaflet';
import useGeolocation from '../hooks/useGeolocation';

// Fix marker icon issues with proper type assertion
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  facilities: MedicalFacility[];
  userLocation?: { latitude: number | null; longitude: number | null };
}

const MapComponent: React.FC<MapComponentProps> = ({ facilities, userLocation }) => {
  // Move the hook inside the component function
  const { latitude, longitude, error, loading, debugInfo } = useGeolocation(true);
  console.log('Geolocation debug:', { latitude, longitude, error, loading, debugInfo });

  // Use the location from the hook if userLocation is not provided
  const effectiveLocation = userLocation || { latitude, longitude };
  
  if (!effectiveLocation || !effectiveLocation.latitude || !effectiveLocation.longitude) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-600">
        Localisation non disponible. Veuillez autoriser l'accès à votre position.
      </div>
    );
  }

  // Create non-null variables after the check
  const mapLatitude = effectiveLocation.latitude;
  const mapLongitude = effectiveLocation.longitude;

  return (
    <div className="w-full">
      <div style={{ height: '300px', width: '100%' }}>
        <MapContainer 
          center={[mapLatitude, mapLongitude]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location */}
          <Marker position={[mapLatitude, mapLongitude]}>
            <Popup>Votre position</Popup>
          </Marker>
          
          {/* Facilities */}
          {facilities.map((facility, index) => {
            // For demo purposes, generate random positions around user location
            const lat = mapLatitude + (Math.random() - 0.5) * 0.05;
            const lng = mapLongitude + (Math.random() - 0.5) * 0.05;
            
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{facility.name}</h3>
                    <p>{facility.address}</p>
                    <p>{facility.distance} km • {facility.rating} ★</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      {/* Facility list */}
      <div className="mt-4 space-y-2">
        {facilities.map((facility, index) => (
          <div key={index} className="flex items-start p-2 bg-white rounded-md shadow-sm">
            <div className="flex-1">
              <h3 className="font-medium">{facility.name}</h3>
              <p className="text-sm text-gray-600">{facility.address}</p>
              <p className="text-sm">{facility.distance} km • {facility.rating} ★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;