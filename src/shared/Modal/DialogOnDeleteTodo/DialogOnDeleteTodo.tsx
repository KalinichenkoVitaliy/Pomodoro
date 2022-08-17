import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './dialogOnDeleteTodo.css';
import { TEventsState, TRootState, TUsersState } from '../../../types/types';

import { modalClose } from '../../../store/eventsSlice';
import { todoRemove, todoSorting } from '../../../store/usersSlice';

import { Title } from '../../Title';
import { Break } from '../../Break';
import { EColor, ECursor, EDecoration, Text } from '../../Text';
import { Button } from '../../Buttons/Button';

export function DialogOnDeleteTodo() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const { events } = useSelector<TRootState, TEventsState>((state) => state.eventsState);

  const userName = currentUser.name + ':' + currentUser.email;

  const handleClickOnClose = () => {
    dispatch(modalClose());
  };
  const handleClickOnDelete = () => {
    if (
      typeof window !== 'undefined' &&
      window.handleBeforeDeleteTodoCard &&
      typeof window.handleBeforeDeleteTodoCard !== 'undefined'
    ) {
      window.handleBeforeDeleteTodoCard();
    }
    dispatch(modalClose());
    setTimeout(() => {
      dispatch(todoRemove({ userName: userName, id: events.modalTodoId }));
      dispatch(todoSorting({ userName: userName }));
    }, 800);
  };

  return (
    <div className={styles.dialog}>
      <Title As='h3' content='Удалить задачу?' style={{ fontWeight: 400, fontSize: '24px', lineHeight: 1 }} />
      <Break step={25} top />
      <Button action='delete' text='Удалить' onClick={handleClickOnDelete} />
      <Break step={10} top />
      <Text
        font={{ size: 16, lineHeight: '17px', weight: 300 }}
        color={EColor.black}
        textDecoration={EDecoration.underline}
        cursor={ECursor.pointer}
        onClick={handleClickOnClose}
      >
        Отмена
      </Text>
      <div className={styles.dialogClose} onClick={handleClickOnClose} />
    </div>
  );
}
