import { useMemo } from 'react';
import { Card, Col, Row, Skeleton, Typography } from 'tdesign-react';
import { ArrowDownIcon, ArrowUpIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { VChart } from '@visactor/react-vchart';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import cs from 'classnames';
import type { CardBlockData } from '~/api/types';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

function CardBlock(props: CardBlockData) {
  const { chartType, title, count, increment, diff, chartData, loading } = props;
  const theme = useSettingsStore((s) => s.theme);

  const data = chartData ?? [];
  const lineSpec = makeSpec(
    {
      type: 'line',
      data: [{ id: 'card-line', values: data }],
      xField: 'x',
      yField: 'y',
      seriesField: 'name',
      color: ['#165DFF', 'rgba(106,161,255,0.3)'],
      line: { style: { curveType: 'monotone', lineWidth: 2 } },
      axes: [
        { orient: 'bottom', visible: false },
        { orient: 'left', visible: false },
      ],
      legends: { visible: false },
      tooltip: { visible: false },
      padding: { top: 0, left: 10, bottom: 0, right: 10 },
    },
    theme,
  );
  const columnSpec = makeSpec(
    {
      type: 'bar',
      data: [{ id: 'card-column', values: data }],
      xField: 'x',
      yField: 'y',
      bar: {
        style: {
          fill: (d: { x: number }) => (Number(d.x) % 2 === 0 ? '#86DF6C' : '#468DFF'),
        },
      },
      barMaxWidth: 10,
      axes: [
        { orient: 'bottom', visible: false },
        { orient: 'left', visible: false },
      ],
      legends: { visible: false },
      tooltip: { visible: false },
      padding: { top: 0, left: 10, bottom: 0, right: 10 },
    },
    theme,
  );

  return (
    <Card bordered={false} className={styles['card-block']}>
      <div className="flex flex-col">
        <Typography.Title level="h5" className="!m-0">
          {title}
        </Typography.Title>
        <div className="flex items-center">
          <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
            <span
              className={cs(styles['diff'], {
                [styles['diff-increment']]: increment,
              })}
            >
              {diff}
              {increment ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </span>
          </Skeleton>
          <span className={cs(styles.value, 'ml-[8px]')}>
            {Number(count ?? 0).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="w-full h-[80px]">
        {chartType === 'interval' ? <VChart spec={columnSpec} /> : <VChart spec={lineSpec} />}
      </div>
    </Card>
  );
}

/** 内容消费趋势四卡:条目卡 CardBlock 走 props,数据由路由 loader 提供。 */
export default function CardList() {
  const { t } = useTranslation();
  const { cardList: data } = useLoaderData<MultiDimensionLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const formatData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        title: t(`multiDAnalysis.cardList.${item.name}`),
      })),
    [t, data],
  );

  return (
    <Row gutter={16}>
      {formatData.map((item) => (
        <Col xs={12} md={3} key={item.name}>
          <CardBlock key={item.name} {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
