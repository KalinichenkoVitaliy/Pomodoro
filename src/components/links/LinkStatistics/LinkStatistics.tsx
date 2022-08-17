import React from 'react';
import { Link } from 'react-router-dom';

import styles from './linkStatistics.css';

import { Break } from '../../../shared/Break';
import { EColor, Text } from '../../../shared/Text';

export function LinkStatistics() {
  return (
    <Link to={`/statistics`} className={styles.linkStatistics} title='Перейти на страницу статистики пользователя'>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z' fill='#DC3E22' />
      </svg>
      <Break step={5} />
      <Text font={{ size: 16, lineHeight: '19px' }} color={EColor.redDC}>
        Статистика
      </Text>
    </Link>
  );
}
