import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AboutNursery from './pages/AboutNursery';
import Collections from './pages/Collections';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-nursery" element={<AboutNursery />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
