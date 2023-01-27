Here is an example of a custom React hook that provides the current width and height of an element, written in TypeScript:

```javascript
import { useState, useEffect } from 'react';

interface UseSize {
  width: number;
  height: number;
}

export function useSize(ref: React.RefObject<HTMLElement>): UseSize {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }

    const handleResize = () => {
      setSize({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return size;
}
```

You can use this hook in your component like this:

```javascript
import { useSize } from './hooks';

function MyComponent() {
  const ref = React.useRef < HTMLDivElement > null;
  const size = useSize(ref);
  return (
    <div ref={ref}>
      <p>Width: {size.width}</p>
      <p>Height: {size.height}</p>
    </div>
  );
}
```

This hook takes a single parameter, ref which is a reference to the element whose width and height you want to track. It returns an object with two properties, width and height which are the current width and height of the element respectively. The hook uses the useState and useEffect hooks to manage the state of the component and track changes to the element's size. The useEffect hook sets an event listener on the resize event of the window object and updates the size state when the event is fired. It also returns a cleanup function that removes the event listener when the component is unmounted.
