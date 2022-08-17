import React from 'react';
import { useSelector } from 'react-redux';

import styles from './header.css';
import { TRootState, TUsersState } from '../../types/types';

import { LinkLogo } from '../links/LinkLogo';
import { LinkLogin } from '../links/LinkLogin';
import { LinkLogout } from '../links/LinkLogout';
import { LinkSettings } from '../links/LinkSettings';
import { LinkStatistics } from '../links/LinkStatistics';

export function Header() {
  const { currentUser } = useSelector<TRootState, TUsersState>((state) => state.usersState);
  const isUser = currentUser.name && currentUser.email ? true : false;

  return (
    <header className={styles.header}>
      <LinkLogo />
      <div className={styles.headerNavlinks}>
        {isUser ? (
          <>
            <LinkStatistics />
            <LinkSettings />
            <LinkLogout />
          </>
        ) : (
          <LinkLogin />
        )}
      </div>
    </header>
  );
}
