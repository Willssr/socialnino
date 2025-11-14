
import { GeolocationData } from '../types';

// This uses a free public API without an API key for demonstration purposes.
// For a production application, you should sign up for a reliable geolocation service
// (like GeoJS, IPinfo, MaxMind, etc.) and use an API key.
// The configuration for that key would go here.
const GEOLOCATION_API_URL = 'https://get.geojs.io/v1/ip/geo.json';


export const fetchGeolocation = async (): Promise<GeolocationData> => {
  try {
    const response = await fetch(GEOLOCATION_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch geolocation data');
    }
    const data = await response.json();
    return {
      city: data.city || 'Unknown City',
      country: data.country || 'Unknown Country',
    };
  } catch (error) {
    console.error('Geolocation API error:', error);
    // Fallback if the API fails
    return {
      city: 'Unknown',
      country: 'Location',
    };
  }
};
