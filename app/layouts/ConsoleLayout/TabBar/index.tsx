import { Tabs } from 'tdesign-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';
import styles from './style.module.styl';
import { memo } from 'react';

function TabBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tabs = useLayoutStore((s) => s.tabs);
  const activeKey = useLayoutStore((s) => s.activeKey);
  const removeTab = useLayoutStore((s) => s.removeTab);
  const setActive = useLayoutStore((s) => s.setActive);

  const tabList = tabs.map((tab) => ({
    value: tab.key,
    label: t(tab.title) ?? tab.title,
    removable: tab.closable !== false,
  }));

  return (
    <div className={styles.tabbar}>
      <Tabs
        theme="card"
        size="medium"
        list={tabList}
        value={activeKey}
        onChange={(key) => {
          const nextKey = String(key);
          setActive(nextKey);
          navigate(nextKey);
        }}
        onRemove={({ value }) => {
          const nextKey = removeTab(String(value));
          if (nextKey) {
            navigate(nextKey);
          }
        }}
      />
    </div>
  );
}

export default memo(TabBar);
