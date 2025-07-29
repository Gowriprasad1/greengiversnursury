const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gridfsBucket;
let isInitialized = false;

const initGridFS = () => {
  return new Promise((resolve, reject) => {
    const conn = mongoose.connection;
    
    if (conn.readyState === 1) {
      // Connection is already open
      try {
        gridfsBucket = new GridFSBucket(conn.db, {
          bucketName: 'plantImages'
        });
        isInitialized = true;
        console.log('✅ GridFS initialized successfully');
        resolve(gridfsBucket);
      } catch (error) {
        console.error('❌ GridFS initialization failed:', error);
        reject(error);
      }
    } else {
      // Wait for connection to open
      conn.once('open', () => {
        try {
          gridfsBucket = new GridFSBucket(conn.db, {
            bucketName: 'plantImages'
          });
          isInitialized = true;
          console.log('✅ GridFS initialized successfully');
          resolve(gridfsBucket);
        } catch (error) {
          console.error('❌ GridFS initialization failed:', error);
          reject(error);
        }
      });
      
      conn.once('error', (error) => {
        console.error('❌ MongoDB connection error during GridFS init:', error);
        reject(error);
      });
    }
  });
};

const getGridFSBucket = () => {
  if (!isInitialized || !gridfsBucket) {
    throw new Error('GridFS not initialized. Ensure MongoDB connection is established and initGridFS() is called.');
  }
  return gridfsBucket;
};

const isGridFSReady = () => {
  return isInitialized && gridfsBucket !== null;
};

module.exports = {
  initGridFS,
  getGridFSBucket,
  isGridFSReady
};
