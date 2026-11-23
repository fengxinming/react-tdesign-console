import { Space } from 'tdesign-react';
import ChatPanel from './ChatPanel';
import Studio from './Studio';
import DataStatistic from './DataStatistic';
import StudioStatus from './StudioStatus';
import QuickOperation from './QuickOperation';
import StudioInformation from './StudioInformation';

export default function Monitor() {
  return (
    <div className="flex">
      <div className="basis-[300px]">
        <ChatPanel />
      </div>
      <div className="flex-1 px-[16px]">
        <Space direction="vertical" size={16} className="w-full" style={{ alignItems: 'stretch' }}>
          <Studio />
          <DataStatistic />
        </Space>
      </div>
      <div className="basis-[280px]">
        <Space direction="vertical" size={16} className="w-full" style={{ alignItems: 'stretch' }}>
          <StudioStatus />
          <QuickOperation />
          <StudioInformation />
        </Space>
      </div>
    </div>
  );
}
