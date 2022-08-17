import React from 'react';
import { Link } from 'react-router-dom';

import styles from './linkLogin.css';

import { Break } from '../../../shared/Break';
import { EColor, Text } from '../../../shared/Text';

export function LinkLogin() {
  return (
    <Link to={`/login`} className={styles.linkLogin} title='Войти в приложение'>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M8 12L13 7L14.41 8.41L11.83 11H22V13H11.83L14.41 15.58L13 17L8 12ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z'
          fill='#DC3E22'
        />
      </svg>
      <Break step={5} />
      <Text font={{ size: 16, lineHeight: '17px' }} color={EColor.redDC}>
        Войти
      </Text>
    </Link>
  );
}
