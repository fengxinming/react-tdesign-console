import SearchEntry from './SearchEntry';
import LanguageSwitch from './LangSelect';
import Notification from './Notification';
import ThemeToggle from './ThemeToggle';
import FullscreenToggle from './FullscreenToggle';
import SettingButton from './SettingButton';
import GithubLink from './GithubLink';
import UserMenu from './UserMenu';
import styles from './style.module.styl';
import Logo from './Logo';

export default function HeaderBar() {
  return (
    <div className={styles.navbar}>
      <div className="flex items-center flex-1 min-w-[140px]">
        <Logo />
      </div>
      <ul className={styles.right}>
        <li className={styles['search-wrapper']}>
          <SearchEntry />
        </li>
        <li className={styles['lang-wrapper']}>
          <LanguageSwitch />
        </li>
        <li>
          <Notification />
        </li>
        <li>
          <ThemeToggle />
        </li>
        <li className={styles['fullscreen-wrapper']}>
          <FullscreenToggle />
        </li>
        <li>
          <SettingButton />
        </li>
        <li className={styles['github-wrapper']}>
          <GithubLink />
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </div>
  );
}

export type * from './types';
