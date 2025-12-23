const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendBookingRequestEmail } = require('../utils/email');

// GET all bookings (can filter by email or userId)
router.get('/', async (req, res) => {
    try {
        const { email, userId } = req.query;
        let query = {};

        if (email || userId) {
            const conditions = [];
            if (email) conditions.push({ email });
            if (userId) conditions.push({ userId });
            if (conditions.length > 0) query.$or = conditions;
        }

        const bookings = await Booking.find(query).sort({ checkIn: -1 }); // Sort by newest first
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create new booking
router.post('/', async (req, res) => {
    try {
        const { roomType, checkIn, checkOut } = req.body;

        // 1. Validate Input
        if (!roomType || !checkIn || !checkOut) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const requestedCheckIn = new Date(checkIn);
        const requestedCheckOut = new Date(checkOut);

        if (requestedCheckOut <= requestedCheckIn) {
            return res.status(400).json({ message: "Check-out must be after check-in" });
        }

        // 2. Fetch Config & Check Availability
        const ROOM_CONFIG = require('../config/rooms');
        if (!ROOM_CONFIG[roomType]) {
            return res.status(400).json({ message: "Invalid room type" });
        }

        const totalRooms = ROOM_CONFIG[roomType].total;

        // Find overlapping bookings
        const conflictingBookings = await Booking.countDocuments({
            roomType: roomType,
            status: 'confirmed',
            $or: [
                { checkIn: { $lt: requestedCheckOut }, checkOut: { $gt: requestedCheckIn } }
            ]
        });

        if (conflictingBookings >= totalRooms) {
            return res.status(400).json({ message: "Room not available for these dates" });
        }

        // 3. Create Booking
        const bookingData = {
            ...req.body,
            bookingId: `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Simple unique ID
            status: 'confirmed' // Auto-confirm for now as availability is checked
        };
        const booking = new Booking(bookingData);
        const newBooking = await booking.save();

        // Send email notification
        try {
            await sendBookingRequestEmail(newBooking);
        } catch (emailErr) {
            console.error("Email failed:", emailErr);
            // Don't fail the booking just because email failed
        }

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update booking status (e.g., cancel)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findOne({ bookingId: req.params.id });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Simple validation: only allow cancelling for now
        if (status === 'cancelled') {
            booking.status = 'cancelled';
            await booking.save();
            return res.json({ message: "Booking cancelled successfully", booking });
        }

        res.status(400).json({ message: "Invalid status update" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
