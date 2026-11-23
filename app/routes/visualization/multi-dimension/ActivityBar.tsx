import { VChart } from '@visactor/react-vchart';
import { Card, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import type { MultiDimensionLoaderData } from './types';

/** 今日转赞评:横向条形(单色圆角条)。数据由路由 loader 提供。 */
export default function ActivityBar() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { interval: data } = useLoaderData<MultiDimensionLoaderData>();

  const config = makeSpec(
    {
      type: 'bar',
      direction: 'horizontal',
      data: [{ id: 'activity', values: [...data].reverse() }],
      xField: 'name',
      yField: 'count',
      barMaxWidth: 10,
      bar: { style: { fill: '#4086FF', cornerRadius: 8 } },
      axes: [
        { orient: 'left', type: 'band', title: { visible: false } },
        {
          orient: 'bottom',
          type: 'linear',
          title: { visible: false },
          label: { formatMethod: (text: string) => `${Number(text) / 1000}k` },
        },
      ],
      legends: { visible: false },
    },
    theme,
  );

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('multiDAnalysis.card.title.todayActivity')}</Typography.Title>
      <div className="w-full h-[176px]">
        <VChart spec={config} />
      </div>
    </Card>
  );
}
