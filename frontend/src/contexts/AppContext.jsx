// AppContext.js
import { createContext, useState } from 'react';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  // Initialize the state for currentDayIdx
  const [currentDayIdx, setCurrentDayIdx] = useState(0);

  return (
    <AppContext.Provider value={{ currentDayIdx, setCurrentDayIdx }}>
      {children}
    </AppContext.Provider>
  );
};
