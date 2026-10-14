---
name: SolarMais
description: Identidade solar direta e confiável, construída com preto estrutural, laranja funcional e superfícies claras.
colors:
  canvas: "#f6f5f2"
  surface: "#ffffff"
  surface-raised: "#ecebe7"
  ink: "#11110f"
  ink-muted: "#5d5e59"
  line: "#d9d8d2"
  brand-orange: "#ff7417"
  brand-orange-strong: "#b94706"
  brand-orange-ink: "#1f0d02"
  brand-black: "#000000"
  brand-black-soft: "#171715"
  on-brand-black: "#f7f6f2"
  on-brand-black-muted: "#c9c9c3"
  success: "#137a3f"
  danger: "#b93826"
  dark-canvas: "#0b0b0a"
  dark-surface: "#151513"
  dark-surface-raised: "#1d1d1a"
  dark-ink: "#f5f4ef"
  dark-ink-muted: "#b8b8b1"
  dark-line: "#34342f"
  dark-brand-orange-strong: "#ff9c5c"
  dark-success: "#67d38c"
  dark-danger: "#ff9687"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "80px"
  section-wide: "112px"
components:
  button-primary:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.brand-orange-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-orange-strong}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "48px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.brand-black}"
    textColor: "{colors.on-brand-black}"
    rounded: "{rounded.2xl}"
    padding: "28px"
---

# Design System: SolarMais

## Overview

**Creative North Star: "Campo de Marca Preto e Laranja"**

A identidade parte da própria logo: preto como estrutura, laranja como sinal e branco ou off-white como espaço de leitura. O resultado é direto, confiável e comercial, com a clareza de uma proposta técnica e o calor necessário para uma marca de energia solar.

As páginas alternam áreas claras, informativas e arejadas com campos pretos concentrados nos momentos de escolha. O laranja aparece com intenção em chamadas, ícones, marcadores e foco; a fotografia editorial aproxima o tema sem se passar por prova de uma instalação real.

**Key Characteristics:**

- Contraste alto derivado da logo oficial.
- Hierarquia tipográfica forte, compacta e legível.
- Superfícies claras para explicar; campos pretos para decidir.
- Laranja raro e funcional, usado como orientação e ação.
- Bordas finas, cantos moderados e elevação contida.

## Colors

A paleta une neutros levemente quentes a preto quase absoluto e um laranja solar vivo; o tema escuro conserva a mesma hierarquia, elevando superfícies por tom.

### Primary

- **Laranja Solar:** cor de ação primária, ícones-chave, foco e pequenos marcadores de progresso.
- **Laranja Solar Profundo:** reforça links e estados de interação sobre superfícies claras; no tema escuro, sua contraparte clara preserva contraste.

### Neutral

- **Papel Solar:** fundo geral claro, ligeiramente quente, que reduz o brilho de páginas extensas.
- **Branco de Superfície:** formulários, botões secundários e contêineres de maior nitidez.
- **Cinza Elevado:** alternância de seção e apoio a mensagens ou estados discretos.
- **Tinta:** texto principal e elementos de alta prioridade.
- **Tinta Suave:** texto explicativo e metadados.
- **Linha Mineral:** divisores, bordas de controle e organização de listas.
- **Preto de Marca:** blocos de solução, conversão, ícones e rodapé.
- **Branco sobre Marca:** conteúdo principal em campos pretos, acompanhado por um neutro suavizado para texto secundário.

### Named Rules

**The Laranja é Sinal Rule.** Reserve o laranja para ação, orientação, foco e poucos ícones; sua raridade sustenta a hierarquia.

**The Preto Estrutural Rule.** Concentre o preto em momentos de decisão e em elementos de marca, sem transformar áreas longas de leitura em grandes massas escuras.

## Typography

**Display Font:** Manrope (com ui-sans-serif, system-ui e sans-serif como fallback)

**Body Font:** Manrope (com ui-sans-serif, system-ui e sans-serif como fallback)

**Character:** A família única mantém a comunicação coesa e contemporânea. Pesos extrafortes e tracking negativo dão presença aos títulos; corpo e rótulos continuam simples, abertos e utilitários.

### Hierarchy

- **Display:** exclusivo do argumento principal da primeira dobra; curto, equilibrado e limitado a cerca de 13 caracteres por linha.
- **Headline:** títulos de seção responsivos, com quebras equilibradas e largura máxima controlada.
- **Title:** nomes de soluções, cartões e grupos de conteúdo; forte sem competir com títulos de seção.
- **Body:** explicações e texto de apoio; use medidas entre 48 e 68 caracteres para preservar a leitura.
- **Label:** navegação, botões, campos, índices e mensagens curtas; o peso alto comunica ação sem depender de caixa alta.

### Named Rules

**The Uma Família Rule.** Use Manrope em toda a interface; a distinção vem de escala, peso, medida e espaçamento, não da mistura de famílias.

**The Manchete Curta Rule.** Mantenha títulos grandes concisos e com quebras controladas; não estenda o display por toda a largura da página.

## Layout

O conteúdo ocupa um contêiner central de até 1180px, com margens laterais fluidas de 18px em telas pequenas e 32px em telas grandes. A primeira dobra usa fotografia em largura total com conteúdo sobreposto e uma faixa de fatos operacionais; as seções seguintes combinam grids assimétricos para narrativa e diagrama com divisões abertas de duas, três ou quatro colunas.

O ritmo vertical das seções cresce de 80px para 112px a partir de telas médias. A navegação se reorganiza em painel de largura total abaixo de 1024px; grades de conteúdo começam a se dividir a partir de 640px, e as composições principais assumem duas colunas a partir de 1024px. Alvos interativos mantêm no mínimo 44px e geralmente 48px.

**The Leitura Antes da Densidade Rule.** Preserve respiro entre grupos e use linhas ou mudança tonal para separar conteúdo; não empilhe caixas decorativas para criar estrutura.

## Elevation & Depth

O sistema é plano por padrão. A profundidade vem principalmente da alternância tonal entre papel, branco, cinza e preto. Uma sombra ambiente suave aparece somente na fotografia principal e no contêiner do formulário, onde ajuda a distinguir conteúdo editorial e tarefa de conversão.

### Shadow Vocabulary

- **Sombra Suave** (`0 18px 50px -26px rgb(0 0 0 / 38%)`): elevação difusa para a fotografia do hero e o formulário sobre campo escuro.

### Named Rules

**The Elevação Contida Rule.** Use sombra apenas para destacar imagem ou tarefa principal; se uma borda ou troca de superfície resolver a separação, mantenha o elemento plano.

## Shapes

Cantos moderadamente arredondados tornam controles acessíveis sem suavizar em excesso a identidade firme da marca. Botões e campos usam curvas compactas; cartões principais e imagens recebem curvas mais amplas. Divisores de um pixel e recortes retangulares preservam a sensação técnica. A logo permanece em seu retângulo preto original, sem máscara, redesenho ou recoloração.

**The Logo Íntegra Rule.** Exiba o arquivo oficial sobre seu próprio campo preto, mantendo símbolo laranja e wordmark branco intactos.

## Components

### Buttons

- **Shape:** retângulo de canto moderado e altura confortável para toque.
- **Primary:** fundo Laranja Solar, texto escuro de alto contraste e espaçamento compacto; pode receber seta linear em chamadas direcionais.
- **Hover / Focus:** sobe discretamente e troca para o Laranja Solar Profundo; o foco usa contorno laranja espesso e afastado.
- **Secondary:** superfície branca, texto Tinta e borda Linha Mineral; no hover, a borda ganha contraste.
- **Icon:** botão quadrado com a mesma altura dos CTAs, usado para tema e menu.

### Cards / Containers

- **Corner Style:** cantos amplos nos contêineres principais e curvas médias em elementos internos.
- **Background:** branco para tarefas, cinza elevado para alternância e Preto de Marca para soluções e conversão.
- **Shadow Strategy:** somente fotografia e formulário usam Sombra Suave.
- **Border:** separações internas usam linhas finas; blocos escuros usam divisores brancos translúcidos.
- **Internal Padding:** começa compacto no celular e cresce em telas médias.

### Inputs / Fields

- **Style:** fundo Papel Solar, borda Linha Mineral, rótulo forte acima e altura equivalente à dos botões.
- **Focus:** borda laranja e halo translúcido; o contorno global permanece visível para teclado.
- **Error / Disabled:** mensagens usam vermelho semântico com borda correspondente; botões desabilitados preservam o texto e não simulam envio.

### Navigation

A barra superior é fixa durante a rolagem e continua o preto absoluto do arquivo de marca. Links usam branco suavizado e ganham branco integral no hover. Em telas pequenas, o menu abre como painel abaixo da primeira linha; a chamada principal passa a integrar esse painel.

### Hero Stage

A abertura usa fotografia editorial em largura total, cobertura preta uniforme e uma manchete curta de alto contraste. As ações aparecem antes de uma faixa com três fatos sobre o atendimento, sem métricas ou provas comerciais não confirmadas. Uma única entrada combina deslocamento, desfoque e ajuste de saturação, respeitando preferência por movimento reduzido.

### Energy Flow

O diagrama vetorial explica captação, conversão e consumo com traços técnicos e laranja funcional. Ele deve continuar educativo e esquemático, sem simular uma instalação específica ou uma fotografia de projeto.

### Project Showcase

A seção de projetos usa um mosaico assimétrico: uma apresentação residencial com fotografia explicitamente ilustrativa e dois painéis técnicos para comércio e pequena indústria. Os painéis descrevem critérios de análise, nunca resultados, obras concluídas ou métricas sem comprovação. Em telas menores, o mosaico se torna uma sequência vertical preservando a ordem residencial, comercial e industrial.

### Feature Rows

Benefícios aparecem como linhas abertas, separadas por divisores. Cada item combina um ícone linear laranja dentro de um quadrado preto, título curto e explicação em Tinta Suave. Essa construção substitui cartões repetitivos e conserva densidade editorial.

### Process List

As quatro etapas usam numeração porque a ordem é parte do entendimento. Divisores formam uma sequência horizontal em telas grandes e uma leitura linear em telas pequenas, sem caixas independentes ou sombras.

### Decision Band

O laranja pode ocupar uma faixa curta entre conteúdo educativo e dúvidas para concentrar uma decisão. Texto escuro e um botão preto mantêm a hierarquia; não prolongue essa superfície por conteúdo extenso.

### FAQ

Perguntas usam linhas expansíveis com separadores, tipografia forte e um sinal laranja de mais ou menos alinhado à direita. O componente permanece plano, com área de toque ampla e resposta de largura limitada.

### Brand Lockup

A marca usa diretamente a imagem oficial recortada dentro de um campo preto horizontal. Preserve a proporção percebida, o fundo preto, o símbolo circular laranja e o wordmark branco.

## Do's and Don'ts

### Do:

- **Do** preserve a alternância entre superfícies claras de leitura e campos pretos de decisão.
- **Do** use o laranja em CTAs, foco, ícones-chave e indicadores pequenos.
- **Do** mantenha corpo legível, linhas curtas e alvos de toque de pelo menos 44px.
- **Do** mantenha estados claro e escuro semanticamente equivalentes.
- **Do** identifique fotografia editorial ilustrativa quando ela não comprovar um projeto real.

### Don't:

- **Don't** redesenhe, recolora, arredonde ou retire o fundo preto da logo oficial.
- **Don't** espalhe o laranja por grandes fundos ou por elementos sem função hierárquica.
- **Don't** use gradientes, vidro decorativo, emoji ou ilustração genérica como ornamento.
- **Don't** cubra áreas longas de leitura com preto; reserve campos escuros para conteúdo decisivo e conciso.
- **Don't** adicione sombras a cada cartão ou controle.
- **Don't** introduza depoimentos, números de economia, certificações ou imagens de obra como prova sem material confirmado.
