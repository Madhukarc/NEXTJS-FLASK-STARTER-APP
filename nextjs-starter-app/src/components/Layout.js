import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Layout.module.css';
import { FaBars, FaHome, FaUsers, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          <FaBars />
        </button>
        <h1 className={styles.title}>User Management App</h1>
        {isLoggedIn ? (
          <div className={styles.profileContainer}>
            <button onClick={toggleProfileDropdown} className={styles.profileButton}>
              <FaUserCircle />
            </button>
            {profileDropdownOpen && (
              <div className={styles.profileDropdown}>
                <Link href="/my-account">My Account</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/support">Support</Link>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginButton}>Login</Link>
            <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
          </div>
        )}
      </header>
      <div className={styles.content}>
        {isLoggedIn && (
          <nav className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
            <ul>
              <li>
                <Link href="/">
                  <FaHome />
                  <span className={styles.linkText}>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/list-users">
                  <FaUsers />
                  <span className={styles.linkText}>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}