import { Swiper } from 'tdesign-react';
import styles from './style.module.styl';

const imageSrc = [
  'images/workplace/slide-1.webp',
  'images/workplace/slide-2.webp',
  'images/workplace/slide-3.webp',
  'images/workplace/slide-4.webp',
];

export default function CarouselWidget() {
  return (
    <Swiper autoplay interval={5000} animation="fade" className={styles.carousel}>
      {imageSrc.map((src) => (
        <Swiper.SwiperItem key={src}>
          <div>
            <img src={src} className={styles['carousel-img']} />
          </div>
        </Swiper.SwiperItem>
      ))}
    </Swiper>
  );
}
