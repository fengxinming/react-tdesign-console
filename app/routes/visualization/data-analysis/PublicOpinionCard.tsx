import { Skeleton, Typography } from 'tdesign-react';
import { ArrowDownIcon, ArrowUpIcon } from 'tdesign-icons-react';
import { VChart } from '@visactor/react-vchart';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import type { OverviewItem, ChartPoint } from '~/api/types';
import type { MiniChartProps } from './types';
import styles from './style.module.styl';

type MiniTheme = MiniChartProps['theme'];

function pieSpec(data: ChartPoint[], theme: MiniTheme) {
  return makeSpec(
    {
      type: 'pie',
      data: [{ id: 'opinion-pie', values: data }],
      valueField: 'count',
      categoryField: 'name',
      radius: 0.9,
      innerRadius: 0.6,
      color: ['#8D4EDA', '#00B2FF', '#165DFF'],
      legends: { visible: true, orient: 'right', position: 'middle', layout: 'vertical' },
      tooltip: {
        dimension: {
          title: { value: { field: 'name' } },
          content: [{ value: { field: 'count' } }],
        },
      },
    },
    theme,
  );
}

function lineSpec(data: ChartPoint[], theme: MiniTheme) {
  return makeSpec(
    {
      type: 'line',
      data: [{ id: 'opinion-line', values: data }],
      xField: 'x',
      yField: 'y',
      seriesField: 'name',
      color: ['#165DFF', 'rgba(106,161,255,0.3)'],
      line: { style: { curveType: 'monotone', lineWidth: 3 } },
      axes: [
        { orient: 'bottom', visible: false },
        { orient: 'left', visible: false },
      ],
      legends: { visible: false },
      tooltip: { visible: false },
      padding: { top: 10, left: 10, bottom: 0, right: 10 },
    },
    theme,
  );
}

function columnSpec(data: ChartPoint[], theme: MiniTheme) {
  return makeSpec(
    {
      type: 'bar',
      data: [{ id: 'opinion-column', values: data }],
      xField: 'x',
      yField: 'y',
      bar: {
        style: {
          fill: (d: ChartPoint) => (Number(d.x) % 2 === 0 ? '#2CAB40' : '#86DF6C'),
          cornerRadius: 6,
        },
      },
      barMaxWidth: 6,
      axes: [
        { orient: 'bottom', visible: false },
        { orient: 'left', visible: false },
      ],
      legends: { visible: false },
      tooltip: { visible: false },
      padding: { top: 10, left: 10, bottom: 0, right: 10 },
    },
    theme,
  );
}

function MiniChart({ chartType, chartData, theme }: MiniChartProps) {
  if (chartType === 'pie') {
    return (
      <div className="w-full h-[100px]">
        <div className="w-full h-[140px] my-[-20px]">
          <VChart spec={pieSpec(chartData, theme)} />
        </div>
      </div>
    );
  }
  if (chartType === 'line') {
    return (
      <div className="w-full h-[100px]">
        <VChart spec={lineSpec(chartData, theme)} />
      </div>
    );
  }
  return (
    <div className="w-full h-[100px]">
      <VChart spec={columnSpec(chartData, theme)} />
    </div>
  );
}

export default function PublicOpinionCard(props: OverviewItem) {
  const { chartType, title, count, increment, diff, chartData, loading, compareTime } = props;
  const theme = useSettingsStore((s) => s.theme);
  const className = `${styles.card} ${styles[`card-${chartType}`]}`;

  return (
    <div className={className}>
      <div className="whitespace-nowrap w-[100px]">
        <Typography.Title level="h5" className="m-0">
          {title}
        </Typography.Title>
        <div className={styles.value}>
          {Number(count ?? 0).toLocaleString()}
        </div>
        <div className="flex">
          <Typography.Text theme="secondary" className={styles['compare-yesterday-text']}>
            {compareTime}
          </Typography.Text>
          <span className={`${styles.diff} ${increment ? styles['diff-increment'] : ''}`}>
            <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
              {diff}
              {increment ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Skeleton>
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col-reverse">
        <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
          <MiniChart chartType={chartType} chartData={(chartData as ChartPoint[]) ?? []} theme={theme} />
        </Skeleton>
      </div>
    </div>
  );
}
