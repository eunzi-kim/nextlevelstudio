import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Main from './Components/Main';
import Detail from './Components/Detail';

import './App.css';

function App() {
  return (
    <BrowserRouter>      
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/content/:id" element={<Detail />} />     
      </Routes>
    </BrowserRouter>

  );
}

export default App;
