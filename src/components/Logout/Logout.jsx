import { useAxios } from '../../helpers/hooks/useAxios';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export const Logout = () => {
  const { setAuthenticate } = useContext(AuthenticateContext);
  const { fetchData } = useAxios();

  useEffect(() => {
    const logoutFunction = async () => {
      await fetchData({ metodo: 'get', endpoint: '/auth/logout' });
    };
    logoutFunction();
    setAuthenticate(null);
  });

  return <Navigate to="/" replace />;
};
