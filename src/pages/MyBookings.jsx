import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { API_URL } from '../utils/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchBookings(currentUser);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchBookings = async (currentUser) => {
        try {
            // Fetch by email as it's more reliable if userId wasn't saved in older bookings
            const res = await fetch(`${API_URL}/bookings?email=${currentUser.email}`);
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'cancelled' })
            });

            if (res.ok) {
                alert("Booking cancelled successfully.");
                fetchBookings(user); // Refresh list
            } else {
                const err = await res.json();
                alert(`Failed to cancel: ${err.message}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error cancelling booking");
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-header">
                <div className="container">
                    <h2>My Bookings</h2>
                    <p>Manage and view your stay history</p>
                </div>
            </div>

            <section className="section-padding" style={{ minHeight: '60vh' }}>
                <div className="container">
                    {loading ? (
                        <div className="text-center">Loading your bookings...</div>
                    ) : !user ? (
                        <div className="text-center">
                            <h3>Please login to view your bookings</h3>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center">
                            <h3>No bookings found</h3>
                            <p>You haven't booked any rooms yet.</p>
                        </div>
                    ) : (
                        <div className="bookings-table-container">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Room Type</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Guests</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking._id} style={{ opacity: booking.status === 'cancelled' ? 0.6 : 1 }}>
                                            <td style={{ textTransform: 'capitalize' }}>
                                                {booking.roomType === 'ac' ? 'AC Room' : 'Non-AC Room'}
                                            </td>
                                            <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                                            <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                                            <td>{booking.guests}</td>
                                            <td>₹{booking.totalAmount || (booking.roomType === 'ac' ? 1500 : 1000)}</td>
                                            <td>
                                                <span className={`status-badge ${booking.status || 'confirmed'}`}>
                                                    {booking.status || 'Confirmed'}
                                                </span>
                                            </td>
                                            <td>
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        className="btn btn-outline btn-small"
                                                        onClick={() => handleCancel(booking.bookingId)}
                                                        style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default MyBookings;
