import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function Settings() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Settings</h1>
        <p>Manage your application settings here.</p>
        {/* Add settings options here */}
      </div>
    </Layout>
  );
}