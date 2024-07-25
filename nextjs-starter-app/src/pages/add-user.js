import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { addUser } from '@/utils/api';
import styles from '@/styles/Form.module.css';

export default function AddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ name, email, status });
      router.push('/list-users');
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <Layout>
      <div className={styles.formContainer}>
        <h1>Add New User</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.selectContainer}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </Layout>
  );
}