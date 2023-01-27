Here is an example of a custom React hook that tracks the match status of a CSS media query, written in TypeScript:

```javascript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    media.addListener(handleChange);
    return () => {
      media.removeListener(handleChange);
    };
  }, [query, matches]);

  return matches;
}
```

You can use this hook in your component like this:

```javascript
import { useMediaQuery } from './hooks';

function MyComponent() {
  const isWide = useMediaQuery('(min-width: 800px)');

  return <div>{isWide ? 'Wide Screen' : 'Narrow Screen'}</div>;
}
```

This hook takes a single parameter, which is the media query string you want to track. The hook returns a boolean that indicates whether the media query is currently matched or not. The hook uses the useState and useEffect hooks to manage the state and side-effects of monitoring the match status of the media query. It uses window.matchMedia to create a MediaQueryList object and addListener and removeListener to attach and remove the event listener for change event. The hook updates the state with the new match status whenever the event is fired.
