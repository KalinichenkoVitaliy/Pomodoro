import React from 'react';

import styles from './dropdown.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
const NOOP = () => {};

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const refDropdown = React.useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => (isDropdownOpen ? onOpen() : onClose()), [isDropdownOpen]);
  React.useEffect(() => {
    const handleClickOnAnotherElement = (event: MouseEvent) => {
      if (event.target instanceof Node && !refDropdown.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOnAnotherElement);
    return () => {
      document.removeEventListener('click', handleClickOnAnotherElement);
    };
  }, []);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className={styles.container} ref={refDropdown}>
      <div className={styles.containerButton} onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list} onClick={() => handleOpen()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
