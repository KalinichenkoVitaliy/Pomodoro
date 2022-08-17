import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import styles from './formSettings.css';
import { TRootState, TTimersState, TUsersState } from '../../../../types/types';

import { settingsUserSave, statisticEventAdd, todoNotWork } from '../../../../store/usersSlice';
import {
  timerElapsedPomodoroDec,
  timerIntervalClear,
  timerTimeoutClear,
  timerSetStatus,
  timerTodoIdClear,
  timerSetCount,
} from '../../../../store/timerSlice';

import { Title } from '../../../../shared/Title';
import { Button } from '../../../../shared/Buttons/Button';
import { Break } from '../../../../shared/Break';

export function FormSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, currentSettings } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);
  const [isDarkTheme, setIsDarkTheme] = React.useState(currentSettings.isDarkTheme);
  const [isNotificationsOn, setIsNotificationsOn] = React.useState(currentSettings.isNotificationsOn);
  const [durationPomodoro, setDurationPomodoro] = React.useState(currentSettings.durationPomodoro);
  const [durationBreakShort, setDurationBreakShort] = React.useState(currentSettings.durationBreakShort);
  const [durationBreakLong, setDurationBreakLong] = React.useState(currentSettings.durationBreakLong);
  const [frequencyBreakLong, setFrequencyBreakLong] = React.useState(currentSettings.frequencyBreakLong);

  React.useEffect(() => {
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
      dispatch(timerElapsedPomodoroDec());
      dispatch(todoNotWork({ userName: userName, id: timer.timerTodoId }));
      dispatch(timerTodoIdClear());
    }
  }, []);

  const handleChangeIsDarkTheme = (event: React.BaseSyntheticEvent) => {
    setIsDarkTheme(!isDarkTheme);
  };
  const handleChangeIsNotificationsOn = (event: React.BaseSyntheticEvent) => {
    setIsNotificationsOn(!isNotificationsOn);
  };
  const handleChangeDurationPomodoro = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationPomodoro(parseInt(event.target.value));
  };
  const handleChangeDurationBreakShort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationBreakShort(parseInt(event.target.value));
  };
  const handleChangeDurationBreakLong = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationBreakLong(parseInt(event.target.value));
  };
  const handleChangeFrequencyBreakLong = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequencyBreakLong(parseInt(event.target.value));
  };
  const formSubmit = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    dispatch(
      settingsUserSave({
        userName: `${currentUser.name}:${currentUser.email}`,
        isDarkTheme: data.inputIsDarkTheme,
        isNotificationsOn: data.inputIsNotificationsOn,
        durationPomodoro: parseInt(data.inputDurationPomodoro),
        durationBreakShort: parseInt(data.inputDurationBreakShort),
        durationBreakLong: parseInt(data.inputDurationBreakLong),
        frequencyBreakLong: parseInt(data.inputFrequencyBreakLong),
      })
    );
    navigate('/');
  };

  return (
    <form className={styles.formSettings} onSubmit={handleSubmit(formSubmit)}>
      <div className={styles.formSettingsContent}>
        <div className={styles.formSettingsGroup}>
          <Title
            As='h3'
            content='Настройки интерфейса:'
            style={{ fontWeight: 600, fontSize: '16px', lineHeight: '17px' }}
          />
          <Break step={2} top />
          <input
            {...register('inputIsDarkTheme', {})}
            id='inputIsDarkTheme'
            className={styles.formSettingsInputCheckbox}
            type='checkbox'
            checked={isDarkTheme}
          />
          <label
            className={styles.formSettingsLabel + ' ' + styles.formSettingsLabelCheckbox}
            onClick={handleChangeIsDarkTheme}
          >
            Использовать тёмную тему:
          </label>
          <input
            {...register('inputIsNotificationsOn', {})}
            id='inputIsNotificationsOn'
            className={styles.formSettingsInputCheckbox}
            type='checkbox'
            checked={isNotificationsOn}
          />
          <label
            className={styles.formSettingsLabel + ' ' + styles.formSettingsLabelCheckbox}
            onClick={handleChangeIsNotificationsOn}
          >
            Использовать уведомления:
          </label>
        </div>
        <div className={styles.formSettingsGroup}>
          <Title
            As='h3'
            content='Настройки таймера:'
            style={{ fontWeight: 600, fontSize: '16px', lineHeight: '17px' }}
          />
          <Break step={2} top />
          <label className={styles.formSettingsLabel}>
            {`Продолжительность помидорки, минут: ⁣`}
            <input
              {...register('inputDurationPomodoro', {})}
              id='inputDurationPomodoro'
              className={styles.formSettingsInputNumber}
              type='number'
              value={durationPomodoro}
              min={15}
              max={50}
              title={'Допустивый диапазон значений от 15 до 50'}
              onChange={handleChangeDurationPomodoro}
            />
          </label>
          <label className={styles.formSettingsLabel}>
            {`Продолжительность короткого перерыва, минут: ⁣`}
            <input
              {...register('inputDurationBreakShort', {})}
              id='inputDurationBreakShort'
              className={styles.formSettingsInputNumber}
              type='number'
              value={durationBreakShort}
              min={3}
              max={15}
              title={'Допустивый диапазон значений от 5 до 15'}
              onChange={handleChangeDurationBreakShort}
            />
          </label>
          <label className={styles.formSettingsLabel}>
            {`Продолжительность длинного перерыва, минут: ⁣`}
            <input
              {...register('inputDurationBreakLong', {})}
              id='inputDurationBreakLong'
              className={styles.formSettingsInputNumber}
              type='number'
              value={durationBreakLong}
              min={15}
              max={60}
              title={'Допустивый диапазон значений от 15 до 30'}
              onChange={handleChangeDurationBreakLong}
            />
          </label>
          <label className={styles.formSettingsLabel}>
            {`Помидорок между длинными перерывами, шт.: ⁣`}
            <input
              {...register('inputFrequencyBreakLong', {})}
              id='inputFrequencyBreakLong'
              className={styles.formSettingsInputNumber}
              type='number'
              value={frequencyBreakLong}
              min={2}
              max={10}
              title={'Допустивый диапазон значений от 2 до 10'}
              onChange={handleChangeFrequencyBreakLong}
            />
          </label>
        </div>
      </div>
      <div className={styles.formSettingsButton}>
        <Button action={'do'} type={'submit'} text={'Сохранить настройки'} />
      </div>
    </form>
  );
}
