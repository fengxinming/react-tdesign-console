import { Card, Divider, MessagePlugin, Typography } from 'tdesign-react';
import {
  FileIcon,
  ServerIcon,
  SettingIcon,
  MobileIcon,
  ThunderIcon,
} from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Shortcuts() {
  const { t } = useTranslation();

  const shortcuts = [
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <FileIcon /> },
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <ServerIcon /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <SettingIcon /> },
    { title: t('workplace.onlinePromotion'), key: 'Online Promotion', icon: <MobileIcon /> },
    { title: t('workplace.marketing'), key: 'Marketing', icon: <ThunderIcon /> },
  ];

  const recentShortcuts = [
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <ServerIcon /> },
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <FileIcon /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <SettingIcon /> },
  ];

  function onClickShortcut(key: string) {
    void MessagePlugin.info(`You clicked ${key}`);
  }

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title level="h5">{t('workplace.shortcuts')}</Typography.Title>
        <Typography.Text theme="primary">{t('workplace.seeMore')}</Typography.Text>
      </div>
      <div className={styles['shortcut-list']}>
        {shortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Typography.Title level="h5">{t('workplace.recent')}</Typography.Title>
      <div className={styles['shortcut-list']}>
        {recentShortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
