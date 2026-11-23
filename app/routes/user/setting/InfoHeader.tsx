import { useState } from 'react';
import { Avatar, Descriptions, Skeleton, Tag, Typography, Upload } from 'tdesign-react';
import { AddIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import useMediaQuery from '~/hooks/useMediaQuery';
import type { InfoTextProps } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: InfoTextProps) {
  return (
    <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
      {children}
    </Skeleton>
  );
}

/** 账号信息头部:可上传头像 + Descriptions(用户名/实名/账号ID/手机号/注册时间)。 */
export default function InfoHeader() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);
  const loading = !userInfo;
  const [avatar, setAvatar] = useState('');
  const wide = useMediaQuery('(min-width: 900px)');

  const avatarSrc = avatar || userInfo?.avatar;

  return (
    <div className="flex">
      <Upload
        autoUpload={false}
        showUploadList={false}
        onChange={(files) => {
          const raw = files[0]?.raw;
          setAvatar(raw ? URL.createObjectURL(raw) : '');
        }}
      >
        <Skeleton
          loading={loading}
          animation="gradient"
          rowCol={[{ size: '64px', type: 'circle' }]}
        >
          <Avatar size="large" image={avatarSrc}>
            <AddIcon />
          </Avatar>
        </Skeleton>
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={wide ? 2 : 1}
        tableLayout="auto"
        labelStyle={{ textAlign: 'right', whiteSpace: 'nowrap' }}
        items={[
          {
            label: t('userSetting.label.name'),
            content: <Text loading={loading}>{userInfo?.name}</Text>,
          },
          {
            label: t('userSetting.label.verified'),
            content: (
              <Text loading={loading}>
                {userInfo?.verified ? (
                  <Tag theme="success" className={styles['verified-tag']}>
                    {t('userSetting.value.verified')}
                  </Tag>
                ) : (
                  <Tag theme="danger" className={styles['verified-tag']}>
                    {t('userSetting.value.notVerified')}
                  </Tag>
                )}
                <Typography.Text theme="primary" role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Text>
              </Text>
            ),
          },
          {
            label: t('userSetting.label.accountId'),
            content: <Text loading={loading}>{userInfo?.accountId}</Text>,
          },
          {
            label: t('userSetting.label.phoneNumber'),
            content: (
              <Text loading={loading}>
                {userInfo?.phoneNumber}
                <Typography.Text theme="primary" role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Text>
              </Text>
            ),
          },
          {
            label: t('userSetting.label.registrationTime'),
            content: <Text loading={loading}>{userInfo?.registrationTime}</Text>,
          },
        ]}
      />
    </div>
  );
}
