import { Layout } from 'tdesign-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-react';
import { useSettingsStore, useLayoutStore } from '~/store';
import AppMenu from '~/components/AppMenu';

import { memo } from 'react';
import styles from './style.module.styl';
import type { SiderNavProps } from './types';
import classNames from 'classnames';

const { Aside } = Layout;

function handleOpenKeysChange(openKeys: string[]) {
  useLayoutStore.setState({ openKeys });
}

function SiderNav({ className, style }: SiderNavProps = {}) {
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const collapsed = useLayoutStore((s) => s.collapsed);
  const toggleCollapsed = useLayoutStore((s) => s.toggleCollapsed);
  const openKeys = useLayoutStore((s) => s.openKeys);
  const actualWidth = collapsed ? 48 : menuWidth;

  return (
    <Aside
      className={classNames(styles['layout-sider'], className)}
      width={`${actualWidth}px`}
      style={style}
    >
      <div className={styles['menu-wrapper']}>
        <AppMenu
          mode="vertical"
          collapse={collapsed}
          openKeys={openKeys}
          onOpenKeysChange={handleOpenKeysChange}
        />
      </div>
      <div className={styles['collapse-btn']} onClick={toggleCollapsed}>
        {collapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
      </div>
    </Aside>
  );
}

export default memo(SiderNav);
