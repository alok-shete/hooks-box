import { useEffect, useState } from 'react';

function useTitle(title: string) {
  const [currentTitle, setCurrentTitle] = useState(document.title);
  useEffect(() => {
    setCurrentTitle(document.title);
    document.title = title;
    return () => {
      document.title = currentTitle;
    }
  }, [title]);
  return currentTitle;
}
