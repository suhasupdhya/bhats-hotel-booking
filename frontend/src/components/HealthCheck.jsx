import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';

const HealthCheck = () => {
    const [status, setStatus] = useState('unknown'); // unknown, online, offline

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // Use the configured API URL, replacing /api with /health if needed, or just append /health if API_URL is base
                // Assuming API_URL is http://localhost:3000/api, we want http://localhost:3000/health
                const baseUrl = API_URL.replace('/api', '');
                const response = await fetch(`${baseUrl}/health`);
                if (response.ok) {
                    setStatus('online');
                } else {
                    setStatus('offline');
                }
            } catch (error) {
                setStatus('offline');
            }
        };

        // Check immediately
        checkHealth();

        // Check every 10 seconds
        const interval = setInterval(checkHealth, 10000);

        return () => clearInterval(interval);
    }, []);

    const dotStyle = {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        display: 'inline-block',
        backgroundColor: status === 'online' ? '#10b981' : (status === 'offline' ? '#ef4444' : '#9ca3af'),
        boxShadow: `0 0 8px ${status === 'online' ? '#10b981' : (status === 'offline' ? '#ef4444' : '#9ca3af')}`,
        transition: 'all 0.3s ease'
    };

    const containerStyle = {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 12px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        fontSize: '0.8rem',
        fontWeight: '500',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.1)'
    };

    return (
        <div style={containerStyle} title={status === 'online' ? "Backend Connected" : "Backend Disconnected"}>
            <span style={dotStyle}></span>
            <span>{status === 'online' ? "System Online" : "Connecting..."}</span>
        </div>
    );
};

export default HealthCheck;
