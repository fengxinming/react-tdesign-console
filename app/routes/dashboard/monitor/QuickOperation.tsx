import { Button, Card, Space, Typography } from 'tdesign-react';
import { ArrowRightIcon, StopIcon, RefreshIcon, TagIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';

export default function QuickOperation() {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('monitor.title.quickOperation')}</Typography.Title>
      <Space direction="vertical" size={10} className="w-full" style={{ alignItems: 'stretch' }}>
        <Button block theme="default" variant="outline" icon={<TagIcon />}>
          {t('monitor.quickOperation.changeClarity')}
        </Button>
        <Button block theme="default" variant="outline" icon={<RefreshIcon />}>
          {t('monitor.quickOperation.switchStream')}
        </Button>
        <Button block theme="default" variant="outline" icon={<StopIcon />}>
          {t('monitor.quickOperation.removeClarity')}
        </Button>
        <Button block theme="default" variant="outline" icon={<ArrowRightIcon />}>
          {t('monitor.quickOperation.pushFlowGasket')}
        </Button>
      </Space>
    </Card>
  );
}
