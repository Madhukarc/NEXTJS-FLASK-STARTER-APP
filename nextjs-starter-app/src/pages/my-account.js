import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function MyAccount() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>My Account</h1>
        <p>Here you can view and edit your account details.</p>
        {/* Add more account-related content here */}
      </div>
    </Layout>
  );
}