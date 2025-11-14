

import React, { useState, useEffect } from 'react';
import { fetchGeolocation } from '../services/geolocationService';
import { GeolocationData } from '../types';

const Geolocation: React.FC = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const data = await fetchGeolocation();
        setLocation(data);
      } catch (err) {
        console.error(err);
      }
    };

    getLocation();
  }, []);

  if (!location) {
    return null;
  }

  return (
    <div className="text-center text-xs text-slate-400 dark:text-slate-500">
        <p>Acessando de: <span className="font-semibold">{location.city}, {location.country}</span></p>
    </div>
  );
};

export default Geolocation;