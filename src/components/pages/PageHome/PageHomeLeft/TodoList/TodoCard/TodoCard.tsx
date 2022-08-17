import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './todoCard.css';
import { TTodo } from '../../../../../../types/types';
import { TEventsState, TRootState } from '../../../../../../types/types';

import { FormTodoEdit } from './FormTodoEdit';
import { Menu } from './Menu';
import { Break } from '../../../../../../shared/Break';
import { EColor, EDecoration, Text } from '../../../../../../shared/Text';

let timout: NodeJS.Timeout;

interface ITodoCardProps {
  todo: TTodo;
}

export function TodoCard({ todo }: ITodoCardProps) {
  const refTodoCard = React.useRef<HTMLLIElement>(null);
  const [classTodoCard, setClassTodoCard] = React.useState(classNames(styles.todoCard, styles.todoCardAnimeAdd));
  const { events } = useSelector<TRootState, TEventsState>((state) => state.eventsState);

  const totComplited = todo.todoCompleted;

  React.useEffect(() => {
    timout = setTimeout(() => {
      if (refTodoCard) setClassTodoCard(classNames(styles.todoCard));
    }, 800);
    return () => {
      clearTimeout(timout);
    };
  }, []);

  const onBeforeDeleteTodoCard = () => {
    setClassTodoCard(classNames(styles.todoCard, styles.todoCardAnimeDel));
  };

  return (
    <li id={`todoCard-${todo.id}`} className={classTodoCard} ref={refTodoCard}>
      <div className={styles.todoCardCount}>
        <span className={styles.todoCardCountText}>{todo.countPomodoro}</span>
      </div>
      <Break step={10} />
      <Text
        font={{ weight: 300, size: 16, lineHeight: '17px' }}
        textDecoration={totComplited ? EDecoration.lineThrough : EDecoration.none}
        color={EColor.black}
      >
        {todo.todoName}
      </Text>
      {events.todoEditIsOpen && events.todoEditTodoId === todo.id && <FormTodoEdit />}
      <Menu todo={todo} onBeforeDeleteTodoCard={onBeforeDeleteTodoCard} />
    </li>
  );
}
