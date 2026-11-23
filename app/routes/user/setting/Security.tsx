import { Button } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import styles from './style.module.styl';

/** 安全设置:密码/密保问题/安全手机/安全邮箱,右侧编辑或设置按钮。自取 /user/info。 */
export default function Security() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);

  const data = [
    {
      title: t('userSetting.security.password'),
      value: t('userSetting.security.password.tips'),
      placeholder: '',
    },
    {
      title: t('userSetting.security.question'),
      value: '',
      placeholder: t('userSetting.security.question.placeholder'),
    },
    {
      title: t('userSetting.security.phone'),
      value: userInfo?.phoneNumber
        ? `${t('userSetting.security.phone.tips')} ${userInfo.phoneNumber}`
        : '',
      placeholder: '',
    },
    {
      title: t('userSetting.security.email'),
      value: '',
      placeholder: t('userSetting.security.email.placeholder'),
    },
  ];

  return (
    <div className={styles['security']}>
      {data.map((item) => (
        <div className={styles['security-item']} key={item.title}>
          <span className={styles['security-item-title']}>{item.title}</span>
          <div className={styles['security-item-content']}>
            <span className={item.value ? undefined : styles['security-item-placeholder']}>
              {item.value || item.placeholder}
            </span>
            <span>
              <Button theme="default" variant="text">
                {item.value ? t('userSetting.btn.edit') : t('userSetting.btn.set')}
              </Button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
