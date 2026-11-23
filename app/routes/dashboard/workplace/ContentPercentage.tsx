import { Card, Loading, Typography } from 'tdesign-react';
import { VChart } from '@visactor/react-vchart';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import { makeSpec } from '~/commons/vchart';
import type { WorkplaceLoaderData } from './types';
import type { PercentageItem } from '~/api/types';

/** 内容占比：由路由 loader 提供数据，这里直接 useLoaderData 取用。 */
export default function ContentPercentage() {
  const { t } = useTranslation();
  const { contentPercentage } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const theme = useSettingsStore((s) => s.theme);
  const sum = contentPercentage.reduce((a, b) => a + b.count, 0);
  const chartSpec = makeSpec({
    type: 'pie',
    data: [{ id: 'content', values: contentPercentage }],
    valueField: 'count',
    categoryField: 'type',
    outerRadius: 0.7,
    innerRadius: 0.5,
    color: ['#21CCFF', '#313CA9', '#249EFF'],
    legends: { visible: true, orient: 'bottom' },
    label: {
      visible: true,
      position: 'outside',
      formatMethod: (_text: string, datum: PercentageItem) => `${(datum.percent * 100).toFixed(2)}%`,
    },
    indicator: {
      visible: true,
      trigger: 'none',
      title: { visible: true, style: { text: '内容量', fontSize: 14, fontWeight: 500 } },
      content: [{ visible: true, style: { text: Number(sum).toLocaleString(), fontSize: 16, fontWeight: 700 } }],
    },
  }, theme);

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('workplace.contentPercentage')}</Typography.Title>
      <Loading loading={loading} className="w-full">
        <div className="h-[339px]">
          <VChart spec={chartSpec} />
        </div>
      </Loading>
    </Card>
  );
}
