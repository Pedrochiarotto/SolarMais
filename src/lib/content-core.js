/** Missing object fields retain defaults; arrays (including empty arrays) replace defaults. */
export function mergeContent(defaults, value) {
  if (value === null || value === undefined) return defaults;
  if (Array.isArray(defaults)) return Array.isArray(value) ? value : defaults;
  if (defaults && typeof defaults === 'object') {
    return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) =>
      [key, mergeContent(fallback, value[key])]));
  }
  return typeof value === typeof defaults ? value : defaults;
}
export function safeUrl(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : fallback; }
  catch { return fallback; }
}
export function normalizeProjects(projects) {
  if (!Array.isArray(projects)) throw new Error('Lista de projetos inválida no CMS.');
  return projects.filter(p => p && p.id && p.title).map(p => ({
    id: String(p.id), title: String(p.title), category: p.category || 'Residencial',
    city: p.city || '', description: p.description || '', power: p.power || '',
    completed: p.completed || '', modules: p.modules || '', simulated: p.simulated === true,
    photos: (p.photos || []).map(photo => ({
      src: safeUrl(photo.src), alt: photo.alt || '', caption: photo.caption || '',
    })).filter(photo => photo.src),
  }));
}
/** Safe inside a non-executable application/json script element. */
export function serializeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
