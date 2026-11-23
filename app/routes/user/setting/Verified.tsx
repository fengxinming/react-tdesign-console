import { Badge, Button, Descriptions, Skeleton, Space, Table, Tag, Typography } from 'tdesign-react';
import type { PrimaryTableCol } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useEnterpriseQuery, useAuthListQuery } from '~/hooks/api/useUser';
import useMediaQuery from '~/hooks/useMediaQuery';
import type { VerifiedInfo, AuthRecord } from '~/api/types';
import styles from './style.module.styl';

const DEFAULT_ENTERPRISE: VerifiedInfo = {
  accountType: '',
  isVerified: true,
  verifiedTime: '',
  legalPersonName: '',
  certificateType: '',
  certificationNumber: '',
  enterpriseName: '',
  enterpriseCertificateType: '',
  organizationCode: '',
};

/** 实名认证:企业信息 Descriptions + 认证记录 Table。自取 verified/enterprise、verified/authList。 */
export default function Verified() {
  const { t } = useTranslation();
  const { data: enterprise = DEFAULT_ENTERPRISE, isLoading: loading } = useEnterpriseQuery();
  const { data: tableData = [], isLoading: tableLoading } = useAuthListQuery();
  const wide = useMediaQuery('(min-width: 900px)');

  const loadingNode = <Skeleton animation="gradient" rowCol={[1]} />;

  const columns: PrimaryTableCol<AuthRecord>[] = [
    {
      colKey: 'authType',
      title: t('userSetting.verified.authType'),
    },
    {
      colKey: 'authContent',
      title: t('userSetting.verified.authContent'),
    },
    {
      colKey: 'authStatus',
      title: t('userSetting.verified.authStatus'),
      cell: ({ row }) =>
        row.authStatus ? (
          <span className="inline-flex items-center gap-2">
            <Badge dot color="#00a870" />
            {t('userSetting.verified.status.success')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Badge dot color="#0052d9" />
            {t('userSetting.verified.status.waiting')}
          </span>
        ),
    },
    {
      colKey: 'createdTime',
      title: t('userSetting.verified.createdTime'),
    },
    {
      colKey: 'operation',
      title: t('userSetting.verified.operation'),
      cell: ({ row }) => (
        <Space>
          <Button theme="default" variant="text">
            {t('userSetting.verified.operation.view')}
          </Button>
          {row.authStatus ? null : (
            <Button theme="default" variant="text">
              {t('userSetting.verified.operation.revoke')}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles['verified']}>
      <Typography.Title level="h5">{t('userSetting.verified.enterprise')}</Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        layout="horizontal"
        column={wide ? 3 : 1}
        tableLayout="auto"
        labelStyle={{ textAlign: 'right', whiteSpace: 'nowrap' }}
        items={Object.entries(enterprise).map(([key, value]) => ({
          label: t(`userSetting.verified.label.${key}`),
          content: loading ? (
            loadingNode
          ) : typeof value === 'boolean' ? (
            value ? (
              <Tag theme="success">{t('userSetting.value.verified')}</Tag>
            ) : (
              <Tag theme="danger">{t('userSetting.value.notVerified')}</Tag>
            )
          ) : (
            (value as string)
          ),
        }))}
      />
      <Typography.Title level="h5">{t('userSetting.verified.records')}</Typography.Title>
      <Table<AuthRecord>
        rowKey="createdTime"
        columns={columns}
        data={tableData}
        loading={tableLoading}
      />
    </div>
  );
}
