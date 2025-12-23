const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, // Links to User.uid
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roomType: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: Number,
    rooms: { type: Number, default: 1 },
    nights: Number,
    totalPrice: Number,
    status: { type: String, default: 'request' }, // request, confirmed, cancelled
    bookingDate: { type: Date, default: Date.now },
    specialRequests: String
});

module.exports = mongoose.model('Booking', bookingSchema);
