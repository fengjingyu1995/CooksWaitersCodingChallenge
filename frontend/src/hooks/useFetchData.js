import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return {
    data,
  };
};

export default useFetchData;
