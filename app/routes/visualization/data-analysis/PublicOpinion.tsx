import { memo } from 'react';
import { Card, Col, Row, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import type { DataAnalysisLoaderData } from './types';
import PublicOpinionCard from './PublicOpinionCard';
import styles from './style.module.styl';

function PublicOpinion() {
  const { t } = useTranslation();
  const { publicOpinion } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const formatData = publicOpinion.map((item) => ({
    ...item,
    title: t(`dataAnalysis.publicOpinion.${item.name}`),
  }));

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('dataAnalysis.title.publicOpinion')}</Typography.Title>
      <div className={styles.wrapper}>
        <Row gutter={20}>
          {formatData.map((item) => (
            <Col xs={12} md={3} key={item.name}>
              <PublicOpinionCard
                {...item}
                compareTime={t('dataAnalysis.yesterday')}
                loading={loading}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Card>
  );
}

export default memo(PublicOpinion);
