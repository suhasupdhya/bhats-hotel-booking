const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log('Email User configured:', process.env.EMAIL_USER);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: true, // Allow all origins to fix deployment issues
    credentials: true
}));
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhats_hotel';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Bhats Hotel Backend is Running');
});

// Import Routes
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');

app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes); // Mount reviews route


// Only run the server if this file is run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;
