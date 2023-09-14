import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Submit from './components/Submit/Submit';
import Test from './components/Test/Test';
import { AppProvider } from './utils/AppContext';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/submit' element={<Submit />} />
          <Route path='/test/:id' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
