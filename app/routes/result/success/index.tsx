import { Button, Space, Steps, Typography } from 'tdesign-react';
import { CheckCircleFilledIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '~/hooks/useMediaQuery';
import styles from './style.module.styl';

export default function ResultSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const wide = useMediaQuery('(min-width: 900px)');

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.result + ' text-center'}>
          <CheckCircleFilledIcon style={{ fontSize: 64, color: 'var(--td-success-color)' }} />
          <Typography.Title level="h3">{t('success.result.title')}</Typography.Title>
          <Typography.Text theme="secondary" className="my-[8px] block">
            {t('success.result.subTitle')}
          </Typography.Text>
          <Space>
            <Button
              className="mr-[16px]"
              theme="default"
              variant="outline"
              onClick={() => window.print()}
            >
              {t('success.result.printResult')}
            </Button>
            <Button theme="primary" onClick={() => navigate('/dashboard/workplace')}>
              {t('success.result.projectList')}
            </Button>
          </Space>
        </div>
        <div className={styles['steps-wrapper']}>
          <Typography.Text strong className="block mb-[8px]">
            {t('success.result.progress')}
          </Typography.Text>
          <Steps
            current={2}
            layout={wide ? 'horizontal' : 'vertical'}
            options={[
              { title: t('success.submitApplication'), content: '2020/10/10 14:00:39' },
              { title: t('success.leaderReview'), content: t('success.processing') },
              { title: t('success.purchaseCertificate'), content: t('success.waiting') },
              { title: t('success.safetyTest'), content: t('success.waiting') },
              { title: t('success.launched'), content: t('success.waiting') },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
