import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import styles from './formTodoEdit.css';
import { TEventsState, TRootState, TUsersState } from '../../../../../../../types/types';

import { todoEditClose } from '../../../../../../../store/eventsSlice';
import { todoEdit } from '../../../../../../../store/usersSlice';

export function FormTodoEdit() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const { events } = useSelector<TRootState, TEventsState>((state) => state.eventsState);
  const { register, setValue, reset } = useForm({});

  const idFormTodoEdit = `formTodoEdit-${events.todoEditTodoId}`;
  const refFormTodoEdit = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setValue('textEditTodoName', events.todoEditTodoName);
  }, []);

  const handleOnBlur = (event?: React.BaseSyntheticEvent) => {
    const newTodoName: string = event?.target.value.trim();
    if (newTodoName && newTodoName.length > 4) {
      dispatch(
        todoEdit({
          userName: currentUser.name + ':' + currentUser.email,
          id: events.todoEditTodoId,
          todoName: newTodoName,
        })
      );
      reset({ textEditTodoName: '' });
    }
    dispatch(todoEditClose());
  };

  return (
    <form id={idFormTodoEdit} className={styles.formTodoEdit} ref={refFormTodoEdit}>
      <textarea
        {...register('textEditTodoName', {})}
        id='textEditTodoName'
        className={styles.formTodoEditInput}
        onBlur={handleOnBlur}
        autoFocus
      />
    </form>
  );
}
