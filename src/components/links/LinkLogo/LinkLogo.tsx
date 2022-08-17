import React from 'react';
import { Link } from 'react-router-dom';

import styles from './linkLogo.css';

import { EIcons, Icon } from '../../../shared/Icon';
import { Break } from '../../../shared/Break';
import { EColor, Text } from '../../../shared/Text';

export function LinkLogo() {
  return (
    <Link to={`/`} className={styles.linkLogo} title='Перейти на домашнюю страницу'>
      <Icon name={EIcons.pomodore} size={40} />
      <Break step={12} />
      <Text font={{ size: 24, weight: 300 }} color={EColor.redDC}>
        pomodoro_box
      </Text>
    </Link>
  );
}
