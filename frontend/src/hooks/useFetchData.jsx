import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const useFetchData = (url, options = {}) => {
  const { token: contextToken, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = contextToken || localStorage.getItem('token');
    if (!token) return;

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
          if (res.status === 401) {
            dispatch({ type: 'LOGOUT' });
            navigate('/login', { replace: true });
            return;
          }

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

    return () => controller.abort();
  }, [url, contextToken, navigate, dispatch]);

  return { data, loading, error };
};

export default useFetchData;