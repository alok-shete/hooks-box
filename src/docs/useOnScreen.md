Here is an example of a custom React hook that tracks whether an element is on the screen (visible within the viewport), written in TypeScript:

```javascript:
import { useState, useEffect, RefObject } from 'react';

interface OnScreen {
  onScreen: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export function useOnScreen(ref: RefObject<HTMLElement>, threshold: number = 0.5): OnScreen {
  const [onScreen, setOnScreen] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    let observer: IntersectionObserver | null;

    if (ref.current) {
      observer = new IntersectionObserver(([entry]) => {
        setOnScreen(entry.isIntersecting);
        setEntry(entry);
      }, { threshold });

      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, threshold]);

  return { onScreen, entry };
}

```

You can use this hook in your component like this:

```javascript:
import { useOnScreen } from './hooks';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);

  return (
    <div ref={ref}>
      {onScreen ? 'On Screen' : 'Off Screen'}
    </div>
  );
}
```

This hook takes a single parameter, which is a ref that is a reference to the element you want to track, and an optional threshold parameter to specify the percentage of the element that must be on screen for it to be considered visible. The hook returns an object with onScreen and entry properties. onScreen property is a boolean that indicates whether the element is on screen or not. The entry property is an IntersectionObserverEntry object which provides more details about the intersection, such as the intersection ratio. The hook uses the useState and useEffect hooks to manage the state and side-effects of monitoring the visibility of the element. Also, it uses the IntersectionObserver API to detect the visibility of the element, and it uses disconnect method when component unmounts to stop observer.
