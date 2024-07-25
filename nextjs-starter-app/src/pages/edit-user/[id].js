import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { getUser, updateUser } from '@/utils/api';
import styles from '@/styles/Form.module.css';

export default function EditUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const userData = await getUser(id);
      setName(userData.name);
      setEmail(userData.email);
      setStatus(userData.status);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { name, email, status });
      router.push('/list-users');
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (error) return <Layout><p className={styles.error}>{error}</p></Layout>;

  return (
    <Layout>
      <div className={styles.formContainer}>
        <h1>Edit User</h1>
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
          <button type="submit">Update User</button>
        </form>
      </div>
    </Layout>
  );
}