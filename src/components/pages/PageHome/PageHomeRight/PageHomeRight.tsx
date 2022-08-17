import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import useSound from 'use-sound';
import { useToasts } from 'react-toast-notifications';

import styles from './pageHomeRight.css';
import { ITimer, TRootState, TTimersState, TUsersState } from '../../../../types/types';

import soundUrlNotify from '../../../../assets/sounds/notify.mp3';

import {
  timerAddMinute,
  timerCountDec,
  timerElapsedPomodoroClear,
  timerElapsedPomodoroDec,
  timerElapsedPomodoroInc,
  timerIntervalClear,
  timerIntervalSet,
  timerTimeoutClear,
  timerTimeoutSet,
  timerSetCount,
  timerSetStatus,
  timerTodoIdClear,
  timerTodoIdSet,
} from '../../../../store/timerSlice';

import { Break } from '../../../../shared/Break';
import { Button } from '../../../../shared/Buttons/Button';
import { Timer } from './Timer';
import {
  statisticEventAdd,
  todoComplited,
  todoInWork,
  todoNotWork,
  todoNextPomodore,
  todoSorting,
} from '../../../../store/usersSlice';
import { Title } from '../../../../shared/Title';

export function PageHomeRight() {
  const dispatch = useDispatch();
  const { currentUser, currentSettings, usersTodos } = useSelector<TRootState, TUsersState>(
    (state) => state.usersState
  );
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);
  const [playNotify] = useSound(soundUrlNotify, { volume: 1 });
  const { addToast } = useToasts();

  const timeoutToast = 10000;
  const userName = currentUser.name + ':' + currentUser.email;
  const currentUserTodos = usersTodos
    .find((userTodos) => userTodos.userName === userName)
    ?.todos.filter((todo) => todo.todoCompleted === false);
  const isUserTodos = currentUserTodos && currentUserTodos.length > 0;

  const timerStatus = timer.timerStatus;
  const isTimerBreak = timerStatus.includes('timerBreak');
  const isTimerBreakShort = timerStatus.includes('timerBreakShort');
  const nameBreak = isTimerBreakShort ? 'Короткий перерыв' : 'Длинный перерыв';
  const isTimerAtWork =
    !isTimerBreak &&
    isUserTodos &&
    (timerStatus === 'timerStarted' || timerStatus === 'timerPaused' || timerStatus === 'timerContinued');

  let todoId = ``;
  let todoName = isTimerBreak ? nameBreak : `⁣`;
  let countPomodoro = 0;
  let currentPomodoro = 0;
  let currentPomodoroText = isTimerBreak ? '' : `Помидор⁣⁣ ⁣`;
  let bottomTodoTextNum = isTimerBreak ? '' : 'Задач к исполнению нет';
  let bottomTodoTextSpan = isTimerBreak ? todoName : '';
  if (!isTimerBreak && currentUserTodos && currentUserTodos.length > 0) {
    todoId = currentUserTodos[0].id;
    todoName = currentUserTodos[0].todoName;
    countPomodoro = currentUserTodos[0].countPomodoro;
    currentPomodoro = currentUserTodos[0].currentPomodoro;
    currentPomodoroText = `Помидор ${currentUserTodos[0].currentPomodoro}`;
    bottomTodoTextNum = 'Задача 1';
    bottomTodoTextSpan = ` - ${todoName}`;
  }

  const isActiveButtonAdd =
    !isTimerBreak && isUserTodos && (timerStatus === 'timerStart' || timerStatus === 'timerPaused');
  const isVisibleButtonStart = timerStatus === 'timerStart';
  const isActiveButtonStart = !isTimerBreak && isUserTodos && timerStatus === 'timerStart';
  const isVisibleButtonPause =
    !isTimerBreak && isUserTodos && (timerStatus === 'timerStarted' || timerStatus === 'timerContinued');
  const isVisibleButtonContinue = !isTimerBreak && isUserTodos && timerStatus === 'timerPaused';
  const isVisibleButtonStop =
    timerStatus === 'timerStart' || timerStatus === 'timerStarted' || timerStatus === 'timerContinued';
  const isActiveButtonStop =
    !isTimerBreak && isUserTodos && (timerStatus === 'timerStarted' || timerStatus === 'timerContinued');
  const isVisibleButtonComplite =
    !isTimerBreak && isUserTodos && timerStatus === 'timerPaused' && currentPomodoro === countPomodoro;
  const isVisibleButtonToNext =
    !isTimerBreak && isUserTodos && timerStatus === 'timerPaused' && currentPomodoro < countPomodoro;

  const classHeadTop = classNames(
    styles.headTop,
    styles[`headTopTimer${isTimerBreak ? 'InBreak' : isUserTodos && isTimerAtWork ? 'InWokr' : 'NotWokr'}`]
  );

  const timerGoStart = ({ timerCount, onFinish }: ITimer) => {
    const intervalId = setInterval(() => {
      dispatch(timerCountDec());
    }, 1000);
    dispatch(timerIntervalSet({ timerInterval: intervalId }));
    const timeoutId = setTimeout(() => {
      timerGoStop();
      onFinish();
    }, timerCount * 1000);
    dispatch(timerTimeoutSet({ timerTimeout: timeoutId }));
  };
  const timerGoStop = () => {
    dispatch(timerIntervalClear());
    dispatch(timerTimeoutClear());
  };

  const handleClickOnStart = () => {
    const newStatus = 'timerStarted';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(todoInWork({ userName: userName, id: todoId }));
    dispatch(timerTodoIdSet({ todoId: todoId }));
    timerGoStart({ timerCount: timer.timerCount, onFinish: todoAutoComplite });
  };
  const handleClickOnPause = () => {
    timerGoStop();
    const newStatus = 'timerPaused';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
  };
  const handleClickOnContinue = () => {
    const newStatus = 'timerContinued';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    timerGoStart({ timerCount: timer.timerCount, onFinish: todoAutoComplite });
  };

  const handleClickOnStop = () => {
    timerGoStop();
    const newStatus = 'timerStoped';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(timerElapsedPomodoroDec());
    dispatch(todoNotWork({ userName: userName, id: todoId }));
    dispatch(timerTodoIdClear());
    setTimerStatusToStart();
  };
  const handleClickOnComplite = () => {
    const newStatus = 'timerComplited';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(todoNotWork({ userName: userName, id: todoId }));
    dispatch(todoComplited({ userName: userName, id: todoId }));
    dispatch(todoSorting({ userName: userName }));
    dispatch(timerTodoIdClear());
    examinationElapsedPomodoro();
  };
  const handleClickOnToNext = () => {
    const newStatus = 'timerToNext';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(todoNextPomodore({ userName: userName, id: todoId }));
    examinationElapsedPomodoro();
  };

  const todoAutoComplite = () => {
    const isTodoComplited = currentPomodoro >= countPomodoro;
    const successText = isTodoComplited ? 'Текущая задача завершена !' : 'Текущая помидорка выполнена !';
    if (isTodoComplited) {
      const newStatus = 'timerComplited';
      dispatch(timerSetStatus({ timerStatus: newStatus }));
      dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
      dispatch(todoNotWork({ userName: userName, id: todoId }));
      dispatch(todoComplited({ userName: userName, id: todoId }));
      dispatch(todoSorting({ userName: userName }));
      dispatch(timerTodoIdClear());
    } else {
      const newStatus = 'timerToNext';
      dispatch(timerSetStatus({ timerStatus: newStatus }));
      dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
      dispatch(todoNextPomodore({ userName: userName, id: todoId }));
    }
    if (currentSettings.isNotificationsOn) {
      addToast(successText, { appearance: 'success', autoDismiss: true, autoDismissTimeout: timeoutToast });
      playNotify();
    }
    examinationElapsedPomodoro();
  };

  const examinationElapsedPomodoro = () => {
    const isBreakLong =
      currentSettings.frequencyBreakLong > 0 && !(timer.timerElapsedPomodoro < currentSettings.frequencyBreakLong);
    const newStatus = isBreakLong ? 'timerBreakLongStart' : 'timerBreakShortStart';
    const timerCount = (isBreakLong ? currentSettings.durationBreakLong : currentSettings.durationBreakShort) * 60;
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(timerSetCount({ timerCount: timerCount }));
    timerGoStart({ timerCount: timerCount, onFinish: timerBreakFinish });
  };

  const timerBreakFinish = () => {
    const isBreakLong =
      currentSettings.frequencyBreakLong > 0 && !(timer.timerElapsedPomodoro < currentSettings.frequencyBreakLong);
    if (currentSettings.isNotificationsOn) {
      const successText = isBreakLong ? 'Длинный перерыв завершён !' : 'Короткий перерыв завершён !';
      addToast(successText, { appearance: 'info', autoDismiss: true, autoDismissTimeout: timeoutToast });
      playNotify();
    }
    const newStatus = isBreakLong ? 'timerBreakLongFinish' : 'timerBreakShortFinish';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    if (isBreakLong) dispatch(timerElapsedPomodoroClear());
    else dispatch(timerElapsedPomodoroInc());
    setTimerStatusToStart();
  };

  const setTimerStatusToStart = () => {
    const newStatus = 'timerStart';
    dispatch(timerSetStatus({ timerStatus: newStatus }));
    dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
    dispatch(timerSetCount({ timerCount: currentSettings.durationPomodoro * 60 }));
  };

  return (
    <div className={styles.headContainer}>
      <div className={classHeadTop}>
        <Title As='h3' content={todoName} style={{ fontSize: '18px', lineHeight: '20px', color: 'white' }} />
        <p className={styles.headTopCurrentPomodoro}>{currentPomodoroText}</p>
      </div>
      <div className={styles.headBottom}>
        <Break step={85} top />
        <div className={styles.headBottomGroup}>
          <Break step={50} />
          <Timer />
          <Button
            action='add'
            active={isActiveButtonAdd}
            title='Увеличить таймер на 1 минуту'
            onClick={() => {
              dispatch(timerAddMinute());
            }}
          />
        </div>
        <p className={styles.headBottomTodoText}>
          {bottomTodoTextNum}
          <span className={styles.headBottomTodoTextSpan}>{bottomTodoTextSpan}</span>
        </p>
        <Break step={32} top />
        <div className={styles.headBottomGroup}>
          <div>
            {isVisibleButtonStart && (
              <Button
                action='do'
                active={isActiveButtonStart}
                text='Старт'
                title='Начать работу таймера'
                onClick={handleClickOnStart}
              />
            )}
            {isVisibleButtonPause && (
              <Button action='do' text='Пауза' title='Поставить таймер на паузу' onClick={handleClickOnPause} />
            )}
            {isVisibleButtonContinue && (
              <Button action='do' text='Продолжить' title='Продолжить работу таймера' onClick={handleClickOnContinue} />
            )}
          </div>
          <div>
            {isVisibleButtonStop && (
              <Button
                action='break'
                active={isActiveButtonStop}
                text='Стоп'
                title='Остановить работу таймера, начать помидорку заново'
                onClick={handleClickOnStop}
              />
            )}
            {isVisibleButtonComplite && (
              <Button action='break' text='Сделано' title='Задача выполнена' onClick={handleClickOnComplite} />
            )}
            {isVisibleButtonToNext && (
              <Button
                action='break'
                text='Пропустить'
                title='Завершить помидорку и перейти к следующей'
                onClick={handleClickOnToNext}
              />
            )}
          </div>
        </div>
        <Break step={107} top />
      </div>
    </div>
  );
}
