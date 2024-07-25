import { useState } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';

export default function AddPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the data
    console.log('Add:', { name, email });
  };

  return (
    <Layout>
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
        <button type="submit">Add User</button>
      </form>
    </Layout>
  );
}