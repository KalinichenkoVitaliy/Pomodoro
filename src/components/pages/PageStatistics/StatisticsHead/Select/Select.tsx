import React from 'react';
import { useSelector } from 'react-redux';

import styles from './select.css';
import { TRootState, TWeek } from '../../../../../types/types';

import { weekToPropis } from '../../../../../utils/lib';

import { CalculateStats } from './CalculateStats';
import { Dropdown } from '../../../../../shared/Dropdown';
import { SelectList } from './SelectList';

export function Select() {
  const selectedWeek = useSelector<TRootState, TWeek>((state) => state.statsState.stats.selectedWeek);

  return (
    <>
      <CalculateStats />
      <div className={styles.select}>
        <Dropdown
          button={
            <button className={styles.selectButton} title='Выберите неделю'>
              <span className={styles.selectButtonText}>{weekToPropis(selectedWeek)}</span>
              <div className={styles.selectButtonIcon} />
            </button>
          }
        >
          <div className={styles.dropdown}>
            <SelectList />
          </div>
        </Dropdown>
      </div>
    </>
  );
}
