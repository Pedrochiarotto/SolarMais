(() => {
  const basePath = (document.body.dataset.basePath || '/').replace(/\/$/, '');
  const withBase = value => `${basePath}${value.startsWith('/') ? value : `/${value}`}`;
  const data = document.getElementById('project-data');
  const published = data ? JSON.parse(data.textContent) : (window.SOLARMAIS_PROJECTS || []);
  const preview = !data && published.length === 0;
  const projects = preview ? [{
    id: 'previa-residencial', title: 'Instalação residencial — exemplo', category: 'Residencial',
    description: 'Exemplo de apresentação. Aqui entram a história da obra, as necessidades do cliente e a solução instalada. Substitua este conteúdo por informações de um projeto real antes de publicá-lo como obra realizada.',
    photos: [{ src: withBase('/assets/images/solar-rooftop-hero.jpg'), alt: 'Imagem ilustrativa de painéis solares em telhado residencial' }],
  }] : published;
  const hasSimulations = projects.some(project => project.simulated);
  const grid = document.getElementById('project-grid');
  const detail = document.getElementById('project-detail');
  const search = document.getElementById('project-search');
  const filters = [...document.querySelectorAll('[data-category]')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let category = 'Todos';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function photo(source) {
    const img = element('img');
    img.className = 'is-loading';
    img.src = source.src;
    img.alt = source.alt || 'Fotografia do projeto';
    img.loading = 'lazy'; img.decoding = 'async';
    const reveal = () => img.classList.remove('is-loading');
    if (img.complete) requestAnimationFrame(reveal);
    else img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', () => img.replaceWith(element('p', 'Imagem indisponível', 'portfolio-photo-fallback')));
    return img;
  }
  function transitionGrid(renderGrid) {
    if (prefersReducedMotion || !document.startViewTransition) return renderGrid();
    document.startViewTransition(renderGrid);
  }
  function render() {
    const query = normalize(search.value.trim());
    const visible = projects.filter(p => (category === 'Todos' || p.category === category) && normalize(`${p.title} ${p.city || ''}`).includes(query));
    grid.replaceChildren();
    visible.forEach((p, index) => {
      const card = element('a', null, 'portfolio-card');
      card.href = `#projeto=${encodeURIComponent(p.id)}`;
      card.style.setProperty('--card-index', index);
      const media = element('div', null, 'portfolio-card-photo');
      media.append(p.photos?.length ? photo(p.photos[0]) : element('p', 'Fotografias em breve', 'portfolio-photo-fallback'));
      const meta = element('div', null, 'portfolio-card-meta');
      meta.append(element('span', preview ? 'Prévia ilustrativa' : p.simulated ? `Simulação · ${p.category}` : p.category), element('span', p.city || ''));
      const count = p.photos?.length || 0;
      if (count) media.append(element('span', `${count} ${count === 1 ? 'foto' : 'fotos'}`, 'gallery-photo-count'));
      const caption = element('div', null, 'gallery-caption');
      caption.append(element('h2', p.title), element('span', 'Ver galeria →', 'portfolio-card-action'));
      card.append(media, caption, meta);
      grid.append(card);
    });
    document.getElementById('project-count').textContent = preview ? `${visible.length} exemplo ilustrativo` : `${visible.length} ${visible.length === 1 ? 'projeto' : 'projetos'}`;
    grid.classList.toggle('portfolio-grid-single', visible.length === 1);
    document.getElementById('project-empty').hidden = visible.length !== 0;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.category === category)));
  }
  function route() {
    let id;
    try { id = decodeURIComponent(location.hash.replace(/^#projeto=/, '')); } catch { id = ''; }
    const selected = location.hash.startsWith('#projeto=') && projects.find(p => p.id === id);
    detail.hidden = !selected;
    grid.hidden = !!selected;
    document.getElementById('portfolio-controls').hidden = !!selected;
    document.getElementById('project-count').hidden = !!selected;
    if (!selected) { render(); return; }
    document.getElementById('project-empty').hidden = true;
    document.getElementById('detail-title').textContent = selected.title;
    document.getElementById('detail-description').textContent = selected.description || '';
    const facts = document.getElementById('detail-facts'); facts.replaceChildren();
    [['Categoria', selected.category], ['Localização', selected.city], ['Potência instalada', selected.power], ['Conclusão', selected.completed], ['Módulos', selected.modules]].forEach(([label, value]) => {
      if (!value) return;
      const group = element('div'); group.append(element('dt', label), element('dd', String(value))); facts.append(group);
    });
    const photos = document.getElementById('detail-photos'); photos.replaceChildren();
    (selected.photos || []).forEach((source, index) => {
      const figure = element('figure', null, 'portfolio-detail-photo');
      figure.style.setProperty('--photo-index', index);
      figure.append(photo(source));
      const caption = selected.simulated ? `${source.caption || ''} Imagem gerada para simulação; não representa uma obra realizada.`.trim() : preview ? 'Imagem ilustrativa — não representa uma obra realizada.' : source.caption;
      if (caption) figure.append(element('figcaption', caption));
      photos.append(figure);
    });
    detail.focus({ preventScroll: true });
    detail.scrollIntoView({ block: 'start' });
  }
  const notice = document.getElementById('portfolio-preview');
  notice.hidden = !preview && !hasSimulations;
  if (hasSimulations) notice.textContent = 'Galeria demonstrativa · Os projetos, dados e imagens abaixo são simulações criadas para visualizar o portfólio e não representam obras realizadas pela SolarMais.';
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.category; transitionGrid(render); }));
  search.addEventListener('input', () => transitionGrid(render));
  document.getElementById('reset-projects').addEventListener('click', () => { category = 'Todos'; search.value = ''; transitionGrid(render); search.focus(); });
  window.addEventListener('hashchange', route);
  route();
})();
