import { Card, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const links: Record<string, string> = {
  react: 'https://tdesign.tencent.com/react/getting-started',
  components: 'https://tdesign.tencent.com/react/components/overview',
  theme: 'https://tdesign.tencent.com/react/customize-theme',
  github: 'https://github.com/Tencent/tdesign-react',
};

export default function Docs() {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title level="h5">{t('workplace.docs')}</Typography.Title>
        <Typography.Text theme="primary">{t('workplace.seeMore')}</Typography.Text>
      </div>
      <div className={styles.docs}>
        {Object.entries(links).map(([key, href]) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            key={key}
            className={styles['doc-link']}
          >
            {t(`workplace.${key}`)}
          </a>
        ))}
      </div>
    </Card>
  );
}
