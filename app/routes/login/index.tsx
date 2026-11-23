import Footer from '~/layouts/ConsoleLayout/Footer';
import LoginForm from './LoginForm';
import LoginBanner from './LoginBanner';
import styles from './style.module.styl';

/** 登录页：固定 logo + 左侧 banner 轮播 + 右侧（登录表单 + 页脚）。 */
export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="4" width="14" height="14" rx="3" fill="#3B82F6" />
          <rect x="10" y="14" width="14" height="14" rx="3" fill="#10B981" />
          <rect x="18" y="4" width="12" height="12" rx="3" fill="#F59E0B" />
        </svg>
        <div className={styles['logo-text']}>React TDesign Console</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <LoginForm />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
