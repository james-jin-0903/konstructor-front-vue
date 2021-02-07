export default function() {
  const bg = document.querySelector('.backgroundModals');
  const closes = document.querySelectorAll('.modal__close');
  if (bg) {
    bg.addEventListener('click', () => {
      const modal = document.querySelector('.modal.modal_zoomIn');
      closeModal(modal);
    });
  }

  if (closes) {
    closes.forEach(el => {
      el.addEventListener('click', function() {
        closeModal(this.parentElement);
      });
    });
  }
}

export function closeModal(modal) {
  const bg = document.querySelector('.backgroundModals');
  bg.classList.add('backgroundModals_zoomOut');
  modal.classList.add('modal_zoomOut');
  bg.classList.remove('backgroundModals_zoomIn');
  modal.classList.remove('modal_zoomIn');
  setTimeout(() => {
    bg.classList.remove('backgroundModals_zoomOut');
    modal.classList.remove('modal_zoomOut');
  }, 300);
}

export function openModal(modal) {
  const bg = document.querySelector('.backgroundModals');
  bg.classList.add('backgroundModals_zoomIn');
  modal.classList.add('modal_zoomIn')
}
