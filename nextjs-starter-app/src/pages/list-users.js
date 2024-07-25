import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getUsers, deleteUser } from '@/utils/api';
import styles from '@/styles/List.module.css';
import { FaEllipsisH } from 'react-icons/fa';

export default function ListUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className={styles.listContainer}>
        <div className={styles.header}>
          <h1>Users</h1>
          <p>Manage your users and view their information.</p>
        </div>
        <div className={styles.topActions}>
          <button className={styles.exportBtn}>Export</button>
          <Link href="/add-user" className={styles.addBtn}>Add User</Link>
        </div>
        <div className={styles.tabsContainer}>
          <button className={`${styles.tab} ${styles.active}`}>All</button>
          <button className={styles.tab}>Active</button>
          <button className={styles.tab}>Inactive</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.emptyMessage}>No users found. Click &quot;Add User&quot; to create one.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <div className={styles.actionDropdown}>
                      <button onClick={() => toggleDropdown(user._id)} className={styles.dropdownToggle}>
                        <FaEllipsisH />
                      </button>
                      {activeDropdown === user._id && (
                        <div className={styles.dropdownMenu}>
                          <Link href={`/edit-user/${user._id}`} className={styles.dropdownItem}>Edit</Link>
                          <button onClick={() => handleDelete(user._id)} className={styles.dropdownItem}>Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}