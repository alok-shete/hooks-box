import { useState } from 'react';
import useEvent from './useEventListener';

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEvent('online', () => setOnline(navigator.onLine));
  useEvent('offline', () => setOnline(navigator.onLine));

  return online;
}
