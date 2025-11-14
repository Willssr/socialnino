
import React, { useState, useEffect } from 'react';
import { fetchGeolocation } from '../services/geolocationService';
import { GeolocationData } from '../types';

const Geolocation: React.FC = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const data = await fetchGeolocation();
        setLocation(data);
      } catch (err) {
        setError('Could not determine location.');
        console.error(err);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="bg-slate-100 text-center py-2 text-sm text-slate-500">
      {location ? (
        <p>Você está acessando de: <span className="font-semibold">{location.city}, {location.country}</span></p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Determinando sua localização...</p>
      )}
    </div>
  );
};

export default Geolocation;
