import { useMemo } from 'react';
import { Avatar, List, Skeleton, Typography } from 'tdesign-react';
import { useNewsQuery } from '~/hooks/api/useUser';
import type { NewsItem } from '~/api/types';
import styles from './style.module.styl';

/** 最新动态:头像 + 标题 + 单行省略描述。自取 /user/latestNews。 */
export default function LatestNews() {
  const { data = [], isLoading: loading } = useNewsQuery();

  const items = useMemo(() => {
    const source: NewsItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(item.id ?? index) }));
  }, [data]);

  return (
    <List className={styles['news-list']} split={false}>
      {items.map((item) => (
        <List.ListItem key={item.key}>
          <Skeleton loading={loading} animation="gradient" theme="avatar-text" rowCol={[1, 1]}>
            <div className={styles['list-item']}>
              <Avatar size="medium" image={item.avatar} />
              <div className={styles['list-item-content']}>
                <div className={styles['list-item-title']}>{item.title}</div>
                <Typography.Text
                  theme="secondary"
                  ellipsis={{ rows: 1, expandable: false }}
                  className="text-[12px] m-0"
                >
                  {item.description}
                </Typography.Text>
              </div>
            </div>
          </Skeleton>
        </List.ListItem>
      ))}
    </List>
  );
}
