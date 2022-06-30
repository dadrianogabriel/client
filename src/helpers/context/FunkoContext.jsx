import { createContext, useState } from 'react';

const FunkoContext = createContext({});

export const FunkoProvider = ({ children }) => {
  const [funkos, setFunkos] = useState([]);

  return (
    <FunkoContext.Provider value={{ funkos, setFunkos }}>
      {children}
    </FunkoContext.Provider>
  );
};

export default FunkoContext;
