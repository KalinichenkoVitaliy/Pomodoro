import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './menuList.css';
import { TRootState, TTodo, TUsersState } from '../../../../../../../../types/types';
import { EIcons } from '../../../../../../../../shared/Icon';

import { modalOpen, todoEditOpen } from '../../../../../../../../store/eventsSlice';
import { todoCountPomodoroDec, todoCountPomodoroInc } from '../../../../../../../../store/usersSlice';

import { generateID } from '../../../../../../../../utils/react/generateRandomIndex';
import { GenericList } from '../../../../../../../../shared/GenericList';
import { ButtonMenu } from '../../../../../../../../shared/Buttons/ButtonMenu';

interface IMenuListProps {
  todo: TTodo;
  onBeforeDeleteTodoCard: () => void;
}
const NOOP = () => {};

export function MenuList({ todo, onBeforeDeleteTodoCard }: IMenuListProps) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);

  const userName = currentUser.name + ':' + currentUser.email;
  const isActiveButtonMenu = !todo.todoInWork && !todo.todoCompleted;
  const isActiveButtonMenuInc = !todo.todoCompleted;
  const isActiveButtonMenuDec = todo.countPomodoro > 1;
  const isActiveButtonMenuDelete = !todo.todoInWork;
  const classButtonMenu = classNames(styles.menuItem, {
    [styles.notAllowed]: !isActiveButtonMenu,
  });
  const classButtonMenuDec = classNames(styles.menuItem, {
    [styles.notAllowed]: !isActiveButtonMenu || !isActiveButtonMenuDec,
  });

  const LIST = [
    {
      As: 'li' as const,
      className: classButtonMenu,
      content: <ButtonMenu nameIcon={EIcons.buttonMenuInc} isActive={isActiveButtonMenuInc} />,
      onClick: isActiveButtonMenuInc
        ? () => {
            dispatch(todoCountPomodoroInc({ userName: userName, id: todo.id }));
          }
        : NOOP,
    },
    {
      As: 'li' as const,
      className: classButtonMenuDec,
      content: <ButtonMenu nameIcon={EIcons.buttonMenuDec} isActive={isActiveButtonMenu && isActiveButtonMenuDec} />,
      onClick:
        isActiveButtonMenu && isActiveButtonMenuDec
          ? () => {
              dispatch(todoCountPomodoroDec({ userName: userName, id: todo.id }));
            }
          : NOOP,
    },
    {
      As: 'li' as const,
      className: classButtonMenu,
      content: <ButtonMenu nameIcon={EIcons.buttonMenuEdit} isActive={isActiveButtonMenu} />,
      onClick: isActiveButtonMenu
        ? () => {
            dispatch(todoEditOpen({ id: todo.id, todoName: todo.todoName }));
          }
        : NOOP,
    },
    {
      As: 'li' as const,
      className: classButtonMenu,
      content: <ButtonMenu nameIcon={EIcons.buttonMenuDelete} isActive={isActiveButtonMenuDelete} />,
      onClick: isActiveButtonMenuDelete
        ? () => {
            window.handleBeforeDeleteTodoCard = onBeforeDeleteTodoCard;
            dispatch(modalOpen({ id: todo.id }));
          }
        : NOOP,
    },
    // {
    //   As: 'li' as const,
    //   className: styles.divider,
    //   content: '',
    // },
  ].map(generateID);

  return (
    <ul className={styles.menuList}>
      <GenericList list={LIST} />
    </ul>
  );
}
