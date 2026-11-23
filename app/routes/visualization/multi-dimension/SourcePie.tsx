import { VChart } from '@visactor/react-vchart';
import { Card, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import type { ContentSourceItem } from '~/api/types';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

// 5 种 type 的固定配色(手写图例与各环饼共用,保证颜色一致)
const SOURCE_COLORS = ['#249eff', '#846BCE', '#21CCFF', '#86DF6C', '#0E42D2'];

/** 内容发布来源:分面多环饼(每类一个环饼 + 中心类目名 + 百分比标签)。数据由路由 loader 提供。 */
export default function SourcePie() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { multiPie: data } = useLoaderData<MultiDimensionLoaderData>();
  const types = Array.from(new Set(data.map((d) => d.type)));
  const categories = Array.from(new Set(data.map((d) => d.category)));

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('multiDAnalysis.card.title.contentSource')}</Typography.Title>
      <div className="min-h-[240px]">
        <div className="flex">
          {categories.map((cat) => {
            const spec = makeSpec(
              {
                type: 'pie',
                data: [{ id: `source-${cat}`, values: data.filter((d) => d.category === cat) }],
                valueField: 'value',
                categoryField: 'type',
                radius: 0.8,
                innerRadius: 0.6,
                color: { type: 'ordinal', domain: types, range: SOURCE_COLORS },
                legends: { visible: false },
                label: {
                  visible: true,
                  position: 'outside',
                  formatMethod: (_text: string, d: ContentSourceItem) =>
                    `${(d.value * 100).toFixed(2)}%`,
                  style: { fontSize: 10 },
                },
                indicator: {
                  visible: true,
                  trigger: 'none',
                  title: { visible: true, style: { text: cat, fontSize: 14, fontWeight: 500 } },
                },
              },
              theme,
            );
            return (
              <div key={cat} className="flex-1 min-w-0">
                <div className="w-full h-[260px]">
                  <VChart spec={spec} />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles['content-source-legend']}>
          {types.map((type, i) => (
            <span key={type} className={styles['content-source-legend-item']}>
              <span
                className={styles['content-source-legend-dot']}
                style={{ background: SOURCE_COLORS[i % SOURCE_COLORS.length] }}
              />
              {type}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
