import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Green Givers Nursery</h3>
            <p>Wholesale distributor of wide range of plants located at Kadiyam. Your trusted partner for premium quality plants and gardening solutions.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/Greengiversnursery" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="WhatsApp">📱</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/about-nursery">About Nursery</a></li>
              <li><a href="/collections">My Collections</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Our Catalog</h4>
            <ul>
              <li>Fruit Plants</li>
              <li>Flower Plants</li>
              <li>Ornamental Plants</li>
              <li>Indoor Plants</li>
              <li>Outdoor Plants</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 Kadiyam, Andhra Pradesh, India</p>
            <p>📞 Contact via Facebook for Wholesale</p>
            <p>✉️ facebook.com/Greengiversnursery</p>
            <p>🌱 Wide Range of Plants Available</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Green Givers Nursery. All rights reserved.</p>
          <p>Designed with 💚 for nature lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
