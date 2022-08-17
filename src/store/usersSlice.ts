import { createSlice } from '@reduxjs/toolkit';

import { TTodo, TTodoEvents, TUser, TUserSettings, TUsersState, TUserStatistic, TUserTodos } from '../types/types';

const cleanUser: TUser = {
  name: '',
  email: '',
  agreement: false,
};

const cleanSettings: TUserSettings = {
  userName: '',
  isDarkTheme: false,
  isNotificationsOn: false,
  durationPomodoro: 0,
  durationBreakShort: 0,
  durationBreakLong: 0,
  frequencyBreakLong: 0,
};

const todoSort = (todos: TTodo[]) => {
  let todosSorting: TTodo[] = [];
  if (todos && todos.length > 0)
    todosSorting = todos.sort((todoA, todoB) => {
      if (todoA.todoInWork) return -1;
      else if (todoA.todoCompleted === todoB.todoCompleted) {
        return todoA.id < todoB.id ? -1 : todoA.id > todoB.id ? 1 : 0;
      } else {
        return !todoA.todoCompleted && todoB.todoCompleted ? -1 : todoA.todoCompleted && !todoB.todoCompleted ? 1 : 0;
      }
    });
  return todosSorting;
};

const usersSlice = createSlice({
  name: 'user',
  initialState: <TUsersState>{
    currentUser: cleanUser,
    currentSettings: cleanSettings,
    usersSettings: [],
    usersStatistic: [],
    usersTodos: [],
  },
  reducers: {
    currentUserSave(state, action) {
      state.currentUser = {
        name: action.payload.name ? action.payload.name : state.currentUser.name,
        email: action.payload.email ? action.payload.email : state.currentUser.email,
        agreement: true,
      };
    },
    currentUserClear(state) {
      state.currentUser = cleanUser;
      state.currentSettings = cleanSettings;
    },
    settingsUserInit(state, action) {
      const newSettings: TUserSettings = {
        userName: action.payload.userName,
        isDarkTheme: false,
        isNotificationsOn: true,
        durationPomodoro: 25,
        durationBreakShort: 5,
        durationBreakLong: 20,
        frequencyBreakLong: 4,
      };
      const finedSettings = state.usersSettings.find((set) => set.userName === action.payload.userName);
      if (finedSettings) state.currentSettings = finedSettings;
      else {
        state.usersSettings.push(newSettings);
        state.currentSettings = newSettings;
      }
    },
    settingsUserSave(state, action) {
      const newSettings: TUserSettings = {
        userName: action.payload.userName,
        isDarkTheme: action.payload.isDarkTheme,
        isNotificationsOn: action.payload.isNotificationsOn,
        durationPomodoro: action.payload.durationPomodoro,
        durationBreakShort: action.payload.durationBreakShort,
        durationBreakLong: action.payload.durationBreakLong,
        frequencyBreakLong: action.payload.frequencyBreakLong,
      };
      state.currentSettings = newSettings;
      const finedSettings = state.usersSettings.find((set) => set.userName === action.payload.userName);
      if (finedSettings) {
        finedSettings.isDarkTheme = newSettings.isDarkTheme;
        finedSettings.isNotificationsOn = newSettings.isNotificationsOn;
        finedSettings.durationPomodoro = newSettings.durationPomodoro;
        finedSettings.durationBreakShort = newSettings.durationBreakShort;
        finedSettings.durationBreakLong = newSettings.durationBreakLong;
        finedSettings.frequencyBreakLong = newSettings.frequencyBreakLong;
      } else state.usersSettings.push(newSettings);
    },
    todoUserInit(state, action) {
      const newUserTodos: TUserTodos = {
        userName: action.payload.userName,
        todos: [],
      };
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (!finedUserTodos) state.usersTodos.push(newUserTodos);
    },
    todoAdd(state, action) {
      const newTodo: TTodo = {
        id: new Date().toISOString(),
        todoName: action.payload.todoName,
        todoInWork: false,
        todoCompleted: false,
        countPomodoro: action.payload.countPomodoro,
        currentPomodoro: 1,
      };
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        finedUserTodos.todos.push(newTodo);
      } else state.usersTodos.push({ userName: action.payload.userName, todos: [newTodo] });
    },
    todoEdit(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo) editedTodo.todoName = action.payload.todoName;
      }
    },
    todoInWork(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo) editedTodo.todoInWork = true;
      }
    },
    todoNotWork(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo) editedTodo.todoInWork = false;
      }
    },
    todoNextPomodore(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo && editedTodo.currentPomodoro < editedTodo.countPomodoro)
          editedTodo.currentPomodoro = editedTodo.currentPomodoro + 1;
      }
    },
    todoComplited(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo) editedTodo.todoCompleted = true;
      }
    },
    todoSorting(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) finedUserTodos.todos = todoSort(finedUserTodos.todos);
    },
    todoRemove(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) finedUserTodos.todos = finedUserTodos.todos.filter((todo) => todo.id !== action.payload.id);
    },
    todoCountPomodoroInc(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo) editedTodo.countPomodoro = editedTodo.countPomodoro + 1;
      }
    },
    todoCountPomodoroDec(state, action) {
      const finedUserTodos = state.usersTodos.find((userTodos) => userTodos.userName === action.payload.userName);
      if (finedUserTodos) {
        const editedTodo = finedUserTodos.todos.find((todo) => todo.id === action.payload.id);
        if (editedTodo && editedTodo.countPomodoro > 0) editedTodo.countPomodoro = editedTodo.countPomodoro - 1;
      }
    },
    statisticUserInit(state, action) {
      const newUserStatistic: TUserStatistic = {
        userName: action.payload.userName,
        todoEvents: [],
      };
      const finedUserStatistic = state.usersStatistic.find(
        (userStatistic) => userStatistic.userName === action.payload.userName
      );
      if (!finedUserStatistic) state.usersStatistic.push(newUserStatistic);
    },
    statisticEventAdd(state, action) {
      const newEvent: TTodoEvents = {
        date: new Date().toISOString(),
        timerStatus: action.payload.timerStatus,
      };
      const editedUsersStatistic = state.usersStatistic.find(
        (userStatistic) => userStatistic.userName === action.payload.userName
      );
      if (editedUsersStatistic) editedUsersStatistic.todoEvents.push(newEvent);
      else state.usersStatistic.push({ userName: action.payload.userName, todoEvents: [newEvent] });
    },
  },
});

export const {
  currentUserSave,
  currentUserClear,
  settingsUserInit,
  settingsUserSave,
  todoUserInit,
  todoAdd,
  todoEdit,
  todoInWork,
  todoNotWork,
  todoNextPomodore,
  todoComplited,
  todoSorting,
  todoRemove,
  todoCountPomodoroInc,
  todoCountPomodoroDec,
  statisticUserInit,
  statisticEventAdd,
} = usersSlice.actions;
export default usersSlice.reducer;
