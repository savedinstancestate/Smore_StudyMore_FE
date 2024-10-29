import React, { createContext, useState, useContext } from 'react';

const HeaderStudyNameContext = createContext();

export const useHeaderStudyName = () => useContext(HeaderStudyNameContext);

export const StudyNameProvider = ({ children }) => {
  const [headerStudyName, setHeaderStudyName] = useState(''); 

  return (
    <HeaderStudyNameContext.Provider value={{ headerStudyName, setHeaderStudyName }}>
      {children}
    </HeaderStudyNameContext.Provider>
  );
};
