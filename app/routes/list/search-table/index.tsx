import { useState, useMemo } from 'react';
import { Button, Card, Space, Table, Typography } from 'tdesign-react';
import type { PaginationProps } from 'tdesign-react';
import { AddIcon, DownloadIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import SearchForm from './SearchForm';
import { getColumns } from './constants';
import { useSearchQuery } from '~/hooks/api/useSearchTable';
import type { SearchResult } from '~/api/types';

// 空结果占位：模块级常量，保证引用稳定
const EMPTY_RESULT: SearchResult = { list: [], total: 0 };

export default function SearchTable() {
  const { t } = useTranslation();

  const tableCallback = (_record: Record<string, any>, _type: string) => {
    // 预留：查看 / 编辑等行操作的回调入口
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    pageSize: 10,
    current: 1,
  });
  const [formParams, setFormParams] = useState<Record<string, any>>({});

  const { current, pageSize } = pagination;

  // 分页 / 筛选条件变化时自动重新拉取（queryKey 带参，参数变化即重取）
  const { data = EMPTY_RESULT, isLoading: loading } = useSearchQuery(current, pageSize, formParams);

  function onChangeTable(pag?: PaginationProps) {
    setPagination((p) => ({
      ...p,
      current: pag?.current ?? 1,
      pageSize: pag?.pageSize ?? 10,
    }));
  }

  function handleSearch(params: Record<string, any>) {
    setPagination((p) => ({ ...p, current: 1 }));
    setFormParams(params);
  }

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('menu.list.searchTable')}</Typography.Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper per={[{ resource: 'menu.list.searchTable', actions: ['write'] }]}>
        <div className="flex flex-wrap gap-[8px] justify-between mb-[20px]">
          <Space>
            <Button theme="primary" icon={<AddIcon />}>
              {t('searchTable.operations.add')}
            </Button>
            <Button variant="outline" theme="default">
              {t('searchTable.operations.upload')}
            </Button>
          </Space>
          <Space>
            <Button variant="outline" theme="default" icon={<DownloadIcon />}>
              {t('searchTable.operation.download')}
            </Button>
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={(changeInfo) => onChangeTable(changeInfo.pagination)}
        pagination={{
          current,
          pageSize,
          total: data.total,
          showPageSize: true,
          showJumper: true,
        }}
        columns={columns}
        data={data.list}
      />
    </Card>
  );
}
