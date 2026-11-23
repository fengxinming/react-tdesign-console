import { Avatar, Card, Space, Typography } from 'tdesign-react';
import { MoreIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import styles from './style.module.styl';

export default function Studio() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title level="h5">{t('monitor.title.studioPreview')}</Typography.Title>
        <MoreIcon />
      </div>
      <div>
        <img
          src="images/monitor/studio.webp"
          className={styles['studio-preview']}
          alt="studio preview"
        />
        <div className="flex justify-between mt-[16px]">
          {userInfo && (
            <div>
              <Space size={12} align="center">
                <Avatar size="small" image={userInfo.avatar}>
                  {userInfo.name?.[0] ?? 'A'}
                </Avatar>
                <Typography.Text>
                  {userInfo.name}
                  {t('monitor.studioPreview.studio')}
                </Typography.Text>
              </Space>
            </div>
          )}
          <Typography.Text theme="secondary">
            3,6000 {t('monitor.studioPreview.watching')}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}
