import { useSettingsStore } from '~/store';
import AppMenu from '~/components/AppMenu';
import styles from './style.module.styl';

export default function Logo() {
  const navMode = useSettingsStore((s) => s.navMode);

  return navMode === 'horizontal' ? (
    <AppMenu mode="horizontal" className="!w-full" />
  ) : (
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
      <div className={styles['logo-name']}>React TDesign Console</div>
    </div>
  );
}
