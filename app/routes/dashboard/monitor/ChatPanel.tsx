import { Button, Card, Empty, Input, Loading, Select, Space, Typography } from 'tdesign-react';
import { DownloadIcon, SearchIcon, SmileIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import MessageList from './MessageList';
import styles from './style.module.styl';
import { useChatListQuery } from '~/hooks/api/useMonitor';

/** 实时消息流：10s 轮询拉取 chatList */
export default function ChatPanel() {
  const { t } = useTranslation();
  const { data: messageList = [], isLoading: loading } = useChatListQuery();

  return (
    <Card bordered={false} className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title level="h5">{t('monitor.title.chatPanel')}</Typography.Title>
        <Space size={8} breakLine>
          <Select
            className="!w-[80px]"
            defaultValue="all"
            options={[{ value: 'all', label: t('monitor.chat.options.all') }]}
          />
          <Input
            className="!w-[120px]"
            placeholder={t('monitor.chat.placeholder.searchCategory')}
            suffix={<SearchIcon />}
          />
          <Button className="!px-[7px]" theme="default" variant="text" icon={<DownloadIcon />} />
        </Space>
      </div>
      <div className="flex-1 box-border overflow-y-auto my-[20px]">
        {loading ? (
          <Loading loading size="small" className="w-full" />
        ) : messageList.length === 0 ? (
          <Empty />
        ) : (
          <MessageList data={messageList} />
        )}
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space size={8}>
          <Input suffix={<SmileIcon />} />
          <Button theme="primary">{t('monitor.chat.update')}</Button>
        </Space>
      </div>
    </Card>
  );
}
