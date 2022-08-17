import React from 'react';

export interface IItem {
  id: string;
  content: string | React.ReactNode;
  onClick?: (event: React.BaseSyntheticEvent<object, any, any>) => void;
  className?: string;
  style?: React.CSSProperties;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}

interface IGenericListProps {
  list: IItem[];
}
const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'div', id, content, onClick = NOOP, className, style, href }) => (
        <As className={className} style={style} onClick={(event) => onClick(event)} key={id} href={href}>
          {content}
        </As>
      ))}
    </>
  );
}
