# Portfólio SolarMais

Registro da superfície `projetos.html`: arquivo público de obras, com galeria e ficha individual para conhecer imagens, contexto e dados confirmados de cada instalação. É uma extensão da identidade existente; `DESIGN.md` e `.impeccable/design.json` continuam sendo as referências globais, sem redefinição de tokens ou marca.

A página herda Manrope, logo oficial sobre preto, superfícies neutras, laranja funcional, temas claro e escuro, controles e navegação da landing page. A abertura compacta “Galeria de projetos” dá prioridade às fotografias em proporção 4:3. Cada cartão combina contagem de fotos sobre a imagem, título e ação “Ver galeria” em legenda compacta, categoria e localização. A galeria tem uma coluna no celular, duas a partir de 640px e três a partir de 1024px. Quando há um único resultado, mantém uma grade de duas colunas no desktop para conter a largura da imagem. Busca e filtros se alinham horizontalmente a partir de 1024px.

Filtros combinam Todos, Residencial, Comercial e Industrial com busca por nome ou cidade, indiferente a maiúsculas e acentos. A contagem anuncia resultados; o estado vazio permite limpar os critérios. Cada cartão abre `#projeto=<id>`, com descrição, atributos disponíveis e fotografias com legendas. Na ficha, as fotos aparecem em uma coluna até 768px; a partir desse tamanho, a primeira ocupa duas colunas e as demais seguem em pares. O retorno à galeria preserva os critérios; a ficha recebe foco ao abrir. Falhas de imagem mostram texto de alternativa.

Não há obras reais cadastradas. Enquanto `window.SOLARMAIS_PROJECTS` estiver vazio, há uma única prévia residencial, aviso explícito de imagem ilustrativa e legenda que nega sua representação como obra realizada. A primeira entrada real remove automaticamente essa prévia. Não converter o exemplo em prova comercial nem acrescentar métricas sem confirmação.

O conteúdo é mantido em `assets/js/projects-data.js`; o formato e as instruções estão em `README.md`, seção “Portfólio de obras”. IDs devem ser únicos e estáveis. Incluir apenas fotografias e dados autorizados; atributos ausentes são omitidos. A manutenção é por arquivo, sem painel administrativo.

Evidência deste registro: leitura de `projetos.html`, `assets/js/projects.js`, `assets/js/projects-data.js`, estilos de portfólio em `assets/css/input.css`, `README.md`, `PRODUCT.md` e `DESIGN.md`. As afirmações de comportamento refletem o código inspecionado; este registro não substitui validação visual ou testes de navegador.
