import React, { useState } from 'react';
import { auth } from '../firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../utils/api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await syncUserToBackend(user, formData.phone || ''); // Google often doesn't give phone
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                navigate('/');
            } else {
                // Register
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // Update Profile
                await updateProfile(user, {
                    displayName: `${formData.firstName} ${formData.lastName}`
                });

                // Sync to MongoDB
                await syncUserToBackend(user, formData.phone, formData.firstName, formData.lastName);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const syncUserToBackend = async (user, phone, firstName, lastName) => {
        try {
            const names = (user.displayName || '').split(' ');
            const fName = firstName || names[0] || 'Guest';
            const lName = lastName || names.slice(1).join(' ') || '';

            await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.uid,
                    firstName: fName,
                    lastName: lName,
                    email: user.email,
                    phone: phone || 'Not Provided',
                    role: 'user',
                    registrationDate: new Date().toISOString()
                })
            });
        } catch (err) {
            console.error("Sync Error:", err);
        }
    };

    return (
        <>
            <Navbar />
            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                            <p>{isLogin ? 'Login to manage your bookings' : 'Join us for exclusive offers'}</p>
                        </div>

                        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {!isLogin && (
                                <>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" required onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" required onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" name="phone" required onChange={handleChange} />
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" required onChange={handleChange} minLength="6" />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <p>Or continue with</p>
                            <button onClick={handleGoogleLogin} className="btn" style={{ marginTop: '0.5rem', width: '100%' }}>
                                <i className="fab fa-google"></i> Google
                            </button>
                        </div>

                        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }} style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                                {isLogin ? 'Sign Up' : 'Login'}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Auth;
