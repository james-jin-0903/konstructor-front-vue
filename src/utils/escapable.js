export const Escapable = {
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.escapableVisible) {
        this.escapeHandler();
      }
    };

    document.addEventListener('keydown', escapeHandler);

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler);
    });
  }
};
