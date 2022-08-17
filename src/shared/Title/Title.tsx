import React from 'react';
import classNames from 'classnames';

import styles from './title.css';

export interface ITitle {
  As?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ As = 'h2', content, className = '', style = {} }: ITitle) {
  const classTitle = classNames(styles[As], className);

  return (
    <As className={classTitle} style={style}>
      {content}
    </As>
  );
}
