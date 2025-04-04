import { useState, useEffect, useCallback } from 'react';

// Set this to true to bypass browser geolocation completely during development
const FORCE_FALLBACK = true;

const useGeolocation = (enableFallback = false) => {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    error: string | null;
    loading: boolean;
    debugInfo?: string;
    usingFallback?: boolean;
  }>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
    debugInfo: 'Initializing geolocation...',
    usingFallback: false,
  });

  // Fallback to a default location (Tunis, Tunisia)
  const applyFallbackLocation = useCallback(() => {
    console.warn('Using fallback location for testing');
    setPosition({
      latitude: 36.8065, // Tunis coordinates
      longitude: 10.1815,
      accuracy: 1000,
      error: null,
      loading: false,
      debugInfo: 'Using fallback location (Tunis, Tunisia)',
      usingFallback: true,
    });
  }, []);

  // Get current position
  const getCurrentPosition = useCallback(() => {
    // Skip real geolocation if FORCE_FALLBACK is true
    if (FORCE_FALLBACK) {
      console.log('Development mode: Using fallback location automatically');
      applyFallbackLocation();
      return;
    }

    setPosition((prev) => ({ ...prev, loading: true, debugInfo: 'Requesting position...' }));

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');

      if (enableFallback) {
        applyFallbackLocation();
      } else {
        setPosition({
          latitude: null,
          longitude: null,
          accuracy: null,
          error: "La géolocalisation n'est pas prise en charge par votre navigateur",
          loading: false,
          debugInfo: 'Geolocation API not available',
        });
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation successful:', position.coords);
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          debugInfo: 'Position successfully acquired',
          usingFallback: false,
        });
      },
      (error) => {
        console.error('Geolocation error:', error.code, error.message);

        if (enableFallback) {
          console.log('Error occurred, applying fallback location');
          applyFallbackLocation();
        } else {
          let errorMessage = 'Erreur de géolocalisation';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Accès à la localisation refusé par l'utilisateur";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Les informations de localisation ne sont pas disponibles";
              break;
            case error.TIMEOUT:
              errorMessage = 'La demande de localisation a expiré';
              break;
            default:
              errorMessage = "Une erreur inconnue s'est produite";
          }

          setPosition({
            latitude: null,
            longitude: null,
            accuracy: null,
            error: errorMessage,
            loading: false,
            debugInfo: `Error code: ${error.code}, message: ${error.message}`,
          });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60000,
      }
    );
  }, [enableFallback, applyFallbackLocation]);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return {
    ...position,
    getCurrentPosition,
  };
};

export default useGeolocation;