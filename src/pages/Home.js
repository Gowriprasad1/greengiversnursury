import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🌳',
      title: 'Avenue Trees',
      description: 'Large shade trees perfect for streets and avenues',
      badges: ['Top Selling']
    },
    {
      icon: '🌸',
      title: 'Flower Plants',
      description: 'Beautiful flowering plants to brighten your garden',
      badges: ['Top Trending']
    },
    {
      icon: '🍎',
      title: 'Fruit Plants',
      description: 'Fresh fruit trees and plants for your home garden',
      badges: ['Top Trending']
    },
    {
      icon: '🪴',
      title: 'Indoor Plants',
      description: 'Perfect plants for indoor decoration and air purification',
      badges: ['Top Selling']
    },
    {
      icon: '🌱',
      title: 'Herbal Plants',
      description: 'Natural medicinal and aromatic plants',
      badges: ['Top Trending']
    },
    {
      icon: '🌲',
      title: 'Outdoor Plants',
      description: 'Hardy plants for your garden and landscape',
      badges: ['Top Trending']
    },
    {
      icon: '🎋',
      title: 'Bamboo & Specialty',
      description: 'Unique bamboo varieties and specialty plants',
      badges: ['Top Trending']
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="highlight">Green Givers</span> Nursery
              </h1>
              <p className="hero-subtitle">
                "To Plant a garden is to believe in tomorrow"
              </p>
              <p className="hero-description">
                Discover over 5000+ varieties of plants, from beautiful flowers to fresh fruits, 
                all grown with love and care in our nursery.
              </p>
              <div className="hero-buttons">
                <Link to="/collections" className="btn btn-primary">
                  Explore Collections
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span>Scroll Down</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Our Plant Categories</h2>
          <p className="section-subtitle">
            Explore our wide range of plants for every need and space
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="badges-container">
                  {feature.badges && feature.badges.map((badge, badgeIndex) => (
                    <div key={badgeIndex} className={`feature-badge ${
                      badge === 'Top Selling' ? 'badge-selling' : 
                      badge === 'Top Trending' ? 'badge-trending' : 'badge-default'
                    } badge-${badgeIndex}`}>
                      <span className="ribbon-text">
                        {badge === 'Top Selling' ? 'TOP SELLER' : badge === 'Top Trending' ? 'TRENDING' : badge}
                      </span>
                    </div>
                  ))}
                  {feature.badge && (
                    <div className={`feature-badge ${feature.badge === 'Top Selling' ? 'badge-selling' : 'badge-trending'}`}>
                      <span className="ribbon-text">
                        {feature.badge === 'Top Selling' ? 'TOP SELLER' : feature.badge === 'Top Trending' ? 'TRENDING' : feature.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Why Choose Green Givers?</h2>
              <p>
                Green Givers Nursery is a grower and wholesale distributor of a wide range of plants 
                including Annual Flowers, Aquatic Plants, Aromatic Plants, Avenue Trees, and much more. 
                With several acres of production area, we grow, manage, and distribute over a million 
                plants each year.
              </p>
              <ul className="benefits-list">
                <li>✅ Over 5000+ plant varieties</li>
                <li>✅ Wholesale and retail distribution</li>
                <li>✅ Expert care and guidance</li>
                <li>✅ Reasonable prices</li>
                <li>✅ Quality assurance</li>
              </ul>
              <Link to="/about-nursery" className="btn">
                Learn More About Our Nursery
              </Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span className="plant-emoji">🌺🌿🌱🍃</span>
                <p>Beautiful Nursery Garden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Garden Journey?</h2>
            <p>
              "Gardening is not restricted to grow some plants in your backyard. 
              Rather it is an art of bringing plants to life and nurturing them to add 
              a more natural look to your outdoors."
            </p>
            <Link to="/collections" className="btn btn-large">
              Browse Our Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
