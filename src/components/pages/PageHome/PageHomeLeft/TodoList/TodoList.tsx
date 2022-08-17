import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './todoList.css';
import { TRootState, TTodo, TUsersState } from '../../../../../types/types';

import { timeToHourMinutes } from '../../../../../utils/lib';

import { TodoCard } from './TodoCard';
import { Break } from '../../../../../shared/Break';

export function TodoList() {
  const { currentUser, currentSettings, usersTodos } = useSelector<TRootState, TUsersState>(
    (state) => state.usersState
  );

  const nameTheme = currentSettings.isDarkTheme ? 'dark' : 'light';
  const classestodosListCount = classNames(styles.todosListCount, styles[`todosListCount_${nameTheme}`]);

  const userName = currentUser.name + ':' + currentUser.email;
  const currentUserAllTodos = usersTodos.find((userTodos) => userTodos.userName === userName)?.todos;

  const currentUserTodos = usersTodos
    .find((userTodos) => userTodos.userName === currentUser.name + ':' + currentUser.email)
    ?.todos.filter((todo) => todo.todoCompleted === false);

  const countAllPomodoro = currentUserTodos
    ? currentUserTodos.reduce((accumulator, currentTodo) => accumulator + currentTodo.countPomodoro, 0)
    : 0;
  const durationAllTodos = countAllPomodoro * currentSettings.durationPomodoro;
  const [countHour, countMinutes] = timeToHourMinutes(durationAllTodos);
  const textHour = countHour ? `${countHour} час. ` : '';

  return (
    <>
      {currentUserAllTodos && currentUserAllTodos.length > 0 && (
        <>
          <ul className={styles.todosList}>
            {currentUserAllTodos.map((todo: TTodo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </ul>
          <p className={classestodosListCount}>{`${textHour}${countMinutes} мин.`}</p>
          <Break step={15} top />
        </>
      )}
      {
        <div className={styles.todosListEmpty}>
          {currentUserTodos && currentUserTodos.length === 0 ? `<< Список задач к исполнению пуст >>` : `⁣`}
        </div>
      }
      <Break step={80} top />
    </>
  );
}
