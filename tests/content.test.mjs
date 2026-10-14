import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeContent, normalizeProjects, safeUrl, serializeJson } from '../src/lib/content-core.js';
test('Conteúdo parcial preserva campos locais; listas vazias removem conteúdo', () => {
  assert.deepEqual(mergeContent({hero:{title:'Original',subtitle:'Texto'},faqs:[{question:'FAQ'}]},
    {hero:{title:'Novo'},faqs:[]}), {hero:{title:'Novo',subtitle:'Texto'},faqs:[]});
});
test('URLs editoriais rejeitam protocolos executáveis e caminhos externos', () => {
  for (const url of ['javascript:alert(1)', '//evil.test', '/\\evil.test', 'data:text/html,x']) assert.equal(safeUrl(url), '');
  assert.equal(safeUrl('/assets/image.jpg'), '/assets/image.jpg');
  assert.equal(safeUrl('https://cdn.sanity.io/image.jpg'), 'https://cdn.sanity.io/image.jpg');
});
test('Galeria vazia permanece vazia; documentos sem identificador não geram links quebrados', () => {
  assert.deepEqual(normalizeProjects([]), []);
  assert.deepEqual(normalizeProjects([{title:'Sem slug'}]), []);
  const [project] = normalizeProjects([{id:'obra',title:'Obra',photos:[{src:'javascript:alert(1)'},{src:'https://cdn.sanity.io/photo.jpg',alt:'Telhado'}]}]);
  assert.equal(project.photos.length, 1);
  assert.equal(project.simulated, false);
});

test('Texto do CMS não encerra o elemento JSON nem executa HTML', () => {
  const data = { title: '</script><script>alert(1)</script>' };
  const serialized = serializeJson(data);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), data);
});
