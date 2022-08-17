import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import useSound from 'use-sound';

import styles from './formLogin.css';
import { TRootState, TTimersState } from '../../../../types/types';

import soundUrlLogin from '../../../../assets/sounds/login.mp3';

import {
  currentUserSave,
  settingsUserInit,
  todoUserInit,
  statisticUserInit,
  statisticEventAdd,
} from '../../../../store/usersSlice';
import { timerElapsedPomodoroClear, timerSetStatus, timerTodoIdClear } from '../../../../store/timerSlice';

import { Button } from '../../../../shared/Buttons/Button';
import { Break } from '../../../../shared/Break';

export function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timer } = useSelector<TRootState, TTimersState>((state) => state.timerState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const [playLogin] = useSound(soundUrlLogin, { volume: 0.5 });

  const formSubmit = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    const userName = data.inputName + ':' + data.inputEmail;
    dispatch(currentUserSave({ name: data.inputName, email: data.inputEmail, agreement: true }));
    dispatch(settingsUserInit({ userName: userName }));
    dispatch(todoUserInit({ userName: userName }));
    dispatch(statisticUserInit({ userName: userName }));
    if (timer.timerInterval || timer.timerTimeout || timer.timerTodoId) {
      if (timer.timerStatus !== 'timerStart') {
        const newStatus = 'timerStoped';
        dispatch(timerSetStatus({ timerStatus: newStatus }));
        dispatch(statisticEventAdd({ userName: userName, timerStatus: newStatus }));
      }
      dispatch(timerElapsedPomodoroClear());
      dispatch(timerTodoIdClear());
    }
    playLogin();
    navigate('/');
  };

  return (
    <form className={styles.formLogin} onSubmit={handleSubmit(formSubmit)}>
      <label className={styles.formLoginLabel}>
        <input
          {...register('inputName', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 4,
              message: 'Должно быть минимум 4 символа',
            },
          })}
          id='inputName'
          className={styles.formLoginInput}
          type='text'
          placeholder='Ваше имя'
        />
        {errors.inputName && (
          <div className={styles.formLoginError}>⚠ {errors.inputName.message?.toString() || 'Error!'}</div>
        )}
      </label>
      <label className={styles.formLoginLabel}>
        <input
          {...register('inputEmail', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Должно быть минимум 6 символов',
            },
          })}
          id='inputEmail'
          className={styles.formLoginInput}
          type='email'
          placeholder='E-mail'
        />
        {errors.inputEmail && (
          <div className={styles.formLoginError}>⚠ {errors.inputEmail.message?.toString() || 'Error!'}</div>
        )}
      </label>
      <Button action={'do'} type={'submit'} text={'Зарегистрироваться'} />
      <Break step={25} top />
      <div className={styles.formLoginAgreement}>
        <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect x='0.5' y='0.5' width='13' height='13' stroke='white' />
          <path d='M10.9498 4.08233L6.00002 9.03208L3.17159 6.20365' stroke='white' />
        </svg>
        <span className={styles.formLoginAgreementSpan}>Согласен на обработку персональных данных</span>
      </div>
    </form>
  );
}
