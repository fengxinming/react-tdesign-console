import { Button, Card, Form, Input, MessagePlugin, Space, Typography } from 'tdesign-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useRegister } from '~/hooks/api/useAuth';
import type { LoginValues } from '~/api/types';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: register, isPending: registering } = useRegister();
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const valid = await form.validate();
    if (valid !== true) {
      return;
    }
    try {
      // useRegister 内部已 setToken + 预取用户数据
      await register(form.getFieldsValue(true) as LoginValues);
      void MessagePlugin.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch {
      /* 注册失败，错误已由表单/接口层处理 */
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--td-bg-color-page)',
      }}
    >
      <Card style={{ width: 380 }}>
        <Typography.Title level="h4" style={{ textAlign: 'center' }}>
          {t('login.toRegister')}
        </Typography.Title>
        <Form form={form} layout="vertical">
          <Form.FormItem
            name="account"
            label={t('login.account')}
            rules={[{ required: true }]}
          >
            <Input placeholder="admin" />
          </Form.FormItem>
          <Form.FormItem
            name="password"
            label={t('login.password')}
            rules={[{ required: true }]}
          >
            <Input type="password" placeholder="admin" />
          </Form.FormItem>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button variant="text" onClick={() => navigate('/login')}>
              {t('login.submit')}
            </Button>
          </Space>
          <Button theme="primary" block onClick={() => void onSubmit()} loading={registering}>
            {t('login.toRegister')}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
