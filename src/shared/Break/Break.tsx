import React from 'react';
import classNames from 'classnames';

import styles from './break.css';

interface IBreakProps {
  inline?: boolean;
  top?: boolean;
  step?: number;
  stepMobile?: number;
  stepTablet?: number;
  stepDesktop?: number;
}

export function Break({ inline = false, top = false, step, stepMobile, stepTablet, stepDesktop }: IBreakProps) {
  const propStep = step ? { ['--step' as any]: `${step}px` } : undefined;
  const propStepMobile = stepMobile ? { ['--stepMobile' as any]: `${stepMobile}px` } : undefined;
  const propStepTablet = stepTablet ? { ['--stepTablet' as any]: `${stepTablet}px` } : undefined;
  const propStepDesktop = stepDesktop ? { ['--stepDesktop' as any]: `${stepDesktop}px` } : undefined;
  const customStyles: React.CSSProperties = { ...propStep, ...propStepMobile, ...propStepTablet, ...propStepDesktop };

  const classes = classNames(
    { [styles.inline]: inline },
    { [styles.top]: top },
    { [styles[`step`]]: step },
    { [styles[`step_mobile`]]: stepMobile },
    { [styles[`step_tablet`]]: stepTablet },
    { [styles[`step_desktop`]]: stepDesktop }
  );

  return <div className={classes} style={customStyles} />;
}
