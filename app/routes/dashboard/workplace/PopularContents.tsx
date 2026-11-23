import { useState } from 'react';
import { Card, RadioGroup, Table, Typography } from 'tdesign-react';
import { CaretUpIcon, CaretDownIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import type { PrimaryTableCol } from 'tdesign-react';
import type { WorkplaceLoaderData } from './types';
import type { PopularItem } from '~/api/types';

import styles from './style.module.styl';

// 热门内容榜：由路由 loader 提供数据，这里直接 useLoaderData 取用
const TITLES = [
  '经济日报:财政政策要精准提升效能',
  '"双12"遇冷消费者厌倦了电商平台的促销"套路"',
  '致敬坚守战"疫"一线的社区工作者',
  '普高还是职高?家长们陷入选校难题',
];

export default function PopularContents() {
  const { t } = useTranslation();
  const [type, setType] = useState(0);
  const { popularContents } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';

  // 客户端按分类过滤（mock 返回全部数据）
  const filtered =
    type === 0
      ? popularContents
      : popularContents.map((d) => ({
          ...d,
          title: TITLES[(d.rank + type) % TITLES.length],
        }));

  const columns: PrimaryTableCol<PopularItem>[] = [
    { title: t('workplace.column.rank'), colKey: 'rank', width: 65 },
    {
      title: t('workplace.column.title'),
      colKey: 'title',
      cell: ({ row }) => (
        <Typography.Paragraph className="!m-0" ellipsis>
          {row.title}
        </Typography.Paragraph>
      ),
    },
    {
      title: t('workplace.column.pv'),
      colKey: 'pv',
      width: 100,
      className: styles['table-col-secondary'],
      cell: ({ row }) => `${row.pv / 1000}k`,
    },
    {
      title: t('workplace.column.increase'),
      colKey: 'increase',
      sorter: (a, b) => a.increase - b.increase,
      width: 110,
      className: styles['table-col-secondary'],
      cell: ({ row }) => (
        <span>
          {`${(row.increase * 100).toFixed(2)}%`}
          <span className="ml-[4px]">
            {row.increase < 0 ? (
              <CaretUpIcon className={styles['caret-green']} />
            ) : (
              <CaretDownIcon className={styles['caret-red']} />
            )}
          </span>
        </span>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title level="h5">{t('workplace.popularContents')}</Typography.Title>
        <Typography.Text theme="primary">{t('workplace.seeMore')}</Typography.Text>
      </div>
      <RadioGroup
        theme="button"
        value={type}
        onChange={(value) => setType(value as number)}
        options={[
          { label: t('workplace.text'), value: 0 },
          { label: t('workplace.image'), value: 1 },
          { label: t('workplace.video'), value: 2 },
        ]}
        className="mb-[16px]"
      />
      <Table
        className={styles['popular-table']}
        rowKey="rank"
        columns={columns}
        data={filtered}
        loading={loading}
        tableLayout="fixed"
        pagination={{ defaultPageSize: 5, size: 'small', total: filtered.length }}
      />
    </Card>
  );
}
