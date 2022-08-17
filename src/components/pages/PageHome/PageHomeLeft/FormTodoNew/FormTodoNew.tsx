import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import styles from './formTodoNew.css';
import { TRootState, TUsersState } from '../../../../../types/types';

import { todoAdd, todoSorting } from '../../../../../store/usersSlice';

import { Button } from '../../../../../shared/Buttons/Button';

export function FormTodoNew() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const userName = currentUser.name + ':' + currentUser.email;

  const formSubmit = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    dispatch(todoAdd({ userName: userName, todoName: data.inputTodoName, countPomodoro: 1 }));
    dispatch(todoSorting({ userName: userName }));
    reset({ inputTodoName: '' });
    event?.target.reset();
  };

  return (
    <form className={styles.formTodoNew} onSubmit={handleSubmit(formSubmit)}>
      <label className={styles.formTodoNewLabel}>
        <input
          {...register('inputTodoName', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 5,
              message: 'Должно быть минимум 5 символов',
            },
          })}
          id='inputTodoName'
          className={styles.formTodoNewInput}
          type='text'
          placeholder='Название задачи'
        />
        {errors.inputTodoName && (
          <div className={styles.formTodoNewError}>⚠ {errors.inputTodoName.message?.toString() || 'Error!'}</div>
        )}
      </label>
      <Button action={'do'} type={'submit'} text={'Добавить'} />
    </form>
  );
}
