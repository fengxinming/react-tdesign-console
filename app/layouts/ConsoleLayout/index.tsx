import { Outlet } from 'react-router';
import { Navigate } from 'react-router';
import { Layout, Skeleton } from 'tdesign-react';
import HeaderBar from './HeaderBar';
import SiderNav from './SiderNav';
import BreadcrumbNav from './BreadcrumbNav';
import TabBar from './TabBar';
import Footer from './Footer';
import SettingDrawer from './SettingDrawer';
import { useSettingsStore, useLayoutStore, useUserStore } from '~/store';
import classNames from 'classnames';
import styles from './style.module.styl';

export default function ConsoleLayout() {
  const token = useUserStore((s) => s.token);
  const user = useUserStore((s) => s.user);
  const navMode = useSettingsStore((s) => s.navMode);
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const navbar = useSettingsStore((s) => s.navbar);
  const menu = useSettingsStore((s) => s.menu);
  const footer = useSettingsStore((s) => s.footer);
  const collapsed = useLayoutStore((s) => s.collapsed);
  const settingOpen = useLayoutStore((s) => s.settingOpen);
  const closeSetting = useLayoutStore((s) => s.closeSetting);

  // 鉴权守卫：未登录统一跳转登录页（login/register 在本布局之外，不会形成回环）
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 登录后刷新：用户数据写回 store 前显示骨架屏，完成后渲染（无二次渲染跳变）
  if (!user) {
    return (
      <Layout className={styles.layout}>
        <Layout.Content className="!p-[24px]">
          <Skeleton animation="gradient" theme="paragraph" />
        </Layout.Content>
      </Layout>
    );
  }

  const showMenu = navMode === 'inline' && menu;
  const showNavbar = navbar;

  const actualMenuWidth = collapsed ? 48 : menuWidth;
  const layoutStyle = showMenu ? { paddingLeft: actualMenuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: 60 } : {};

  return (
    <Layout className={styles.layout}>
      {showNavbar && (
        <div className={styles['layout-navbar']}>
          <HeaderBar />
        </div>
      )}
      <Layout>
        {showMenu && <SiderNav style={paddingTop} />}
        <Layout
          className={classNames(styles['layout-content'], {
            [styles['no-header']]: !showNavbar,
          })}
          style={layoutStyle}
        >
          <div className={styles['layout-content-wrapper']}>
            <TabBar />
            <BreadcrumbNav />
            <Layout.Content>{<Outlet />}</Layout.Content>
            {footer && <Footer />}
          </div>
        </Layout>
      </Layout>
      <SettingDrawer visible={settingOpen} onClose={closeSetting} />
    </Layout>
  );
}
