import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <h1>Welcome to User Management App</h1>
        <p>This is a simple application to manage users.</p>
      </div>
    </Layout>
  );
}