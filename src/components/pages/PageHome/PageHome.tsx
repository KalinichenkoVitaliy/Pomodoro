import React from 'react';
import { useSelector } from 'react-redux';

import styles from './pageHome.css';
import { TRootState, TUser } from '../../../types/types';

import { PageHomeLeft } from './PageHomeLeft';
import { PageHomeRight } from './PageHomeRight';
import { Modal, ETypeModal } from '../../../shared/Modal';

export function PageHome() {
  const { name, email } = useSelector<TRootState, TUser>((state) => state.usersState.currentUser);
  const modalIsOpen = useSelector<TRootState, boolean>((state) => state.eventsState.events.modalIsOpen);

  const isUser = name && email;

  return isUser ? (
    <>
      <div className={styles.pageHome}>
        <div className={styles.pageHomeLeft}>
          <PageHomeLeft />
        </div>
        <div className={styles.pageHomeRight}>
          <PageHomeRight />
        </div>
      </div>
      {modalIsOpen && <Modal typeModal={ETypeModal.onDeleteTodo} />}
    </>
  ) : null;
}
