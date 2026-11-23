import type { ProfileItemProps, ProfileBlockItem } from './types';
import { Card, Descriptions, Skeleton, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '~/hooks/useMediaQuery';

const skeleton = (
  <Skeleton animation="gradient" rowCol={[1]} className="w-[200px]" />
);

export default function ProfileItem({ data, type, loading }: ProfileItemProps) {
  const { t } = useTranslation();
  const wide = useMediaQuery('(min-width: 900px)');

  const blockDataList: ProfileBlockItem[] = [];

  blockDataList.push({
    title: t(`basicProfile.title.${type}Video`),
    data: [
      { label: t('basicProfile.label.video.mode'), value: data?.video?.mode || '-' },
      {
        label: t('basicProfile.label.video.acquisition.resolution'),
        value: data?.video?.acquisition?.resolution || '-',
      },
      {
        label: t('basicProfile.label.video.acquisition.frameRate'),
        value: `${data?.video?.acquisition?.frameRate || '-'} fps`,
      },
      {
        label: t('basicProfile.label.video.encoding.resolution'),
        value: data?.video?.encoding?.resolution || '-',
      },
      {
        label: t('basicProfile.label.video.encoding.rate.min'),
        value: `${data?.video?.encoding?.rate?.min || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.rate.max'),
        value: `${data?.video?.encoding?.rate?.max || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.rate.default'),
        value: `${data?.video?.encoding?.rate?.default || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.frameRate'),
        value: `${data?.video?.encoding?.frameRate || '-'} fpx`,
      },
      {
        label: t('basicProfile.label.video.encoding.profile'),
        value: data?.video?.encoding?.profile || '-',
      },
    ],
  });

  blockDataList.push({
    title: t(`basicProfile.title.${type}Audio`),
    data: [
      { label: t('basicProfile.label.audio.mode'), value: data?.audio?.mode || '-' },
      {
        label: t('basicProfile.label.audio.acquisition.channels'),
        value: `${data?.audio?.acquisition?.channels || '-'}${t('basicProfile.unit.audio.channels')}`,
      },
      {
        label: t('basicProfile.label.audio.encoding.channels'),
        value: `${data?.audio?.encoding?.channels || '-'}${t('basicProfile.unit.audio.channels')}`,
      },
      {
        label: t('basicProfile.label.audio.encoding.rate'),
        value: `${data?.audio?.encoding?.rate || '-'} kbps`,
      },
      {
        label: t('basicProfile.label.audio.encoding.profile'),
        value: data?.audio?.encoding?.profile || '-',
      },
    ],
  });

  return (
    <Card>
      <div>
        {blockDataList.map(({ title: blockTitle, data: blockData }, index) => (
          <div key={blockTitle} style={index > 0 ? { marginTop: 20 } : {}}>
            <Typography.Title level="h5">{blockTitle}</Typography.Title>
            <Descriptions
              column={wide ? 3 : 1}
              tableLayout="auto"
              items={blockData.map((item) => ({
                label: item.label,
                content: loading ? skeleton : item.value,
              }))}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
