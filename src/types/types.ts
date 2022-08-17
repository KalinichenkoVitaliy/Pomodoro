export type TRootState = {
  usersState: TUsersState;
  timerState: TTimersState;
  statsState: TStatsState;
  eventsState: TEventsState;
};

/**
 * usersState
 */
export type TUsersState = {
  currentUser: TUser;
  currentSettings: TUserSettings;
  usersSettings: TUserSettings[];
  usersStatistic: TUserStatistic[];
  usersTodos: TUserTodos[];
};
export type TUser = {
  name: string;
  email: string;
  agreement: boolean;
};
export type TUserSettings = {
  userName: string;
  isDarkTheme: boolean;
  isNotificationsOn: boolean;
  durationPomodoro: number;
  durationBreakShort: number;
  durationBreakLong: number;
  frequencyBreakLong: number;
};
export type TUserStatistic = {
  userName: string;
  todoEvents: TTodoEvents[];
};
export type TTodoEvents = {
  date: string;
  timerStatus: TTimerStatus;
};
export type TUserTodos = {
  userName: string;
  todos: TTodo[];
};
export type TTodo = {
  id: string;
  todoName: string;
  todoInWork: boolean;
  todoCompleted: boolean;
  countPomodoro: number;
  currentPomodoro: number;
};

/**
 * timerState
 */
export type TTimersState = {
  timer: TTimer;
};
export type TTimer = {
  timerStatus: TTimerStatus;
  timerCount: number;
  timerElapsedPomodoro: number;
  timerTodoId: string;
  timerInterval: NodeJS.Timer | undefined;
  timerTimeout: NodeJS.Timer | undefined;
};
export type TTimerStatus =
  | 'timerStart'
  | 'timerNotRun'
  | 'timerStarted'
  | 'timerStoped'
  | 'timerPaused'
  | 'timerContinued'
  | 'timerToNext'
  | 'timerComplited'
  | 'timerBreakShortStart'
  | 'timerBreakShortFinish'
  | 'timerBreakLongStart'
  | 'timerBreakLongFinish';
export interface ITimer {
  timerCount: number;
  onFinish: () => void;
}

/**
 * statsState
 */
export type TStatsState = {
  stats: TStats;
};
export type TStats = {
  selectedWeek: TWeek;
  selectedDay: number;
  daysWeek: TDaysWeek;
  totalFocus: number;
  totalPause: number;
  totalStop: number;
};
export type TDaysWeek = {
  day0: TDay;
  day1: TDay;
  day2: TDay;
  day3: TDay;
  day4: TDay;
  day5: TDay;
  day6: TDay;
  day7: TDay;
};
export type TDay = {
  dayNameFull: TDayNameFull;
  dayNameShort: TDayNameShort;
  workMinutes: number;
  workPomodoro: number;
};
export type TWeek = 'currentWeek' | 'lastWeek' | 'penultWeek';
export type TDayNameFull =
  | 'День не выбран'
  | 'Понедельник'
  | 'Вторник'
  | 'Среда'
  | 'Четверг'
  | 'Пятница'
  | 'Суббота'
  | 'Воскресенье';
export type TDayNameShort = '' | 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс';

/**
 * eventsState
 */
export type TEventsState = {
  events: TEvents;
};
export type TEvents = {
  modalIsOpen: boolean;
  modalTodoId: string;
  todoEditIsOpen: boolean;
  todoEditTodoId: string;
  todoEditTodoName: string;
};
