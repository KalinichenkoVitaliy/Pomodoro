import { TWeek } from '../types/types';

export function secondsToMMSS(count: number = 0) {
  const MMSS: { minutes: string; seconds: string } = {
    minutes: String(Math.trunc(count / 60)).padStart(2, '0'),
    seconds: String(count - Math.trunc(count / 60) * 60).padStart(2, '0'),
  };

  return { MIN1: MMSS.minutes[0], MIN2: MMSS.minutes[1], SEC1: MMSS.seconds[0], SEC2: MMSS.seconds[1] };
}

export function timeToHourMinutes(time: number) {
  const hour = Math.trunc(time / 60);
  const minutes = time - hour * 60;

  return [hour, minutes];
}

export function hourToPropis(hour: number, isShort: boolean = false) {
  const endHour = String(hour).slice(-1);
  switch (endHour) {
    case '0':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return isShort ? 'час' : 'часов';
    case '1':
      return isShort ? 'час' : 'часа';
    default:
      return '';
  }
}

export function minutesToPropis(minutes: number, isShort: boolean = false) {
  const endMin = String(minutes).slice(-1);
  switch (endMin) {
    case '0':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return isShort ? 'мин' : 'минут';
    case '1':
      return isShort ? 'мин' : 'минуты';
    case '2':
    case '3':
    case '4':
      return isShort ? 'мин' : 'минут';
    default:
      return '';
  }
}

export function timeToPropis(time: number, isShort: boolean = false) {
  const [hour, minutes] = timeToHourMinutes(time);
  const textHour = hour ? `${hour} ${hourToPropis(hour, isShort)} ` : '';
  const textMinutes = hour > 0 && minutes === 0 ? '' : `${minutes} ${minutesToPropis(minutes, isShort)}`;

  return textHour + textMinutes;
}

export function pomodorosToPropis(pomodoros: number) {
  const endPomodoros = String(pomodoros).slice(-1);
  switch (endPomodoros) {
    case '0':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return 'помидоров';
    case '1':
      return 'помидор';
    case '2':
    case '3':
    case '4':
      return 'помидора';
    default:
      return '';
  }
}

export function weekToPropis(selectedWeek: TWeek) {
  switch (selectedWeek) {
    case 'currentWeek':
      return 'Эта неделя';
    case 'lastWeek':
      return 'Прошедшая неделя';
    case 'penultWeek':
      return '2 недели назад';
    default:
      return '';
  }
}

export function dateToDayOfWeek(date: Date) {
  // 0-воскресенье 1-понедельник 2-вторник 3-среда 4-четверг 5-пятница 6-суббота
  return date.getDay() === 0 ? 7 : date.getDay();
}

export function makeFilterWeek(selectedWeek: TWeek) {
  let curDate = new Date();

  switch (selectedWeek) {
    case 'currentWeek':
    default:
      break;
    case 'lastWeek':
      curDate = new Date(curDate.getTime() - 7 * 24 * 3600 * 1000);
      break;
    case 'penultWeek':
      curDate = new Date(curDate.getTime() - 14 * 24 * 3600 * 1000);
      break;
  }

  const curDayOfWeek = dateToDayOfWeek(curDate);
  const dayBegin =
    curDayOfWeek === 1
      ? curDate.toISOString().slice(0, 10)
      : new Date(curDate.getTime() - (curDayOfWeek - 1) * 24 * 3600 * 1000).toISOString().slice(0, 10);
  const dayEnd =
    curDayOfWeek === 7
      ? curDate.toISOString().slice(0, 10)
      : new Date(curDate.getTime() + (7 - curDayOfWeek) * 24 * 3600 * 1000).toISOString().slice(0, 10);

  return { dayBegin: dayBegin, dayEnd: dayEnd };
}
