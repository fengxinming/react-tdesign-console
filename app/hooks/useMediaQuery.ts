import { useSyncExternalStore } from 'react';

/** 订阅一条媒体查询，用于在窄屏降级多列信息布局。 */
export default function useMediaQuery(query: string) {
  const subscribe = (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onStoreChange);
    return () => media.removeEventListener('change', onStoreChange);
  };

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
