import React from 'react';
import { useSelector } from 'react-redux';

import styles from './countStop.css';
import { TRootState } from '../../../../types/types';
import { Title } from '../../../../shared/Title';

export function CountStop() {
  const totalStop = useSelector<TRootState, number>((state) => state.statsState.stats.totalStop);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title As='h3' content='Остановки' style={{ fontSize: '24px', lineHeight: '33px' }} />
        <p className={styles.total}>{totalStop}</p>
      </div>
    </div>
  );
}
