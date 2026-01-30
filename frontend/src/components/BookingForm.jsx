import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { API_URL } from '../utils/api';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        roomType: '',
        guests: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateDetails = (checkIn, checkOut, roomType, guests) => {
        if (!checkIn || !checkOut || !roomType || !guests) return { nights: 0, total: 0, rooms: 0 };
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (nights <= 0) return { nights: 0, total: 0, rooms: 0 };

        let pricePerNight = 0;
        if (roomType === 'ac') pricePerNight = 1500;
        if (roomType === 'non-ac') pricePerNight = 1000;

        // Logic:
        // Prioritize 2 people per room.
        // Remainder 1 person -> Add to existing room (Extra ₹200) instead of new room.
        // Exception: If total guests == 1, then Rooms = 1, Extra = 0.

        let rooms = Math.floor(guests / 2);
        let extraGuests = 0;

        if (guests % 2 !== 0) {
            // Odd number of guests
            if (rooms === 0) {
                // Total guests = 1
                rooms = 1;
                extraGuests = 0;
            } else {
                // Example: 3 guests -> rooms=1 (2 ppl), extra=1.
                // Example: 5 guests -> rooms=2 (4 ppl), extra=1.
                extraGuests = 1;
            }
        }

        const totalPerNight = (rooms * pricePerNight) + (extraGuests * 200);

        return { nights, total: totalPerNight * nights, rooms };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validation Logic Here (Simplified for migration)
            if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
                alert("Check-out must be after check-in");
                setLoading(false);
                return;
            }

            const guestsCount = parseInt(formData.guests);
            const { nights, total, rooms } = calculateDetails(formData.checkIn, formData.checkOut, formData.roomType, guestsCount);

            const bookingPayload = {
                ...formData,
                guests: guestsCount,
                rooms: rooms,
                totalPrice: total,
                nights: nights,
                userId: auth.currentUser ? auth.currentUser.uid : null // Optional user link
            };

            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Booking failed');
            }

            // Successfully booked
            const confirmedData = { ...bookingPayload };
            setConfirmedBooking(confirmedData);
            setFormData({
                checkIn: '', checkOut: '', roomType: '', guests: '',
                firstName: '', lastName: '', email: '', phone: '', specialRequests: ''
            });

        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (confirmedBooking) {
        return (
            <div className="booking-receipt" style={{ textAlign: 'center', padding: '2rem', background: '#1a1a1a', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#ffffff' }}>
                <h2 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Booking Requested</h2>
                <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto', color: '#ffffff' }}>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Name:</strong> {confirmedBooking.firstName} {confirmedBooking.lastName}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Email:</strong> {confirmedBooking.email}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Phone:</strong> {confirmedBooking.phone}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Room Type:</strong> {confirmedBooking.roomType === 'ac' ? 'AC Room' : 'Non-AC Room'}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Number of People:</strong> {confirmedBooking.guests}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Number of Rooms:</strong> {confirmedBooking.rooms}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Dates:</strong> {confirmedBooking.checkIn} to {confirmedBooking.checkOut}</p>
                    <p style={{ margin: '0.5rem 0', color: '#ffffff' }}><strong>Number of Days:</strong> {confirmedBooking.nights}</p>
                    <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#2ecc71' }}>
                        <strong>Total Amount: ₹{confirmedBooking.totalPrice}</strong>
                    </p>
                </div>
                <button
                    onClick={() => setConfirmedBooking(null)}
                    className="btn btn-primary"
                    style={{ marginTop: '2rem' }}
                >
                    Book Another Room
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
                <div className="form-group">
                    <label>Check-in Date</label>
                    <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                    <label>Check-out Date</label>
                    <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Room Type</label>
                    <select name="roomType" value={formData.roomType} onChange={handleChange} required>
                        <option value="">Select Room Type</option>
                        <option value="ac">AC Room (₹1,500/night)</option>
                        <option value="non-ac">Non-AC Room (₹1,000/night)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Guests</label>
                    <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                {loading ? 'Processing...' : 'Request Booking'}
            </button>
        </form>
    );
};

export default BookingForm;
