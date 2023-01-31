import { useState, useEffect } from 'react';

const useImageToBase64 = (src: string): string | null => {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    const getBase64 = async (src: string): Promise<void> => {
      const response = await fetch(src);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => setBase64(reader.result as string);
    };

    getBase64(src);
  }, [src]);

  return base64;
};

export default useImageToBase64;
