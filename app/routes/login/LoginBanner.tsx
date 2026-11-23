import { Swiper } from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import type { BannerItem } from './types';

const BANNER_IMAGE = 'images/login/banner.png';

/** 登录页左侧轮播：3 条 slogan（走 i18n）+ 配图。 */
export default function LoginBanner() {
  const { t } = useTranslation();
  const data: BannerItem[] = [1, 2, 3].map((n) => ({
    slogan: t(`login.banner.slogan${n}`),
    subSlogan: t(`login.banner.subSlogan${n}`),
    image: BANNER_IMAGE,
  }));

  return (
    <Swiper
      className={styles.carousel}
      animation="fade"
      autoplay
      interval={5000}
      navigation={{ type: 'dots', placement: 'inside' }}
    >
      {data.map((item) => (
        <Swiper.SwiperItem key={item.slogan}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img alt="banner-image" className={styles['carousel-image']} src={item.image} />
          </div>
        </Swiper.SwiperItem>
      ))}
    </Swiper>
  );
}
