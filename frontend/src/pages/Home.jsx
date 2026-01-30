import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import img1 from '../assets/IMG_1.JPG';
import img3 from '../assets/IMG_3.JPG';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">


                        <a href="#booking" className="btn btn-primary">Book Your Stay</a>
                    </div>
                </section>

                {/* Rooms Section */}
                <section id="rooms" className="rooms-section section-padding">
                    <div className="container">
                        <div className="section-title">
                            <h2>Our Rooms</h2>
                        </div>
                        <div className="rooms-grid">
                            <div className="room-card">
                                <div className="room-image">
                                    <img src={img1} alt="AC Room" />
                                </div>
                                <div className="room-info">
                                    <h3>AC Rooms</h3>
                                    <p>Comfortable air-conditioned rooms</p>
                                    <ul>
                                        <li>Max 3 guests</li>
                                        <li>2 guests included</li>
                                        <li>Extra adult costs apply</li>
                                    </ul>
                                    <div className="price">₹1,500/night</div>
                                </div>
                            </div>
                            <div className="room-card">
                                <div className="room-image">
                                    <img src={img3} alt="Non-AC Room" />
                                </div>
                                <div className="room-info">
                                    <h3>Non-AC Rooms</h3>
                                    <p>Cozy rooms with natural ventilation</p>
                                    <ul>
                                        <li>Max 3 guests</li>
                                        <li>2 guests included</li>
                                        <li>Extra adult costs apply</li>
                                    </ul>
                                    <div className="price">₹1,000/night</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking Section */}
                <section id="booking" className="booking-section section-padding">
                    <div className="container">
                        <div className="section-title">
                            <h2>Book Your Room</h2>
                        </div>
                        <BookingForm />
                    </div>
                </section>

                {/* Reviews Section */}
                <Reviews />

                {/* Contact Section */}
                <section id="contact" className="contact-section section-padding">
                    <div className="container">
                        <div className="section-title">
                            <h2>Contact Us</h2>
                        </div>
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h3>Address</h3>
                                    <p>Bhats Hotel, Shanmugam Road No 11<br />Chennai - 600045</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <div>
                                    <h3>Phone</h3>
                                    <p>+91 98842 40971</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
