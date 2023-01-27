Here is an example of a custom React hook that loads a script and returns its status, written in TypeScript:

```javascript:
import { useState, useEffect } from 'react';

interface ScriptStatus {
  loaded: boolean;
  error: boolean;
}

export function useScript(url: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    const onScriptLoad = () => {
      setStatus({
        loaded: true,
        error: false,
      });
    };

    const onScriptError = () => {
      setStatus({
        loaded: false,
        error: true,
      });
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [url]);

  return status;
}
```

You can use this hook in your component like this:

```javascript:
import { useScript } from './hooks';

function MyComponent() {
  const { loaded, error } = useScript('https://example.com/script.js');

  if (error) {
    return <p>Error loading script.</p>;
  }

  if (loaded) {
    return <p>Script loaded.</p>;
  }

  return <p>Loading script...</p>;
}
```

This hook takes a single parameter, which is the URL of the script to be loaded, and returns an object with a loaded and error property. These properties indicate whether the script has loaded successfully or if an error occurred. The hook uses the useState and useEffect hooks to manage the state and side-effects of loading the script. Also, it uses the appendChild method to attach the script to the DOM, and also it uses removeEventListener to remove the events when the component is unmounted.
