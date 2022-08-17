import React from 'react';
import classNames from 'classnames';

import styles from './text.css';

type TFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TFontSize = { size: number; lineHeight?: string; weight?: TFontWeight };
export enum EColor {
  fullblack = '#000000',
  black = '#333333',
  red9F = '#9f210c',
  redB7 = '#b7280f',
  redDC = '#dc3e22',
  redEE = '#ee735d',
  redEA = '#ea8979',
  green5E = '#5eb443',
  greenA8 = '#a8b64f',
  green89 = '#899441',
  white = '#ffffff',
  grayF4 = '#f4f4f4',
  greyF3 = '#f3f3f3',
  greyEC = '#ececec',
  greyE5 = '#e5e5e5',
  greyD9 = '#d9d9d9',
  greyC4 = '#c4c4c4',
  grey99 = '#999999',
  grey66 = '#66666',
}
export enum EDecoration {
  inherit = 'inherit',
  lineThrough = 'line-through',
  none = 'none',
  overline = 'overline',
  underline = 'underline',
}
export enum ECursor {
  auto = 'auto',
  default = 'default',
  crosshair = 'crosshair',
  help = 'help',
  move = 'move',
  pointer = 'pointer',
  progress = 'progress',
  text = 'text',
  wait = 'wait',
  nResize = 'n-resize',
  neResize = 'ne-resize',
  eResize = 'e-resize',
  seResize = 'se-resize',
  sResize = 's-resize',
  swResize = 'sw-resize',
  wResize = 'w-resize',
  nwResize = 'nw-resize',
  inherit = 'inherit',
}

interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children?: React.ReactNode;
  font?: TFontSize;
  fontMobile?: TFontSize;
  fontTablet?: TFontSize;
  fontDesktop?: TFontSize;
  upperCase?: boolean;
  textDecoration?: EDecoration;
  cursor?: ECursor;
  color?: EColor;
  onClick?: () => void;
}
const NOOP = () => {};

export function Text({
  As = 'span',
  children,
  font,
  fontMobile,
  fontTablet,
  fontDesktop,
  upperCase = false,
  textDecoration,
  cursor,
  color,
  onClick = NOOP,
}: ITextProps) {
  const propFont = font
    ? {
        ['--fontWeight' as any]: font.weight,
        ['--fontSize' as any]: `${font.size}px`,
        ['--fontLineHeight' as any]: font.lineHeight ? font.lineHeight : '1',
      }
    : undefined;
  const propFontMobile = fontMobile
    ? {
        ['--fontMobileWeight' as any]: fontMobile.weight,
        ['--fontMobileSize' as any]: `${fontMobile.size}px`,
        ['--fontMobileLineHeight' as any]: fontMobile.lineHeight ? fontMobile.lineHeight : '1',
      }
    : undefined;
  const propFontTablet = fontTablet
    ? {
        ['--fontTabletWeight' as any]: fontTablet.weight,
        ['--fontTabletSize' as any]: `${fontTablet.size}px`,
        ['--fontTabletLineHeight' as any]: fontTablet.lineHeight ? fontTablet.lineHeight : '1',
      }
    : undefined;
  const propFontDesktop = fontDesktop
    ? {
        ['--fontDesktopWeight' as any]: fontDesktop.weight,
        ['--fontDesktopSize' as any]: `${fontDesktop.size}px`,
        ['--fontDesktopLineHeight' as any]: fontDesktop.lineHeight ? fontDesktop.lineHeight : '1',
      }
    : undefined;
  const propDecoration = textDecoration ? { ['--decoration' as any]: textDecoration } : undefined;
  const propCursor = cursor ? { ['--cursor' as any]: cursor } : undefined;
  const propColor = color ? { ['--color' as any]: color } : undefined;
  const customStyles: React.CSSProperties = {
    ...propFont,
    ...propFontMobile,
    ...propFontTablet,
    ...propFontDesktop,
    ...propDecoration,
    ...propCursor,
    ...propColor,
  };

  const classes = classNames(
    styles.text,
    { [styles[`font`]]: font },
    { [styles[`font_mobile`]]: fontMobile },
    { [styles[`font_tablet`]]: fontTablet },
    { [styles[`font_desktop`]]: fontDesktop },
    { [styles.upperCase]: upperCase },
    { [styles.textDecoration]: textDecoration },
    { [styles.cursor]: cursor },
    { [styles.color]: color }
  );

  return (
    <As className={classes} style={customStyles} onClick={onClick}>
      {children}
    </As>
  );
}
