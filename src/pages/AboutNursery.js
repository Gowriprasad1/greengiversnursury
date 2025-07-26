import React from 'react';
import './AboutNursery.css';

const AboutNursery = () => {
  const catalog = [
    { name: 'Fruit Plants', icon: '🍎', description: 'Fresh fruit trees and plants' },
    { name: 'Flower Plants', icon: '🌺', description: 'Beautiful flowering varieties' },
    { name: 'Ornamental Plants', icon: '🌿', description: 'Decorative garden plants' },
    { name: 'Avenue Trees', icon: '🌳', description: 'Large shade and street trees' },
    { name: 'Herbal Plants', icon: '🌱', description: 'Medicinal and aromatic herbs' },
    { name: 'Bonsai & Specialty', icon: '🎋', description: 'Unique miniature trees' },
    { name: 'Wood Plants', icon: '🌲', description: 'Timber and hardwood trees' },
    { name: 'Lawn Grass', icon: '🌾', description: 'Various grass varieties' },
    { name: 'Seeds & Accessories', icon: '🌰', description: 'Seeds, pots, and tools' }
  ];

  const facilities = [
    {
      title: 'Production Area',
      description: 'Several acres of dedicated growing space',
      icon: '🏞️'
    },
    {
      title: 'Greenhouse Complex',
      description: 'Climate-controlled growing environments',
      icon: '🏠'
    },
    {
      title: 'Nursery Beds',
      description: 'Organized plant cultivation areas',
      icon: '🌱'
    },
    {
      title: 'Water Management',
      description: 'Advanced irrigation and drainage systems',
      icon: '💧'
    },
    {
      title: 'Storage Facilities',
      description: 'Proper storage for seeds and equipment',
      icon: '🏪'
    },
    {
      title: 'Quality Control',
      description: 'Testing and inspection areas',
      icon: '🔍'
    }
  ];

  return (
    <div className="about-nursery">
      {/* Hero Section */}
      <section className="nursery-hero">
        <div className="nursery-hero-background"></div>
        <div className="container">
          <div className="nursery-hero-content">
            <h1 className="page-title">About Our Nursery</h1>
            <p className="page-subtitle">
              Where Plants Come to Life
            </p>
            <p className="hero-description">
              Discover our state-of-the-art nursery facilities where we grow, 
              nurture, and distribute over a million plants each year.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview section">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2 className="section-title">Our Nursery Overview</h2>
              <p>
                Green Givers Nursery is a grower and wholesale distributor of a wide range of plants 
                including Annual Flowers, Aquatic Plants, Aromatic Plants, Avenue Trees, Bamboos, 
                Cactus & Succulents, Climbers & Creepers, Flowering Plants, Fruit Plants, Gift Plants, 
                Ground Cover, Hanging Baskets, Hedges, Heliconia, Gingers & like plants, Indoor Plants, 
                Landscape Plants, Lawns, Lucky Bamboo, Lucky Plants, Medicinal Plants, Orchids, 
                Outdoor Plants, Palms n Cycads, Plumeria, Pot Plants, Shrubs, and more.
              </p>
              <p>
                Several acres of land is our production area to grow, manage, and distribute over a 
                million plants each year. We provide various ranges of plants and gardening accessories 
                in India. We deliver 5000+ nursery plants, seeds, pebbles, pots and accessories at 
                reasonable prices.
              </p>
              <p>
                With so many offerings and many new varieties added every week, you can take your pick 
                from our extensive collection.
              </p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Plant Varieties</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Plants Annually</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">20+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="catalog section">
        <div className="container">
          <h2 className="section-title">Our Catalog</h2>
          <p className="section-subtitle">
            Explore our comprehensive range of plants and accessories
          </p>
          <div className="catalog-grid">
            {catalog.map((item, index) => (
              <div key={index} className="catalog-card">
                <div className="catalog-icon">{item.icon}</div>
                <h3 className="catalog-title">{item.name}</h3>
                <p className="catalog-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities section">
        <div className="container">
          <h2 className="section-title">Our Facilities</h2>
          <p className="section-subtitle">
            Modern infrastructure for optimal plant growth
          </p>
          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div key={index} className="facility-card">
                <div className="facility-icon">{facility.icon}</div>
                <h3 className="facility-title">{facility.title}</h3>
                <p className="facility-description">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality section">
        <div className="container">
          <div className="quality-content">
            <h2 className="section-title">Quality Assurance</h2>
            <div className="quality-text">
              <p>
                In addition to our superior customer service, Green Givers Nursery strives to 
                provide the highest quality of plant material, ensuring that your customers will 
                be more than happy with your project results.
              </p>
              <p>
                "Gardening is not restricted to grow some plants in your backyard. Rather it is 
                an art of bringing plants to life and nurturing them to add a more natural look 
                to your outdoors."
              </p>
              <div className="quality-features">
                <div className="quality-feature">
                  <span className="feature-icon">✅</span>
                  <span>Expert Plant Selection</span>
                </div>
                <div className="quality-feature">
                  <span className="feature-icon">✅</span>
                  <span>Health Certification</span>
                </div>
                <div className="quality-feature">
                  <span className="feature-icon">✅</span>
                  <span>Proper Packaging</span>
                </div>
                <div className="quality-feature">
                  <span className="feature-icon">✅</span>
                  <span>Timely Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process section">
        <div className="container">
          <h2 className="section-title">Our Growing Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Seed Selection</h3>
                <p>We carefully select the finest seeds and saplings from trusted sources</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Nurturing</h3>
                <p>Expert care with optimal water, nutrients, and environmental conditions</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Quality Check</h3>
                <p>Rigorous quality inspection before plants are ready for distribution</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Distribution</h3>
                <p>Careful packaging and delivery to ensure plants reach you in perfect condition</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutNursery;
