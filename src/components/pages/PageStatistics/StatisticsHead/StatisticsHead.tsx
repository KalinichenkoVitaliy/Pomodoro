import React from 'react';

import styles from './statisticsHead.css';

import { Title } from '../../../../shared/Title';
import { Select } from './Select';

export function StatisticsHead() {
  return (
    <div className={styles.statisticsHead}>
      <Title As='h2' content='Ваша активность' />
      <div className={styles.statisticsSelect}>
        <Select />
      </div>
    </div>
  );
}
