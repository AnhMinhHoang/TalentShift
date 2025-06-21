import React from 'react';
import styles from '../../assets/css/Loader.module.css'; // We'll create this CSS file next

const Loading = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.flippingCards}>
                <div className={styles.card}>l</div>
                <div className={styles.card}>o</div>
                <div className={styles.card}>a</div>
                <div className={styles.card}>d</div>
                <div className={styles.card}>i</div>
                <div className={styles.card}>n</div>
                <div className={styles.card}>g</div>
            </div>
        </div>
    );
};

export default Loading;