import React from 'react';
import { useSelector } from 'react-redux';

import styles from './pageNotFound.css';
import { TRootState, TUser } from '../../../types/types';
import { Title } from '../../../shared/Title';

export function PageNotFound() {
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);

  const isUser = name && email;

  return isUser ? (
    <div className={styles.pageNotFound}>
      <Title As='h2' content='Ошибка 404 — страница не найдена' />
    </div>
  ) : null;
}
