import { useMemo } from 'react';
import { Avatar, List, Skeleton, Typography } from 'tdesign-react';
import { useTeamsQuery } from '~/hooks/api/useUser';
import type { TeamItem } from '~/api/types';
import styles from './style.module.styl';

/** 我的团队:头像 + 团队名 + 共X人。自取 /users/teamList。 */
export default function MyTeam() {
  const { data = [], isLoading: loading } = useTeamsQuery();

  const items = useMemo(() => {
    const source: TeamItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(index) }));
  }, [data]);

  return (
    <List className={styles['team-list']} split={false}>
      {items.map((item) => (
        <List.ListItem key={item.key}>
          <Skeleton loading={loading} animation="gradient" theme="avatar-text" rowCol={[1, 1]}>
            <div className={styles['list-item']}>
              <Avatar size="medium" image={item.avatar} />
              <div className={styles['list-item-content']}>
                <div className={styles['list-item-title']}>{item.name}</div>
                <Typography.Text theme="secondary" className="text-[12px]">
                  {`共${(item.members || 0).toLocaleString()}人`}
                </Typography.Text>
              </div>
            </div>
          </Skeleton>
        </List.ListItem>
      ))}
    </List>
  );
}
