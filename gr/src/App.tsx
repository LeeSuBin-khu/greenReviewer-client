import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from './pages/Main';
import ProductDetail from './pages/ProductDetail';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}/>
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
