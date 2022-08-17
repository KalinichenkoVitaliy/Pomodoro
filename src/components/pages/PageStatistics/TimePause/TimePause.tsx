import React from 'react';
import { useSelector } from 'react-redux';

import styles from './timePause.css';
import { TRootState } from '../../../../types/types';

import { Title } from '../../../../shared/Title';

export function TimePause() {
  const totalPause = useSelector<TRootState, number>((state) => state.statsState.stats.totalPause);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title As='h3' content='Время на паузе' style={{ fontSize: '24px', lineHeight: '33px' }} />
        <p className={styles.total}>{totalPause}м</p>
      </div>
    </div>
  );
}
