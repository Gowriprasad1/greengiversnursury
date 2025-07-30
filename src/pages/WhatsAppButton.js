import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6'; // WhatsApp icon

const WhatsAppButton = () => {
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER; // International format (91 = India)
  const defaultMessage = "Hi, I’m looking for more details about your service";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#25D366',
    color: 'white',
    borderRadius: '50%',
    padding: '15px',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default WhatsAppButton;
