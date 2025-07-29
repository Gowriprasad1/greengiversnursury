import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getApiUrl } from '../config/api';
import './MeetUs.css';

const MeetUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    plantInterest: '',
    message: '',
    visitType: 'consultation',
    date: '',
    time: ''
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
        const response = await fetch(getApiUrl('/api/email/visit'), {
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time *</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="09:00AM">9:00 AM</option>
                      <option value="10:00AM">10:00 AM</option>
                      <option value="11:00AM">11:00 AM</option>
                      <option value="12:00PM">12:00 PM</option>
                      <option value="1:00PM">1:00 PM</option>
                      <option value="2:00PM">2:00 PM</option>
                      <option value="3:00PM">3:00 PM</option>
                      <option value="4:00PM">4:00 PM</option>
                      <option value="5:00PM">5:00 PM</option>
                    </select>
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
                  <img src="https://scontent.fblr24-4.fna.fbcdn.net/v/t1.6435-9/148103202_1770793469767838_4256226458679595732_n.jpg?stp=c240.0.960.960a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=52bb43&_nc_ohc=s9iODIMOXfoQ7kNvwGAM27P&_nc_oc=AdlfKtpSpJOWdSr4U0hWkcHqLop7DHX1WW260UQD6wuXKKeDd8B4UjxKxUnRUSFdmQw&_nc_zt=23&_nc_ht=scontent.fblr24-4.fna&_nc_gid=5P5gV8L297zt3ogsWojorw&oh=00_AfQMLhgS-3xTB0In-j8JFit8gb1v8cPc7G2VWUgsbyzo2Q&oe=68ADCD76" alt="Team Member" />
                </div>
                <h3>Tarun</h3>
                <p className="member-role">Head Horticulturist</p>
                <p className="member-bio">10+ years of experience in plant cultivation and nursery management.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="data:image/png;base64,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" alt="Team Member" />
                </div>
                <h3>Satyannarayan</h3>
                <p className="member-role">Plant Care Specialist</p>
                <p className="member-bio">Expert in indoor plants and sustainable gardening practices.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src="data:image/png;base64,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" alt="Team Member" />
                </div>
                <h3>Arjun</h3>
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
