const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Import email service
const { sendVisitScheduleEmail, sendPurchaseInquiryEmail, testEmailConfiguration } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Path to plants.json file
const PLANTS_FILE_PATH = path.join(__dirname, 'public', 'data', 'plants.json');

// Helper function to read plants data
const readPlantsData = async () => {
  try {
    const data = await fs.readFile(PLANTS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading plants data:', error);
    throw error;
  }
};

// Helper function to write plants data
const writePlantsData = async (data) => {
  try {
    await fs.writeFile(PLANTS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log('Plants data successfully written to file');
  } catch (error) {
    console.error('Error writing plants data:', error);
    throw error;
  }
};

// GET - Fetch all plants data
app.get('/api/plants', async (req, res) => {
  try {
    const data = await readPlantsData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read plants data' });
  }
});

// POST - Add new plant
app.post('/api/plants', async (req, res) => {
  try {
    const newPlant = req.body;
    const data = await readPlantsData();
    
    // Add new plant with unique ID
    newPlant.id = Date.now();
    newPlant.createdAt = new Date().toISOString();
    newPlant.updatedAt = new Date().toISOString();
    
    data.plants.push(newPlant);
    
    // Update metadata
    data.metadata.totalPlants = data.plants.length;
    data.metadata.lastUpdated = new Date().toISOString();
    
    await writePlantsData(data);
    
    res.json({ 
      success: true, 
      message: 'Plant added successfully',
      plant: newPlant,
      totalPlants: data.plants.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add plant' });
  }
});

// PUT - Update existing plant
app.put('/api/plants/:id', async (req, res) => {
  try {
    const plantId = parseInt(req.params.id);
    const updatedPlant = req.body;
    const data = await readPlantsData();
    
    const plantIndex = data.plants.findIndex(plant => plant.id === plantId);
    
    if (plantIndex === -1) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    
    // Update plant data
    updatedPlant.id = plantId;
    updatedPlant.updatedAt = new Date().toISOString();
    updatedPlant.createdAt = data.plants[plantIndex].createdAt; // Preserve original creation date
    
    data.plants[plantIndex] = updatedPlant;
    
    // Update metadata
    data.metadata.lastUpdated = new Date().toISOString();
    
    await writePlantsData(data);
    
    res.json({ 
      success: true, 
      message: 'Plant updated successfully',
      plant: updatedPlant
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// DELETE - Remove plant
app.delete('/api/plants/:id', async (req, res) => {
  try {
    const plantId = parseInt(req.params.id);
    const data = await readPlantsData();
    
    const plantIndex = data.plants.findIndex(plant => plant.id === plantId);
    
    if (plantIndex === -1) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    
    const deletedPlant = data.plants[plantIndex];
    data.plants.splice(plantIndex, 1);
    
    // Update metadata
    data.metadata.totalPlants = data.plants.length;
    data.metadata.lastUpdated = new Date().toISOString();
    
    await writePlantsData(data);
    
    res.json({ 
      success: true, 
      message: 'Plant deleted successfully',
      deletedPlant: deletedPlant,
      totalPlants: data.plants.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

// POST - Bulk update plants data
app.post('/api/plants/bulk-update', async (req, res) => {
  try {
    const { plants, categories } = req.body;
    
    const data = {
      plants: plants || [],
      categories: categories || [],
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalPlants: plants ? plants.length : 0,
        totalCategories: categories ? categories.length : 0
      }
    };
    
    await writePlantsData(data);
    
    res.json({ 
      success: true, 
      message: 'Plants data updated successfully',
      totalPlants: data.plants.length,
      totalCategories: data.categories.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plants data' });
  }
});

// EMAIL ROUTES

// POST - Send visit schedule email
app.post('/api/send-visit-email', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.visitType) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, phone, visitType' 
      });
    }
    
    const result = await sendVisitScheduleEmail(formData);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Visit schedule email sent successfully!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send email: ' + result.error
      });
    }
  } catch (error) {
    console.error('Visit email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while sending email' 
    });
  }
});

// POST - Send purchase inquiry email
app.post('/api/send-purchase-email', async (req, res) => {
  try {
    const { formData, plantDetails } = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email' 
      });
    }
    
    const result = await sendPurchaseInquiryEmail(formData, plantDetails);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Purchase inquiry email sent successfully!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send email: ' + result.error
      });
    }
  } catch (error) {
    console.error('Purchase email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while sending email' 
    });
  }
});

// GET - Test email configuration
app.get('/api/test-email', async (req, res) => {
  try {
    const result = await testEmailConfiguration();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Email configuration is working properly!'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Email configuration error: ' + result.error
      });
    }
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while testing email' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Green Givers Nursery API Server running on http://localhost:${PORT}`);
  console.log(`📁 Plants data file: ${PLANTS_FILE_PATH}`);
  console.log(`🚀 Ready to handle plant management requests!`);
});

module.exports = app;
