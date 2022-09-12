import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from './pages/Main';
import ProductDetail from './pages/ProductDetail';
import GNB from './components/gnb/GNB';

import './App.css';
import './assets/css/setting.css';

function App() {
  return (
    <div className="App">
      <GNB />
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
