import { useState, useEffect } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

interface PositionError {
  code: number;
  message: string;
}

const useGeolocation = (): [Coords | null, PositionError | null] => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [error, setError] = useState<PositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => setError(error)
    );
  }, []);

  return [location, error];
};

export default useGeolocation;
