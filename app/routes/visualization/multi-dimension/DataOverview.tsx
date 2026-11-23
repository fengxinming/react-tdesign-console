import { useMemo } from 'react';
import { Card, Col, Row, Skeleton, Typography } from 'tdesign-react';
import { EditIcon, HeartIcon, ThumbUpIcon, UserIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { VChart } from '@visactor/react-vchart';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

const lineColors = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];

/** 数据概览：四项指标卡 + 折线图，数据由路由 loader 提供。 */
export default function DataOverview() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { overview } = useLoaderData<MultiDimensionLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const overviewValues = overview.overviewData;
  const lineData = overview.chartData;

  const formattedData = useMemo(() => {
    return [
      {
        title: 'multiDAnalysis.dataOverview.contentProduction',
        icon: <EditIcon />,
        value: overviewValues[0],
        background: '#ffe7ba',
        color: '#fa8c16',
      },
      {
        title: 'multiDAnalysis.dataOverview.contentClicks',
        icon: <ThumbUpIcon />,
        value: overviewValues[1],
        background: '#b5f5ec',
        color: '#13c2c2',
      },
      {
        title: 'multiDAnalysis.dataOverview.contextExposure',
        icon: <HeartIcon />,
        value: overviewValues[2],
        background: 'var(--td-brand-color-light)',
        color: 'var(--td-brand-color)',
      },
      {
        title: 'multiDAnalysis.dataOverview.activeUsers',
        icon: <UserIcon />,
        value: overviewValues[3],
        background: '#f9f0ff',
        color: '#722ed1',
      },
    ];
  }, [overviewValues]);

  const lineSpec = makeSpec(
    {
      type: 'area',
      data: [{ id: 'overview-line', values: lineData }],
      xField: 'time',
      yField: 'count',
      seriesField: 'name',
      color: lineColors,
      area: { style: { fillOpacity: 0.04 } },
      line: { style: { curveType: 'monotone', lineWidth: 2 } },
      axes: [
        { orient: 'bottom', type: 'band', label: { autoRotate: false } },
        {
          orient: 'left',
          type: 'linear',
          label: { formatMethod: (text: string) => `${Number(text) / 100} k` },
        },
      ],
      legends: { visible: false },
    },
    theme,
  );

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('multiDAnalysis.card.title.dataOverview')}</Typography.Title>
      <Row justify="space-between">
        {formattedData.map((item) => (
          <Col xs={6} md={12 / formattedData.length} key={item.title}>
            <Card bordered={false} className={styles['stat-item']}>
              <Typography.Title level="h5">{t(item.title)}</Typography.Title>
              <div className={styles.content}>
                <div
                  style={{ backgroundColor: item.background, color: item.color }}
                  className={styles['content-icon']}
                >
                  {item.icon}
                </div>
                <Skeleton loading={loading} animation="gradient" rowCol={[1]} className="w-[120px]">
                  <span className={styles.skeleton}>{Number(item.value ?? 0).toLocaleString()}</span>
                </Skeleton>
              </div>
            </Card>
          </Col>
        ))}
        <Col span={12}>
          <div className="h-[360px] chart-wrapper">
            <VChart spec={lineSpec} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
