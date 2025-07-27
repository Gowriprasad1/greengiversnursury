const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter for sending emails
const createTransporter = () => {
  // For Gmail
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // For testing with Ethereal Email (free testing service)
  if (process.env.EMAIL_SERVICE === 'ethereal') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // Default fallback to Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send visit scheduling email
const sendVisitScheduleEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '🌱 New Visit Schedule Request - Green Givers Nursery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌱 New Visit Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Green Givers Nursery</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <h2 style="color: #2E7D32; margin-bottom: 20px;">Customer Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">👤 Name:</strong> ${formData.name}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">📧 Email:</strong> ${formData.email}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">📞 Phone:</strong> +91 ${formData.phone}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">📍 Location:</strong> ${formData.location || 'Not specified'}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">🎯 Visit Type:</strong> ${formData.visitType}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">🌿 Plant Interest:</strong> ${formData.plantInterest || 'Not specified'}
            </div>
            
            ${formData.message ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #4CAF50;">💬 Message:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 5px; border-left: 4px solid #4CAF50;">
                ${formData.message}
              </div>
            </div>
            ` : ''}
            
            <div style="background: linear-gradient(135deg, #e8f5e8, #f1f8e9); padding: 20px; border-radius: 10px; margin-top: 20px;">
              <h3 style="color: #2E7D32; margin: 0 0 10px 0;">📅 Next Steps:</h3>
              <p style="margin: 0; color: #666;">Please contact the customer within 24 hours to schedule their visit.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>This email was sent from your Green Givers Nursery website contact form.</p>
            <p>📧 ${process.env.EMAIL_USER} | 📞 +91 8341090735</p>
          </div>
        </div>
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Visit schedule email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending visit schedule email:', error);
    return { success: false, error: error.message };
  }
};

// Send purchase inquiry email
const sendPurchaseInquiryEmail = async (formData, plantDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '🛒 New Purchase Inquiry - Green Givers Nursery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛒 Purchase Inquiry</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Green Givers Nursery</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            ${plantDetails ? `
            <div style="background: linear-gradient(135deg, #e8f5e8, #f1f8e9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #2E7D32; margin: 0 0 15px 0;">🌱 Plant of Interest</h2>
              <div style="margin-bottom: 10px;">
                <strong style="color: #4CAF50;">Plant Name:</strong> ${plantDetails.name}
              </div>
              <div style="margin-bottom: 10px;">
                <strong style="color: #4CAF50;">Category:</strong> ${plantDetails.category}
              </div>
              <div style="margin-bottom: 10px;">
                <strong style="color: #4CAF50;">Price:</strong> ${plantDetails.price}
              </div>
            </div>
            ` : ''}
            
            <h2 style="color: #2E7D32; margin-bottom: 20px;">Customer Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">👤 Name:</strong> ${formData.name}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">📧 Email:</strong> ${formData.email}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4CAF50;">📞 Phone:</strong> ${formData.phone ? `+91 ${formData.phone}` : 'Not provided'}
            </div>
            
            ${formData.message ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #4CAF50;">💬 Message:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 5px; border-left: 4px solid #4CAF50;">
                ${formData.message}
              </div>
            </div>
            ` : ''}
            
            <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); padding: 20px; border-radius: 10px; margin-top: 20px;">
              <h3 style="color: #856404; margin: 0 0 10px 0;">📞 Action Required:</h3>
              <p style="margin: 0; color: #666;">Customer is interested in purchasing. Please contact them as soon as possible.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>This email was sent from your Green Givers Nursery website.</p>
            <p>📧 ${process.env.EMAIL_USER} | 📞 +91 8341090735</p>
          </div>
        </div>
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Purchase inquiry email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending purchase inquiry email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfiguration = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid and ready to send emails');
    return { success: true, message: 'Email configuration verified' };
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVisitScheduleEmail,
  sendPurchaseInquiryEmail,
  testEmailConfiguration
};
