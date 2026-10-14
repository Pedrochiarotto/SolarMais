import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
const { SANITY_PROJECT_ID: projectId, SANITY_DATASET: dataset, SANITY_API_WRITE_TOKEN: token } = process.env;
if (!projectId || !dataset || !token) throw new Error('Configure Project ID, dataset e token de escrita em .env.');
const defaults = JSON.parse(await readFile(new URL('../src/content/defaults.json', import.meta.url)));
// Deliberately no demo projects: a connected portfolio starts empty.
const { logo, heroImage, ...content } = defaults;
const client = createClient({ projectId, dataset, token, apiVersion:'2025-02-19', useCdn:false });
// Does not overwrite an existing published document or its editorial draft.
const existing = await client.fetch('*[_id in ["siteSettings", "drafts.siteSettings"]][0]._id', {}, {perspective:'raw'});
if (existing) console.log('Configuração existente preservada. Nenhum conteúdo foi alterado.');
else {
  await client.createIfNotExists({ _id:'drafts.siteSettings', _type:'siteSettings', ...content });
  console.log('Rascunho inicial criado. Revise as informações, envie as imagens e publique no Studio.');
}
