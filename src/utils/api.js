// Centralized API URL configuration
// In production (Vercel), VITE_API_URL should be set in environment variables
// In development, it defaults to localhost

export const API_URL = import.meta.env.VITE_API_URL || 'https://bhats-hotel-booking.onrender.com/api';
