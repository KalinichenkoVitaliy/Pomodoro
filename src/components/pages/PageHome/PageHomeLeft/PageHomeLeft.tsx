import React from 'react';

import styles from './pageHomeLeft.css';

import { Title } from '../../../../shared/Title';
import { Break } from '../../../../shared/Break';
import { FormTodoNew } from './FormTodoNew';
import { TodoList } from './TodoList';

export function PageHomeLeft() {
  return (
    <>
      <Title As='h2' content='Ура! Теперь можно начать работать:' />
      <Break step={10} top />
      <ul className={styles.pageHomeLeftList}>
        <li>
          <span>Выберите категорию и напишите название текущей задачи</span>
        </li>
        <li>
          <span>Запустите таймер («помидор»);</span>
        </li>
        <li>
          <span>Работайте пока «помидор» не прозвонит;</span>
        </li>
        <li>
          <span>Сделайте короткий перерыв (3-5 минут);</span>
        </li>
        <li>
          <span>
            Продолжайте работать «помидор» за «помидором», пока задача не будет выполнена. Каждые 4 «помидора» делайте
            длинный перерыв (15-30 минут).
          </span>
        </li>
      </ul>
      <FormTodoNew />
      <Break step={25} top />
      <TodoList />
    </>
  );
}
