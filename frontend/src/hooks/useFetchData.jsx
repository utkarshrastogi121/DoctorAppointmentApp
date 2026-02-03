import { useEffect, useState } from 'react';
import { token } from '../../config.js';

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          },
          signal: controller.signal,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || 'Something went wrong');
        }

        setData(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cancel request on unmount
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
