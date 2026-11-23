import { VChart } from '@visactor/react-vchart';
import { Card, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import type { MultiDimensionLoaderData } from './types';

/** 内容题材分布:雷达图(按 category 分色)。数据由路由 loader 提供。 */
export default function ThemeRadar() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { polar } = useLoaderData<MultiDimensionLoaderData>();

  // 把宽格式转成长格式:每行 { item, category, value }
  const longData = polar.list.flatMap((row) =>
    polar.fields.map((field) => ({
      item: row.item,
      category: field,
      value: row[field] as number,
    })),
  );

  const config = makeSpec(
    {
      type: 'radar',
      data: [{ id: 'polar', values: longData }],
      // 雷达图：angleField 为维度(离散类目)，radiusField 为数值，seriesField 为系列分组
      angleField: 'item',
      radiusField: 'value',
      seriesField: 'category',
      area: { style: { fillOpacity: 0.1 } },
      line: { style: { lineWidth: 2 } },
      innerRadius: 0,
      outerRadius: 0.9,
      color: ['#313CA9', '#21CCFF', '#249EFF'],
      axes: [
        { orient: 'radius', visible: true, label: { visible: false } },
        { orient: 'angle', visible: true },
      ],
      legends: { visible: true, orient: 'right', position: 'middle', layout: 'vertical' },
    },
    theme,
  );

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('multiDAnalysis.card.title.contentTheme')}</Typography.Title>
      <div className="w-full h-[215px]">
        <div className="h-[235px] my-[15px]">
          <VChart spec={config} />
        </div>
      </div>
    </Card>
  );
}
