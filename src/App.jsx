import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Submit from './components/Submit/Submit';
import Test from './components/Test/Test';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/submit' element={<Submit />} />
        <Route path='/test/:id' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
