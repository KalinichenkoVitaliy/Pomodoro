import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './headerContainer.css';
import { TRootState } from '../../types/types';

interface IHeaderContainerProps {
  children?: React.ReactNode;
}

export function HeaderContainer({ children }: IHeaderContainerProps) {
  const isDarkTheme = useSelector<TRootState, boolean>((state) => state.usersState.currentSettings.isDarkTheme);

  const nameTheme = isDarkTheme ? 'dark' : 'light';
  const classes = classNames(styles.headerContainer, styles[`headerContainer_${nameTheme}`]);

  return <div className={classes}>{children}</div>;
}
