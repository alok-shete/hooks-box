import { useEffect } from 'react';

type EventType = keyof WindowEventMap;
type EventHandler<E extends Event> = (event: E) => void;

export default function useEventListener<E extends EventType>(
  eventType: E,
  handler: EventHandler<WindowEventMap[E]>,
  element = window,
) {
  useEffect(() => {
    const eventListener = (event: WindowEventMap[E]) => handler(event);
    element.addEventListener(eventType, eventListener);
    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, handler, element]);
}
