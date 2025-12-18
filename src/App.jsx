import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyBookings from './pages/MyBookings';

function App() {
    return (
        <ThemeProvider>
            <Router>
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
