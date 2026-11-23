import { Col, Row, Space } from 'tdesign-react';
import {
  fetchPublicOpinion,
  fetchContentPublishing,
  fetchAuthorList,
} from '~/api/visualization';
import type { DataAnalysisLoaderData } from './types';
import PublicOpinion from './PublicOpinion';
import PublishingRate from './PublishingRate';
import PeriodLine from './PeriodLine';
import AuthorTable from './AuthorTable';

// 无操作查询：loader 直接拉数据并 return，子组件用 useLoaderData 读取
export async function loader(): Promise<DataAnalysisLoaderData> {
  const [publicOpinion, contentPublishing, authorList] = await Promise.all([
    fetchPublicOpinion(),
    fetchContentPublishing(),
    fetchAuthorList(),
  ]);
  return { publicOpinion, contentPublishing, authorList };
}

export default function DataAnalysis() {
  return (
    <Space direction="vertical" size={16} className="w-full" style={{ alignItems: 'stretch' }}>
      <PublicOpinion />
      <Row gutter={16}>
        <Col xs={12} md={7}>
          <PublishingRate />
        </Col>
        <Col xs={12} md={5}>
          <AuthorTable />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <PeriodLine />
        </Col>
      </Row>
    </Space>
  );
}
