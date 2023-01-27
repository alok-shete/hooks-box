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
