import React from 'react';
import ReactDOM from 'react-dom';

import styles from './pageLogin.css';

import { Title } from '../../../shared/Title';
import { Break } from '../../../shared/Break';
import { FormLogin } from './FormLogin';

export function PageLogin() {
  const nodeModal = document.getElementById('modal_root');

  return nodeModal
    ? ReactDOM.createPortal(
        <div className={styles.modal}>
          <div className={styles.modalAlingYX}>
            <div className={styles.modalTop}>
              <div className={styles.modalImage} />
              <p className={styles.modalName}>pomodoro_box</p>
              <div className={styles.modalFormContainer}>
                <Title
                  As='h2'
                  content='Совсем чуть-чуть и можем начинать!'
                  style={{ fontSize: '24px', lineHeight: 1, color: 'white' }}
                />
                <Break step={25} top />
                <FormLogin />
              </div>
            </div>
            <p className={styles.modalCopyright}>Skillbox® | 2021</p>
          </div>
        </div>,
        nodeModal
      )
    : null;
}
