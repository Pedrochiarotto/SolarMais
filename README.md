# SolarMais — Astro + Sanity

Landing page pública, sem login para visitantes, com painel Sanity separado para edição pelo proprietário. Preserva o visual em HTML/Tailwind e a galeria com busca, filtros e detalhes.

## Executar o site

Requer Node.js 22.12+ (recomendado Node 24).

```sh
npm install
cp .env.example .env
npm run dev
```

Abra o endereço informado pelo Astro, normalmente http://localhost:4321. Por padrão, o site utiliza os textos e projetos demonstrativos locais, mesmo que existam credenciais do Sanity no `.env`. As simulações continuam identificadas como tais.

### Windows: `tailwindcss` não é reconhecido

Não compartilhe a mesma pasta `node_modules` entre WSL/Linux e PowerShell. Os executáveis instalados em cada sistema são diferentes. Se o terminal informar que `tailwindcss` ou `astro` não é reconhecido, abra o PowerShell na raiz do projeto e recrie apenas as dependências geradas:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force studio\node_modules -ErrorAction SilentlyContinue
npm install
npm --prefix studio install
npm run dev
```

O comando `npm install -g npm@12.2.0` atualiza o próprio npm globalmente; ele não instala as dependências locais deste projeto. Depois da reinstalação acima, mantenha o desenvolvimento deste diretório no mesmo ambiente. Se escolher PowerShell, execute também os próximos `npm install` pelo PowerShell.

```sh
npm test
npm run build
npm run preview
```

O resultado publicável fica em `dist/`. `npm run build` compila o Tailwind, copia os assets e gera as páginas estáticas. Para alterações de CSS/classes durante desenvolvimento, execute `npm run css && npm run assets` novamente. Alterações nas páginas Astro têm atualização automática.

## Conectar sua conta Sanity

1. Crie um projeto em https://www.sanity.io/manage e um dataset chamado `production`. Para conteúdo institucional público, pode usar dataset público. Isso não libera escrita sem autenticação.
2. Preencha `.env` na raiz:

   ```dotenv
   USE_SANITY=true
   SANITY_PROJECT_ID=seu_project_id
   SANITY_DATASET=production
   ```

3. Prepare o painel:

   ```sh
   npm --prefix studio install
   cp studio/.env.example studio/.env
   ```

   Em `studio/.env`, preencha `SANITY_STUDIO_PROJECT_ID` com o mesmo ID e `SANITY_STUDIO_DATASET=production`.

4. Em API → CORS origins do projeto Sanity, autorize `http://localhost:3333` com credenciais para o painel. Depois autorize também a origem HTTPS do painel publicado. Não use origem curinga.
5. Execute `npm run studio:dev`, abra http://localhost:3333 e entre na sua conta Sanity.
6. Em **Configurações e páginas**, revise os textos pré-preenchidos, envie logo/imagem principal e clique em **Publish**. Adicione obras em **Projetos do portfólio**, gere o identificador e publique cada uma. Só use obras e fotos autorizadas.
7. Execute `npm run build` e confira com `npm run preview`.

O painel permite editar os textos das seções, campos do formulário, títulos para buscadores, imagens, rodapé e contatos. As perguntas frequentes podem ser adicionadas, removidas e reordenadas. Os projetos têm categoria, localização, informações técnicas, ordem e várias fotos com texto alternativo e legenda. Navegação, desenho, ícones e estrutura das seções ficam no código.

Os textos de cada seção usam campos numerados com uma descrição do texto original para facilitar a localização. Campos ausentes em documentos antigos usam os textos locais; listas explicitamente vazias permanecem vazias. Um portfólio conectado sem projetos publicados não exibe simulações.

O documento único de configurações usa o ID `siteSettings`. O Studio abre diretamente esse documento e não oferece duplicação/exclusão pela interface. Isso não limita as permissões reais de Administrador na API.

### Inicialização opcional por script

O Studio já preenche um documento novo com os textos locais. Como alternativa, crie temporariamente um token com escrita e configure `SANITY_API_WRITE_TOKEN` no `.env` da raiz, depois execute:

```sh
npm run studio:seed
```

O comando cria **apenas um rascunho**, preserva documentos existentes e não importa obras demonstrativas. Revise e publique pelo Studio. Remova/revogue esse token ao terminar. Nunca coloque tokens em variáveis `PUBLIC_` ou `SANITY_STUDIO_`, nos arquivos versionados ou no navegador.

## Publicar site e painel

- **Site (exemplo: Cloudflare Pages):** comando `npm run build`, saída `dist`, Node 24. Configure `SANITY_PROJECT_ID` e `SANITY_DATASET` nas variáveis do ambiente de build.
- **Painel:** `npm run studio:build` valida a compilação. Para publicar no serviço do Sanity, execute `npm --prefix studio run deploy` após login/configuração. Essa publicação não é executada automaticamente pelo projeto.
- **Permissões:** convide seu cliente no Sanity. O plano gratuito permite Administrador/Visualizador; Editor depende do plano contratado.
- **Dataset privado:** configure `SANITY_API_READ_TOKEN` somente no ambiente de build do site, com acesso de leitura. Dataset público dispensa token de leitura.

### Publicação automática do conteúdo

As páginas são geradas no build. Clicar em Publish no Sanity atualiza o CMS; o site muda após uma nova geração e implantação bem-sucedida.

Para automatizar com Cloudflare Pages:

1. Em Settings → Builds → Add deploy hook, crie um hook para a branch de produção.
2. Em Sanity Manage → API → Webhooks, crie um webhook POST para a URL desse hook, no dataset correto, com eventos create/update/delete.
3. Use o filtro GROQ abaixo e mantenha eventos de rascunhos desativados:

   ```groq
   _type in ["siteSettings", "project"] && !(_id in path("drafts.**")) && !(_id in path("versions.**"))
   ```

4. Publique uma alteração e confirme o novo deploy. Confira também exclusão/despublicação de projetos.

A URL do deploy hook é secreta: mantenha-a fora do código e do Studio. Cada disparo consome uma geração na hospedagem. Mudanças rápidas em sequência podem gerar múltiplos builds.

O site consulta somente a perspectiva `published`, sem cache CDN durante o build. Falhas de API, configuração parcial ou ausência de configurações publicadas interrompem o build; não há substituição silenciosa por uma versão demonstrativa. A hospedagem deve conservar o último deploy bem-sucedido.

## Formulário de contato

Configure `PUBLIC_LEAD_ENDPOINT` no `.env` e no ambiente de build. É um endereço público relativo ou HTTPS, não uma credencial. O serviço receptor precisa aceitar POST JSON com `nome`, `email`, `telefone` (dígitos), `cidade` e `conta`, validar os dados no servidor e retornar 2xx somente após aceitar o contato. Serviços externos precisam permitir CORS.

O endpoint de captação não é implementado pelo CMS. Não armazene contatos de visitantes em um dataset público. Sem endpoint, o formulário informa indisponibilidade; em falha mantém os campos, e em sucesso limpa o formulário. A espera é limitada a 15 segundos. Sem JavaScript, o envio permanece desabilitado.

## Estrutura

- `src/pages/index.astro` e `src/pages/projetos.astro`: páginas editáveis e layout existente.
- `src/components/`: estrutura compartilhada, cabeçalho e rodapé.
- `src/lib/content.js`: consulta ao Sanity no servidor/build, sem tokens no navegador.
- `src/content/`: textos e projetos demonstrativos locais.
- `studio/`: configuração, modelos de conteúdo e dependências independentes do painel.
- `assets/`: imagens, fonte Manrope, CSS e scripts originais. `public/assets/` é gerado; não editar.
- `scripts/`: preparação dos assets e inicialização opcional de conteúdo.
- `index.html`, `projetos.html` e `assets/js/projects-data.js`: referências da versão estática anterior; não são a fonte das páginas Astro. Faça novas alterações em `src/` ou no CMS.

O endereço `/index.html` continua servindo a página inicial. `/projetos.html` redireciona para `/projetos/`, preservando o identificador da obra no navegador com JavaScript. IDs de obras devem ser estáveis para preservar os links `#projeto=identificador`.

## Verificação

`npm test` cobre mesclagem de conteúdo, listas vazias e validação de URLs. `npm run build` valida a geração das páginas. A compilação do Studio requer Project ID/dataset configurados.

Confira também em celular e desktop: menu e Escape, alternância de tema, dúvidas, contatos, busca/filtros/galeria e formulário nos estados indisponível/sucesso/falha. A validação completa de publicação depende de um projeto Sanity real e de uma hospedagem conectada.

Referências: [Astro + Sanity](https://docs.astro.build/en/guides/cms/sanity/), [modelos do Studio](https://www.sanity.io/docs/studio/schema-types), [deploy hooks do Cloudflare](https://developers.cloudflare.com/pages/configuration/deploy-hooks/).
