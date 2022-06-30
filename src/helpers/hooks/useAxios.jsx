import { axiosInstance } from '../../api/api';
import { useState } from 'react';

export const useAxios = () => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async ({ endpoint, metodo, payload }) => {
    try {
      if (payload) {
        const { status, data } = await axiosInstance[metodo](
          endpoint,
          JSON.parse(payload)
        );
        setStatus(status);
        setData(data);
      } else {
        const { status, data } = await axiosInstance[metodo](endpoint);
        setStatus(status);
        setData(data);
      }
    } catch (error) {
      setStatus(error.request.status);
      setData(error.response.data);
    }
  };

  return { data, status, fetchData };
};
