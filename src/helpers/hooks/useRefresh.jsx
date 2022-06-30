import { axiosInstance } from '../../api/api';
import { useContext } from 'react';
import AuthenticateContext from '../context/AuthenticateContext';

export const useRefresh = () => {
  const { setAuthenticate } = useContext(AuthenticateContext);

  const refresh = async () => {
    const { data } = await axiosInstance.get('/refresh', {
      withCredentials: true
    });
    setAuthenticate(data);

    return data.accessToken;
  };

  return refresh;
};
