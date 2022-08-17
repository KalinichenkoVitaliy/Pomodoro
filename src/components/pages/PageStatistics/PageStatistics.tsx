import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './pageStatistics.css';
import { TRootState, TTimersState, TUser } from '../../../types/types';

import {
  timerIntervalClear,
  timerTimeoutClear,
  timerSetCount,
  timerSetStatus,
  timerElapsedPomodoroClear,
  timerTodoIdClear,
} from '../../../store/timerSlice';
import { statisticEventAdd, todoNotWork } from '../../../store/usersSlice';

import { StatisticsHead } from './StatisticsHead';
import { TimeDay } from './TimeDay';
import { StatFocus } from './StatFocus';
import { Pomodoras } from './Pomodoras';
import { Diagram } from './Diagram';
import { TimePause } from './TimePause';
import { CountStop } from './CountStop';

export function PageStatistics() {
  const dispatch = useDispatch();
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);

  const isUser = name && email;

  React.useEffect(() => {
    if (timer.timerInterval || timer.timerTimeout || timer.timerTodoId) {
      const userName = name + ':' + email;
      dispatch(timerIntervalClear());
      dispatch(timerTimeoutClear());
      dispatch(timerSetCount({ timerCount: 0 }));
      if (timer.timerStatus !== 'timerStart') {
        const newStatus = 'timerStoped';
        dispatch(timerSetStatus({ timerStatus: newStatus }));
        dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
      }
      dispatch(timerElapsedPomodoroClear());
      dispatch(todoNotWork({ userName: userName, id: timer.timerTodoId }));
      dispatch(timerTodoIdClear());
    }
  }, []);

  return isUser ? (
    <div className={styles.pageStatistics}>
      <div className={styles.head}>
        <StatisticsHead />
      </div>
      <div className={styles.timeDay}>
        <TimeDay />
      </div>
      <div className={styles.pomodoras}>
        <Pomodoras />
      </div>
      <div className={styles.diagram}>
        <div className={styles.diagramContent}>
          <Diagram />
        </div>
        <div id='diagramBG' className={styles.diagramBG} />
      </div>
      <div className={styles.focus}>
        <StatFocus />
      </div>
      <div className={styles.timePause}>
        <TimePause />
      </div>
      <div className={styles.countStop}>
        <CountStop />
      </div>
    </div>
  ) : null;
}
