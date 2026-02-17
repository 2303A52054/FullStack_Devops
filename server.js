console.log('=== Server Starting ===');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');

console.log('All modules loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('PORT from env:', PORT);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Middleware configured');

// Connect to Database
connectDB();

// Routes
app.use('/api', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Event Management System API',
    endpoints: {
      'GET /api': 'API information',
      'GET /api/events': 'Get all events',
      'GET /api/events/:id': 'Get event by ID',
      'POST /api/events': 'Create new event',
      'PUT /api/events/:id': 'Update event',
      'DELETE /api/events/:id': 'Delete event',
      'GET /api/events/status/:status': 'Get events by status',
      'POST /api/events/:id/participants': 'Add participant to event'
    }
  });
});

// API root route
app.get('/api', (req, res) => {
  res.json({
    message: 'Event Management System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      'GET /api/events': 'Get all events',
      'GET /api/events/:id': 'Get event by ID',
      'POST /api/events': 'Create new event',
      'PUT /api/events/:id': 'Update event',
      'DELETE /api/events/:id': 'Delete event',
      'GET /api/events/status/:status': 'Get events by status',
      'POST /api/events/:id/participants': 'Add participant to event'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

console.log('Server setup complete, waiting for connection...');