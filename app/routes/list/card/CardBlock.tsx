import { useState } from 'react';
import cs from 'classnames';
import {
  Button,
  Card,
  Descriptions,
  Dropdown,
  Skeleton,
  Switch,
  Tag,
  Typography,
} from 'tdesign-react';
import {
  CheckCircleIcon,
  EditIcon,
  ErrorCircleIcon,
  MoreIcon,
  SmileIcon,
  StarIcon,
  SunnyIcon,
  ThumbUpIcon,
} from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '~/hooks/useMediaQuery';
import PermissionWrapper from '~/components/PermissionWrapper';
import type { CardBlockProps } from './types';
import styles from './style.module.styl';

const IconList = [
  { key: 'star', Comp: StarIcon },
  { key: 'thumbUp', Comp: ThumbUpIcon },
  { key: 'sun', Comp: SunnyIcon },
  { key: 'smile', Comp: SmileIcon },
  { key: 'pen', Comp: EditIcon },
].map(({ key, Comp }) => <Comp key={key} />);

const EMPTY_CARD: CardBlockProps['card'] = {};

export default function CardBlock({
  type,
  card = EMPTY_CARD,
  loading: loadingProp,
}: CardBlockProps) {
  const { t } = useTranslation();
  const wide = useMediaQuery('(min-width: 900px)');
  const [actionLoading, setActionLoading] = useState(false);
  const [statusOverride, setStatusOverride] = useState<0 | 1 | 2 | undefined>(undefined);

  const status = statusOverride ?? card.status;
  const loading = loadingProp || actionLoading;

  const changeStatus = async () => {
    setActionLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatusOverride(status === 1 ? 0 : 1);
        resolve();
      }, 1000);
    });
    setActionLoading(false);
  };

  const getTitleIcon = () =>
    type === 'service' && typeof card.icon === 'number' ? (
      <div className={styles.icon}>{IconList[card.icon % IconList.length]}</div>
    ) : null;

  const getButtonGroup = () => {
    if (type === 'quality') {
      return (
        <>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['read'] }]}>
            <Button theme="primary" className="!ml-[8px]" loading={loading}>
              {t('cardList.options.qualityInspection')}
            </Button>
          </PermissionWrapper>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['write'] }]}>
            <Button theme="default" variant="outline" loading={loading}>
              {t('cardList.options.remove')}
            </Button>
          </PermissionWrapper>
        </>
      );
    }

    if (type === 'service') {
      return status === 1 ? (
        <Button loading={loading} onClick={changeStatus}>
          {t('cardList.options.cancel')}
        </Button>
      ) : (
        <Button loading={loading} onClick={changeStatus}>
          {status === 0 ? t('cardList.options.subscribe') : t('cardList.options.renewal')}
        </Button>
      );
    }

    return <Switch value={!!status} loading={loading} onChange={changeStatus} />;
  };

  const getStatus = () => {
    if (type === 'rules' && status) {
      return (
        <Tag theme="success" icon={<CheckCircleIcon />} className="!ml-[8px]">
          {t('cardList.tag.activated')}
        </Tag>
      );
    }
    switch (status) {
      case 1:
        return (
          <Tag theme="success" icon={<CheckCircleIcon />} className="!ml-[8px]">
            {t('cardList.tag.opened')}
          </Tag>
        );
      case 2:
        return (
          <Tag theme="danger" icon={<ErrorCircleIcon />} className="!ml-[8px]">
            {t('cardList.tag.expired')}
          </Tag>
        );
      default:
        return null;
    }
  };

  const getContent = () => {
    if (loading) {
      return (
        <Skeleton
          animation="gradient"
          className={styles['card-block-skeleton']}
          rowCol={type !== 'quality' ? [1, 1, 1] : [1, 1]}
        />
      );
    }
    if (type !== 'quality') {
      return <Typography.Paragraph>{card.description}</Typography.Paragraph>;
    }
    return (
      <Descriptions
        column={wide ? 2 : 1}
        tableLayout="auto"
        labelStyle={{ whiteSpace: 'nowrap' }}
        items={[
          { label: t('cardList.quality.qualityCount'), content: card.qualityCount },
          { label: t('cardList.quality.duration'), content: `${card.duration}s` },
          { label: t('cardList.quality.randomCount'), content: card.randomCount },
        ]}
      />
    );
  };

  return (
    <Card
      className={cs(styles['card-block'], styles[`${type}-card`])}
      bordered
      title={
        loading ? (
          <Skeleton
            animation="gradient"
            className={styles['card-block-skeleton'] + ' w-[120px] h-[24px]'}
            rowCol={[1]}
          />
        ) : (
          <>
            <div className={cs(styles.title)}>
              {getTitleIcon()}
              {card.title}
              {getStatus()}
              <Dropdown
                trigger="click"
                options={[
                  { content: t('cardList.dropdown.operation1'), value: 'operation1' },
                  { content: t('cardList.dropdown.operation2'), value: 'operation2' },
                ]}
              >
                <div className={styles.more}>
                  <MoreIcon />
                </div>
              </Dropdown>
            </div>
            <div className={styles.time}>{card.time}</div>
          </>
        )
      }
    >
      <div className={styles.content}>{getContent()}</div>
      <div className="flex flex-row-reverse">{getButtonGroup()}</div>
    </Card>
  );
}
