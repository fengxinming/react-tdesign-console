import { isValidElement } from 'react';
import type { ReactElement } from 'react';
import { Menu } from 'tdesign-react';
import { useLocation, useNavigate } from 'react-router';
import { useLayoutStore } from '~/store';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';
import type { AppMenuProps } from './types';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

type MenuTreeItem =
  | {
      type: 'submenu';
      key: string;
      value: string;
      icon?: ReactElement;
      title: string;
      children: MenuTreeItem[];
    }
  | {
      type: 'item';
      key: string;
      value: string;
      icon?: ReactElement;
      content: string;
    };

// 只做渲染：可见性（visible）与权限已在菜单生成阶段（filterMenuByPerm）过滤完毕。
function buildItems(list: MenuRoute[], t: TFunction): MenuTreeItem[] {
  return list.map((item): MenuTreeItem => {
    const icon = isValidElement(item.icon) ? item.icon : undefined;
    const { children } = item as MenuBranch;
    if (children) {
      return {
        type: 'submenu' as const,
        key: item.name,
        value: item.name,
        icon,
        title: t(item.name),
        children: buildItems(children, t),
      };
    }
    const { path } = item as MenuLeaf;
    return {
      type: 'item' as const,
      key: path,
      value: path,
      icon,
      content: t(item.name),
    };
  });
}

function renderItems(list: MenuTreeItem[]) {
  return list.map((item, index) => {
    const key = `${item.type}-${item.value}-${index}`;
    if (item.type === 'submenu') {
      return (
        <Menu.SubMenu key={key} value={item.value} icon={item.icon} title={item.title}>
          {renderItems(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.MenuItem key={key} value={item.value} icon={item.icon}>
        {item.content}
      </Menu.MenuItem>
    );
  });
}

/**
 * 公共菜单组件，SiderNav（vertical）和 HeaderBar/Logo（horizontal）共用。
 * 统一递归渲染 + i18n + icon，避免两处逻辑漂移。
 */
export default function AppMenu({
  mode = 'vertical',
  collapse,
  openKeys,
  onOpenKeysChange,
  className,
  menus: externalMenus,
}: AppMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const permissionMenus = useLayoutStore((s) => s.permissionMenu);
  const menus = externalMenus ?? permissionMenus;
  const { t } = useTranslation();
  const items = buildItems(menus, t);

  if (mode === 'horizontal') {
    return (
      <Menu.HeadMenu
        className={className}
        value={location.pathname}
        onChange={(value) => navigate(String(value))}
      >
        {renderItems(items)}
      </Menu.HeadMenu>
    );
  }

  return (
    <Menu
      className={className}
      theme="light"
      width={collapse ? ['100%', 48] : '100%'}
      collapsed={collapse}
      expanded={openKeys}
      value={location.pathname}
      onChange={(value) => navigate(String(value))}
      onExpand={(value) => onOpenKeysChange?.(value.map(String))}
    >
      {renderItems(items)}
    </Menu>
  );
}
