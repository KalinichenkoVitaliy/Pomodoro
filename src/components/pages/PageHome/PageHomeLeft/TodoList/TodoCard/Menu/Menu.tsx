import React from 'react';

import styles from './menu.css';
import { TTodo } from '../../../../../../../types/types';

import { Dropdown } from '../../../../../../../shared/Dropdown';
import { MenuList } from './MenuList';

interface IMenuProps {
  todo: TTodo;
  onBeforeDeleteTodoCard: () => void;
}
const NOOP = () => {};

export function Menu({ todo, onBeforeDeleteTodoCard }: IMenuProps) {
  return (
    <div className={styles.menu} id={`menu-${todo.id}`}>
      <Dropdown
        button={
          <button className={styles.menuButton} title='Открыть меню'>
            <svg width='26' height='6' viewBox='0 0 26 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='3' cy='3' r='3' fill='#C4C4C4' />
              <circle cx='13' cy='3' r='3' fill='#C4C4C4' />
              <circle cx='23' cy='3' r='3' fill='#C4C4C4' />
            </svg>
          </button>
        }
      >
        <div className={styles.dropdown}>
          <MenuList todo={todo} onBeforeDeleteTodoCard={onBeforeDeleteTodoCard} />
        </div>
      </Dropdown>
    </div>
  );
}
