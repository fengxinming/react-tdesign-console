import { ConfigProvider as TDesignConfigProvider } from 'tdesign-react';
import tdesignZhCN from 'tdesign-react/es/locale/zh_CN';
import tdesignEnUS from 'tdesign-react/es/locale/en_US';
import { QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from '~/store';
import queryClient from '~/commons/queryClient';
import type { AppProvidersProps } from './types';

const TDESIGN_LOCALES = {
  'zh-CN': tdesignZhCN,
  'en-US': tdesignEnUS,
} as const;

/** TDesign 统一承载组件 locale，外层再挂 React Query。 */
export default function AppProviders({ children }: AppProvidersProps) {
  const language = useSettingsStore((s) => s.lang);

  return (
    <TDesignConfigProvider globalConfig={TDESIGN_LOCALES[language] ?? tdesignZhCN}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TDesignConfigProvider>
  );
}
