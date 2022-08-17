import React from 'react';
import { useSelector } from 'react-redux';

import styles from './timeDay.css';
import { TDay, TDaysWeek, TRootState, TStats } from '../../../../types/types';

import { timeToPropis } from '../../../../utils/lib';

import { Title } from '../../../../shared/Title';
import { Break } from '../../../../shared/Break';

export function TimeDay() {
  const { selectedDay, daysWeek } = useSelector<TRootState, TStats>((state) => state.statsState.stats);

  const targetDay: TDay = daysWeek[`day${selectedDay}` as keyof TDaysWeek];
  const totalText = targetDay.workMinutes > 0 ? 'Вы работали над задачами в течение' : 'Нет данных';
  const totalTime = targetDay.workMinutes > 0 ? ` ${timeToPropis(targetDay.workMinutes)}` : '';

  return (
    <div className={styles.container}>
      <Title As='h3' content={targetDay.dayNameFull} style={{ fontSize: '24px', lineHeight: '33px' }} />
      <Break step={14} top />
      <p className={styles.totalText}>
        {totalText}
        <span className={styles.total}>{totalTime}</span>
      </p>
    </div>
  );
}
