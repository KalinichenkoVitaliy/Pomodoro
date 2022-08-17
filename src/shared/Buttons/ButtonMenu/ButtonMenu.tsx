import React from 'react';

import styles from './buttonMenu.css';

import { EIcons, Icon } from '../../Icon';
import { Break } from '../../Break';
import { Text, EColor } from '../../Text';

interface IButtonMenuProps {
  isActive?: boolean;
  nameIcon: EIcons;
}

export function ButtonMenu({ isActive = true, nameIcon }: IButtonMenuProps) {
  let buttonText, titleText;
  switch (nameIcon) {
    case EIcons.buttonMenuInc:
      buttonText = 'Увеличить';
      titleText = 'Добавить к задаче ещё 1 помидорку';
      break;
    case EIcons.buttonMenuDec:
      buttonText = 'Уменьшить';
      titleText = isActive ? 'Изъять у задачи 1 помидорку' : '';
      break;
    case EIcons.buttonMenuEdit:
      buttonText = 'Редактировать';
      titleText = 'Редактировать название задачи';
      break;
    case EIcons.buttonMenuDelete:
      buttonText = 'Удалить';
      titleText = 'Удалить задачу';
      break;
    default:
      buttonText = 'Default';
      titleText = 'Default text';
      break;
  }

  return (
    <button className={styles.button} title={titleText} style={{ cursor: isActive ? 'pointer' : 'not-allowed' }}>
      <Icon name={nameIcon} isActive={isActive} size={18} />
      <Break step={8}></Break>
      <Text font={{ size: 16 }} color={isActive ? EColor.grey99 : EColor.greyC4}>
        {buttonText}
      </Text>
    </button>
  );
}
