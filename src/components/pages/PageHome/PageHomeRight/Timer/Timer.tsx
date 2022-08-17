import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './timer.css';
import { TRootState, TTimer, TUser } from '../../../../../types/types';

import { secondsToMMSS } from '../../../../../utils/lib';
import { statisticEventAdd } from '../../../../../store/usersSlice';
import { timerSetCount, timerSetStatus } from '../../../../../store/timerSlice';

export function Timer() {
  const dispatch = useDispatch();
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);
  const { timerStatus, timerCount } = useSelector<TRootState, TTimer>((state) => state.timerState.timer);
  const durationPomodoro = useSelector<TRootState, number>(
    (state) => state.usersState.currentSettings.durationPomodoro
  );
  const [{ MIN1, MIN2, SEC1, SEC2 }, setMMSS] = React.useState({ MIN1: '0', MIN2: '0', SEC1: '0', SEC2: '0' });

  const classesCountColon = classNames(styles.timerCountColon, {
    [styles.timerCountColon_anime]:
      timerStatus === 'timerStarted' ||
      timerStatus === 'timerContinued' ||
      timerStatus === 'timerBreakShortStart' ||
      timerStatus === 'timerBreakLongStart',
  });

  React.useEffect(() => {
    const userName = name + ':' + email;
    const newStatus = 'timerStart';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(timerSetCount({ timerCount: durationPomodoro * 60 }));
  }, []);

  React.useEffect(() => {
    setMMSS(secondsToMMSS(timerCount));
  }, [timerCount]);

  return (
    <div className={styles.timer}>
      <span className={styles.timerCount}>{`${MIN1}`}</span>
      <span className={styles.timerCount}>{`${MIN2}`}</span>
      <span className={classesCountColon}>:</span>
      <span className={styles.timerCount}>{`${SEC1}`}</span>
      <span className={styles.timerCount}>{`${SEC2}`}</span>
    </div>
  );
}
