import {
  Alert,
  Button,
  Divider,
  Drawer,
  InputNumber,
  MessagePlugin,
  RadioGroup,
  Space,
  Switch,
} from 'tdesign-react';
import { SettingIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import type { NavMode } from '~/store/types';
import { useSettingsStore } from '~/store';
import ColorPanel from './ColorPanel';
import type { SettingDrawerProps, SettingRowProps } from './types';

function Row({ label, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-[8px]">
      <span className="text-[14px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

export default function SettingDrawer({ visible, onClose }: SettingDrawerProps) {
  const { t } = useTranslation();
  const navbar = useSettingsStore((s) => s.navbar);
  const menu = useSettingsStore((s) => s.menu);
  const footer = useSettingsStore((s) => s.footer);
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const colorWeak = useSettingsStore((s) => s.colorWeak);
  const navMode = useSettingsStore((s) => s.navMode);
  const setSettings = useSettingsStore((s) => s.setSettings);

  // 对齐参考：导出与 settings.json 结构完全一致的配置（6 个字段、同 key 顺序），
  // 用户可直接粘回 app/settings.json，让配置真正作用于项目。
  const copyConfig = () => {
    const { colorWeak, navbar, menu, footer, themeColor, menuWidth, navMode } =
      useSettingsStore.getState();
    const config = {
      colorWeak,
      navbar,
      menu,
      footer,
      themeColor,
      menuWidth,
      navMode,
    };
    void navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
    void MessagePlugin.success(t('settings.copySettings.message'));
  };

  const navModeOptions = [
    { label: t('settings.navMode.inline'), value: 'inline' },
    { label: t('settings.navMode.horizontal'), value: 'horizontal' },
  ];

  return (
    <Drawer
      size="300px"
      header={
        <span className="flex items-center gap-[8px]">
          <SettingIcon />
          {t('settings.title')}
        </span>
      }
      visible={visible}
      onClose={onClose}
      footer={
        <Space>
          <Button onClick={onClose}>{t('settings.close')}</Button>
          <Button theme="primary" onClick={copyConfig}>
            {t('settings.copySettings')}
          </Button>
        </Space>
      }
    >
      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.themeColor')}</label>
        <ColorPanel />
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.content')}</label>
        <Row label={t('settings.navMode')}>
          <RadioGroup
            theme="button"
            size="small"
            options={navModeOptions}
            value={navMode}
            onChange={(value) => setSettings({ navMode: value as NavMode })}
          />
        </Row>
        <Row label={t('settings.navbar')}>
          <Switch
            size="small"
            value={navbar}
            onChange={(value) => setSettings({ navbar: Boolean(value) })}
          />
        </Row>
        <Row label={t('settings.menu')}>
          <Switch
            size="small"
            value={menu}
            onChange={(value) => setSettings({ menu: Boolean(value) })}
          />
        </Row>
        <Row label={t('settings.footer')}>
          <Switch
            size="small"
            value={footer}
            onChange={(value) => setSettings({ footer: Boolean(value) })}
          />
        </Row>
        <Row label={t('settings.menuWidth')}>
          <InputNumber
            theme="normal"
            style={{ width: 96 }}
            size="small"
            value={menuWidth}
            onChange={(value) => {
              if (value !== null && value !== undefined && String(value) !== '') {
                setSettings({ menuWidth: Number(value) });
              }
            }}
          />
        </Row>
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.otherSettings')}</label>
        <Row label={t('settings.colorWeak')}>
          <Switch
            size="small"
            value={colorWeak}
            onChange={(value) => setSettings({ colorWeak: Boolean(value) })}
          />
        </Row>
        <Divider />
      </div>

      <Alert theme="info" message={t('settings.alertContent')} className="mt-[8px]" />
    </Drawer>
  );
}
