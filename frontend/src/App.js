import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Stats from './Stats';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/products">Products</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
