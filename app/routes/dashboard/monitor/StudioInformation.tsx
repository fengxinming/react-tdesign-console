import { Button, Card, Form, Input, Textarea, Typography } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';

export default function StudioInformation() {
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('monitor.title.studioInfo')}</Typography.Title>
      <Form layout="vertical">
        <Form.FormItem
          name="studioTitle"
          label={t('monitor.studioInfo.label.studioTitle')}
          rules={[{ required: true }]}
        >
          <Input
            placeholder={`${user?.name ?? 'admin'}${t('monitor.studioInfo.placeholder.studioTitle')}`}
          />
        </Form.FormItem>
        <Form.FormItem
          name="onlineNotification"
          label={t('monitor.studioInfo.label.onlineNotification')}
          rules={[{ required: true }]}
        >
          <Textarea />
        </Form.FormItem>
        <Form.FormItem
          name="studioCategory"
          label={t('monitor.studioInfo.label.studioCategory')}
          rules={[{ required: true }]}
        >
          <Input suffix={<SearchIcon />} />
        </Form.FormItem>
        <Form.FormItem
          name="studioCategory2"
          label={t('monitor.studioInfo.label.studioCategory')}
          rules={[{ required: true }]}
        >
          <Input suffix={<SearchIcon />} />
        </Form.FormItem>
      </Form>
      <Button theme="primary">{t('monitor.chat.update')}</Button>
    </Card>
  );
}
