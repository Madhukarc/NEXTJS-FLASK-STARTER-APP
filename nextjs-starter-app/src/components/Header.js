import { FaBars } from 'react-icons/fa';
import styles from '@/styles/Header.module.css';

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        <FaBars />
      </button>
      <h1>My Next.js App</h1>
    </header>
  );
}