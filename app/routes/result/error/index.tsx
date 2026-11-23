import { Button, Space, Typography } from 'tdesign-react';
import { ErrorCircleFilledIcon, LinkIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultError() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.result + ' text-center'}>
          <ErrorCircleFilledIcon style={{ fontSize: 64, color: 'var(--td-error-color)' }} />
          <Typography.Title level="h3">{t('error.result.title')}</Typography.Title>
          <Typography.Text theme="secondary" className="my-[8px] block">
            {t('error.result.subTitle')}
          </Typography.Text>
          <Space>
            <Button
              className="mr-[16px]"
              theme="default"
              variant="outline"
              onClick={() => navigate('/dashboard/workplace')}
            >
              {t('error.result.goBack')}
            </Button>
            <Button theme="primary" onClick={() => navigate(-1)}>
              {t('error.result.retry')}
            </Button>
          </Space>
        </div>
        <div className={styles['details-wrapper']}>
          <Typography.Title level="h5" className="mt-0">
            {t('error.detailTitle')}
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            <ol>
              <li>
                {t('error.detailLine.record')}
                <Typography.Text theme="primary">
                  <LinkIcon />
                  {t('error.detailLine.record.link')}
                </Typography.Text>
              </li>
              <li>
                {t('error.detailLine.auth')}
                <Typography.Text theme="primary">{t('error.detailLine.auth.link')}</Typography.Text>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
