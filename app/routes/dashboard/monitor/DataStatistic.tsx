import { Button, Card, RadioGroup, Table, Tag, Tabs, Typography } from 'tdesign-react';
import type { PrimaryTableCol } from 'tdesign-react';
import { useTranslation } from 'react-i18next';

const COVER_IMG = 'images/monitor/studio.webp';

const DATA = [
  {
    cover: COVER_IMG,
    name: '视频直播',
    duration: '00:05:19',
    id: '54e23ade',
    status: -1,
  },
];

export default function DataStatistic() {
  const { t } = useTranslation();

  const columns: PrimaryTableCol<(typeof DATA)[number]>[] = [
    {
      title: t('monitor.list.title.order'),
      colKey: 'order',
      width: 80,
      cell: ({ rowIndex }) => <span>{rowIndex + 1}</span>,
    },
    {
      title: t('monitor.list.title.cover'),
      colKey: 'cover',
      width: 120,
      cell: ({ row }) => (
        <div className="relative h-[68px]">
          <img className="h-full" src={row.cover} alt="cover" />
          {row.status === -1 && (
            <Tag theme="danger" className="absolute top-[6px] left-[6px]">
              {t('monitor.list.tag.auditFailed')}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: t('monitor.list.title.name'),
      colKey: 'name',
    },
    {
      colKey: 'duration',
      title: t('monitor.list.title.duration'),
    },
    {
      colKey: 'id',
      title: t('monitor.list.title.id'),
    },
  ];

  return (
    <Card>
      <Tabs
        defaultValue="liveMethod"
        list={[
          { value: 'liveMethod', label: t('monitor.tab.title.liveMethod') },
          { value: 'onlineUsers', label: t('monitor.tab.title.onlineUsers') },
        ]}
      />
      <div className="py-[20px]">
        <RadioGroup
          defaultValue="3"
          theme="button"
          options={[
            { value: '1', label: t('monitor.liveMethod.normal') },
            { value: '2', label: t('monitor.liveMethod.flowControl') },
            { value: '3', label: t('monitor.liveMethod.video') },
            { value: '4', label: t('monitor.liveMethod.web') },
          ]}
        />

        <div>
          <div className="flex justify-between mt-[16px]">
            <Button theme="default" variant="text">
              {t('monitor.editCarousel')}
            </Button>
            <Button disabled>{t('monitor.startCarousel')}</Button>
          </div>
          <div className="mt-[16px]">
            <Table columns={columns} data={DATA} rowKey="id" />
            <Typography.Text theme="secondary" className="block mt-[16px] text-center">
              {t('monitor.list.tip.rotations')}
              {DATA.length}
              {t('monitor.list.tip.rest')}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
