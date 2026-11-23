import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  MessagePlugin,
  Row,
  Select,
  Space,
  Textarea,
  Typography,
} from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { submitGroupForm } from '~/api/form';
import styles from './style.module.styl';

export default function GroupForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submit = (values: Record<string, unknown>) => {
    setLoading(true);
    submitGroupForm(values)
      .then(() => {
        void MessagePlugin.success(t('groupForm.submitSuccess'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async () => {
    const result = await form.validate();
    if (result === true) {
      submit(form.getFieldsValue(true) as Record<string, unknown>);
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        form={form}
        className={styles['form-group']}
        initialData={{ video: { mode: 'custom' }, audio: { mode: 'custom' } }}
      >
        <Card bordered={false}>
          <Typography.Title level="h5">{t('groupForm.title.video')}</Typography.Title>
          <Row gutter={[80, 24]}>
            <Col xs={12} md={4}>
              <Form.FormItem label={t('groupForm.form.label.video.mode')} name="video.mode">
                <Select
                  placeholder={t('groupForm.placeholder.video.mode')}
                  options={[
                    { value: 'custom', label: '自定义' },
                    { value: 'mode1', label: '模式1' },
                    { value: 'mode2', label: '模式2' },
                  ]}
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.acquisition.resolution')}
                name="video.acquisition.resolution"
              >
                <Select
                  placeholder={t('groupForm.placeholder.video.acquisition.resolution')}
                  options={[
                    { value: 'resolution1', label: '分辨率1' },
                    { value: 'resolution2', label: '分辨率2' },
                    { value: 'resolution3', label: '分辨率3' },
                  ]}
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.acquisition.frameRate')}
                name="video.acquisition.frameRate"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.acquisition.frameRate')}
                  suffix="fps"
                />
              </Form.FormItem>
            </Col>
          </Row>
          <Row gutter={[80, 24]}>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.resolution')}
                name="video.encoding.resolution"
              >
                <Select
                  placeholder={t('groupForm.placeholder.video.encoding.resolution')}
                  options={[
                    { value: 'resolution1', label: '分辨率1' },
                    { value: 'resolution2', label: '分辨率2' },
                    { value: 'resolution3', label: '分辨率3' },
                  ]}
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.rate.min')}
                name="video.encoding.rate.min"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.encoding.rate.min')}
                  suffix="bps"
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.rate.max')}
                name="video.encoding.rate.max"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.encoding.rate.max')}
                  suffix="bps"
                />
              </Form.FormItem>
            </Col>
          </Row>
          <Row gutter={[80, 24]}>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.rate.default')}
                name="video.encoding.rate.default"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.encoding.rate.default')}
                  suffix="fps"
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.frameRate')}
                name="video.encoding.frameRate"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.encoding.frameRate')}
                  suffix="fps"
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.video.encoding.profile')}
                name="video.encoding.profile"
              >
                <Input
                  placeholder={t('groupForm.placeholder.video.encoding.profile')}
                  suffix="bps"
                />
              </Form.FormItem>
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <Typography.Title level="h5">{t('groupForm.title.audio')}</Typography.Title>
          <Row gutter={[80, 24]}>
            <Col xs={12} md={4}>
              <Form.FormItem label={t('groupForm.form.label.audio.mode')} name="audio.mode">
                <Select
                  placeholder={t('groupForm.placeholder.audio.mode')}
                  options={[
                    { value: 'custom', label: '自定义' },
                    { value: 'mode1', label: '模式1' },
                    { value: 'mode2', label: '模式2' },
                  ]}
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.audio.acquisition.channels')}
                name="audio.acquisition.channels"
              >
                <Select
                  placeholder={t('groupForm.placeholder.audio.acquisition.channels')}
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                  ]}
                />
              </Form.FormItem>
            </Col>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.audio.encoding.rate')}
                name="audio.encoding.rate"
              >
                <Input placeholder={t('groupForm.placeholder.audio.encoding.rate')} suffix="bps" />
              </Form.FormItem>
            </Col>
          </Row>
          <Row gutter={[80, 24]}>
            <Col xs={12} md={4}>
              <Form.FormItem
                label={t('groupForm.form.label.audio.encoding.profile')}
                name="audio.encoding.profile"
              >
                <Input
                  placeholder={t('groupForm.placeholder.audio.encoding.profile')}
                  suffix="fps"
                />
              </Form.FormItem>
            </Col>
          </Row>
        </Card>
        <Card bordered={false} className="!mb-[32px]">
          <Typography.Title level="h5">{t('groupForm.title.explanation')}</Typography.Title>
          <Form.FormItem label={t('groupForm.form.label.explanation')} name="audio.explanation">
            <Textarea placeholder={t('groupForm.placeholder.explanation')} />
          </Form.FormItem>
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button theme="default" variant="outline" onClick={handleReset} size="large">
            {t('groupForm.reset')}
          </Button>
          <Button theme="primary" onClick={handleSubmit} loading={loading} size="large">
            {t('groupForm.submit')}
          </Button>
        </Space>
      </div>
    </div>
  );
}
