const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create transporter for email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Send visit schedule email
// @route   POST /api/email/visit
// @access  Public
router.post('/visit', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name, email, phone, date, time, message ,location} = req.body;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🌱 New Visit Schedule Request - Green Givers Nursery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E7D32;">New Visit Schedule Request</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Preferred Time:</strong> ${time}</p>
            <p><strong>Customer Location:</strong> ${location}</p>
            <p><strong>Message:</strong> ${message || 'No additional message'}</p>
          </div>
          <p style="color: #666; margin-top: 20px;">Please contact the customer to confirm the visit schedule.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Visit schedule email sent successfully'
    });
  } catch (error) {
    console.error('Error sending visit email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// @desc    Send purchase inquiry email
// @route   POST /api/email/purchase
// @access  Public
router.post('/purchase', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { formData, plantDetails } = req.body;
    const { name: customerName, email, phone, quantity, message } = formData;
    const { name: productName, image: productImage, price, category } = plantDetails;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🛒 New Purchase Inquiry - Green Givers Nursery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E7D32;">🛒 New Purchase Inquiry</h2>
          
          <!-- Product Details Section -->
          <div style="background: #fff; border: 2px solid #4CAF50; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #2E7D32; margin-top: 0;">📦 Product Details</h3>
            <div style="display: flex; gap: 20px; align-items: center;">
              <div style="flex-shrink: 0;">
                <img src="${productImage}" alt="${productName}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px; border: 2px solid #E8F5E8;" />
              </div>
              <div style="flex: 1;">
                <h4 style="color: #1B5E20; margin: 0 0 10px 0;">${productName}</h4>
                <p style="margin: 5px 0;"><strong>Category:</strong> ${category}</p>
                <p style="margin: 5px 0;"><strong>Price:</strong> ₹${price}</p>
                <p style="margin: 5px 0;"><strong>Quantity Requested:</strong> ${quantity}</p>
                <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${price * quantity}</p>
              </div>
            </div>
          </div>
          
          <!-- Customer Details Section -->
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2E7D32; margin-top: 0;">👤 Customer Information</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2E7D32;">${email}</a></p>
            <p><strong>Phone:</strong> ${phone ? `<a href="tel:+91${phone}" style="color: #2E7D32;">+91 ${phone}</a>` : 'Not provided'}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <!-- Action Section -->
          <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 16px;">💚 Please contact the customer to process their purchase inquiry</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Purchase inquiry email sent successfully'
    });
  } catch (error) {
    console.error('Error sending purchase email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

module.exports = router;
