import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './MeetUs.css';

const MeetUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    plantInterest: '',
    message: '',
    visitType: 'consultation'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      phone: numericValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create promise for API call
    const submitPromise = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/send-visit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to send email');
        }
        
        return result;
      } catch (error) {
        console.error('Error sending visit email:', error);
        throw error;
      }
    };

    toast.promise(
      submitPromise(),
      {
        loading: 'Sending your visit request...',
        success: '🌱 Thank you! We\'ve received your request and will contact you soon!',
        error: (err) => `Failed to send request: ${err.message}`,
      },
      {
        style: {
          minWidth: '300px',
        },
        success: {
          duration: 5000,
          icon: '🌿',
        },
        error: {
          duration: 4000,
          icon: '❌',
        },
      }
    );

    // Reset form after successful submission
    submitPromise().then(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        plantInterest: '',
        message: '',
        visitType: 'consultation'
      });
    }).catch(() => {
      // Don't reset form on error so user can retry
      console.log('Form not reset due to submission error');
    });
  };

  return (
    <div className="meet-us">
      {/* Hero Section */}
      <section className="meet-us-hero">
        <div className="meet-us-hero-background"></div>
        <div className="container">
          <div className="meet-us-hero-content">
            <div className="professional-badge">
              <span className="badge-icon">🤝</span>
              <span className="badge-text">Let's Connect & Grow Together</span>
            </div>
            <h1 className="page-title">Meet Our Team</h1>
            <p className="page-subtitle">
              Connect with our plant experts and visit our beautiful nursery in Kadiyam
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="meet-us-feature-icon">📍</span>
                <span>Visit Our Nursery</span>
              </div>
              <div className="feature-item">
                <span className="meet-us-feature-icon">💬</span>
                <span>Expert Consultation</span>
              </div>
              <div className="feature-item">
                <span className="meet-us-feature-icon">🌱</span>
                <span>Plant Care Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                We'd love to meet you and help you find the perfect plants for your space.
              </p>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <h3>Visit Our Nursery</h3>
                  <p>Veeravaram, Kadiyam Road<br />Kadiyam Mandalam, Rajahmundry<br />Pin Code: 533126</p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📞</div>
                  <h3>Call Us</h3>
                  <p>+91 8341090735<br />+91 7569777592<br />Mon-Sun: 8:00 AM - 6:00 PM</p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <h3>Email Us</h3>
                  <p>greengiversnursery@gmail.com<br />For inquiries and support</p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📱</div>
                  <h3>Social Media</h3>
                  <p>Follow us on Facebook<br />@GreenGiversNursery</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <div className="form-header">
                <h3>Schedule Your Visit</h3>
                <p>Fill out the form below and our team will contact you to arrange your visit.</p>
              </div>
              
              <form className="professional-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <div className="phone-input-container">
                      <span className="phone-prefix">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        placeholder="Enter 10 digit number"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        className="phone-input"
                      />
                    </div>
                    <small className="phone-help">Enter exactly 10 digits (e.g., 9876543210)</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location">Your Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="visitType">Visit Type *</label>
                    <select
                      id="visitType"
                      name="visitType"
                      value={formData.visitType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="consultation">Plant Consultation</option>
                      <option value="purchase">Plant Purchase</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="tour">Nursery Tour</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="plantInterest">Plant Interest</label>
                    <input
                      type="text"
                      id="plantInterest"
                      name="plantInterest"
                      value={formData.plantInterest}
                      onChange={handleInputChange}
                      placeholder="Indoor plants, outdoor plants, etc."
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about your plant needs or any specific questions..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <span className="btn-icon">🌿</span>
                  Schedule Visit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-content">
            <h2 className="section-title">Meet Our Expert Team</h2>
            <p className="section-subtitle">
              Our passionate team of plant experts is here to help you succeed
            </p>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team Member" />
                </div>
                <h3>Rajesh Kumar</h3>
                <p className="member-role">Head Horticulturist</p>
                <p className="member-bio">15+ years of experience in plant cultivation and nursery management.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team Member" />
                </div>
                <h3>Priya Sharma</h3>
                <p className="member-role">Plant Care Specialist</p>
                <p className="member-bio">Expert in indoor plants and sustainable gardening practices.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team Member" />
                </div>
                <h3>Arjun Reddy</h3>
                <p className="member-role">Landscape Designer</p>
                <p className="member-bio">Specializes in creating beautiful outdoor spaces and garden designs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetUs;
