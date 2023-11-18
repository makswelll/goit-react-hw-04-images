import { useEffect } from 'react';
import { BackdropStyled, ModalStyled } from './Modal.styled';

export const MyModal = ({ onCloseModal, children }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

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
  }, [onCloseModal, handleKeyDown]);

  return (
    <BackdropStyled onClick={handleOverlayClick}>
      <ModalStyled>{children}</ModalStyled>
    </BackdropStyled>
  );
};
