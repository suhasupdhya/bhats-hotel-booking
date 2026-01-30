import React from 'react';

const LocationButton = () => {
    return (
        <a
            href="https://www.google.com/maps/search/?api=1&query=Bhats+Hotel,+219,+Shanmugam+Rd,+West+Tambaram,+Tambaram,+Kanchipuram,+Chennai,+Tamil+Nadu+600045"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Location on Google Maps"
            style={{
                position: 'fixed',
                bottom: '90px', // Positioned above the WhatsApp button (20px + 60px + 10px gap)
                right: '20px',
                zIndex: 1000,
                backgroundColor: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease',
                textDecoration: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <i className="fas fa-map-marker-alt" style={{ fontSize: '1.8rem' }}></i>
        </a>
    );
};

export default LocationButton;
