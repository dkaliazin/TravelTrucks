import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Імпортуємо стилі

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>TravelTrucks</h1>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/catalog" className={styles.link}>Catalog</Link>
      </nav>
    </header>
  );
};

export default Header;