Here is an example of a custom React hook that tracks the current geolocation of the user, written in TypeScript:

```javascript:
import { useState, useEffect } from 'react';

interface Geolocation {
    latitude: number | null;
    longitude: number | null;
    error: PositionError | null;
}

export function useGeolocation(): Geolocation {
    const [geolocation, setGeolocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setGeolocation({
                latitude: null,
                longitude: null,
                error: { code: -1, message: 'Geolocation is not supported by this browser.' }
            });
            return;
        }

        function handleSuccess(position: Position) {
            setGeolocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        }

        function handleError(error: PositionError) {
            setGeolocation({
                latitude: null,
                longitude: null,
                error
            });
        }

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

        return () => {
            navigator.geolocation.clearWatch();
        };
    }, []);

    return geolocation;
}
```

You can use this hook in your component like this:

```javascript
import { useGeolocation } from './hooks';

function MyComponent() {
  const { latitude, longitude, error } = useGeolocation();

  return (
    <div>
      {error
        ? `Error: ${error.code}, ${error.message}`
        : `Latitude: ${latitude}, Longitude: ${longitude}`}
    </div>
  );
}
```

This hook doesn't take any parameter, it returns an object with latitude, longitude, and error properties. The latitude and longitude properties represent the current latitude and longitude of the user and the error property is an object that represent an error if any occured. The hook uses the useState and useEffect hooks to manage the state and side-effects of monitoring the geolocation of the user. It uses navigator.geolocation.getCurrentPosition to get the current position of the user and navigator.geolocation.clearWatch to clear the watch when the component unmounts. The hook updates the state with the new latitude and longitude of the user or with the error whenever navigator.geolocation.getCurrentPosition success or fail.
