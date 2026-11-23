import { Card } from 'tdesign-react';
import cs from 'classnames';
import { AddIcon } from 'tdesign-icons-react';
import type { AddCardProps } from './types';
import styles from './style.module.styl';

export default function AddCard({ description }: AddCardProps) {
  return (
    <Card className={cs(styles['card-block'], styles['add-card'])} bordered>
      <div className={styles.content}>
        <div className="text-[22px]">
          <AddIcon />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
