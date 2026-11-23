import { useNavigate } from 'react-router';
import { Avatar, Dropdown, MessagePlugin } from 'tdesign-react';
import { LogoutIcon, MoreIcon, SettingIcon, UserIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSwitchRole } from '~/hooks/api/useUser';
import styles from './style.module.styl';

export default function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);
  const { mutateAsync: switchRole } = useSwitchRole();
  const logout = useUserStore((s) => s.logout);

  const handleClick = async (key: string) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'info') {
      navigate('/user/info');
    } else if (key === 'setting') {
      navigate('/user/setting');
    } else if (key === 'role-admin') {
      await switchRole('admin');
      void MessagePlugin.info(t('user.role.tip'));
    } else if (key === 'role-user') {
      await switchRole('user');
      void MessagePlugin.info(t('user.role.tip'));
    } else if (key !== 'divider') {
      navigate(key);
    }
  };

  const iconClassName = styles['dropdown-icon'];
  const options = [
    {
      value: 'info',
      content: t('menu.user.info'),
      prefixIcon: <UserIcon className={iconClassName} />,
    },
    {
      value: 'setting',
      content: t('menu.user.setting'),
      prefixIcon: <SettingIcon className={iconClassName} />,
    },
    {
      value: 'role',
      content: t('user.role'),
      prefixIcon: <UserIcon className={iconClassName} />,
      children: [
        { value: 'role-admin', content: t('user.role.admin') },
        { value: 'role-user', content: t('user.role.user') },
      ],
    },
    {
      value: 'more',
      content: t('user.more'),
      prefixIcon: <MoreIcon className={iconClassName} />,
      children: [
        { value: '/dashboard/workplace', content: t('menu.dashboard.workplace') },
        { value: '/list/card', content: t('menu.list.cardList') },
      ],
    },
    { value: 'divider', content: '', divider: true },
    {
      value: 'logout',
      content: t('common.logout'),
      prefixIcon: <LogoutIcon className={iconClassName} />,
    },
  ];

  return (
    <Dropdown
      placement="bottom-right"
      direction="left"
      minColumnWidth={140}
      maxColumnWidth={200}
      options={options}
      onClick={(option) => void handleClick(String(option.value))}
    >
      <Avatar className="cursor-pointer">{user?.name?.[0] ?? 'A'}</Avatar>
    </Dropdown>
  );
}
