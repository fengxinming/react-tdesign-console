import { Card, Descriptions, Space, Tag, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';

export default function StudioStatus() {
  const { t } = useTranslation();

  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.mainstream')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      content: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      content: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.hotStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      content: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      content: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.coldStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      content: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      content: '60',
    },
  ];

  const dataPicture = [
    { label: t('monitor.studioStatus.line'), content: '热备' },
    { label: 'CDN', content: 'KS' },
    { label: t('monitor.studioStatus.play'), content: 'FLV' },
    { label: t('monitor.studioStatus.pictureQuality'), content: '原画' },
  ];

  return (
    <Card bordered={false}>
      <Space align="start">
        <Typography.Title level="h5">
          {t('monitor.studioStatus.title.studioStatus')}
        </Typography.Title>
        <Tag theme="success">{t('monitor.studioStatus.smooth')}</Tag>
      </Space>
      <Descriptions layout="horizontal" items={dataStatus} column={2} />
      <Typography.Title className="!mt-[24px]" level="h5">
        {t('monitor.studioStatus.title.pictureInfo')}
      </Typography.Title>
      <Descriptions layout="horizontal" items={dataPicture} column={2} />
    </Card>
  );
}
