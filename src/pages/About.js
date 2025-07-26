import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & Head Botanist',
      emoji: '👨‍🌾',
      description: 'With 20+ years of experience in horticulture'
    },
    {
      name: 'Priya Sharma',
      role: 'Plant Care Specialist',
      emoji: '👩‍🌾',
      description: 'Expert in indoor and medicinal plants'
    },
    {
      name: 'Amit Patel',
      role: 'Landscape Designer',
      emoji: '👨‍💼',
      description: 'Creating beautiful garden landscapes'
    },
    {
      name: 'Sunita Devi',
      role: 'Customer Relations',
      emoji: '👩‍💼',
      description: 'Ensuring customer satisfaction always'
    }
  ];

  const values = [
    {
      icon: '🌱',
      title: 'Quality First',
      description: 'We ensure every plant meets our high-quality standards before reaching you'
    },
    {
      icon: '💚',
      title: 'Eco-Friendly',
      description: 'Sustainable practices in growing and packaging for a greener tomorrow'
    },
    {
      icon: '🤝',
      title: 'Customer Care',
      description: 'Dedicated support and guidance for all your gardening needs'
    },
    {
      icon: '🌍',
      title: 'Community',
      description: 'Building a community of plant lovers and environmental enthusiasts'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-background"></div>
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">About Green Givers</h1>
            <p className="page-subtitle">
              Nurturing Nature, Growing Dreams
            </p>
            <p className="hero-description">
              Founded with a passion for plants and a commitment to quality, 
              Green Givers Nursery has been serving garden enthusiasts for over two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Green Givers Nursery began as a small family business with a simple dream: 
                to make beautiful, healthy plants accessible to everyone. What started as a 
                small backyard nursery has grown into one of the region's most trusted plant 
                suppliers.
              </p>
              <p>
                Our journey has been rooted in the belief that every space, no matter how small, 
                can be transformed into a green paradise. From humble beginnings, we've expanded 
                our operations to several acres of production area, growing over a million plants 
                annually.
              </p>
              <p>
                Today, we're proud to serve thousands of customers, from individual garden 
                enthusiasts to large-scale landscaping projects, always maintaining our 
                commitment to quality and customer satisfaction.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span className="story-emoji">🌳🌺🌿</span>
                <p>Our Journey Since 2000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The passionate people behind Green Givers
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.emoji}</div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <div className="mission-text">
              <p className="mission-quote">
                "To Plant a garden is to believe in tomorrow"
              </p>
              <p>
                At Green Givers Nursery, our mission is to inspire and enable people to 
                create beautiful, sustainable green spaces. We believe that plants have 
                the power to transform not just our physical spaces, but our lives and 
                our planet.
              </p>
              <p>
                We are committed to providing the highest quality plants, expert guidance, 
                and exceptional service to help our customers succeed in their gardening 
                endeavors. Through our work, we aim to contribute to a greener, more 
                sustainable world for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
