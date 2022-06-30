import { useContext, useEffect } from 'react';
import AuthenticateContext from '../context/AuthenticateContext';
import { useRefresh } from './useRefresh';
import { axiosInstance } from '../../api/api';

export const useAxiosPrivado = () => {
  const { authenticate, setAuthenticate } = useContext(AuthenticateContext);
  const refresh = useRefresh();

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${authenticate?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const requestAntiga = error?.config;

        if (error?.response?.status === 403 && !requestAntiga?.sent) {
          requestAntiga.sent = true;
          const novoToken = await refresh();
          setAuthenticate({ ...authenticate, accessToken: novoToken });
          requestAntiga.headers['Authorization'] = `Bearer ${novoToken}`;
          return axiosInstance(requestAntiga);
        }
        return Promise.reject(error);
      }
    );
  }, [authenticate, refresh]);

  return axiosInstance;
};
