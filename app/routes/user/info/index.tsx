import { Card, Col, Empty, Row, Typography } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import UserInfoHeader from './UserInfoHeader';
import MyProject from './MyProject';
import MyTeam from './MyTeam';
import LatestNews from './LatestNews';

export default function UserInfo() {
  const { t } = useTranslation();

  return (
    <>
      <UserInfoHeader />
      <Row gutter={16}>
        <Col xs={12} md={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Typography.Title level="h5">{t('userInfo.title.project')}</Typography.Title>
              <Typography.Text theme="primary" className="cursor-pointer">
                {t('userInfo.btn.more')}
              </Typography.Text>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Typography.Title level="h5">{t('userInfo.title.team')}</Typography.Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={12} md={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Typography.Title level="h5">{t('userInfo.title.news')}</Typography.Title>
              <Typography.Text theme="primary" className="cursor-pointer">
                {t('userInfo.btn.all')}
              </Typography.Text>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Typography.Title level="h5">{t('userInfo.title.notice')}</Typography.Title>
            </div>
            <Empty description={t('userInfo.notice.empty')} className="!pt-[60px] !pb-[130px]" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
