/* Executado antes da renderização para aplicar a preferência sem piscar o tema. */
(() => {
  document.documentElement.classList.add('js');
  let theme;
  try { theme = localStorage.getItem('solarmais_theme'); } catch { /* Armazenamento pode estar indisponível. */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
