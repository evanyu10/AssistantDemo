import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Dashboard from './components/Dashboard';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>AssistantAI Demo</title>
            </Head>
            <div className={styles.dashboard}>
                <Dashboard />
            </div>
        </div>
    );
}
