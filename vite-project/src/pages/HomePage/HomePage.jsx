import React from 'react';
import backgroundImage from '../../assets/camper.jfif';
import styles from './HomePage.module.css'; 
const HomePage = () => {
  return (
    <div className={styles.container} >
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>You can find everything you want in our catalog</p>
        <button className={styles.button}>View Now</button>
      </div>
    </div>
  );
};

export default HomePage;