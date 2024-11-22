import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Generic AI Demo - Evan Yu</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#afb8c4',
        padding: '10px',
        textAlign: 'center',
        color: 'white',
    },
    title: {
        margin: 1,
        fontSize: '2rem',
    },
};

export default Header;
