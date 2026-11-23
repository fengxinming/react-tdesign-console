import { Space, Typography } from 'tdesign-react';
import { SettingIcon, StarIcon } from 'tdesign-icons-react';
import classnames from 'classnames';
import styles from './style.module.styl';
import type { MessageItemProps, MessageListProps } from './types';

function MessageItem({ data }: MessageItemProps) {
  return (
    <div
      className={classnames({
        [styles['message-item']]: true,
        [styles['message-item-collected']]: data.isCollect,
      })}
    >
      <Space size={4} direction="vertical" className="w-full" style={{ alignItems: 'stretch' }}>
        <Typography.Text theme="warning">{data.username}</Typography.Text>
        <Typography.Text>{data.content}</Typography.Text>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Text theme="secondary">{data.time}</Typography.Text>
          </div>
          <div className={styles['message-item-actions']}>
            <div className={styles['message-item-actions-item']}>
              <SettingIcon />
            </div>
            <div
              className={classnames([
                styles['message-item-actions-item'],
                styles['message-item-actions-collect'],
              ])}
            >
              <StarIcon />
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
}

export default function MessageList({ data }: MessageListProps) {
  return (
    <div className="h-full overflow-y-auto">
      {data && data.map((item) => <MessageItem key={item.id} data={item} />)}
    </div>
  );
}
