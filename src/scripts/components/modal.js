export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
  }
  
  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleOverlayClose);
  }
  
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closeModal(openedPopup);
    }
  }
  
  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeModal(e.target);
    }
  }
  