import { useEffect, useRef } from 'react';

type TIMEOUT_REF_TYPE = ReturnType<typeof setTimeout>;

export default function useTimeout(callback: () => void, delay = 0) {
  const savedCallback = useRef<() => void>();
  const timeoutId = useRef<TIMEOUT_REF_TYPE>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    timeoutId.current = setTimeout(tick, delay);
    return () => clearTimeout(timeoutId.current);
  }, [delay]);

  function reset() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(
        () => savedCallback.current && savedCallback.current(),
        delay,
      );
    }
  }

  return { reset };
}
