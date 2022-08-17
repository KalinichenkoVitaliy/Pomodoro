import { createSlice } from '@reduxjs/toolkit';

import { TTimer, TTimersState } from '../types/types';

const cleanTimer: TTimer = {
  timerStatus: 'timerStart',
  timerCount: 0,
  timerElapsedPomodoro: 1,
  timerTodoId: '',
  timerInterval: undefined,
  timerTimeout: undefined,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: <TTimersState>{
    timer: cleanTimer,
  },
  reducers: {
    timerSetStatus(state, action) {
      state.timer.timerStatus = action.payload.timerStatus;
    },
    timerSetCount(state, action) {
      state.timer.timerCount = action.payload.timerCount;
    },
    timerAddMinute(state) {
      state.timer.timerCount = state.timer.timerCount + 60;
    },
    timerCountDec(state) {
      state.timer.timerCount = state.timer.timerCount - 1;
    },
    timerElapsedPomodoroClear(state) {
      state.timer.timerElapsedPomodoro = 1;
    },
    timerElapsedPomodoroInc(state) {
      state.timer.timerElapsedPomodoro = state.timer.timerElapsedPomodoro + 1;
    },
    timerElapsedPomodoroDec(state) {
      if (state.timer.timerElapsedPomodoro > 1) state.timer.timerElapsedPomodoro = state.timer.timerElapsedPomodoro - 1;
    },
    timerTodoIdClear(state) {
      state.timer.timerTodoId = '';
    },
    timerTodoIdSet(state, action) {
      state.timer.timerTodoId = action.payload.todoId;
    },
    timerIntervalClear(state) {
      clearInterval(state.timer.timerInterval);
      state.timer.timerInterval = undefined;
    },
    timerIntervalSet(state, action) {
      state.timer.timerInterval = action.payload.timerInterval;
    },
    timerTimeoutClear(state) {
      clearTimeout(state.timer.timerTimeout);
      state.timer.timerTimeout = undefined;
    },
    timerTimeoutSet(state, action) {
      state.timer.timerTimeout = action.payload.timerTimeout;
    },
  },
});

export const {
  timerSetStatus,
  timerSetCount,
  timerAddMinute,
  timerCountDec,
  timerElapsedPomodoroClear,
  timerElapsedPomodoroInc,
  timerElapsedPomodoroDec,
  timerTodoIdClear,
  timerTodoIdSet,
  timerIntervalClear,
  timerIntervalSet,
  timerTimeoutClear,
  timerTimeoutSet,
} = timerSlice.actions;
export default timerSlice.reducer;
