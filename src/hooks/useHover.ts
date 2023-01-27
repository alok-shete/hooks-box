import * as React from 'react';

const { useState, useRef, useEffect } = React;

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('mouseover', handleMouseOver);
    element?.addEventListener('mouseout', handleMouseOut);
    return () => {
      element?.removeEventListener('mouseover', handleMouseOver);
      element?.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return [ref, value];
}

export default useHover;
