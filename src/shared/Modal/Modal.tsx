import React from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.css';

import { DialogOnDeleteTodo } from './DialogOnDeleteTodo';

export enum ETypeModal {
  onDeleteTodo = 'onDeleteTodo',
}
interface IDoModalProps {
  typeModal: ETypeModal;
}

export function Modal({ typeModal }: IDoModalProps) {
  const nodeModal = document.getElementById('modal_root');

  if (!nodeModal) return null;
  else
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modalAlingYX}>{typeModal === 'onDeleteTodo' && <DialogOnDeleteTodo />}</div>
      </div>,
      nodeModal
    );
}
