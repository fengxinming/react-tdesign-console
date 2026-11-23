import { useState } from 'react';
import { Card, Tabs } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import InfoHeader from './InfoHeader';
import InfoForm from './InfoForm';
import Security from './Security';
import Verified from './Verified';

/** 用户设置:头部账号信息 + 圆角 Tabs(基本信息/安全设置/实名认证)。 */
export default function UserSetting() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div>
      <Card bordered={false} className="px-[20px] py-[14px]">
        <InfoHeader />
      </Card>
      <Card bordered={false} className="mt-[16px]">
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
          list={[
            {
              value: 'basic',
              label: t('userSetting.title.basicInfo'),
              panel: <InfoForm />,
            },
            {
              value: 'security',
              label: t('userSetting.title.security'),
              panel: <Security />,
            },
            {
              value: 'verified',
              label: t('userSetting.label.verified'),
              panel: <Verified />,
            },
          ]}
        />
      </Card>
    </div>
  );
}
