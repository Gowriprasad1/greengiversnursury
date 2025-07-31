import React, { useState } from 'react';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaXmark,
  FaCommentDots
} from 'react-icons/fa6';

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const defaultMessage = "Hi, I’m looking for more details about your service";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  const instagramLink = 'https://www.instagram.com/greengiversnursery?igsh=MW9vdXpodzBtcWhnag==';
  const facebookLink = 'https://www.facebook.com/share/1H4DYadHwq/';

  return (
    <div style={styles.container}>
      {/* Facebook */}
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.icon,
          bottom: '200px',
          backgroundColor: '#1877F2',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <FaFacebookF size={20} />
      </a>

      {/* Instagram */}
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.icon,
          bottom: '140px',
          backgroundColor: '#E1306C',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <FaInstagram size={20} />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.icon,
          bottom: '80px',
          backgroundColor: '#25D366',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Toggle Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...styles.toggleButton,
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
        aria-label="Toggle chat options"
      >
        {open ? <FaXmark size={20} /> : <FaCommentDots size={20} />}
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  toggleButton: {
    backgroundColor: '#25D366',
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    width: '50px',
    height: '50px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: '0',
    color: 'white',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
};

export default WhatsAppButton;
