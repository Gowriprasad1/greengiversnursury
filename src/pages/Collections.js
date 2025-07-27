import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Collections.css';

const Collections = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Load plants data from API, localStorage, or JSON
  useEffect(() => {
    const loadPlantsData = async () => {
      try {
        // First try to load from API server (most up-to-date)
        const response = await fetch('http://localhost:3001/api/plants');
        if (response.ok) {
          const data = await response.json();
          setPlants(data.plants || []);
          setCategories([
            { id: 'all', name: 'All Plants', icon: '🌿' },
            ...data.categories || []
          ]);
          return;
        }
      } catch (apiError) {
        console.log('API server not available, trying localStorage...');
      }

      try {
        // Fallback to localStorage (admin updates when offline)
        const savedPlants = localStorage.getItem('nursery_plants_data');
        if (savedPlants) {
          const savedData = JSON.parse(savedPlants);
          setPlants(savedData.plants || []);
          setCategories([
            { id: 'all', name: 'All Plants', icon: '🌿' },
            ...savedData.categories || []
          ]);
          return;
        }

        // Final fallback to JSON file
        const response = await fetch('/data/plants.json');
        const data = await response.json();
        setPlants(data.plants || []);
        setCategories([
          { id: 'all', name: 'All Plants', icon: '🌿' },
          ...data.categories || []
        ]);
      } catch (error) {
        console.error('Error loading plants data:', error);
        // Hardcoded fallback if everything fails
        setCategories([
          { id: 'all', name: 'All Plants', icon: '🌿' },
          { id: 'indoor', name: 'Indoor Plants', icon: '🏠' },
          { id: 'outdoor', name: 'Outdoor Plants', icon: '🌳' },
          { id: 'flowering', name: 'Flowering Plants', icon: '🌸' },
          { id: 'succulents', name: 'Succulents', icon: '🌵' },
          { id: 'herbs', name: 'Herbs', icon: '🌿' }
        ]);
      }
    };
    loadPlantsData();
  }, []);

  const hardcodedPlants = [
    // Indoor Plants
    {
      id: 1,
      name: 'Monstera Deliciosa',
      category: 'indoor',
      price: '₹899',
      image: 'https://www.gardendesign.com/pictures/images/900x705Max/dream-team-s-portland-garden_6/beauty-star-calathea-calathea-ornata-pinstripe-calathea-proven-winners_17336.jpg',
      description: 'Swiss Cheese Plant with iconic split leaves',
      details: 'Monstera Deliciosa, known as the Swiss Cheese Plant, features stunning fenestrated leaves that develop natural holes as it matures. This tropical beauty thrives in bright, indirect light and well-draining soil. A statement piece that brings jungle vibes to any interior space.'
    },
    {
      id: 2,
      name: 'Sansevieria (Snake Plant)',
      category: 'indoor',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Architectural succulent with sword-like leaves',
      details: 'Sansevieria, commonly known as Snake Plant or Mother-in-Law\'s Tongue, features striking upright leaves with yellow margins. This virtually indestructible plant tolerates low light and infrequent watering while purifying indoor air. Perfect for modern minimalist spaces.'
    },
    {
      id: 3,
      name: 'Spathiphyllum (Peace Lily)',
      category: 'indoor',
      price: '₹749',
      image: 'https://images.unsplash.com/photo-1583160247711-2191776b4b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Elegant white blooms with lush green foliage',
      details: 'Spathiphyllum, the Peace Lily, produces graceful white spathes that emerge from dark green foliage. This sophisticated houseplant indicates its watering needs by drooping slightly. Thrives in medium to low light and helps purify indoor air naturally.'
    },
    {
      id: 4,
      name: 'Ficus Elastica (Rubber Tree)',
      category: 'indoor',
      price: '₹699',
      image: 'https://images.unsplash.com/photo-1586093248292-4e6252f1b0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Glossy burgundy leaves with architectural presence',
      details: 'Ficus Elastica, the Rubber Tree, showcases thick, glossy leaves in deep green or burgundy tones. This stately plant can grow into an impressive indoor tree with proper care. Prefers bright, indirect light and moderate watering for optimal growth.'
    },
    
    // Outdoor Plants
    {
      id: 5,
      name: 'Rosa Damascena (Damask Rose)',
      category: 'outdoor',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Fragrant heritage roses with velvety petals',
      details: 'Rosa Damascena, the Damask Rose, is prized for its intense fragrance and beautiful double blooms. This heritage variety produces pink to deep red flowers used in perfumery and culinary applications. Thrives in full sun with well-draining soil and regular feeding.'
    },
    {
      id: 6,
      name: 'Lavandula Angustifolia (English Lavender)',
      category: 'outdoor',
      price: '₹449',
      image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Aromatic purple spikes with silvery foliage',
      details: 'Lavandula Angustifolia, English Lavender, produces fragrant purple flower spikes above silvery-green foliage. This Mediterranean herb is drought-tolerant and attracts beneficial pollinators. Perfect for borders, herb gardens, and creating calming aromatic landscapes.'
    },
    {
      id: 7,
      name: 'Bougainvillea',
      category: 'outdoor',
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Vibrant colorful bracts, drought tolerant',
      details: 'Bougainvillea is a drought-tolerant climbing plant known for its vibrant papery bracts in colors like magenta, purple, red, orange, and white. Perfect for hot climates, it requires full sun and minimal water once established. Great for walls, fences, and trellises.'
    },
    {
      id: 8,
      name: 'Hibiscus',
      category: 'outdoor',
      price: '₹649',
      image: 'https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Large tropical flowers in various colors',
      details: 'Hibiscus plants produce large, showy flowers in vibrant colors including red, pink, yellow, and white. They thrive in warm climates with full to partial sun. Regular watering and well-draining soil are essential. Blooms attract butterflies and hummingbirds.'
    },
    
    // Fruit Plants
    {
      id: 9,
      name: 'Mangifera Indica (Alphonso Mango)',
      category: 'fruits',
      price: '₹1899',
      image: 'https://images.unsplash.com/photo-1553279091-75a834b9c2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'King of fruits with exceptional sweetness',
      details: 'Mangifera Indica, the Alphonso Mango, is renowned as the finest mango variety. This grafted specimen produces large, aromatic fruits with creamy texture and rich flavor. Requires tropical climate, full sun, and well-draining soil. Bears fruit in 3-4 years.'
    },
    {
      id: 10,
      name: 'Citrus Limon (Meyer Lemon)',
      category: 'fruits',
      price: '₹1299',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Sweet-tart citrus with thin skin',
      details: 'Citrus Limon, the Meyer Lemon, produces thin-skinned, sweet-tart fruits year-round. This compact citrus tree is perfect for containers and small gardens. Requires full sun, well-draining soil, and protection from frost. Blooms are highly fragrant.'
    },
    {
      id: 11,
      name: 'Punica Granatum (Pomegranate)',
      category: 'fruits',
      price: '₹1599',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Antioxidant-rich ruby arils in ornamental tree',
      details: 'Punica Granatum produces jewel-like arils packed with antioxidants and vitamins. This drought-tolerant tree features beautiful orange-red flowers and attractive bark. Thrives in hot, dry climates with minimal water once established. Fruits store well.'
    },
    {
      id: 12,
      name: 'Psidium Guajava (Pink Guava)',
      category: 'fruits',
      price: '₹1199',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Vitamin C-rich tropical fruit with pink flesh',
      details: 'Psidium Guajava, Pink Guava, produces highly nutritious fruits with sweet pink flesh. This fast-growing tropical tree adapts to various soil conditions and climates. Rich in vitamin C and antioxidants. Bears fruit multiple times per year in suitable climates.'
    },
    
    // Flowering Plants
    {
      id: 13,
      name: 'Marigold',
      category: 'flowers',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Bright orange and yellow blooms',
      details: 'Marigolds are easy-to-grow annual flowers that bloom from spring until frost. They prefer full sun and well-drained soil. These vibrant flowers are excellent for borders, containers, and companion planting as they help repel garden pests naturally.'
    },
    {
      id: 14,
      name: 'Sunflower',
      category: 'flowers',
      price: '₹399',
      image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Tall, cheerful yellow flowers',
      details: 'Sunflowers are iconic tall flowers that can grow 6-10 feet high. They need full sun and well-drained soil. These cheerful flowers follow the sun throughout the day and produce edible seeds. Perfect for creating natural privacy screens.'
    },
    {
      id: 15,
      name: 'Dahlia',
      category: 'flowers',
      price: '₹549',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Large, colorful blooms in many varieties',
      details: 'Dahlias produce stunning large blooms in various colors and forms. They prefer full sun to partial shade and rich, well-draining soil. These flowers bloom from summer to fall and make excellent cut flowers for arrangements.'
    },
    {
      id: 16,
      name: 'Petunia',
      category: 'flowers',
      price: '₹349',
      image: 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Cascading flowers perfect for hanging baskets',
      details: 'Petunias are popular annual flowers perfect for hanging baskets and containers. They bloom continuously from spring to frost in colors like purple, pink, white, and red. They prefer full sun and regular watering for best performance.'
    },
    
    // Herbs & Medicinal
    {
      id: 17,
      name: 'Ocimum Sanctum (Holy Basil/Tulsi)',
      category: 'herbs',
      price: '₹199',
      image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Sacred herb with powerful medicinal properties',
      details: 'Ocimum Sanctum, Holy Basil or Tulsi, is revered in Ayurveda for its adaptogenic and therapeutic properties. This aromatic herb supports immune function and stress relief. Easy to grow in containers or gardens with regular watering and partial sun.'
    },
    {
      id: 18,
      name: 'Azadirachta Indica (Neem Tree)',
      category: 'herbs',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Nature\'s pharmacy with potent healing properties',
      details: 'Azadirachta Indica, the Neem Tree, is known as "Nature\'s Pharmacy" for its extensive medicinal uses. Every part of this tree has therapeutic value - leaves, bark, seeds, and oil. Drought-tolerant and fast-growing, perfect for natural pest control and health remedies.'
    },
    {
      id: 19,
      name: 'Aloe Barbadensis (Medicinal Aloe)',
      category: 'herbs',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1596375806330-b6129b3a1a0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Healing succulent with soothing gel',
      details: 'Aloe Barbadensis, true Medicinal Aloe, contains healing gel rich in vitamins and enzymes. This succulent treats burns, cuts, and skin conditions naturally. Requires minimal water and bright, indirect light. Essential for natural first aid and skincare.'
    },
    {
      id: 20,
      name: 'Mentha Piperita (Peppermint)',
      category: 'herbs',
      price: '₹149',
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Cooling herb for digestive wellness',
      details: 'Mentha Piperita, Peppermint, offers cooling menthol for digestive health and aromatherapy. This vigorous perennial spreads readily and prefers moist soil and partial shade. Perfect for teas, culinary use, and natural pest deterrent.'
    },
    // Additional Beautiful Plants
    {
      id: 21,
      name: 'Ficus Lyrata (Fiddle Leaf Fig)',
      category: 'indoor',
      image: 'https://images.unsplash.com/photo-1586093248292-4e6252f1b0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Dramatic large leaves, Instagram favorite',
      details: 'Ficus Lyrata, the Fiddle Leaf Fig, features large, violin-shaped leaves that make a bold architectural statement. This trendy houseplant prefers bright, indirect light and consistent watering. A stunning focal point for modern interiors.'
    },
    {
      id: 22,
      name: 'Alocasia Amazonica (Elephant Ear)',
      category: 'indoor',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Striking arrow-shaped leaves with white veins',
      details: 'Alocasia Amazonica showcases dramatic dark green leaves with prominent white veining. This tropical beauty requires high humidity and bright, indirect light. A true statement plant that brings exotic elegance to any space.'
    },
    {
      id: 23,
      name: 'Calathea Orbifolia',
      category: 'indoor',
      image: 'https://images.unsplash.com/photo-1509423350716-97f2360af2e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Large round leaves with silver stripes',
      details: 'Calathea Orbifolia features large, round leaves with beautiful silver-green striping. This prayer plant folds its leaves at night and requires high humidity. Perfect for adding tropical sophistication to indoor spaces.'
    },
    {
      id: 24,
      name: 'Strelitzia Nicolai (Bird of Paradise)',
      category: 'indoor',
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Tropical giant with banana-like leaves',
      details: 'Strelitzia Nicolai, the Bird of Paradise, produces large paddle-shaped leaves that can reach impressive heights indoors. This tropical showstopper loves bright light and regular watering. Creates an instant jungle atmosphere.'
    },
    {
      id: 25,
      name: 'Japanese Maple (Acer Palmatum)',
      category: 'outdoor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Delicate red foliage, stunning autumn colors',
      details: 'Acer Palmatum, Japanese Maple, offers delicate, deeply lobed leaves in shades of red, orange, and green. This ornamental tree provides spectacular autumn color and graceful form. Perfect for zen gardens and landscape focal points.'
    },
    {
      id: 26,
      name: 'Hydrangea Macrophylla',
      category: 'outdoor',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Large flower clusters in blue, pink, white',
      details: 'Hydrangea Macrophylla produces massive flower clusters that change color based on soil pH. These showy shrubs bloom from summer to fall and prefer partial shade with consistent moisture. Excellent for borders and cutting gardens.'
    },
    {
      id: 27,
      name: 'Passiflora Caerulea (Passion Vine)',
      category: 'outdoor',
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Exotic intricate flowers, fast-growing vine',
      details: 'Passiflora Caerulea produces incredibly intricate flowers with unique corona filaments. This fast-growing vine attracts butterflies and produces edible passion fruits. Perfect for trellises, fences, and creating vertical interest.'
    },
    {
      id: 28,
      name: 'Ficus Carica (Fig Tree)',
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Sweet Mediterranean figs, ornamental leaves',
      details: 'Ficus Carica produces sweet, nutritious figs twice per year in suitable climates. This Mediterranean tree features large, lobed leaves and attractive bark. Drought-tolerant once established and perfect for edible landscaping.'
    },
    {
      id: 29,
      name: 'Gardenia Jasminoides',
      category: 'flowers',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Intensely fragrant white blooms',
      details: 'Gardenia Jasminoides produces waxy white flowers with an intoxicating fragrance. This evergreen shrub blooms from late spring through summer and requires acidic soil and consistent moisture. A classic choice for fragrant gardens.'
    },
    {
      id: 30,
      name: 'Rosmarinus Officinalis (Rosemary)',
      category: 'herbs',
      image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Aromatic culinary herb with blue flowers',
      details: 'Rosmarinus Officinalis is a fragrant Mediterranean herb with needle-like leaves and small blue flowers. This drought-tolerant perennial is essential for cooking and has antioxidant properties. Perfect for herb gardens and containers.'
    }
  ];

  // Use dynamic plants data or fallback to hardcoded data
  const allPlants = plants.length > 0 ? plants : hardcodedPlants;
  
  const filteredPlants = selectedCategory === 'all' 
    ? allPlants 
    : allPlants.filter(plant => plant.category === selectedCategory);

  const handleQuickView = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true);
    setShowContactForm(false);
  };

  const handleContactForPurchase = (plant) => {
    setSelectedPlant(plant);
    setShowContactForm(true);
    setContactFormData({
      name: '',
      email: '',
      phone: '',
      quantity: 1,
      message: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlant(null);
    setShowContactForm(false);
    setContactFormData({
      name: '',
      email: '',
      phone: '',
      quantity: 1,
      message: ''
    });
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setContactFormData(prev => ({
      ...prev,
      phone: numericValue
    }));
    
    // Clear error when user starts typing
    if (formErrors.phone) {
      setFormErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!contactFormData.name.trim()) {
      errors.name = 'Name is required';
    } else if (contactFormData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (contactFormData.name.trim().length > 50) {
      errors.name = 'Name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(contactFormData.name.trim())) {
      errors.name = 'Name should only contain letters and spaces';
    }
    
    // Email validation
    if (!contactFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (contactFormData.email.length > 100) {
      errors.email = 'Email must be less than 100 characters';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, should be exactly 10 digits)
    if (contactFormData.phone.trim()) {
      if (contactFormData.phone.length !== 10) {
        errors.phone = 'Phone number must be exactly 10 digits';
      } else if (!/^[0-9]{10}$/.test(contactFormData.phone)) {
        errors.phone = 'Phone number should only contain digits';
      }
    }
    
    // Quantity validation
    if (!contactFormData.quantity || contactFormData.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1';
    } else if (contactFormData.quantity > 1000) {
      errors.quantity = 'Quantity must be less than 1000';
    }
    
    // Message validation (optional but if provided, should have reasonable length)
    if (contactFormData.message.trim() && contactFormData.message.trim().length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitPurchaseInquiry = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        duration: 4000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/send-purchase-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: contactFormData,
          plantDetails: {
            name: selectedPlant.name,
            category: selectedPlant.category,
            price: selectedPlant.price,
            image: selectedPlant.image
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('🌱 Thank you for your inquiry! We will contact you soon!', {
          duration: 4000,
          icon: '🌿',
        });
        closeModal();
      } else {
        toast.error('Failed to send inquiry. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Error sending purchase inquiry:', error);
      toast.error('Network error. Please check your connection and try again.', {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="collections">
      {/* Hero Section */}
      <section className="collections-hero">
        <div className="collections-hero-background"></div>
        <div className="container">
          <div className="collections-hero-content">
            <div className="professional-badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Professional Nursery Since 2020</span>
            </div>
            <h1 className="page-title">My Plant Collections</h1>
            <p className="page-subtitle">Discover our curated selection of premium plants from Kadiyam</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{allPlants.length}+</span>
                <span className="stat-label">Plant Varieties</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Quality Assured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Plant Care Support</span>
              </div>
            </div>
          </div>
          {/* <p className="hero-description">
            From indoor beauties to outdoor wonders, explore our carefully curated 
            collection of plants for every space and need.
          </p> */}
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plants Grid */}
      <section className="plants-grid-section section">
        <div className="container">
          <div className="plants-grid">
            {filteredPlants.map(plant => (
              <div key={plant.id} className="plant-card">
                <div className="plant-image">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="plant-photo"
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => e.target.style.opacity = '1'}
                    style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  />
                  <div className="plant-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => handleQuickView(plant)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="plant-info">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section section">
        <div className="container">
          <h2 className="section-title">Featured Collections</h2>
          <div className="featured-grid">
            <div className="featured-card">
              <div className="featured-icon">🏡</div>
              <h3>Indoor Paradise</h3>
              <p>Transform your home with our selection of air-purifying indoor plants</p>
              <button className="btn">Explore Indoor Plants</button>
            </div>
            <div className="featured-card">
              <div className="featured-icon">🌺</div>
              <h3>Garden Blooms</h3>
              <p>Create a colorful garden with our flowering plants and seasonal varieties</p>
              <button className="btn">Explore Flowers</button>
            </div>
            <div className="featured-card">
              <div className="featured-icon">🍎</div>
              <h3>Fruit Orchard</h3>
              <p>Grow your own fresh fruits with our healthy fruit trees and plants</p>
              <button className="btn">Explore Fruits</button>
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips Section */}
      <section className="care-tips section">
        <div className="container">
          <h2 className="section-title">Plant Care Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💧</div>
              <h3>Watering</h3>
              <p>Water when the top inch of soil feels dry. Different plants have different water needs.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">☀️</div>
              <h3>Lighting</h3>
              <p>Most plants need bright, indirect light. Avoid direct sunlight for indoor plants.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🌡️</div>
              <h3>Temperature</h3>
              <p>Keep plants in stable temperatures between 65-75°F for optimal growth.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🌱</div>
              <h3>Fertilizing</h3>
              <p>Feed your plants with balanced fertilizer during growing season (spring-summer).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-content">
            <h2 className="section-title">Why Choose Green Givers Nursery?</h2>
            <div className="trust-grid">
              <div className="trust-item">
                <div className="trust-icon">🏆</div>
                <h3>Expert Knowledge</h3>
                <p>Our team has years of experience in plant cultivation and care, ensuring you get the best advice.</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🚚</div>
                <h3>Safe Delivery</h3>
                <p>We ensure your plants arrive healthy and undamaged with our specialized packaging and delivery.</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">📞</div>
                <h3>24/7 Support</h3>
                <p>Get plant care guidance anytime through our Facebook page or direct contact for wholesale inquiries.</p>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🌱</div>
                <h3>Quality Guarantee</h3>
                <p>All our plants are carefully selected and nurtured to ensure they thrive in your space.</p>
              </div>
            </div>
            <div className="location-badge">
              <span className="location-icon">📍</span>
              <span>Located in Veeravaram, Kadiyam Road, Kadiyam Mandalam, Rajahmundry - 533126</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Details Modal */}
      {showModal && selectedPlant && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <div className="modal-image">
                <img 
                  src={selectedPlant.image} 
                  alt={selectedPlant.name}
                  className="modal-plant-photo"
                />
              </div>
              <div className="modal-info">
                {!showContactForm ? (
                  <>
                    <h2 className="modal-title">{selectedPlant.name}</h2>
                    <p className="modal-description">{selectedPlant.description}</p>
                    <div className="modal-details">
                      <h3>Plant Care Information:</h3>
                      <p>{selectedPlant.details || 'This beautiful plant will make a wonderful addition to your garden. Contact us for specific care instructions and planting tips.'}</p>
                    </div>
                    <div className="modal-actions">
                      <button className="contact-btn" onClick={() => handleContactForPurchase(selectedPlant)}>Contact for Purchase</button>
                      <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="modal-title">Contact Us for {selectedPlant.name}</h2>
                    <form className="contact-form" onSubmit={handleSubmitPurchaseInquiry}>
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={contactFormData.name}
                          onChange={handleInputChange}
                          minLength="2"
                          maxLength="50"
                          required 
                          className={formErrors.name ? 'error' : ''}
                        />
                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={contactFormData.email}
                          onChange={handleInputChange}
                          maxLength="100"
                          required 
                          className={formErrors.email ? 'error' : ''}
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="phone-input-container">
                          <span className="phone-prefix">+91</span>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={contactFormData.phone}
                            onChange={handlePhoneChange}
                            maxLength="10"
                            pattern="[0-9]{10}"
                            placeholder="Enter 10 digit number"
                            className={`phone-input ${formErrors.phone ? 'error' : ''}`}
                          />
                        </div>
                        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                        <small className="phone-help">Enter exactly 10 digits (e.g., 9876543210)</small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="quantity">Quantity Needed</label>
                        <input 
                          type="number" 
                          id="quantity" 
                          name="quantity" 
                          min="1" 
                          max="1000"
                          value={contactFormData.quantity}
                          onChange={handleInputChange}
                          className={formErrors.quantity ? 'error' : ''}
                        />
                        {formErrors.quantity && <span className="error-message">{formErrors.quantity}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="4" 
                          placeholder="Tell us about your requirements..."
                          value={contactFormData.message}
                          onChange={handleInputChange}
                          maxLength="500"
                          className={formErrors.message ? 'error' : ''}
                        ></textarea>
                        {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                        <small className={`char-count ${
                          contactFormData.message.length > 450 ? 'error' : 
                          contactFormData.message.length > 400 ? 'warning' : ''
                        }`}>
                          {contactFormData.message.length}/500 characters
                        </small>
                      </div>
                      <div className="modal-actions">
                        <button 
                          type="submit" 
                          className="submit-btn" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                        </button>
                        <button 
                          type="button" 
                          className="cancel-btn" 
                          onClick={closeModal}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
