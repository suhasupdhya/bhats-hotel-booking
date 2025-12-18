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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

            const bookingPayload = {
                ...formData,
                guests: parseInt(formData.guests),
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

            alert('Booking Confirmed! Check your email.');
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
                {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
        </form>
    );
};

export default BookingForm;
