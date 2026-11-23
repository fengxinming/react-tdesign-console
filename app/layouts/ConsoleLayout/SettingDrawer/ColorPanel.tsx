import { ColorPicker, Typography } from 'tdesign-react';
import { generate } from '@ant-design/colors';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';

export default function ColorPanel() {
  const { t } = useTranslation();
  const themeColor = useSettingsStore((s) => s.themeColor);
  const theme = useSettingsStore((s) => s.theme);
  const setSettings = useSettingsStore((s) => s.setSettings);

  const list = generate(themeColor, { theme: theme === 'dark' ? 'dark' : 'default' });

  // 只改状态，CSS 变量由 AdminLayout 统一应用。
  const applyColor = (color: string) => {
    setSettings({ themeColor: color });
  };

  return (
    <div>
      <ColorPicker
        className="mb-[12px]"
        format="HEX"
        colorModes={['monochrome']}
        recentColors={null}
        swatchColors={null}
        value={themeColor}
        onChange={(value) => applyColor(value)}
        popupProps={{ trigger: 'click', placement: 'bottom-left' }}
      />
      <ul className="flex my-[16px]">
        {list.map((item) => (
          <li key={item} className="flex-1 h-[26px]" style={{ backgroundColor: item }} />
        ))}
      </ul>
      <Typography.Paragraph className="text-[12px]">
        {t('settings.color.tooltip')}
      </Typography.Paragraph>
    </div>
  );
}
