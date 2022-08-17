import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';

import styles from './linkLogout.css';
import { TRootState, TTimersState, TUsersState } from '../../../types/types';

import soundUrlLogout from '../../../assets/sounds/logout.mp3';

import { currentUserClear, statisticEventAdd, todoNotWork } from '../../../store/usersSlice';
import {
  timerElapsedPomodoroClear,
  timerIntervalClear,
  timerSetCount,
  timerSetStatus,
  timerTimeoutClear,
  timerTodoIdClear,
} from '../../../store/timerSlice';

import { Break } from '../../../shared/Break';
import { EColor, Text } from '../../../shared/Text';

export function LinkLogout() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);
  const [playLogout] = useSound(soundUrlLogout, { volume: 0.5 });

  const handleonClick = () => {
    playLogout();
    if (timer.timerInterval || timer.timerTimeout || timer.timerTodoId) {
      const userName = currentUser.name + ':' + currentUser.email;
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
    dispatch(currentUserClear());
  };

  return (
    <div
      className={styles.linkLogout}
      onClick={handleonClick}
      title={`Закрыть сеанс пользователя "${currentUser.name}:${currentUser.email}"`}
    >
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z'
          fill='#DC3E22'
        />
      </svg>
      <Break step={5} />
      <Text font={{ size: 16, lineHeight: '17px' }} color={EColor.redDC}>
        Выход
      </Text>
    </div>
  );
}
