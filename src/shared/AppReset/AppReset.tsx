import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TRootState, TTimersState, TUser } from '../../types/types';

import {
  timerIntervalClear,
  timerTimeoutClear,
  timerSetCount,
  timerSetStatus,
  timerElapsedPomodoroClear,
  timerTodoIdClear,
} from '../../store/timerSlice';
import { statisticEventAdd, todoNotWork } from '../../store/usersSlice';

export function AppReset() {
  const dispatch = useDispatch();
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);

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

  return null;
}
