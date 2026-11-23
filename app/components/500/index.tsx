import { Button, Empty } from 'tdesign-react';
import { ErrorCircleIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception500() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Empty
        image={<ErrorCircleIcon size={72} />}
        description={t('exception.result.500.description')}
        action={
          <div>
            <Button
              key="backPrev"
              theme="default"
              variant="outline"
              className="!mr-[16px]"
              onClick={() => navigate(-1)}
            >
              {t('exception.result.backPrev')}
            </Button>
            <Button key="backHome" theme="primary" onClick={() => navigate('/')}>
              {t('exception.result.backHome')}
            </Button>
          </div>
        }
      />
    </div>
  );
}
