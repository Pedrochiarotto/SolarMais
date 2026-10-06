# SolarMais

Landing page em português para apresentação e captação de contatos da SolarMais. O projeto usa HTML, JavaScript e Tailwind CSS 4 com CSS compilado para produção.

## Estrutura

- `index.html`: conteúdo semântico, navegação e seções da landing page.
- `assets/css/input.css`: fonte dos tokens, componentes e extensões do Tailwind.
- `assets/css/styles.css`: CSS compilado e minificado; não edite diretamente.
- `assets/js/theme.js`: aplicação inicial da preferência de tema.
- `assets/js/main.js`: menu móvel, alternância de tema e formulário de contato.
- `assets/fonts/`: fonte Manrope hospedada localmente.
- `assets/images/`: imagens usadas pela página.

Fluxo: apresentação → benefícios → soluções → como funciona → depoimentos → dúvidas frequentes → solicitação de simulação → rodapé.

## Executar

Instale as dependências uma vez:

```sh
npm install
```

Durante alterações visuais, mantenha o compilador do Tailwind ativo:

```sh
npm run dev
```

Para gerar o CSS minificado de produção:

```sh
npm run build
```

Depois, abra `index.html` no navegador ou execute na raiz:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:4173`.

## Integrar o formulário

Configure `SITE_CONFIG.leadEndpoint` em `assets/js/main.js` com a URL real do serviço de captação. O formulário envia um POST JSON com `nome`, `email`, `telefone` (apenas dígitos), `cidade` e `conta` (faixa selecionada).

O serviço deve validar os dados no servidor e retornar status HTTP 2xx apenas após aceitar a solicitação. Prefira um endpoint na mesma origem; serviços externos precisam permitir CORS. O navegador cancela a espera após 15 segundos. Não coloque credenciais privadas no JavaScript.

Sem endpoint configurado, o formulário informa que o envio está indisponível e mantém os campos preenchidos. Em falha HTTP ou de rede, também preserva os dados; só limpa o formulário após sucesso. Sem JavaScript, a navegação e as dúvidas continuam disponíveis, e o botão de envio permanece desabilitado.

## Conteúdo

A imagem do hero foi gerada para uso editorial e está identificada na página como ilustrativa. Ela não representa uma instalação realizada pela SolarMais. Os depoimentos anteriores foram removidos porque sua autenticidade e autorização não estavam confirmadas.

## Verificação manual

- Conferir o layout em celular, tablet e desktop e nos dois temas.
- Abrir o menu móvel, navegar por uma seção e fechá-lo com Escape.
- Navegar por teclado e abrir as perguntas frequentes.
- Validar campos obrigatórios, e-mail e telefone com DDD.
- Conferir estados de envio indisponível, sucesso e falha ao integrar a API.
