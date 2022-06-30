import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';

export const VerificarLogin = () => {
  const { authenticate } = useContext(AuthenticateContext);

  return authenticate ? <Outlet /> : <Navigate to="/login" replace />;
};
