// Centralized API URL configuration
// In production (Vercel), VITE_API_URL should be set in environment variables
// In development, it defaults to localhost

export const API_URL = import.meta.env.VITE_API_URL ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : '/api'); // Relative path for Vercel
