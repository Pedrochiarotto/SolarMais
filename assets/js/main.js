/* Configuração: informar o endpoint real antes de publicar a captação de leads. */
const SITE_CONFIG = Object.freeze({ leadEndpoint: '' });

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const updateLabel = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    toggle.setAttribute('aria-pressed', String(isDark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0f1b17' : '#f7faf7');
  };
  toggle.hidden = false;
  updateLabel();
  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('solarmais_theme', theme); } catch { /* O tema continua funcional sem persistência. */ }
    updateLabel();
  });
}

function initNavigation() {
  const button = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const mobile = window.matchMedia('(max-width: 860px)');
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  button.hidden = false;
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    setOpen(false);
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
}

function initLeadForm() {
  const form = document.getElementById('leadForm');
  const phone = document.getElementById('telefone');
  const message = document.getElementById('formMsg');
  const submit = form.querySelector('[type="submit"]');
  const showMessage = (text, state) => {
    message.hidden = false;
    message.dataset.state = state;
    message.textContent = text;
  };
  // Sem JavaScript, não deixa o navegador enviar dados pessoais pela URL.
  form.noValidate = true;
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    const split = digits.length > 10 ? 7 : 6;
    phone.value = digits.length <= 2 ? digits : `(${digits.slice(0, 2)}) ${digits.slice(2, split)}${digits.length > split ? '-' + digits.slice(split) : ''}`;
    phone.setCustomValidity('');
  });
  form.addEventListener('input', (event) => {
    event.target.setCustomValidity?.('');
    message.hidden = true;
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    for (const name of ['nome', 'email', 'cidade']) {
      form.elements[name].value = form.elements[name].value.trim();
    }
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(/^[1-9]\d{9,10}$/.test(digits) ? '' : 'Informe um telefone com DDD e 10 ou 11 dígitos.');
    if (!form.reportValidity()) return;
    if (!SITE_CONFIG.leadEndpoint) {
      showMessage('O envio de solicitações está temporariamente indisponível. Seus dados não foram enviados. Tente novamente mais tarde.', 'error');
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.telefone = digits;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showMessage('Enviando sua solicitação…', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(SITE_CONFIG.leadEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data), signal: controller.signal,
      });
      if (!response.ok) throw new Error('Falha no envio');
      showMessage('Solicitação enviada! Um especialista da Solarmais entrará em contato.', 'success');
      form.reset();
    } catch {
      showMessage('Não foi possível enviar sua solicitação. Seus dados foram mantidos para você tentar novamente.', 'error');
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
  submit.disabled = false;
}

initTheme();
initNavigation();
initLeadForm();
document.getElementById('currentYear').textContent = new Date().getFullYear();
