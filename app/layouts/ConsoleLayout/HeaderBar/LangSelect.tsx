import { Dropdown, MessagePlugin } from 'tdesign-react';
import { TranslateIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import IconButton from './IconButton';
import type { Language } from '~/store/types';

export default function LangSelect() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.lang);
  const setSettings = useSettingsStore((s) => s.setSettings);

  const select = (lang: Language) => {
    setSettings({ lang });
    void MessagePlugin.info(t('settings.language.tip'));
  };

  const options = [
    { value: 'zh-CN', content: '中文', active: language === 'zh-CN' },
    { value: 'en-US', content: 'English', active: language === 'en-US' },
  ];

  return (
    <Dropdown
      trigger="hover"
      placement="bottom-right"
      options={options}
      onClick={(option) => select(String(option.value) as Language)}
    >
      <IconButton icon={<TranslateIcon />} />
    </Dropdown>
  );
}
