import React from 'react';
import classNames from 'classnames';

import styles from './icon.css';

export enum EIcons {
  pomodore = 'pomodore',
  buttonMenuDefault = 'button-menu-default',
  buttonMenuInc = 'button-menu-inc',
  buttonMenuDec = 'button-menu-dec',
  buttonMenuEdit = 'button-menu-edit',
  buttonMenuDelete = 'button-menu-delete',
}

interface IIconProps {
  name: EIcons;
  isActive?: boolean;
  size?: number;
  width?: number;
  height?: number;
}

export function Icon({ name, isActive = true, size = 0, width = size, height = width }: IIconProps) {
  let iconWidth, iconHeight;
  if (size > 0) iconWidth = iconHeight = size;
  else {
    iconWidth = width;
    iconHeight = height;
  }

  const active = name.includes('button-menu') ? (isActive ? '_active' : '_inactive') : '';
  const classes = classNames(styles.icon, styles[`icon-${name}${active}`]);

  return <div className={classes} style={{ width: iconWidth, height: iconHeight }} />;
}
