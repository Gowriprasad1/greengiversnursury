import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getApiUrl, getImageUrl, apiRequest } from '../config/api';
import './Admin.css';

const Admin = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return 'https://via.placeholder.com/400x300/4CAF50/white?text=🌱+Plant+Image';
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it starts with /api/images/, prepend backend URL
    if (imageUrl.startsWith('/api/images/')) {
      return `http://localhost:3001${imageUrl}`;
    }
    
    // If it starts with /uploads/, prepend backend URL
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:3001${imageUrl}`;
    }
    
    // If it's just a filename, construct the full URL
    if (!imageUrl.includes('/')) {
      return `http://localhost:3001/api/images/${imageUrl}`;
    }
    
    // Fallback to placeholder
    return 'https://via.placeholder.com/400x300/4CAF50/white?text=🌱+Plant+Image';
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  
  // Enhanced image handling state
  const [imageUploadType, setImageUploadType] = useState('url'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'indoor',
    price: '',
    image: '',
    description: '',
    details: '',
    botanicalName: '',
    careLevel: 'Easy',
    lightRequirement: '',
    wateringFrequency: '',
    humidity: '',
    temperature: '',
    fertilizer: '',
    toxicity: '',
    origin: '',
    maxHeight: '',
    potSize: 'Medium',
    soilType: '',
    propagation: '',
    commonProblems: '',
    benefits: '',
    seasonality: 'Year-round',
    repottingFrequency: '',
    pruningNeeds: '',
    petFriendly: false,
    airPurifying: false,
    lowMaintenance: false,
    flowering: false,
    fragrant: false,
    edible: false,
    medicinal: false
  });


  const loadPlantsData = useCallback(async () => {
    try {
      // Set predefined categories that match backend enum
      const predefinedCategories = [
        { id: 'Avenue Trees', name: 'Avenue Trees', icon: '🌳' },
        { id: 'Fruit Plants', name: 'Fruit Plants', icon: '🍎' },
        { id: 'Flower Plants', name: 'Flower Plants', icon: '🌸' },
        { id: 'Ornamental Plants', name: 'Ornamental Plants', icon: '🌺' },
        { id: 'Indoor Plants', name: 'Indoor Plants', icon: '🏠' },
        { id: 'Outdoor Plants', name: 'Outdoor Plants', icon: '🌳' },
        { id: 'Herbal Plants', name: 'Herbal Plants', icon: '🌿' },
        { id: 'Bonsai & Specialty', name: 'Bonsai & Specialty', icon: '🌲' },
        { id: 'Wood Plants', name: 'Wood Plants', icon: '🌴' },
        { id: 'Lawn Grass', name: 'Lawn Grass', icon: '🌱' }
      ];
      setCategories(predefinedCategories);

      // Try to load from MongoDB API first (production/development)
      const response = await fetch('http://localhost:3001/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPlants(data.data || []);
          setLoading(false);
          toast.success('🌱 Loaded plants data from database!', {
            duration: 2000,
            icon: '🔄',
          });
          return;
        }
      }
    } catch (apiError) {
      console.log('MongoDB API not available, trying fallback...');
    }

    try {
      // Fallback to localStorage
      const savedPlants = localStorage.getItem('nursery_plants_data');
      if (savedPlants) {
        const savedData = JSON.parse(savedPlants);
        setPlants(savedData.plants || []);
        setCategories([
          { id: 'all', name: 'All Plants', icon: '🌿' },
          ...savedData.categories || []
        ]);
        toast.success('🌱 Loaded from local storage!', {
          duration: 2000,
          icon: '💾',
        });
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
      
      // Save to localStorage for offline access
      saveToLocalStorage(data.plants, data.categories);
      
      toast.success('🌱 Loaded from JSON file!', {
        duration: 2000,
        icon: '📁',
      });
    } catch (error) {
      console.error('Error loading plants data:', error);
      toast.error('Failed to load plants data');
      setLoading(false);
    }
  }, []);

  // Enhanced Image Handling Functions
  const handleImageTypeChange = (type) => {
    setImageUploadType(type);
    setSelectedFile(null);
    setImagePreview('');
    if (type === 'url') {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToGridFS = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setUploadingImage(true);
      const response = await fetch('http://localhost:3001/api/images/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Image uploaded successfully!');
        return result.data;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image: ' + error.message);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  // Load plants data on component mount
  useEffect(() => {
    loadPlantsData();
  }, [loadPlantsData]);

  // Save data to localStorage for persistence
  const saveToLocalStorage = (plantsData, categoriesData) => {
    const dataToSave = {
      plants: plantsData,
      categories: categoriesData,
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalPlants: plantsData.length,
        totalCategories: categoriesData.length
      }
    };
    localStorage.setItem('nursery_plants_data', JSON.stringify(dataToSave));
  };

  // Export data as JSON file for download
  const exportToJSON = () => {
    const dataToExport = {
      plants,
      categories: categories.filter(cat => cat.id !== 'all'),
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalPlants: plants.length,
        totalCategories: categories.filter(cat => cat.id !== 'all').length
      }
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plants.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('📁 Plants data exported successfully!', {
      duration: 3000,
      icon: '💾',
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'indoor',
      price: '',
      image: '',
      description: '',
      details: '',
      botanicalName: '',
      careLevel: 'Easy',
      lightRequirement: '',
      wateringFrequency: '',
      humidity: '',
      temperature: '',
      fertilizer: '',
      toxicity: '',
      origin: '',
      maxHeight: '',
      potSize: 'Medium',
      soilType: '',
      propagation: '',
      commonProblems: '',
      benefits: '',
      seasonality: 'Year-round',
      repottingFrequency: '',
      pruningNeeds: '',
      petFriendly: false,
      airPurifying: false,
      lowMaintenance: false,
      flowering: false,
      fragrant: false,
      edible: false,
      medicinal: false
    });
    
    // Reset image handling state
    setImageUploadType('url');
    setSelectedFile(null);
    setImagePreview('');
    setUploadingImage(false);
    
    setEditingPlant(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let finalImageData = {
        image: formData.image,
        imageType: 'url',
        imageMetadata: {}
      };
      
      // Handle file upload if a file is selected
      if (imageUploadType === 'file' && selectedFile) {
        const uploadResult = await uploadImageToGridFS(selectedFile);
        finalImageData = {
          image: uploadResult.imageUrl,
          imageType: 'gridfs',
          imageMetadata: {
            filename: uploadResult.filename,
            fileId: uploadResult.fileId,
            originalName: uploadResult.originalName,
            size: uploadResult.size,
            contentType: uploadResult.contentType
          }
        };
      }
      
      const plantData = {
        ...formData,
        ...finalImageData,
        id: editingPlant ? editingPlant.id : Date.now(),
        createdAt: editingPlant ? editingPlant.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

    try {
      // Try to save to MongoDB API first
      let apiSuccess = false;
      
      if (editingPlant) {
        // Update existing plant via API
        try {
          const response = await fetch(`http://localhost:3001/api/products/${editingPlant._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(plantData)
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              const updatedPlants = plants.map(plant => 
                (plant._id || plant.id) === (editingPlant._id || editingPlant.id) ? result.data : plant
              );
              setPlants(updatedPlants);
              apiSuccess = true;
              
              toast.success('🌱 Plant updated in database!', {
                duration: 3000,
                icon: '✅',
              });
            }
          }
        } catch (apiError) {
          console.log('MongoDB API update failed, using localStorage...');
        }
      } else {
        // Add new plant via API
        try {
          const response = await fetch('http://localhost:3001/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(plantData)
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              const updatedPlants = [...plants, result.data];
              setPlants(updatedPlants);
              apiSuccess = true;
              
              toast.success('🌿 Plant added to database!', {
                duration: 3000,
                icon: '🎉',
              });
            }
          }
        } catch (apiError) {
          console.log('MongoDB API add failed, using localStorage...');
        }
      }
      
      // Fallback to localStorage if API fails
      if (!apiSuccess) {
        let updatedPlants;
        if (editingPlant) {
          updatedPlants = plants.map(plant => 
            (plant._id || plant.id) === (editingPlant._id || editingPlant.id) ? plantData : plant
          );
          toast.success('🌱 Plant updated locally!', {
            duration: 3000,
            icon: '✅',
          });
        } else {
          updatedPlants = [...plants, plantData];
          toast.success('🌿 Plant added locally!', {
            duration: 3000,
            icon: '🎉',
          });
        }
        
        setPlants(updatedPlants);
        
        // Save to localStorage as fallback
        const categoriesWithoutAll = categories.filter(cat => cat.id !== 'all');
        saveToLocalStorage(updatedPlants, categoriesWithoutAll);
        
        toast.success('💾 Saved locally! Use Export to get JSON file', {
          duration: 3000,
          icon: '⚠️',
        });
      } else {
        // Also save to localStorage for offline access
        const categoriesWithoutAll = categories.filter(cat => cat.id !== 'all');
        saveToLocalStorage(plants, categoriesWithoutAll);
        
        toast.success('💾 Saved to database & plants.json file!', {
          duration: 3000,
          icon: '✅',
        });
      }
      
      resetForm();
    } catch (innerError) {
      console.error('Error saving to API/localStorage:', innerError);
      toast.error('Failed to save plant to database');
    }
    
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('Failed to process form: ' + error.message);
    }
  };

  const handleEdit = (plant) => {
    setEditingPlant(plant);
    setFormData({ ...plant });
    setShowAddForm(true);
  };

  const handleDelete = async (plantId) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        // Try to delete via MongoDB API first
        let apiSuccess = false;
        
        try {
          const response = await fetch(`http://localhost:3001/api/products/${plantId}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              const updatedPlants = plants.filter(plant => plant._id !== plantId);
              setPlants(updatedPlants);
              apiSuccess = true;
              
              toast.success('🗑️ Plant deleted from database!', {
                duration: 3000,
                icon: '✅',
              });
            }
          }
        } catch (apiError) {
          console.log('API delete failed, using localStorage...');
        }
        
        // Fallback to localStorage if API fails
        if (!apiSuccess) {
          const updatedPlants = plants.filter(plant => plant.id !== plantId);
          setPlants(updatedPlants);
          
          // Save to localStorage as fallback
          const categoriesWithoutAll = categories.filter(cat => cat.id !== 'all');
          saveToLocalStorage(updatedPlants, categoriesWithoutAll);
          
          toast.success('🗑️ Plant deleted locally!', {
            duration: 3000,
            icon: '✅',
          });
          
          toast.success('💾 Saved locally! Use Export to get updated JSON', {
            duration: 3000,
            icon: '⚠️',
          });
        } else {
          // Also update localStorage for offline access
          const categoriesWithoutAll = categories.filter(cat => cat.id !== 'all');
          saveToLocalStorage(plants.filter(plant => plant.id !== plantId), categoriesWithoutAll);
          
          toast.success('💾 Database & plants.json updated!', {
            duration: 2000,
            icon: '✅',
          });
        }
      } catch (error) {
        console.error('Error deleting plant:', error);
        toast.error('Failed to delete plant');
      }
    }
  };

  return (
    <div className="admin-panel">
      {/* Admin Header */}
      <section className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1 className="admin-title">🌱 Plant Management System</h1>
            <p className="admin-subtitle">Manage your nursery's plant collection</p>
            <div className="admin-stats">
              <div className="stat-card">
                <span className="stat-number">{plants.length}</span>
                <span className="stat-label">Total Plants</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Controls */}
      <section className="admin-controls">
        <div className="container">
          <div className="controls-header">
            <h2>Plant Management</h2>
            <div className="admin-actions">
              <button 
                className="export-btn"
                onClick={exportToJSON}
                title="Export plants data as JSON file"
              >
                <span className="btn-icon">📁</span>
                Export JSON
              </button>
              <button 
                className="add-plant-btn"
                onClick={() => setShowAddForm(true)}
              >
                <span className="btn-icon">➕</span>
                Add New Plant
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="plant-form-modal">
              <div className="form-container">
                <div className="form-header">
                  <h3>{editingPlant ? 'Edit Plant' : 'Add New Plant'}</h3>
                  <button className="a-close-btn" onClick={resetForm}>✕</button>
                </div>

                <form className="plant-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* Basic Information */}
                    <div className="form-section">
                      <h4>Basic Information</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Plant Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Monstera Deliciosa"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="botanicalName">Botanical Name</label>
                          <input
                            type="text"
                            id="botanicalName"
                            name="botanicalName"
                            value={formData.botanicalName}
                            onChange={handleInputChange}
                            placeholder="e.g., Monstera Deliciosa"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="category">Category *</label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="price">Price *</label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., ₹899"
                          />
                        </div>
                      </div>

                      {/* Enhanced Image Handling */}
                      <div className="form-group image-upload-section">
                        <label>Plant Image *</label>
                        
                        {/* Image Upload Type Selector */}
                        <div className="image-type-selector">
                          <button
                            type="button"
                            className={`type-btn ${imageUploadType === 'url' ? 'active' : ''}`}
                            onClick={() => handleImageTypeChange('url')}
                          >
                            🔗 Image URL
                          </button>
                          <button
                            type="button"
                            className={`type-btn ${imageUploadType === 'file' ? 'active' : ''}`}
                            onClick={() => handleImageTypeChange('file')}
                          >
                            📁 Upload File
                          </button>
                        </div>

                        {/* URL Input */}
                        {imageUploadType === 'url' && (
                          <div className="url-input-section">
                            <input
                              type="url"
                              id="image"
                              name="image"
                              value={formData.image}
                              onChange={handleInputChange}
                              required={imageUploadType === 'url'}
                              placeholder="https://images.unsplash.com/..."
                              className="image-url-input"
                            />
                          </div>
                        )}

                        {/* File Upload */}
                        {imageUploadType === 'file' && (
                          <div className="file-upload-section">
                            <input
                              type="file"
                              id="imageFile"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="file-input"
                              required={imageUploadType === 'file' && !selectedFile}
                            />
                            <label htmlFor="imageFile" className="file-input-label">
                              {selectedFile ? (
                                <span>📷 {selectedFile.name}</span>
                              ) : (
                                <span>📁 Choose Image File (Max 5MB)</span>
                              )}
                            </label>
                            {uploadingImage && (
                              <div className="upload-progress">
                                <span>⏳ Uploading image...</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Image Preview */}
                        {(imagePreview || (imageUploadType === 'url' && formData.image)) && (
                          <div className="image-preview-section">
                            <label>Preview:</label>
                            <div className="image-preview">
                              <img
                                src={imagePreview || formData.image}
                                alt="Plant preview"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Short Description *</label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          placeholder="Brief description for plant cards"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="details">Detailed Description</label>
                        <textarea
                          id="details"
                          name="details"
                          value={formData.details}
                          onChange={handleInputChange}
                          rows="4"
                          placeholder="Detailed plant information for modal"
                        />
                      </div>
                    </div>

                    {/* Care Information */}
                    <div className="form-section">
                      <h4>Care Information</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="careLevel">Care Level</label>
                          <select
                            id="careLevel"
                            name="careLevel"
                            value={formData.careLevel}
                            onChange={handleInputChange}
                          >
                            <option value="Easy">Easy</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lightRequirement">Light Requirement</label>
                          <input
                            type="text"
                            id="lightRequirement"
                            name="lightRequirement"
                            value={formData.lightRequirement}
                            onChange={handleInputChange}
                            placeholder="e.g., Bright, indirect light"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="wateringFrequency">Watering Frequency</label>
                          <input
                            type="text"
                            id="wateringFrequency"
                            name="wateringFrequency"
                            value={formData.wateringFrequency}
                            onChange={handleInputChange}
                            placeholder="e.g., Weekly"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="humidity">Humidity</label>
                          <input
                            type="text"
                            id="humidity"
                            name="humidity"
                            value={formData.humidity}
                            onChange={handleInputChange}
                            placeholder="e.g., 40-60%"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="temperature">Temperature</label>
                          <input
                            type="text"
                            id="temperature"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleInputChange}
                            placeholder="e.g., 18-24°C"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="potSize">Pot Size</label>
                          <select
                            id="potSize"
                            name="potSize"
                            value={formData.potSize}
                            onChange={handleInputChange}
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Plant Properties */}
                    <div className="form-section">
                      <h4>Plant Properties</h4>
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="petFriendly"
                            checked={formData.petFriendly}
                            onChange={handleInputChange}
                          />
                          <span>Pet Friendly</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="airPurifying"
                            checked={formData.airPurifying}
                            onChange={handleInputChange}
                          />
                          <span>Air Purifying</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="lowMaintenance"
                            checked={formData.lowMaintenance}
                            onChange={handleInputChange}
                          />
                          <span>Low Maintenance</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="flowering"
                            checked={formData.flowering}
                            onChange={handleInputChange}
                          />
                          <span>Flowering</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="fragrant"
                            checked={formData.fragrant}
                            onChange={handleInputChange}
                          />
                          <span>Fragrant</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="edible"
                            checked={formData.edible}
                            onChange={handleInputChange}
                          />
                          <span>Edible</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={resetForm}>
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      <span className="btn-icon">💾</span>
                      {editingPlant ? 'Update Plant' : 'Add Plant'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Plants List */}
          <div className="plants-list">
            <div className="list-header">
              <h3>Current Plants ({plants.length})</h3>
            </div>
            
            {loading ? (
              <div className="loading-message">
                <p>🌱 Loading plants...</p>
              </div>
            ) : (
              <div className="plants-grid">
                {plants && plants.filter(plant => plant && (plant.id || plant._id)).map(plant => (
                <div key={plant.id || plant._id} className="plant-admin-card">
                  <div className="plant-image">
                    <img 
                      src={getImageUrl(plant.image)} 
                      alt={plant.name || 'Plant'} 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200/4CAF50/white?text=🌱';
                      }}
                    />
                    <div className="plant-category">{plant.category || 'Unknown'}</div>
                  </div>
                  <div className="plant-info">
                    <h4>{plant.name || 'Unnamed Plant'}</h4>
                    <p className="plant-price">₹{plant.price || '0'}</p>
                    <p className="plant-description">{plant.description || 'No description available'}</p>
                    <div className="plant-properties">
                      {plant.airPurifying && <span className="property">🌬️ Air Purifying</span>}
                      {plant.petFriendly && <span className="property">🐕 Pet Friendly</span>}
                      {plant.lowMaintenance && <span className="property">🌿 Low Maintenance</span>}
                    </div>
                  </div>
                  <div className="plant-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(plant)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(plant._id || plant.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
