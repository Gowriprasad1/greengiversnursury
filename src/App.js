import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AboutNursery from './pages/AboutNursery';
import Collections from './pages/Collections';
import MeetUs from './pages/MeetUs';
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
            <Route path="/meet-us" element={<MeetUs />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              padding: '16px 20px',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
