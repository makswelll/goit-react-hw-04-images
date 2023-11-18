import { useEffect, useCallback } from 'react';
import { BackdropStyled, ModalStyled } from './Modal.styled';

export const MyModal = ({ onCloseModal, children }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <BackdropStyled onClick={handleOverlayClick}>
      <ModalStyled>{children}</ModalStyled>
    </BackdropStyled>
  );
};
