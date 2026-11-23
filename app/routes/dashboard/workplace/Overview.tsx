import { Row, Col, Card, Typography, Divider, Skeleton } from 'tdesign-react';
import { CalendarIcon, FileIcon, ChatIcon, CaretUpIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { VChart } from '@visactor/react-vchart';
import { useSettingsStore, useUserStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import styles from './style.module.styl';
import type { OverviewData } from '~/api/types';
import type { WorkplaceLoaderData, StatisticItemProps } from './types';

function StatisticItem({ icon, title, count, loading, unit }: StatisticItemProps) {
  return (
    <div className={styles['stat-item']}>
      <div className={styles['stat-icon']}>{icon}</div>
      <div>
        <Skeleton loading={loading} animation="gradient" rowCol={[1, 1]}>
          <div className={styles['stat-title']}>{title}</div>
          <div className={styles['stat-count']}>
            {count}
            <span className={styles['stat-unit']}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default function Overview() {
  const { t } = useTranslation();
  const { overview = {} as OverviewData } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const user = useUserStore((s) => s.user);
  const userName = user?.name;

  const theme = useSettingsStore((s) => s.theme);
  const chartSpec = makeSpec(
    {
      type: 'area',
      data: [{ id: 'workplace', values: overview.chartData ?? [] }],
      xField: 'date',
      yField: 'count',
      line: { style: { curveType: 'monotone' } },
      area: {
        style: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 1,
            x1: 0,
            y1: 0,
            stops: [
              { offset: 0, color: 'rgb(0, 112, 204)' },
              { offset: 1, color: 'white' },
            ],
          },
        },
      },
      axes: [
        {
          orient: 'bottom',
          type: 'band',
          label: { autoRotate: false },
          grid: { visible: true, style: { lineWidth: 2, lineDash: [4, 4] } },
        },
        {
          orient: 'left',
          type: 'linear',
          title: { visible: false },
          label: { formatMethod: (text: string) => `${Number(text) / 1000}k` },
          grid: { visible: true, style: { lineWidth: 2, lineDash: [4, 4] } },
        },
      ],
    },
    theme,
  );

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">
        {t('workplace.welcomeBack')}, {userName}
      </Typography.Title>
      <Divider />
      <Row>
        <Col xs={6} md={3} className={styles['stat-col']}>
          <StatisticItem
            icon={<CalendarIcon />}
            title={t('workplace.totalOnlyData')}
            count={overview.allContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col xs={6} md={3} className={styles['stat-col']}>
          <StatisticItem
            icon={<FileIcon />}
            title={t('workplace.contentInMarket')}
            count={overview.liveContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col xs={6} md={3} className={styles['stat-col']}>
          <StatisticItem
            icon={<ChatIcon />}
            title={t('workplace.comments')}
            count={overview.increaseComments}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col xs={6} md={3} className={styles['stat-col']}>
          <StatisticItem
            icon={<CaretUpIcon />}
            title={t('workplace.growth')}
            count={
              <span>
                {overview.growthRate} <CaretUpIcon className={styles['growth-icon']} />
              </span>
            }
            loading={loading}
          />
        </Col>
      </Row>
      <Divider />
      <div>
        <div className={styles['chart-header']}>
          <Typography.Paragraph className="text-[16px] font-medium">
            {t('workplace.contentData')}
            <span className={styles['chart-sub-title']}>({t('workplace.1year')})</span>
          </Typography.Paragraph>
          <Typography.Text theme="primary">{t('workplace.seeMore')}</Typography.Text>
        </div>
        <div className="h-[300px] chart-wrapper">
          <VChart spec={chartSpec} />
        </div>
      </div>
    </Card>
  );
}
