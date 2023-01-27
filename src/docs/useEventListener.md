Sure, here's an example of how you might create a custom useEventListener hook in TypeScript for a Next.js application:

Copy code

```javascript:
import { useEffect } from 'react';
type EventType = keyof WindowEventMap;
type EventHandler<E extends Event> = (event: E) => void;

function useEventListener<E extends EventType>(eventType: E, handler: EventHandler<WindowEventMap[E]>, element = window) {
  useEffect(() => {
    const eventListener = (event: WindowEventMap[E]) => handler(event);
    element.addEventListener(eventType, eventListener);
    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, handler, element]);
}
```

You can use the hook like this:

```javascript:
function Example() {
  const handleResize = () => {
    console.log('Window was resized');
  };

  useEventListener('resize', handleResize);

  return <div>Resize the window to see the console log</div>;
}

```

In this example, the hook takes in three arguments:

eventType: the type of event to listen for, such as 'click' or 'resize'
handler: the function to be called when the event is fired
element: the element to attach the event listener to. By default, it's window
The hook uses the useEffect hook to add an event listener when the component mounts and remove it when the component unmounts.

You can also use the hook to listen to events on other elements, for example:

```javascript:
const ref = useRef<HTMLDivElement>(null);

useEventListener('click', handleClick, ref.current);

return <div ref={ref}>Click me</div>;

```

In this case, the ref is passed to the div element and its value is used to reference the actual DOM node of the element. You can use the ref value to access the element's properties and methods.

Please note that in this case, you need to make sure that the ref is not null before using it.
