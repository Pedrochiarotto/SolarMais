import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
if (!projectId || !dataset) throw new Error('Preencha studio/.env com SANITY_STUDIO_PROJECT_ID e SANITY_STUDIO_DATASET.');
export default defineConfig({
  name: 'solarmais', title: 'SolarMais — Conteúdo', projectId, dataset,
  plugins: [structureTool({ structure: S => S.list().title('Conteúdo').items([
    S.listItem().title('Configurações e páginas').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.documentTypeListItem('project').title('Projetos do portfólio'),
  ]) })],
  schema: { types: schemaTypes, templates: templates => templates.filter(t => t.schemaType !== 'siteSettings') },
  document: { actions: (actions, context) => context.schemaType === 'siteSettings'
    ? actions.filter(action => !['delete', 'duplicate', 'unpublish'].includes(action.action || '')) : actions },
});
