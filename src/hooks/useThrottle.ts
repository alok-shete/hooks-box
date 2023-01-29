import { useState, useEffect } from 'react';

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastCall, setLastCall] = useState(Date.now());

  useEffect(() => {
    if (Date.now() - lastCall >= delay) {
      setThrottledValue(value);
      setLastCall(Date.now());
    }
  }, [value, delay, lastCall]);

  return throttledValue;
}
