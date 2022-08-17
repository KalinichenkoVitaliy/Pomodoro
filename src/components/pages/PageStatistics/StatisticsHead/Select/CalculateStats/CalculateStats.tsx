import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TDay, TDaysWeek, TRootState, TTodoEvents, TUsersState, TWeek } from '../../../../../../types/types';
import { dateToDayOfWeek, makeFilterWeek } from '../../../../../../utils/lib';

import { resetStats, setStats } from '../../../../../../store/statsSlice';

export function CalculateStats() {
  const dispatch = useDispatch();
  const { currentUser, usersStatistic } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const selectedWeek = useSelector<TRootState, TWeek>((state) => state.statsState.stats.selectedWeek);

  React.useEffect(() => {
    const userName = currentUser.name + ':' + currentUser.email;
    const fiterWeek = makeFilterWeek(selectedWeek);
    const userStats = usersStatistic
      .find((userStats) => userStats.userName === userName)
      ?.todoEvents.filter(
        (event) => event.date.slice(0, 10) >= fiterWeek.dayBegin && event.date.slice(0, 10) <= fiterWeek.dayEnd
      );
    dispatch(resetStats());
    calculateDo(userStats);
  }, [selectedWeek]);

  const calculateDo = (userStats: TTodoEvents[] | undefined) => {
    if (!userStats) return;

    type TStats = {
      daysWeek: TDaysWeek;
      totalFocus: number;
      totalPause: number;
      totalStop: number;
    };
    const cleanDay0: TDay = { dayNameFull: 'День не выбран', dayNameShort: '', workMinutes: 0, workPomodoro: 0 };
    const cleanDay1: TDay = { dayNameFull: 'Понедельник', dayNameShort: 'Пн', workMinutes: 0, workPomodoro: 0 };
    const cleanDay2: TDay = { dayNameFull: 'Вторник', dayNameShort: 'Вт', workMinutes: 0, workPomodoro: 0 };
    const cleanDay3: TDay = { dayNameFull: 'Среда', dayNameShort: 'Ср', workMinutes: 0, workPomodoro: 0 };
    const cleanDay4: TDay = { dayNameFull: 'Четверг', dayNameShort: 'Чт', workMinutes: 0, workPomodoro: 0 };
    const cleanDay5: TDay = { dayNameFull: 'Пятница', dayNameShort: 'Пт', workMinutes: 0, workPomodoro: 0 };
    const cleanDay6: TDay = { dayNameFull: 'Суббота', dayNameShort: 'Сб', workMinutes: 0, workPomodoro: 0 };
    const cleanDay7: TDay = { dayNameFull: 'Воскресенье', dayNameShort: 'Вс', workMinutes: 0, workPomodoro: 0 };

    const stats: TStats = {
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

    let secondsTotalWork = 0;
    let timeStartWork = 0;
    let timeStartComplited = 0;
    let timeStartPause = 0;
    for (let i = 0; i < userStats.length; i++) {
      const timerEvent = userStats[i];
      switch (timerEvent.timerStatus) {
        case 'timerStarted':
          timeStartWork = new Date(timerEvent.date).getTime();
          timeStartComplited = 0;
          timeStartPause = 0;
          break;
        case 'timerPaused':
          timeStartPause = new Date(timerEvent.date).getTime();
          if (timeStartWork > 0) {
            const keyDayOfWeek = 'day' + dateToDayOfWeek(new Date(timerEvent.date)).toString();
            const seconds = (timeStartPause - timeStartWork) / 1000;
            secondsTotalWork += seconds;
            stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workMinutes += seconds;
            timeStartWork = 0;
          }
          break;
        case 'timerContinued':
          timeStartWork = new Date(timerEvent.date).getTime();
          if (timeStartPause > 0) {
            const seconds = (timeStartWork - timeStartPause) / 1000;
            stats.totalPause += seconds;
            timeStartPause = 0;
          }
          break;
        case 'timerToNext':
        case 'timerComplited':
          timeStartComplited = new Date(timerEvent.date).getTime();
          if (timeStartPause > 0) {
            const seconds = (timeStartComplited - timeStartPause) / 1000;
            secondsTotalWork += seconds;
            timeStartPause = 0;
          } else if (timeStartWork > 0) {
            const keyDayOfWeek = 'day' + dateToDayOfWeek(new Date(timerEvent.date)).toString();
            const seconds = (timeStartComplited - timeStartWork) / 1000;
            secondsTotalWork += seconds;
            stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workMinutes += seconds;
            stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workPomodoro++;
            timeStartWork = 0;
          }
          timeStartComplited = 0;
          break;
        case 'timerStoped':
          timeStartWork = 0;
          timeStartComplited = 0;
          timeStartPause = 0;
          if (i > 1 && userStats[i - 1].timerStatus !== 'timerStart' && userStats[i - 1].timerStatus !== 'timerStoped')
            stats.totalStop++;
          break;
        default:
          break;
      }
    }

    if (secondsTotalWork > 0 || stats.totalPause > 0)
      stats.totalFocus = Math.trunc((secondsTotalWork / (secondsTotalWork + stats.totalPause)) * 100);
    if (stats.totalPause > 0) stats.totalPause = Math.trunc(stats.totalPause / 60);
    for (let i = 1; i <= 7; i++) {
      const keyDayOfWeek = 'day' + i;
      if (stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workMinutes > 0)
        stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workMinutes = Math.trunc(
          stats.daysWeek[keyDayOfWeek as keyof TDaysWeek].workMinutes / 60
        );
    }

    dispatch(setStats({ stats: stats }));
  };

  return null;
}
