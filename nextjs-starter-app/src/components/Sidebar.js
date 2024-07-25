import Link from 'next/link';
import { FaHome, FaUsers } from 'react-icons/fa';
import styles from '@/styles/Sidebar.module.css';

export default function Sidebar({ collapsed }) {
  return (
    <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <ul>
        <li>
          <Link href="/">
            <FaHome /> {!collapsed && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link href="/list-users">
            <FaUsers /> {!collapsed && <span>List Users</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}