// Centralized API URL configuration
// In production (Vercel), VITE_API_URL should be set in environment variables
// In development, it defaults to localhost

// Automatically switch between localhost and Render
export const API_URL = import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api' // Local Backend
    : 'https://bhats-hotel-booking.onrender.com/api'; // Live Backend
