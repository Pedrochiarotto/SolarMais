import { createClient } from '@sanity/client';
import defaults from '../content/defaults.json';
import demoProjects from '../content/projects.json';
import { mergeContent, normalizeProjects, safeUrl } from './content-core.js';
const query = `{
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    ..., "logo": logo.asset->url, "heroImage": heroImage.asset->url
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt desc){
    "id": slug.current, title, category, city, description, power, completed, modules, simulated,
    "photos": photos[]{"src": asset->url, alt, caption}
  }
}`;
let pending;
export function getContent() {
  // One published snapshot per build; dev reloads on each request.
  if (import.meta.env.DEV) return loadContent();
  return pending ??= loadContent();
}
async function loadContent() {
  if (import.meta.env.USE_SANITY !== 'true') {
    return { ...defaults, projects: demoProjects };
  }

  const projectId = import.meta.env.SANITY_PROJECT_ID;
  const dataset = import.meta.env.SANITY_DATASET;
  if (!projectId && !dataset) return { ...defaults, projects: demoProjects };
  if (!projectId || !dataset) throw new Error('Configure SANITY_PROJECT_ID e SANITY_DATASET juntos.');
  const client = createClient({ projectId, dataset, apiVersion: '2025-02-19',
    useCdn: false, perspective: 'published', token: import.meta.env.SANITY_API_READ_TOKEN || undefined,
    timeout: 15000, maxRetries: 2,
  });
  // Do not silently publish demo content if a configured CMS fails.
  const result = await client.fetch(query);
  if (!result.site) throw new Error('Publique o documento Configurações do site (siteSettings) no Sanity antes de gerar o site.');
  const content = mergeContent(defaults, result.site);
  for (const key of ['logo', 'heroImage', 'instagram']) content[key] = safeUrl(content[key], defaults[key]);
  return { ...content, projects: normalizeProjects(result.projects) };
}
