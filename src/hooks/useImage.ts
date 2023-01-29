useImageinterface ImageStatus {
  loaded: boolean;
  error: boolean;
}

export function useImage(url: string): ImageStatus {
  const [status, setStatus] = useState<ImageStatus>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    const image = new Image();
    image.src = url;

    const onImageLoad = () => {
      setStatus({
        loaded: true,
        error: false,
      });
    };

    const onImageError = () => {
      setStatus({
        loaded: false,
        error: true,
      });
    };

    image.addEventListener('load', onImageLoad);
    image.addEventListener('error', onImageError);

    return () => {
      image.removeEventListener('load', onImageLoad);
      image.removeEventListener('error', onImageError);
    };
  }, [url]);

  return status;
}
