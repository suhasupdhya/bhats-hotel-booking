import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        window.location.reload();
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>Bhats Hotel</h1>
                    <p>Your Comfort, Our Priority</p>
                </div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <a href="#rooms">Rooms</a>
                    <a href="#contact">Contact</a>

                    <ThemeToggle />

                    {user ? (
                        <div className="user-menu" style={{ position: 'relative' }}>
                            <a href="#" onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }} className="user-profile">
                                <i className="fas fa-user"></i> {user.displayName || 'User'}
                            </a>
                            {dropdownOpen && (
                                <div className="user-dropdown show">
                                    <Link to="/bookings"><i className="fas fa-calendar-check"></i> My Bookings</Link>
                                    <a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth" className="btn btn-primary">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
