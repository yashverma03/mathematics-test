import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [globalTimer, setGlobalTimer] = useState(0);
  const [questionTime, setQuestionTime] = useState(new Array(8).fill(0));

  const state = {
    name,
    setName,
    selectedQuestions,
    setSelectedQuestions,
    totalTime,
    setTotalTime,
    globalTimer,
    setGlobalTimer,
    questionTime, 
    setQuestionTime
  };

  useEffect(() => {
    if (globalTimer > 0) {
      const timerInterval = setInterval(() => {
        setGlobalTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (globalTimer === 0) {
        clearInterval(timerInterval);
      }

      return (() => {
        clearInterval(timerInterval);
      });
    }
  }, [globalTimer]);

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};
