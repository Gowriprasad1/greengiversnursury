const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { getGridFSBucket } = require('../config/gridfs');

const router = express.Router();

// Use memory storage for multer
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Upload image endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    console.log('File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer.length
    });

    // Generate unique filename
    const filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);
    
    // Get GridFS bucket
    const gridfsBucket = getGridFSBucket();
    
    // Create upload stream
    const uploadStream = gridfsBucket.openUploadStream(filename, {
      metadata: {
        originalName: req.file.originalname,
        uploadDate: new Date(),
        contentType: req.file.mimetype
      }
    });

    // Handle upload completion
    uploadStream.on('finish', () => {
      console.log('File uploaded to GridFS:', {
        fileId: uploadStream.id,
        filename: filename
      });
      
      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          fileId: uploadStream.id.toString(),
          filename: filename,
          originalName: req.file.originalname,
          size: req.file.size,
          contentType: req.file.mimetype,
          imageUrl: `/api/images/${filename}`
        }
      });
    });

    // Handle upload errors
    uploadStream.on('error', (error) => {
      console.error('GridFS upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading image to GridFS',
        error: error.message
      });
    });

    // Write buffer to GridFS
    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
});

// Get image by filename
router.get('/:filename', async (req, res) => {
  try {
    const gridfsBucket = getGridFSBucket();
    const filename = req.params.filename;

    // Check if file exists
    const files = await gridfsBucket.find({ filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const file = files[0];
    console.log('Retrieved file:', {
      filename: file.filename,
      contentType: file.contentType,
      metadata: file.metadata,
      length: file.length
    });

    // Check if it's an image - check both contentType and metadata
    const contentType = file.contentType || file.metadata?.contentType;
    if (!contentType || !contentType.startsWith('image/')) {
      console.log('File is not an image:', { contentType, metadata: file.metadata });
      return res.status(400).json({
        success: false,
        message: 'File is not an image',
        debug: { contentType, metadata: file.metadata }
      });
    }

    // Set appropriate headers including CORS
    res.set('Content-Type', contentType);
    res.set('Content-Length', file.length);
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Stream the image
    const downloadStream = gridfsBucket.openDownloadStreamByName(filename);
    
    downloadStream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error streaming image'
        });
      }
    });

    downloadStream.pipe(res);

  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving image',
      error: error.message
    });
  }
});

// Delete image by filename
router.delete('/:filename', async (req, res) => {
  try {
    const gridfsBucket = getGridFSBucket();
    const filename = req.params.filename;

    // Check if file exists
    const files = await gridfsBucket.find({ filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete the file
    await gridfsBucket.delete(files[0]._id);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
});

// Get all images metadata
router.get('/', async (req, res) => {
  try {
    const gridfsBucket = getGridFSBucket();
    
    const files = await gridfsBucket.find({}).toArray();
    
    if (!files || files.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No images found',
        data: []
      });
    }

    const imageFiles = files
      .filter(file => file.contentType && file.contentType.startsWith('image/'))
      .map(file => ({
        fileId: file._id,
        filename: file.filename,
        originalName: file.metadata?.originalName || file.filename,
        size: file.length,
        contentType: file.contentType,
        uploadDate: file.uploadDate,
        imageUrl: `/api/images/${file.filename}`
      }));

    res.status(200).json({
      success: true,
      count: imageFiles.length,
      data: imageFiles
    });

  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving images',
      error: error.message
    });
  }
});

module.exports = router;
