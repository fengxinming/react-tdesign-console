import { useState } from 'react';
import { Card, Col, Input, Row, Tabs, Typography } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { fetchCardList } from '~/api/list';
import CardBlock from './CardBlock';
import AddCard from './AddCard';
import type { CardItem } from './types';
import type { CardListData, CardType } from '~/api/types';
import styles from './style.module.styl';

const defaultList: CardItem[] = Array.from({ length: 10 }, () => ({}));

// 骨架屏占位：模块级常量，保证引用稳定
const DEFAULT_DATA: CardListData = {
  quality: defaultList,
  service: defaultList,
  rules: defaultList,
};

// 无操作查询：loader 直接拉数据并 return，组件用 useLoaderData 读取
export async function loader(): Promise<CardListData> {
  return fetchCardList();
}

export default function CardList() {
  const { t } = useTranslation();
  const data = useLoaderData<CardListData>() ?? DEFAULT_DATA;
  const loading = useNavigation().state !== 'idle';
  const [activeKey, setActiveKey] = useState('all');

  const getCardList = (list: CardItem[], type: CardType) => (
    <Row gutter={24} className="min-h-[180px] w-full">
      {type === 'quality' && (
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddCard description={t('cardList.add.quality')} />
        </Col>
      )}
      {list.map((item) => (
        <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CardBlock card={item} type={type} loading={loading} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Card bordered={false}>
      <Typography.Title level="h5">{t('menu.list.cardList')}</Typography.Title>
      <Tabs
        value={activeKey}
        onChange={(value) => setActiveKey(String(value))}
        action={
          <Input
            prefixIcon={<SearchIcon />}
            className="!w-[240px] max-md:!hidden"
            placeholder={t(`cardList.tab.${activeKey}.placeholder`)}
          />
        }
        list={[
          { value: 'all', label: t('cardList.tab.title.all') },
          { value: 'quality', label: t('cardList.tab.title.quality') },
          { value: 'service', label: t('cardList.tab.title.service') },
          { value: 'rules', label: t('cardList.tab.title.rules') },
        ]}
      />
      <div className={styles.container}>
        {activeKey === 'all' ? (
          Object.entries(data).map(([key, list]) => (
            <div key={key}>
              <Typography.Title level="h5">{t(`cardList.tab.title.${key}`)}</Typography.Title>
              {getCardList(list, key as CardType)}
            </div>
          ))
        ) : (
          <div className="mt-[30px]">
            {getCardList(data[activeKey as CardType], activeKey as CardType)}
          </div>
        )}
      </div>
    </Card>
  );
}
