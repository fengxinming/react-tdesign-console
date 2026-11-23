import { Button, Empty } from 'tdesign-react';
import { LockOnIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception403() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Empty
        image={<LockOnIcon size={72} />}
        description={t('exception.result.403.description')}
        action={
          <div>
            <Button
              key="backPrev"
              className="!mr-[16px]"
              theme="default"
              variant="outline"
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
