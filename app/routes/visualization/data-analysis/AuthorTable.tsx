import { useMemo } from 'react';
import { Card, Table, Typography } from 'tdesign-react';
import type { PrimaryTableCol } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import type { DataAnalysisLoaderData } from './types';
import type { AuthorItem } from '~/api/types';

/** 作者榜单:由路由 loader 提供数据，这里直接 useLoaderData 取用。 */
export default function AuthorTable() {
  const { t } = useTranslation();
  const { authorList } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const columns = useMemo<PrimaryTableCol<AuthorItem>[]>(
    () => [
      { colKey: 'id', title: t('dataAnalysis.authorTable.rank') },
      { colKey: 'author', title: t('dataAnalysis.authorTable.author') },
      {
        colKey: 'contentCount',
        title: t('dataAnalysis.authorTable.content'),
        sorter: (a, b) => (a.contentCount ?? 0) - (b.contentCount ?? 0),
        cell: ({ row }) => row.contentCount.toLocaleString(),
      },
      {
        colKey: 'clickCount',
        title: t('dataAnalysis.authorTable.click'),
        sorter: (a, b) => (a.clickCount ?? 0) - (b.clickCount ?? 0),
        cell: ({ row }) => row.clickCount.toLocaleString(),
      },
    ],
    [t],
  );

  return (
    <Card bordered={false} className="w-full">
      <Typography.Title level="h5">{t('dataAnalysis.title.authorsList')}</Typography.Title>
      <div className="h-[378px]">
        <Table rowKey="id" loading={loading} data={authorList} columns={columns} />
      </div>
    </Card>
  );
}
