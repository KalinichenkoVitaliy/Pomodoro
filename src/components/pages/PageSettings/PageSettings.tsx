import React from 'react';
import { useSelector } from 'react-redux';

import styles from './pageSettings.css';
import { TRootState, TUser } from '../../../types/types';

import { Title } from '../../../shared/Title';
import { FormSettings } from './FormSettings';
import { Break } from '../../../shared/Break';

export function PageSettings() {
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);

  const isUser = name && email;

  return isUser ? (
    <div className={styles.pageSettings}>
      <Title As='h2' content='Настройки' />
      <Break step={30} top />
      <div className={styles.pageSettingsFormContainer}>
        <FormSettings />
      </div>
    </div>
  ) : null;
}
