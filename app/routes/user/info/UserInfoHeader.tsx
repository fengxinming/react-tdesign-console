import { Avatar, Skeleton, Space } from 'tdesign-react';
import { HomeIcon, LocationIcon, UserIcon } from 'tdesign-icons-react';
import { useUserStore } from '~/store';
import type { UserText } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: UserText) {
  return (
    <span className={styles['user-msg-text']}>
      <Skeleton loading={loading} animation="gradient" rowCol={[1]} className="inline-block">
        {children}
      </Skeleton>
    </span>
  );
}

/** 个人信息头部:居中头像(可换) + 姓名 + 职位/组织/定位。自取 /user/info。 */
export default function UserInfoHeader() {
  const userInfo = useUserStore((s) => s.user);
  const loading = !userInfo;

  return (
    <div className={styles.header}>
      <Space direction="vertical" size={8} align="center" className={styles['header-content']}>
        <Skeleton
          loading={loading}
          animation="gradient"
          rowCol={[{ size: '64px', type: 'circle' }]}
        >
          <Avatar size="large" image={userInfo?.avatar} />
        </Skeleton>
        <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
          <div className="font-medium text-[16px]/[24px]">{userInfo?.name}</div>
        </Skeleton>
        <div className={styles['user-msg']}>
          <Space size={18}>
            <div className={styles['user-msg']}>
              <UserIcon />
              <Text loading={loading}>{userInfo?.jobName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <HomeIcon />
              <Text loading={loading}>{userInfo?.organizationName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <LocationIcon />
              <Text loading={loading}>{userInfo?.locationName}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  );
}
