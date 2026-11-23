import { useState } from 'react';
import {
  Button,
  Card,
  DateRangePicker,
  Form,
  Input,
  Select,
  Space,
  Steps,
  Switch,
  Textarea,
  Typography,
} from 'tdesign-react';
import { CheckCircleFilledIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '~/hooks/useMediaQuery';
import styles from './style.module.styl';

export default function StepForm() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const wide = useMediaQuery('(min-width: 900px)');

  const viewForm = () => {
    setCurrent(0);
  };

  const reCreateForm = () => {
    form.reset();
    setCurrent(0);
  };

  const toNext = async () => {
    const result = await form.validate();
    if (result === true) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <Typography.Title level="h5">{t('stepForm.title')}</Typography.Title>
        <div className={styles.wrapper}>
          <Steps
            current={current}
            layout={wide ? 'horizontal' : 'vertical'}
            options={[
              { title: t('stepForm.title.basicInfo'), content: t('stepForm.desc.basicInfo') },
              { title: t('stepForm.title.channel'), content: t('stepForm.desc.channel') },
              { title: t('stepForm.title.created'), content: t('stepForm.desc.created') },
            ]}
          />
          <Form
            form={form}
            className={styles.form}
            initialData={{
              basic: { channelType: 'app', link: 'https://example.com' },
              channel: { keywords: ['今日头条', '火山'], remind: true },
            }}
          >
            {current === 0 && (
              <>
                <Form.FormItem
                  label={t('stepForm.basicInfo.name')}
                  name="basic.name"
                  rules={[
                    { required: true, message: t('stepForm.basicInfo.name.required') },
                    {
                      validator: (value: string) =>
                        !value || /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/.test(value),
                      message: t('stepForm.basicInfo.name.placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={t('stepForm.basicInfo.name.placeholder')} />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.basicInfo.channelType')}
                  name="basic.channelType"
                  rules={[
                    { required: true, message: t('stepForm.basicInfo.channelType.required') },
                  ]}
                >
                  <Select
                    options={[
                      { value: 'app', label: 'APP通用渠道' },
                      { value: 'site', label: '网页通用渠道' },
                      { value: 'game', label: '游戏通用渠道' },
                    ]}
                  />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.basicInfo.time')}
                  name="basic.time"
                  rules={[{ required: true, message: t('stepForm.basicInfo.time.required') }]}
                >
                  <DateRangePicker className="w-full" />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.basicInfo.link')}
                  name="basic.link"
                  tips={t('stepForm.basicInfo.link.tips')}
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('stepForm.basicInfo.link.placeholder')} />
                </Form.FormItem>
              </>
            )}
            {current === 1 && (
              <>
                <Form.FormItem
                  label={t('stepForm.channel.source')}
                  name="channel.source"
                  rules={[{ required: true, message: t('stepForm.channel.source.required') }]}
                >
                  <Input placeholder={t('stepForm.channel.source.placeholder')} />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.channel.media')}
                  name="channel.media"
                  rules={[{ required: true, message: t('stepForm.channel.media.required') }]}
                >
                  <Input placeholder={t('stepForm.channel.media.placeholder')} />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.channel.keywords')}
                  name="channel.keywords"
                  rules={[{ required: true }]}
                >
                  <Select multiple creatable />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.channel.remind')}
                  name="channel.remind"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.FormItem>
                <Form.FormItem
                  label={t('stepForm.channel.content')}
                  name="channel.content"
                  rules={[{ required: true, message: t('stepForm.channel.content.required') }]}
                >
                  <Textarea placeholder={t('stepForm.channel.content.placeholder')} />
                </Form.FormItem>
              </>
            )}
            {current !== 2 ? (
              <Form.FormItem>
                <Space>
                  {current === 1 && (
                    <Button
                      size="large"
                      variant="outline"
                      theme="default"
                      onClick={() => setCurrent(current - 1)}
                    >
                      {t('stepForm.prev')}
                    </Button>
                  )}
                  {current !== 2 && (
                    <Button theme="primary" size="large" onClick={toNext}>
                      {t('stepForm.next')}
                    </Button>
                  )}
                </Space>
              </Form.FormItem>
            ) : (
              <div className={styles.result + ' text-center'}>
                <CheckCircleFilledIcon style={{ fontSize: 64, color: 'var(--td-success-color)' }} />
                <Typography.Title level="h5">
                  {t('stepForm.created.success.title')}
                </Typography.Title>
                <Typography.Text theme="secondary">
                  {t('stepForm.created.success.desc')}
                </Typography.Text>
                <div className="mt-[16px]">
                  <Space>
                    <Button
                      className="mr-[16px]"
                      variant="outline"
                      theme="default"
                      onClick={viewForm}
                    >
                      {t('stepForm.created.success.view')}
                    </Button>
                    <Button theme="primary" onClick={reCreateForm}>
                      {t('stepForm.created.success.again')}
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </Form>
        </div>
        {current === 2 && (
          <div className={styles['form-extra']}>
            <Typography.Title level="h5">{t('stepForm.created.extra.title')}</Typography.Title>
            <Typography.Text theme="secondary">
              {t('stepForm.created.extra.desc')}
              <Button theme="default" variant="text">
                {t('stepForm.created.extra.detail')}
              </Button>
            </Typography.Text>
          </div>
        )}
      </Card>
    </div>
  );
}
