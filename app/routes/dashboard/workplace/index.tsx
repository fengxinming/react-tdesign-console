import { Row, Col, Space } from 'tdesign-react';
import {
  fetchPopularContents,
  fetchContentPercentage,
  fetchOverview,
} from '~/api/dashboard';
import type { WorkplaceLoaderData } from './types';
import Overview from './Overview';
import PopularContents from './PopularContents';
import ContentPercentage from './ContentPercentage';
import Shortcuts from './Shortcuts';
import CarouselWidget from './Carousel';
import Announcement from './Announcement';
import Docs from './Docs';
import styles from './style.module.styl';

// 无操作查询：loader 直接拉数据并 return；Announcement 走 10s 轮询（见 Announcement.tsx）
export async function loader(): Promise<WorkplaceLoaderData> {
  const [popularContents, contentPercentage, overview] = await Promise.all([
    fetchPopularContents(),
    fetchContentPercentage(),
    fetchOverview(),
  ]);
  return { popularContents, contentPercentage, overview };
}

export default function Workplace() {
  return (
    <div className={`${styles.workplace} flex w-full`}>
      <Space direction="vertical" size={16} className={styles.left} style={{ alignItems: 'stretch' }}>
        <Overview />
        <Row gutter={16}>
          <Col xs={12} md={6} className={styles['split-col']}>
            <PopularContents />
          </Col>
          <Col xs={12} md={6} className={styles['split-col']}>
            <ContentPercentage />
          </Col>
        </Row>
      </Space>
      <Space
        className={styles.right}
        direction="vertical"
        size={16}
        style={{ alignItems: 'stretch' }}
      >
        <Shortcuts />
        <CarouselWidget />
        <Announcement />
        <Docs />
      </Space>
    </div>
  );
}
