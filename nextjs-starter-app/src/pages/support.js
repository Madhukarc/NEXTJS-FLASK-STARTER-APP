import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function Support() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Support</h1>
        <p>Need help? Contact our support team.</p>
        {/* Add support contact information or form here */}
      </div>
    </Layout>
  );
}