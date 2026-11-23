import { Col, Row, Space } from 'tdesign-react';
import {
  fetchMultiOverview,
  fetchMultiActivity,
  fetchMultiPolar,
  fetchMultiContentSource,
  fetchMultiCards,
} from '~/api/visualization';
import type { MultiDimensionLoaderData } from './types';
import DataOverview from './DataOverview';
import CardList from './CardList';
import ActivityBar from './ActivityBar';
import ThemeRadar from './ThemeRadar';
import SourcePie from './SourcePie';
import styles from './style.module.styl';

// 无操作查询：loader 直接拉数据并 return，区块子组件用 useLoaderData 读取
export async function loader(): Promise<MultiDimensionLoaderData> {
  const [overview, interval, polar, multiPie, cardList] = await Promise.all([
    fetchMultiOverview(),
    fetchMultiActivity(),
    fetchMultiPolar(),
    fetchMultiContentSource(),
    fetchMultiCards(),
  ]);
  return { overview, interval, polar, multiPie, cardList };
}

export default function MultiDimension() {
  return (
    <Space direction="vertical" size={16} className="w-full" style={{ alignItems: 'stretch' }}>
      <div className={styles['top-row']}>
        <Row gutter={20}>
          <Col xs={12} md={8}>
            <DataOverview />
          </Col>
          <Col xs={12} md={4}>
            <ActivityBar />
            <ThemeRadar />
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={12}>
          <CardList />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <SourcePie />
        </Col>
      </Row>
    </Space>
  );
}
