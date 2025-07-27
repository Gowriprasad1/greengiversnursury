import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-animation">
          <div className="plant-pot">
            <div className="pot"></div>
            <div className="plant">
              <div className="stem"></div>
              <div className="leaf leaf-1">🍃</div>
              <div className="leaf leaf-2">🍃</div>
              <div className="leaf leaf-3">🍃</div>
            </div>
          </div>
        </div>
        
        <div className="not-found-text">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Oops! Page Not Found</h2>
          <p className="error-message">
            The page you're looking for seems to have grown in a different garden. 
            Don't worry, let's get you back to our beautiful nursery!
          </p>
          
          <div className="error-actions">
            <Link to="/" className="home-btn">
              <span className="btn-icon">🏠</span>
              Back to Home
            </Link>
            <Link to="/collections" className="collections-btn">
              <span className="btn-icon">🌿</span>
              Browse Plants
            </Link>
          </div>
          
          <div className="helpful-links">
            <h3>Popular Pages:</h3>
            <div className="quick-links">
              <Link to="/collections" className="quick-link">
                <span className="link-icon">🌺</span>
                Plant Collections
              </Link>
              <Link to="/about" className="quick-link">
                <span className="link-icon">🏡</span>
                About Nursery
              </Link>
              <Link to="/meet-us" className="quick-link">
                <span className="link-icon">📞</span>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
