import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; 2024 Bhats Hotel Upadhyas Rooms. All rights reserved.</p>
                <div style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                    <a href="#" style={{ margin: '0 10px', color: 'var(--text-muted)' }}><i className="fab fa-facebook"></i></a>
                    <a href="#" style={{ margin: '0 10px', color: 'var(--text-muted)' }}><i className="fab fa-instagram"></i></a>
                    <a href="#" style={{ margin: '0 10px', color: 'var(--text-muted)' }}><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
