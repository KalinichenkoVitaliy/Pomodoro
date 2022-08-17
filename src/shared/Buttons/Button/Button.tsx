import React from 'react';
import classNames from 'classnames';

import styles from './button.css';

type TAction = 'do' | 'delete' | 'break' | 'add';
type TType = 'button' | 'submit' | 'reset' | undefined;

interface IButton {
  action: TAction;
  type?: TType;
  active?: boolean;
  text?: string;
  title?: string;
  onClick?: () => void;
}
const NOOP = () => {};

export function Button({ action, type = 'button', active = true, text = '', title = '', onClick = NOOP }: IButton) {
  const classes = classNames(styles[`button-${action}`], styles[`${active ? 'active' : 'inactive'}`]);
  const textButton = action === 'add' ? '+' : text;

  return (
    <button className={classes} type={type} title={active ? title : ''} onClick={active ? onClick : NOOP}>
      {textButton}
    </button>
  );
}
