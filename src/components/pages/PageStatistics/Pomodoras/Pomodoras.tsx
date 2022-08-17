import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './pomodoras.css';
import { TDay, TDaysWeek, TRootState, TStats } from '../../../../types/types';

import { pomodorosToPropis } from '../../../../utils/lib';

export function Pomodoras() {
  const { selectedDay, daysWeek } = useSelector<TRootState, TStats>((state) => state.statsState.stats);

  const targetDay: TDay = daysWeek[`day${selectedDay}` as keyof TDaysWeek];
  const isWorkPomodoro = targetDay.workPomodoro > 0;
  const topContentText = `x ${targetDay.workPomodoro}`;
  const bottomText = `${targetDay.workPomodoro} ${pomodorosToPropis(targetDay.workPomodoro)}`;

  const classTop = classNames(styles.top, { [styles.topOnly]: !isWorkPomodoro });

  return (
    <div className={styles.container}>
      <div className={classTop}>
        {!isWorkPomodoro && <div className={styles.topEmpty} />}
        {isWorkPomodoro && (
          <div className={styles.topContent}>
            <div className={styles.topContentImg} />
            <span className={styles.topContentText}>{topContentText}</span>
          </div>
        )}
      </div>
      {isWorkPomodoro && (
        <div className={styles.bottom}>
          <span className={styles.bottomText}>{bottomText}</span>
        </div>
      )}
    </div>
  );
}
