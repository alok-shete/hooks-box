It is possible to create a custom Hook in TypeScript called useEffectOnce that behaves similarly to the useEffect Hook, but only runs the effect once, on the initial render of the component. Here's an example of how you might create such a Hook:

Copy code
import { useEffect } from 'react';

function useEffectOnce(effect: React.EffectCallback) {
  useEffect(effect, []);
}
You can use this Hook in a functional component like this:

Copy code
function MyComponent() {
  useEffectOnce(() => {
    console.log('This effect only runs once.');
  });

  return <div>Hello, world!</div>;
}
This Hook can be useful when you want to run an effect only once and not on every re-render, like setting up a subscription, adding an event listener, or creating a new resource.