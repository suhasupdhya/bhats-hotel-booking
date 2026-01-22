import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyBookings from './pages/MyBookings';

import WhatsAppButton from './components/WhatsAppButton';
import HealthCheck from './components/HealthCheck';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <HealthCheck />
                <WhatsAppButton />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/bookings" element={<MyBookings />} />
                    {/* Redirect any unknown routes to Home */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
