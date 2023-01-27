import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null | unknown;
  loading: boolean;
  retry: () => void;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: any;
  retries?: number;
  retryDelay?: number;
}

export default function useFetch<T>(
  url: string,
  options: FetchOptions = {},
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [loading, setLoading] = useState(false);
  const [retries] = useState(options.retries || 3);
  const [retryDelay] = useState(options.retryDelay || 1000);
  const [attempts, setAttempts] = useState(0);

  const retry = useCallback(() => {
    setAttempts(0);
    setLoading(true);
  }, []);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: options.method || 'GET',
          body: options.body,
          headers: options.headers,
        });
        const json = await response.json();
        if (!didCancel) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err);
          setLoading(false);
        }
      }
    };

    const retryFetch = async () => {
      if (attempts < retries) {
        setTimeout(() => {
          setAttempts((attempts) => attempts + 1);
          fetchData();
        }, retryDelay);
      } else {
        setError(new Error(`Failed after ${attempts} attempts`));
        setLoading(false);
      }
    };

    if (attempts === 0) {
      fetchData();
    } else {
      retryFetch();
    }

    return () => {
      didCancel = true;
    };
  }, [url, options, attempts, retries, retryDelay]);

  return { data, error, loading, retry };
}
