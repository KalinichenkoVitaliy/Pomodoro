import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './selectList.css';
import { TRootState, TStatsState } from '../../../../../../types/types';

import { selectWeek } from '../../../../../../store/statsSlice';

import { generateID } from '../../../../../../utils/react/generateRandomIndex';
import { GenericList } from '../../../../../../shared/GenericList';
import { weekToPropis } from '../../../../../../utils/lib';

export function SelectList() {
  const dispatch = useDispatch();
  const { stats } = useSelector<TRootState, TStatsState>((state) => state.statsState);

  const isCurrentWeek = stats.selectedWeek === 'currentWeek';
  const isLastWeek = stats.selectedWeek === 'lastWeek';
  const isPenultWeek = stats.selectedWeek === 'penultWeek';
  const classCurrentWeek = classNames(styles.selectItem, styles.selectItemGroup, { [styles.selected]: isCurrentWeek });
  const classLastWeek = classNames(styles.selectItem, { [styles.selected]: isLastWeek });
  const classPenultWeek = classNames(styles.selectItem, { [styles.selected]: isPenultWeek });

  const LIST = [
    {
      As: 'li' as const,
      className: classCurrentWeek,
      content: (
        <div className={styles.selectItemGroup}>
          <span className={styles.selectItemText}>{weekToPropis('currentWeek')}</span>
          <div className={styles.selectItemIcon} />
        </div>
      ),
      onClick: () => {
        dispatch(selectWeek({ selectedWeek: 'currentWeek' }));
      },
    },
    {
      As: 'li' as const,
      className: styles.divider,
      content: '',
    },
    {
      As: 'li' as const,
      className: classLastWeek,
      content: weekToPropis('lastWeek'),
      onClick: () => {
        dispatch(selectWeek({ selectedWeek: 'lastWeek' }));
      },
    },
    {
      As: 'li' as const,
      className: styles.divider,
      content: '',
    },
    {
      As: 'li' as const,
      className: classPenultWeek,
      content: weekToPropis('penultWeek'),
      onClick: () => {
        dispatch(selectWeek({ selectedWeek: 'penultWeek' }));
      },
    },
  ].map(generateID);

  return (
    <ul className={styles.selectList}>
      <GenericList list={LIST} />
    </ul>
  );
}
