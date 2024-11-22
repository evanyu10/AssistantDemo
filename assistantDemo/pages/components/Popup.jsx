import React from 'react';

const Popup = ({ message, onClose }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2>Welcome!</h2>
                <p>{message}</p>
                <p> For more information check out <a href="https://evanyu.tech" target="_blank" rel="noopener noreferrer">evanyu.tech</a></p>
                <button style={styles.button} onClick={onClose}>Continue</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 1000, // Ensure the overlay is on top
    },
    popup: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#0078d4',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default Popup;
