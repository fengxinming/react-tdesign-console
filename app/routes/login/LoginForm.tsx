import { useRef, useState, useCallback } from 'react';
import { Button, Form, Input, MessagePlugin, Space, Typography } from 'tdesign-react';
import type { InputProps } from 'tdesign-react';
import { LockOnIcon, UserIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLogin } from '~/hooks/api/useAuth';
import styles from './style.module.styl';
import type { LoginValues } from '~/api/types';
import type { ReactElement } from 'react';

/** 登录表单：账号/密码（必填校验）+ 登录/注册。 */
export default function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();

  // 防重复提交状态：由下方 onSubmitClick 提交锁函数控制，而非依赖 react-query 的 isPending
  const [logging, setLogging] = useState(false);
  const lockedRef = useRef(false);

  const onSubmitClick = useCallback(async () => {
    // 防重复提交：执行中再次点击直接忽略
    if (lockedRef.current) {
      return;
    }
    lockedRef.current = true;
    setLogging(true);
    try {
      const valid = await form.validate();
      if (valid !== true) {
        return;
      }
      // useLogin 内部已 setToken + 预取用户数据
      await login(form.getFieldsValue(true) as LoginValues);
      void MessagePlugin.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch (err) {
      form.setFields([
        {
          name: 'account',
          status: 'error',
          validateMessage: {
            type: 'error',
            message: err instanceof Error ? err.message : t('login.form.login.errMsg'),
          },
        },
      ]);
    } finally {
      lockedRef.current = false;
      setLogging(false);
    }
  }, [form, login, navigate, t]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t('login.form.title')}</div>
      <div className={styles['login-form-sub-title']}>{t('login.form.subTitle')}</div>
      <Form
        className="!mt-[32px]"
        form={form}
        layout="vertical"
        initialData={{ account: 'admin', password: 'admin' }}
      >
        <Form.FormItem
          name="account"
          rules={[{ required: true, message: t('login.form.userName.errMsg') }]}
        >
          <InputWithIcon
            icon={<UserIcon />}
            placeholder={t('login.form.userName.placeholder')}
            onEnter={onSubmitClick}
          />
        </Form.FormItem>
        <Form.FormItem
          name="password"
          rules={[{ required: true, message: t('login.form.password.errMsg') }]}
        >
          <InputWithIcon
            icon={<LockOnIcon />}
            type="password"
            placeholder={t('login.form.password.placeholder')}
            onEnter={onSubmitClick}
          />
        </Form.FormItem>
        <Space direction="vertical" size={16} className="w-full" style={{ alignItems: 'stretch' }}>
          {/* 「记住密码」已移除，保留「忘记密码」右对齐。 */}
          <div className="flex items-center justify-end">
            <Typography.Text theme="primary">{t('login.form.forgetPassword')}</Typography.Text>
          </div>
          <Button theme="primary" block onClick={onSubmitClick} loading={logging}>
            {t('login.form.login')}
          </Button>
          <Button variant="text" block className={styles['login-form-register-btn']}>
            {t('login.form.register')}
          </Button>
        </Space>
      </Form>
    </div>
  );
}

function InputWithIcon({
  icon,
  onEnter,
  ...rest
}: Omit<InputProps, 'onEnter'> & { icon: ReactElement; onEnter: () => void }) {
  return (
    <Input
      prefixIcon={icon}
      {...rest}
      onEnter={(_value, context) => {
        context.e.preventDefault();
        onEnter();
      }}
    />
  );
}
