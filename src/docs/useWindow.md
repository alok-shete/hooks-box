Here is an example of a custom React hook that tracks the current window size, written in TypeScript:

```javascript:
import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
}

```

You can use this hook in your component like this:

```javascript
import { useWindowSize } from './hooks';

function MyComponent() {
  const size = useWindowSize();

  return (
    <div>
      Width: {size.width}
      Height: {size.height}
    </div>
  );
}

```

This hook doesn't take any parameter, it returns an object with width and height properties, which represent the current window width and height. The hook uses the useState and useEffect hooks to manage the state and side-effects of monitoring the window size. It uses addEventListener and removeEventListener to attach and remove the event listener for resize event. The hook updates the state with the new window width and height whenever the event is fired.
