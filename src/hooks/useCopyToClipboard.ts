import { useState, useCallback } from 'react';

const useCopyToClipboard = (): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      },
      () => {
        setIsCopied(false);
      }
    );
  }, []);

  return [isCopied, copyToClipboard];
};

export default useCopyToClipboard;
