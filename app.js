const express = require('express');
const app = express();
const mongoose = require('mongoose'); // Corrected spelling
const cors = require('cors');
const blogRoute = require('./api/routes/blog');
const categoryRoute = require('./api/routes/category');
const authRoute = require('./api/routes/auth'); // Fixed spelling
const commentRoute = require('./api/routes/comment'); // Fixed spelling

// Connect to MongoDB
mongoose.connect('mongodb+srv://ksumit83794:pLQEjF64Wbdg41em@sumit-pro-db.esnqj.mongodb.net/?retryWrites=true&w=majority&appName=sumit-pro-db', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.log('Database connection failed');
  console.log(err);
  // Optionally exit the process in case of failure
  process.exit(1);
});

// Middleware
app.use(express.urlencoded({ extended: false })); // Express has built-in body-parser functionality
app.use(express.json());
app.use(cors());

// Routes
app.use('/blog', blogRoute);
app.use('/category', categoryRoute);
app.use('/auth', authRoute); // Fixed spelling
app.use('/comment', commentRoute); // Fixed spelling

// Catch-all 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    msg: 'Not found'
  });
});

module.exports = app;
