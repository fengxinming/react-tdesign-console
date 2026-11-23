import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Avatar, Badge, Button, Empty, List, Popup, Tabs, Tag, Typography } from 'tdesign-react';
import { NotificationIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useNoticesQuery, useMarkRead } from '~/hooks/api/useNotice';
import IconButton from './IconButton';
import type { NoticeItem, NoticeTab } from '~/api/types';
import styles from './style.module.styl';

const TABS = [
  { key: 'message', label: 'navbar.notice.message' },
  { key: 'notice', label: 'navbar.notice.notice' },
  { key: 'todo', label: 'navbar.notice.todo' },
] as const;

export default function Notification() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [noticeTab, setNoticeTab] = useState<NoticeTab>('message');
  const { data: notices = [], refetch } = useNoticesQuery();
  const { mutate: markReadMutate } = useMarkRead();

  // 一次遍历完成「按标签分组 + 统计未读」，渲染时直接取用，
  // 避免同一份数据在渲染里被反复 filter
  const { byTab, unreadByTab, unread } = useMemo(() => {
    const byTab = new Map<NoticeTab, NoticeItem[]>();
    const unreadByTab = new Map<NoticeTab, number>();
    let unreadCount = 0;

    for (const n of notices) {
      const group = byTab.get(n.tab);
      if (group) {
        group.push(n);
      } else {
        byTab.set(n.tab, [n]);
      }
      if (!n.read) {
        unreadByTab.set(n.tab, (unreadByTab.get(n.tab) ?? 0) + 1);
        unreadCount += 1;
      }
    }
    return { byTab, unreadByTab, unread: unreadCount };
  }, [notices]);

  const currentTabNotices = byTab.get(noticeTab) ?? [];

  const markAllRead = () => markReadMutate(undefined);
  const markRead = (id: string) => markReadMutate(id);

  const tabList = TABS.map((tab) => {
    const count = unreadByTab.get(tab.key) ?? 0;
    return {
      value: tab.key,
      label: count > 0 ? `${t(tab.label)} (${count})` : t(tab.label),
    };
  });

  const NotificationPopup = (
    <div className={styles['notice-panel']}>
      <Tabs
        value={noticeTab}
        onChange={(value) => setNoticeTab(String(value) as NoticeTab)}
        list={tabList}
      />
      {currentTabNotices.length === 0 ? (
        <div className={styles['notice-empty']}>
          <Empty description={t('common.empty')} />
        </div>
      ) : (
        <>
          <List split={false}>
            {currentTabNotices.map((n) => (
              <List.ListItem key={n.id}>
                <div
                  className={styles['notice-item']}
                  style={{ opacity: n.read ? 0.5 : 1 }}
                  onClick={() => {
                    if (!n.read) {
                      markRead(n.id);
                    }
                  }}
                >
                <Avatar
                  shape="circle"
                  size="medium"
                  image={n.avatar || undefined}
                  alt={n.name}
                >
                  {n.name?.[0] ?? '?'}
                </Avatar>
                <div className={styles['notice-item-content']}>
                  <div className={styles['notice-item-title']}>
                    <div className="flex justify-between items-center">
                      <span>{n.name}</span>
                      {!n.read && (
                        <Tag theme="primary" variant="light">
                          {t('navbar.notice.unread')}
                        </Tag>
                      )}
                    </div>
                  </div>
                  <div className={styles['notice-content']}>{n.content}</div>
                  <Typography.Text theme="secondary" className="text-[12px]">
                    {n.time}
                  </Typography.Text>
                  </div>
                </div>
              </List.ListItem>
            ))}
          </List>
          <div className={styles['notice-footer']}>
            <div className={styles['notice-footer-item']}>
              <Button variant="text" size="small" onClick={() => void markAllRead()}>
                {t('navbar.notice.readAll')}
              </Button>
            </div>
            <div className={styles['notice-footer-item']}>
              <Button variant="text" size="small" onClick={() => navigate('/dashboard/workplace')}>
                {t('navbar.notice.more')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Popup
      trigger="hover"
      content={NotificationPopup}
      placement="bottom-right"
      onVisibleChange={(visible) => {
        if (visible) {
          refetch();
        }
      }}
    >
      <Badge count={unread} dot>
        <IconButton icon={<NotificationIcon />} />
      </Badge>
    </Popup>
  );
}
