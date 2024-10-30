const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(cors());           // Allow requests from the frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model for storing queries
const querySchema = new mongoose.Schema({
  email: String,
  name: String,
  query: String,
  date: { type: Date, default: Date.now },
});

const Query = mongoose.model('Query', querySchema);

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Adjust based on your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Serve the HTML form file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission, save to MongoDB, and send emails
app.post('/submit-query', async (req, res) => {
  const { email, name, query } = req.body;

  try {
    // Save the query to MongoDB
    const newQuery = new Query({ email, name, query });
    await newQuery.save();

    // Email options for admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Query Received',
      text: `A new query has been received from ${name} (${email}):\n\n${query}`,
    };

    // Email options for client acknowledgment
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We have received your query!',
      text: `Hello ${name},\n\nThank you for reaching out to us! We have received your query:\n\n"${query}"\n\nOur team will get back to you soon.\n\nBest regards,\nCustomer Support`,
    };

    // Send email to the admin
    await transporter.sendMail(adminMailOptions);

    // Send acknowledgment email to the client
    await transporter.sendMail(clientMailOptions);

    res.status(200).json({ message: 'Query submitted and emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit query or send emails' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
