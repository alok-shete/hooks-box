import { useState, useEffect } from 'react';

interface UseSize {
  width: number | undefined;
  height: number | undefined;
}

export function useSize(ref: React.RefObject<HTMLElement>): UseSize {
  const [size, setSize] = useState<UseSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }

    const handleResize = () => {
      setSize({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return size;
}
