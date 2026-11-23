import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton, Tag, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import { fetchAnnouncement, dashboardKeys } from '~/api/dashboard';

function getTagTheme(type: string) {
  switch (type) {
    case 'activity':
      return 'warning';
    case 'info':
      return 'primary';
    case 'notice':
      return 'primary';
    default:
      return 'primary';
  }
}

/** 公告：10s 轮询拉取 announcement */
export default function Announcement() {
  const { t } = useTranslation();
  const { data = [], isLoading: loading } = useQuery({
    queryKey: dashboardKeys.announcement,
    queryFn: fetchAnnouncement,
    refetchInterval: 10000,
  });

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title level="h5">{t('workplace.announcement')}</Typography.Title>
        <Typography.Text theme="primary">{t('workplace.seeMore')}</Typography.Text>
      </div>
      <Skeleton loading={loading} animation="gradient" rowCol={[1, 1, 1, 1, 1]}>
        <div>
          {data.map((d) => (
            <div key={d.key} className={styles['announcement-item']}>
              <Tag theme={getTagTheme(d.type)}>{t(`workplace.${d.type}`)}</Tag>
              <span className={styles['announcement-text']}>{d.content}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
}
