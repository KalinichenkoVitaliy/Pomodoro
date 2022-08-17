import { createSlice } from '@reduxjs/toolkit';

import { TDay, TStats, TStatsState } from '../types/types';

const cleanDay0: TDay = { dayNameFull: 'День не выбран', dayNameShort: '', workMinutes: 0, workPomodoro: 0 };
const cleanDay1: TDay = { dayNameFull: 'Понедельник', dayNameShort: 'Пн', workMinutes: 0, workPomodoro: 0 };
const cleanDay2: TDay = { dayNameFull: 'Вторник', dayNameShort: 'Вт', workMinutes: 0, workPomodoro: 0 };
const cleanDay3: TDay = { dayNameFull: 'Среда', dayNameShort: 'Ср', workMinutes: 0, workPomodoro: 0 };
const cleanDay4: TDay = { dayNameFull: 'Четверг', dayNameShort: 'Чт', workMinutes: 0, workPomodoro: 0 };
const cleanDay5: TDay = { dayNameFull: 'Пятница', dayNameShort: 'Пт', workMinutes: 0, workPomodoro: 0 };
const cleanDay6: TDay = { dayNameFull: 'Суббота', dayNameShort: 'Сб', workMinutes: 0, workPomodoro: 0 };
const cleanDay7: TDay = { dayNameFull: 'Воскресенье', dayNameShort: 'Вс', workMinutes: 0, workPomodoro: 0 };

export const cleanStats: TStats = {
  selectedWeek: 'currentWeek',
  selectedDay: 0,
  daysWeek: {
    day0: cleanDay0,
    day1: cleanDay1,
    day2: cleanDay2,
    day3: cleanDay3,
    day4: cleanDay4,
    day5: cleanDay5,
    day6: cleanDay6,
    day7: cleanDay7,
  },
  totalFocus: 0,
  totalPause: 0,
  totalStop: 0,
};

const statSlice = createSlice({
  name: 'stats',
  initialState: <TStatsState>{
    stats: cleanStats,
  },
  reducers: {
    resetStats(state) {
      const cleanedStats: TStats = {
        selectedWeek: state.stats.selectedWeek,
        selectedDay: state.stats.selectedDay,
        daysWeek: {
          day0: cleanDay0,
          day1: cleanDay1,
          day2: cleanDay2,
          day3: cleanDay3,
          day4: cleanDay4,
          day5: cleanDay5,
          day6: cleanDay6,
          day7: cleanDay7,
        },
        totalFocus: 0,
        totalPause: 0,
        totalStop: 0,
      };
      state.stats = cleanedStats;
    },
    setStats(state, action) {
      state.stats = { ...state.stats, ...action.payload.stats };
    },
    selectWeek(state, action) {
      state.stats.selectedWeek = action.payload.selectedWeek;
    },
    selectDay(state, action) {
      state.stats.selectedDay = action.payload.selectedDay;
    },
  },
});

export const { resetStats, setStats, selectWeek, selectDay } = statSlice.actions;
export default statSlice.reducer;
