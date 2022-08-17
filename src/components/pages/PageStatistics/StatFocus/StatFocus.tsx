import React from 'react';
import { useSelector } from 'react-redux';

import styles from './statFocus.css';
import { TRootState } from '../../../../types/types';
import { Title } from '../../../../shared/Title';

export function StatFocus() {
  const totalFocus = useSelector<TRootState, number>((state) => state.statsState.stats.totalFocus);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title As='h3' content='Фокус' style={{ fontSize: '24px', lineHeight: '33px' }} />
        <p className={styles.total}>{totalFocus}%</p>
      </div>
    </div>
  );
}
