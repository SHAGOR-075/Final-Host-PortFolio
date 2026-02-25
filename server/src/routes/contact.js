import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    }
  });
};

// Send contact form email
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Save contact message to database
    const contact = new Contact({
      name,
      phone: phone || '',
      email: email.toLowerCase(),
      subject,
      message
    });
    await contact.save();

    // Send email to your Gmail
    let transporter;
    try {
      transporter = createTransporter();
    } catch (configError) {
      console.error('Email configuration error:', configError.message);
      // Still save to database even if email fails
      return res.status(500).json({ 
        error: 'Email service not configured. Please contact the administrator.' 
      });
    }
    
    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER;
    if (!recipientEmail) {
      return res.status(500).json({ 
        error: 'Recipient email not configured. Please set RECIPIENT_EMAIL in .env file.' 
      });
    }
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail, // Your email where you want to receive messages
      replyTo: email, // So you can reply directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF2D6D;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #FF2D6D; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Message sent successfully! We will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's an email error
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      return res.status(500).json({ 
        error: 'Email configuration error. Please check server settings.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Get all contact messages (admin only - can be protected with auth middleware later)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

