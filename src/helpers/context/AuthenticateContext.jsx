import { createContext, useState } from 'react';

const AuthenticateContext = createContext({});

export const AuthenticateProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(null);

  return (
    <AuthenticateContext.Provider value={{ authenticate, setAuthenticate }}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateContext;
