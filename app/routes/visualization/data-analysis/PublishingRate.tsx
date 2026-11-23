import { Card, Loading, Typography } from 'tdesign-react';
import { VChart } from '@visactor/react-vchart';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import { makeSpec } from '~/commons/vchart';
import type { DataAnalysisLoaderData } from './types';

/** 内容发布比例:堆叠柱(按 name 堆叠分色)。 */
export default function PublishingRate() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { contentPublishing } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const config = makeSpec({
    type: 'bar',
    data: [{ id: 'rate', values: contentPublishing }],
    xField: 'time',
    yField: 'count',
    seriesField: 'name',
    stack: true,
    barMaxWidth: 20,
    color: ['#246EFF', '#00B2FF', '#81E2FF'],
    axes: [
      { orient: 'bottom', type: 'band' },
      {
        orient: 'left',
        type: 'linear',
        label: { formatMethod: (text: string) => `${Number(text) / 1000}k` },
      },
    ],
    legends: { visible: true, orient: 'bottom' },
  }, theme);

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('dataAnalysis.title.publishingRate')}</Typography.Title>
      <Loading loading={loading} className="w-full">
        <div className="w-full h-[378px]">
          <VChart spec={config} />
        </div>
      </Loading>
    </Card>
  );
}
