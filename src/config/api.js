// API Configuration for Green Givers Nursery
// Handles both development and production environments

const API_CONFIG = {
  // Base API URL - uses environment variable or falls back to localhost
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  
  // Frontend URL
  FRONTEND_URL: process.env.REACT_APP_DOMAIN || 'http://localhost:3000',
  
  // Environment
  NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
  
  // API Endpoints
  ENDPOINTS: {
    PRODUCTS: '/api/products',
    EMAIL_VISIT: '/api/email/visit',
    EMAIL_PURCHASE: '/api/email/purchase',
    IMAGES_UPLOAD: '/api/images/upload',
    IMAGES: '/api/images',
    HEALTH: '/api/health'
  },

  //WhatsApp Contact Number
  WhatsAPPNum : process.env.WhatsAPPNum 
};

// Helper function to get full API URL
export const getApiUrl = (endpoint = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get image URL
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/400x300/4CAF50/white?text=🌱+Plant+Image';
  }
  
  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it starts with /api/images/, prepend backend URL
  if (imageUrl.startsWith('/api/images/')) {
    return `${API_CONFIG.BASE_URL}${imageUrl}`;
  }
  
  // If it starts with /uploads/, prepend backend URL
  if (imageUrl.startsWith('/uploads/')) {
    return `${API_CONFIG.BASE_URL}${imageUrl}`;
  }
  
  // If it's just a filename, assume it's in the images API
  if (!imageUrl.includes('/')) {
    return `${API_CONFIG.BASE_URL}/api/images/${imageUrl}`;
  }
  
  // Default case - prepend backend URL
  return `${API_CONFIG.BASE_URL}${imageUrl}`;
};

// Helper function for API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };
  
  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  }
  
  const config = {
    ...defaultOptions,
    ...options
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export default API_CONFIG;
