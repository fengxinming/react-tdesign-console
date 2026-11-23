import { Badge, Button, Card, Col, Row, Space, Steps, Table, Typography } from 'tdesign-react';
import type { PrimaryTableCol } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { fetchBasicProfile, fetchAdjustment } from '~/api/profile';
import type { AdjustmentItem } from '~/api/types';
import ProfileItem from './ProfileItem';
import type { ProfileLoaderData } from './types';
import styles from './style.module.styl';

export async function loader(): Promise<ProfileLoaderData> {
  const [data, preData, tableData] = await Promise.all([
    fetchBasicProfile(),
    fetchBasicProfile(),
    fetchAdjustment(),
  ]);
  return { data, preData, tableData };
}

export default function ProfileBasic() {
  const { t } = useTranslation();
  const { data, preData, tableData } = useLoaderData<ProfileLoaderData>();
  const pending = useNavigation().state !== 'idle';

  const columns: PrimaryTableCol<AdjustmentItem>[] = [
    {
      colKey: 'contentId',
      title: t('basicProfile.adjustment.contentId'),
    },
    {
      colKey: 'content',
      title: t('basicProfile.adjustment.content'),
    },
    {
      colKey: 'status',
      title: t('basicProfile.adjustment.status'),
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-2">
          <Badge dot color={row.status ? '#00a870' : '#0052d9'} />
          {row.status ? t('basicProfile.adjustment.success') : t('basicProfile.adjustment.waiting')}
        </span>
      ),
    },
    {
      colKey: 'updatedTime',
      title: t('basicProfile.adjustment.updatedTime'),
    },
    {
      colKey: 'operation',
      title: t('basicProfile.adjustment.operation'),
      cell: () => (
        <Button theme="default" variant="text">
          {t('basicProfile.adjustment.operation.view')}
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <Row justify="space-between" align="middle">
          <Col xs={12} md={10}>
            <Typography.Title level="h5">{t('basicProfile.title.form')}</Typography.Title>
          </Col>
          <Col xs={12} md={2}>
            <Space className="w-full flex justify-end">
              <Button theme="default" variant="outline">
                {t('basicProfile.cancel')}
              </Button>
              <Button theme="primary">{t('basicProfile.goBack')}</Button>
            </Space>
          </Col>
        </Row>

        <Steps
          current={data.status}
          className={styles.steps}
          options={[
            { title: t('basicProfile.steps.commit') },
            { title: t('basicProfile.steps.approval') },
            { title: t('basicProfile.steps.finish') },
          ]}
        />
      </Card>

      <ProfileItem data={data} type="current" loading={pending} />
      <ProfileItem data={preData} type="origin" loading={pending} />

      <Card>
        <Typography.Title level="h5">{t('basicProfile.adjustment.record')}</Typography.Title>
        <Table rowKey="contentId" loading={pending} data={tableData} columns={columns} />
      </Card>
    </div>
  );
}
