import { useState } from 'react';
import { FullscreenIcon, FullscreenExitIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';
import IconButton from './IconButton';

export default function FullscreenToggle() {
  const { t } = useTranslation();
  const [isFull, setIsFull] = useState(false);

  const toggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFull((v) => !v);
    }
  };

  return (
    <IconButton
      icon={isFull ? <FullscreenExitIcon /> : <FullscreenIcon />}
      tooltip={t('common.fullscreen')}
      onClick={toggle}
    />
  );
}
