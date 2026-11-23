import type { PrimaryTableCol } from 'tdesign-react';
import { Badge, Button, Typography } from 'tdesign-react';
import { FileIcon, VideoIcon, ImageIcon } from 'tdesign-icons-react';
import dayjs from 'dayjs';
import styles from './style.module.styl';
import type { T } from './types';

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];

const ContentIcon = [<FileIcon key={0} />, <VideoIcon key={1} />, <ImageIcon key={2} />];

export function getColumns(
  t: T,
  callback: (record: Record<string, any>, type: string) => void,
): PrimaryTableCol<Record<string, any>>[] {
  return [
    {
      title: t('searchTable.columns.id'),
      colKey: 'id',
      cell: ({ row }) => <Typography.Text copyable>{row.id}</Typography.Text>,
    },
    {
      title: t('searchTable.columns.name'),
      colKey: 'name',
    },
    {
      title: t('searchTable.columns.contentType'),
      colKey: 'contentType',
      cell: ({ row }) => (
        <div className={styles['content-type']}>
          {ContentIcon[row.contentType]}
          {ContentType[row.contentType]}
        </div>
      ),
    },
    {
      title: t('searchTable.columns.filterType'),
      colKey: 'filterType',
      cell: ({ row }) => FilterType[row.filterType],
    },
    {
      title: t('searchTable.columns.contentNum'),
      colKey: 'count',
      sorter: (a, b) => a.count - b.count,
      cell: ({ row }) => Number(row.count).toLocaleString(),
    },
    {
      title: t('searchTable.columns.createdTime'),
      colKey: 'createdTime',
      sorter: (a, b) => b.createdTime - a.createdTime,
      cell: ({ row }) => dayjs().subtract(row.createdTime, 'days').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('searchTable.columns.status'),
      colKey: 'status',
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-2">
          <Badge dot color={row.status === 0 ? '#e34d59' : '#00a870'} />
          <Typography.Text>{Status[row.status]}</Typography.Text>
        </span>
      ),
    },
    {
      title: t('searchTable.columns.operations'),
      colKey: 'operations',
      cell: ({ row }) => (
        <Button
          theme="default"
          variant="text"
          size="small"
          onClick={() => callback(row, 'view')}
        >
          {t('searchTable.columns.operations.view')}
        </Button>
      ),
    },
  ];
}
