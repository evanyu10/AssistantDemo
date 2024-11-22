import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Popup from './components/Popup';

export default function Home() {
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>AssistantAI Demo</title>
            </Head>
            
            {showPopup && (
                <Popup 
                    message={(
                        <>
                            Thank you for taking the time to check this out!
                            This is a simple demonstration of using an API with React.
                            
                        </>
                    )}
                    onClose={handleClosePopup} 
                />
            )}
            
            {!showPopup && (
                <div className={styles.dashboard}>
                    <Header />
                    <Dashboard />
                </div>
            )}
        </div>
    );
}
