'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { ArrowLeft, ArrowRight, Code, Play, Send, Trophy, Clock, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store';

interface LessonData {
  id: string;
  conteudoId: string;
  topicoId: string;
  titulo: string;
  xp: number;
  duracaoEstimada: string;
  conteudo: string;
  exercicio?: {
    enunciado: string;
    linguagem: string;
    codigoInicial: string;
    validationCode: string;
    testDescription: string;
  };
}

const lessonsData: Record<string, LessonData> = {
  // ========== HTML ==========
  'html-introducao-01': {
    id: 'html-introducao-01',
    conteudoId: 'html',
    topicoId: 'introducao',
    titulo: 'O que e HTML?',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## O que e HTML?

HTML (HyperText Markup Language) e a linguagem padrao para criar paginas web. Ela define a **estrutura** do conteudo.

## Estrutura Basica

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Pagina</title>
</head>
<body>
    <h1>Ola, Mundo!</h1>
    <p>Minha primeira pagina web.</p>
</body>
</html>
\`\`\`

## Tags Principais

| Tag | Funcao |
|-----|--------|
| \`<h1>\` a \`<h6>\` | Titulos |
| \`<p>\` | Paragrafo |
| \`<a>\` | Link |
| \`<img>\` | Imagem |

## Exercicio

Crie uma pagina HTML basica com um titulo h1 e um paragrafo.`,
    exercicio: {
      enunciado: 'Crie uma pagina com um h1 e um paragrafo p.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie sua pagina aqui -->',
      validationCode: `const hasH1 = code.includes('<h1') && code.includes('</h1>');
const hasP = code.includes('<p') && code.includes('</p>');
return hasH1 && hasP;`,
      testDescription: "Verifica se tem <h1> e <p>",
    },
  },
  'html-introducao-02': {
    id: 'html-introducao-02',
    conteudoId: 'html',
    topicoId: 'introducao',
    titulo: 'Elementos e Atributos',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## Elementos HTML

Um elemento e composto por tags de abertura e fechamento:

\`\`\`html
<p>Texto do paragrafo</p>
\`\`\`

## Atributos

Atributos adicionam informacoes aos elementos:

\`\`\`html
<a href="https://google.com">Link para Google</a>
<img src="foto.jpg" alt="Descricao da foto">
\`\`\`

## Atributos Comuns

| Atributo | Uso |
|----------|-----|
| \`class\` | Classe CSS |
| \`id\` | Identificador unico |
| \`style\` | Estilos inline |
| \`href\` | Links |

## Exercicio

Crie um link com href e uma imagem com src e alt.`,
    exercicio: {
      enunciado: 'Crie um link \<a> com href e uma imagem \<img> com src e alt.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o link e a imagem -->',
      validationCode: `const hasA = code.includes('<a') && code.includes('href=') && code.includes('</a>');
const hasImg = code.includes('<img') && code.includes('src=') && code.includes('alt=');
return hasA && hasImg;`,
      testDescription: "Verifica se tem <a href> e <img src alt>",
    },
  },
  'html-tags-01': {
    id: 'html-tags-01',
    conteudoId: 'html',
    topicoId: 'tags-basicas',
    titulo: 'Textos e Formatacao',
    xp: 35,
    duracaoEstimada: '12min',
    conteudo: `## Titulos

\`\`\`html
<h1>Maior titulo</h1>
<h2>Segundo nivel</h2>
<h3>Terceiro nivel</h3>
\`\`\`

## Formatacao de Texto

\`\`\`html
<p>Texto <strong>forte</strong> e <em>italico</em>.</p>
<p>Texto <mark>destacado</mark>.</p>
<p>Texto <code>monospace</code>.</p>
\`\`\`

## Listas

\`\`\`html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
\`\`\`

## Exercicio

Crie uma lista nao ordenada com 3 itens.`,
    exercicio: {
      enunciado: 'Crie uma lista ul com pelo menos 3 itens li.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a lista aqui -->',
      validationCode: `const hasUl = code.includes('<ul') && code.includes('</ul>');
const liCount = (code.match(/<li/g) || []).length;
return hasUl && liCount >= 3;`,
      testDescription: "Verifica se tem <ul> com pelo menos 3 <li>",
    },
  },
  'html-tags-02': {
    id: 'html-tags-02',
    conteudoId: 'html',
    topicoId: 'tags-basicas',
    titulo: 'Links e Navegacao',
    xp: 35,
    duracaoEstimada: '12min',
    conteudo: `## Links

\`\`\`html
<a href="https://google.com">Link Externo</a>
<a href="/sobre">Link Interno</a>
<a href="#secao">Link Interno com Anchor</a>
\`\`\`

## Navegacao

\`\`\`html
<nav>
  <a href="/">Inicio</a>
  <a href="/sobre">Sobre</a>
  <a href="/contato">Contato</a>
</nav>
\`\`\`

## Exercicio

Crie uma tag nav com 3 links.`,
    exercicio: {
      enunciado: 'Crie uma tag nav com 3 links para paginas diferentes.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a navegacao aqui -->',
      validationCode: `const hasNav = code.includes('<nav') && code.includes('</nav>');
const linkCount = (code.match(/<a/g) || []).length;
return hasNav && linkCount >= 3;`,
      testDescription: "Verifica se tem <nav> com pelo menos 3 <a>",
    },
  },
  'html-formularios-01': {
    id: 'html-formularios-01',
    conteudoId: 'html',
    topicoId: 'formularios',
    titulo: 'Formularios HTML',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Formularios

Formularios coletam dados do usuario:

\`\`\`html
<form action="/enviar" method="POST">
    <input type="text" name="nome" placeholder="Seu nome">
    <button type="submit">Enviar</button>
</form>
\`\`\`

## Inputs Comuns

| Type | Uso |
|------|-----|
| \`text\` | Texto livre |
| \`email\` | Email |
| \`password\` | Senha |
| \`number\` | Numeros |

## Botoes

\`\`\`html
<button type="submit">Enviar</button>
<button type="reset">Limpar</button>
\`\`\`

## Exercicio

Crie um formulario com input de texto e botao Enviar.`,
    exercicio: {
      enunciado: 'Crie um formulario com um campo de texto para nome e um botao de enviar.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o formulario aqui -->',
      validationCode: `const hasForm = code.includes('<form') && code.includes('</form>');
const hasInput = code.includes('<input') && (code.includes('type="text"') || code.includes("type='text'"));
const hasButton = code.includes('<button') && code.includes('Enviar') && code.includes('</button>');
return hasForm && hasInput && hasButton;`,
      testDescription: "Verifica se tem <form> com <input type='text'> e <button>Enviar</button>",
    },
  },
  'html-semanticas-01': {
    id: 'html-semanticas-01',
    conteudoId: 'html',
    topicoId: 'semanticas',
    titulo: 'HTML Semantico',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Por que HTML Semantico?

HTML semantico usa tags que descrevem o **significado** do conteudo.

### Beneficios

- **Acessibilidade**: Leitores de tela entendem a estrutura
- **SEO**: Google entende melhor o conteudo
- **Manutencao**: Codigo mais facil de entender

## Tags Semanticas

\`\`\`html
<header>  <!-- Cabecalho -->
<nav>     <!-- Navegacao -->
<main>    <!-- Conteudo principal -->
<aside>   <!-- Conteudo lateral -->
<footer>  <!-- Rodape -->
\`\`\`

## Exemplo

\`\`\`html
<header>
    <h1>Meu Site</h1>
    <nav>
        <a href="/">Inicio</a>
    </nav>
</header>
<main>
    <p>Conteudo</p>
</main>
<footer>
    <p>Rodape</p>
</footer>
\`\`\`

## Exercicio

Crie uma estrutura com header, nav, main e footer.`,
    exercicio: {
      enunciado: 'Crie uma estrutura semantica com header, nav, main e footer.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a estrutura semantica aqui -->',
      validationCode: `const hasHeader = code.includes('<header') && code.includes('</header>');
const hasNav = code.includes('<nav') && code.includes('</nav>');
const hasMain = code.includes('<main') && code.includes('</main>');
const hasFooter = code.includes('<footer') && code.includes('</footer>');
return hasHeader && hasNav && hasMain && hasFooter;`,
      testDescription: "Verifica se tem <header>, <nav>, <main> e <footer>",
    },
  },
  'html-tabelas-01': {
    id: 'html-tabelas-01',
    conteudoId: 'html',
    topicoId: 'tabelas',
    titulo: 'Criando Tabelas',
    xp: 45,
    duracaoEstimada: '15min',
    conteudo: `## Tabelas HTML

Tabelas organizam dados em linhas e colunas.

## Estrutura Basica

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Idade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ana</td>
      <td>25</td>
    </tr>
    <tr>
      <td>Joao</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Tags de Tabela

| Tag | Funcao |
|-----|--------|
| \`<table>\` | Container da tabela |
| \`<thead>\` | Cabecalho da tabela |
| \`<tbody>\` | Corpo da tabela |
| \`<tr>\` | Linha da tabela |
| \`<th>\` | Celula de cabecalho |
| \`<td>\` | Celula de dados |

## Exercicio

Crie uma tabela com cabecalho (Nome, Idade) e duas linhas de dados.`,
    exercicio: {
      enunciado: 'Crie uma tabela com cabecalho (Nome, Idade) e duas linhas de dados.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a tabela aqui -->',
      validationCode: `const hasTable = code.includes('<table') && code.includes('</table>');
const hasThead = code.includes('<thead') && code.includes('</thead>');
const hasTbody = code.includes('<tbody') && code.includes('</tbody>');
const hasTh = code.includes('<th') && code.includes('Nome') && code.includes('Idade');
const hasTr = (code.match(/<tr/g) || []).length >= 3;
const hasTd = (code.match(/<td/g) || []).length >= 4;
return hasTable && hasThead && hasTbody && hasTh && hasTr && hasTd;`,
      testDescription: "Verifica se tem tabela com thead, tbody, th Nome/Idade, e pelo menos 2 linhas com td",
    },
  },
  'html-imagens-01': {
    id: 'html-imagens-01',
    conteudoId: 'html',
    topicoId: 'imagens',
    titulo: 'Imagens e Midia',
    xp: 45,
    duracaoEstimada: '15min',
    conteudo: `## Imagens

Use \`<img>\` para exibir imagens:

\`\`\`html
<img src="foto.jpg" alt="Minha foto" width="300" height="200">
\`\`\`

### Atributos Importantes

| Atributo | Obrigatorio | Funcao |
|----------|-------------|--------|
| \`src\` | Sim | Caminho da imagem |
| \`alt\` | Sim | Texto alternativo |
| \`width\` | Nao | Largura em pixels |
| \`height\` | Nao | Altura em pixels |

## Video

\`\`\`html
<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
</video>
\`\`\`

## Audio

\`\`\`html
<audio controls>
  <source src="musica.mp3" type="audio/mpeg">
</audio>
\`\`\`

## Exercicio

Crie uma imagem com src, alt, width e height.`,
    exercicio: {
      enunciado: 'Crie uma imagem com src, alt, width e height definidos.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a tag de imagem aqui -->',
      validationCode: `const hasImg = code.includes('<img');
const hasSrc = code.includes('src=');
const hasAlt = code.includes('alt=');
const hasWidth = code.includes('width=');
const hasHeight = code.includes('height=');
return hasImg && hasSrc && hasAlt && hasWidth && hasHeight;`,
      testDescription: "Verifica se tem <img> com src, alt, width e height",
    },
  },
  'html-layouts-01': {
    id: 'html-layouts-01',
    conteudoId: 'html',
    topicoId: 'layouts',
    titulo: 'Divs e Spans',
    xp: 45,
    duracaoEstimada: '12min',
    conteudo: `## Div

\`<div>\` e um container generico para agrupar elementos:

\`\`\`html
<div class="card">
  <h2>Titulo</h2>
  <p>Conteudo</p>
</div>
\`\`\`

### Quando usar \`<div>\`

- Agrupar elementos relacionados
- Aplicar estilos a multiplos elementos
- Criar secoes da pagina

## Span

\`<span>\` e inline - para estilizar partes de texto:

\`\`\`html
<p>Texto com <span class="destaque">palavra importante</span> no meio.</p>
\`\`\`

## Diferenca: Div vs Span

| Caracteristica | \`<div>\` | \`<span>\` |
|----------------|---------|----------|
| Display | Block | Inline |
| Uso | Containers, secoes | Estilizar texto |

## Exercicio

Crie uma div com class 'card' contendo um h3 e um paragrafo.`,
    exercicio: {
      enunciado: "Crie uma div com class 'card' contendo um h3 e um paragrafo.",
      linguagem: 'html',
      codigoInicial: "<!-- Crie a div com class 'card' aqui -->",
      validationCode: `const hasDiv = code.includes('<div') && code.includes('class=') && code.includes('card') && code.includes('</div>');
const hasH3 = code.includes('<h3') && code.includes('</h3>');
const hasP = code.includes('<p') && code.includes('</p>');
return hasDiv && hasH3 && hasP;`,
      testDescription: "Verifica se tem <div class='card'> com <h3> e <p> dentro",
    },
  },
  'html-layouts-02': {
    id: 'html-layouts-02',
    conteudoId: 'html',
    topicoId: 'layouts',
    titulo: 'Flexbox Basico',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## O que e Flexbox?

Flexbox e um sistema de layout CSS para distribuir espaco entre itens.

## Container Flex

\`\`\`html
<div style="display: flex;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

## Propriedades do Container

### justify-content

\`\`\`css
justify-content: flex-start;    /* Inicio */
justify-content: center;        /* Centro */
justify-content: space-between; /* Espaco entre itens */
\`\`\`

### align-items

\`\`\`css
align-items: flex-start; /* Topo */
align-items: center;     /* Centro vertical */
\`\`\`

### gap

\`\`\`css
gap: 10px; /* Espaco entre itens */
\`\`\`

## Exercicio

Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.`,
    exercicio: {
      enunciado: 'Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex aqui -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
const hasItems = (code.match(/<div/g) || []).length >= 4;
const hasJustify = code.includes('justify-content') && code.includes('space-between');
return hasDiv && hasItems && hasJustify;`,
      testDescription: "Verifica se tem div com display:flex, justify-content:space-between e 3 itens",
    },
  },
  'html-projeto-01': {
    id: 'html-projeto-01',
    conteudoId: 'html',
    topicoId: 'projeto',
    titulo: 'Estruturando uma Pagina Completa',
    xp: 60,
    duracaoEstimada: '30min',
    conteudo: `## Introducao

Este e o projeto final de HTML. Voce vai usar tudo que aprendeu para criar uma landing page completa e semantica.

## Estrutura da Landing Page

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Landing Page</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#hero">Inicio</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="hero">
            <h1>Bem-vindo</h1>
            <p>Minha landing page</p>
        </section>
        <section id="sobre">
            <h2>Sobre</h2>
            <p>Conteudo sobre</p>
        </section>
        <section id="contato">
            <h2>Contato</h2>
            <form>
                <input type="text" placeholder="Nome">
                <input type="email" placeholder="Email">
                <button type="submit">Enviar</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Meu Site</p>
    </footer>
</body>
</html>
\`\`\`

## Atividade Final

Construa uma landing page completa usando apenas tags semanticas.`,
    exercicio: {
      enunciado: 'Construa uma landing page simples 100% semantica com header, nav, main (3 sections) e footer.',
      linguagem: 'html',
      codigoInicial: '<!-- Construa a landing page completa aqui -->',
      validationCode: `const hasHeader = code.includes('<header') && code.includes('</header>');
const hasNav = code.includes('<nav') && code.includes('</nav>');
const hasMain = code.includes('<main') && code.includes('</main>');
const hasFooter = code.includes('<footer') && code.includes('</footer>');
const hasSection = (code.match(/<section/g) || []).length >= 2;
const hasH1 = code.includes('<h1') && code.includes('</h1>');
return hasHeader && hasNav && hasMain && hasFooter && hasSection && hasH1;`,
      testDescription: "Verifica se tem header, nav, main com 2+ sections, footer e h1",
    },
  },

  // ========== CSS ==========
  'css-fundamentos-01': {
    id: 'css-fundamentos-01',
    conteudoId: 'css',
    topicoId: 'fundamentos',
    titulo: 'Introducao ao CSS',
    xp: 50,
    duracaoEstimada: '15min',
    conteudo: `## O que e CSS?

CSS (Cascading Style Sheets) controla a **aparencia** visual do HTML.

## CSS Externo (Recomendado)

A melhor forma de usar CSS e em um **arquivo separado**:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Titulo Estilizado</h1>
    <p>Paragrafo com estilo.</p>
</body>
</html>
\`\`\`

### Arquivo estilos.css

\`\`\`css
h1 {
  color: blue;
  font-size: 32px;
}

p {
  color: gray;
  font-size: 16px;
}
\`\`\`

## Por que CSS Externo?

- **Separacao**: Conteudo (HTML) separado de visual (CSS)
- **Reutilizacao**: Mesmo CSS serve para varias paginas
- **Manutencao**: Facil de alterar estilos em um so lugar
- **Performance**: Navegador faz cache do arquivo CSS

## Propriedades Comuns

### Cores

\`\`\`css
color: red;
background-color: blue;
\`\`\`

### Fontes

\`\`\`css
font-size: 16px;
font-weight: bold;
text-align: center;
\`\`\`

### Espacamento

\`\`\`css
margin: 10px;
padding: 10px;
\`\`\`

## Exercicio

Crie um paragrafo com a tag style definindo cor vermelha e font-size 20px (simulando CSS externo).`,
    exercicio: {
      enunciado: "Crie um paragrafo com style definindo cor vermelha e font-size 20px.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie o paragrafo com style -->',
      validationCode: `const hasP = code.includes('<p') && code.includes('</p>');
const hasStyle = code.includes('style=');
const hasColor = code.includes('color') && (code.includes('red') || code.includes('#') || code.includes('rgb'));
const hasFontSize = code.includes('font-size') && code.includes('20px');
return hasP && hasStyle && hasColor && hasFontSize;`,
      testDescription: "Verifica se tem <p> com style contendo color e font-size: 20px",
    },
  },
  'css-fundamentos-02': {
    id: 'css-fundamentos-02',
    conteudoId: 'css',
    topicoId: 'fundamentos',
    titulo: 'Cores e Backgrounds',
    xp: 50,
    duracaoEstimada: '12min',
    conteudo: `## Cores no CSS

### Formatos de Cor

\`\`\`css
/* Nome */
color: red;

/* Hexadecimal */
color: #ff0000;

/* RGB */
color: rgb(255, 0, 0);

/* RGBA (com transparencia) */
color: rgba(255, 0, 0, 0.5);
\`\`\`

## Backgrounds

### Cor de Fundo

\`\`\`css
background-color: blue;
background-color: #3498db;
\`\`\`

### Imagem de Fundo

\`\`\`css
background-image: url('imagem.jpg');
background-repeat: no-repeat;
background-size: cover;
\`\`\`

### Gradientes

\`\`\`css
background: linear-gradient(to right, red, blue);
background: radial-gradient(circle, red, blue);
\`\`\`

## Exercicio

Crie uma div com background-color azul e color branca.`,
    exercicio: {
      enunciado: 'Crie uma div com background-color azul e color branca.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com cores aqui -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('</div>');
const hasBg = code.includes('background') && (code.includes('blue') || code.includes('#') || code.includes('rgb'));
const hasColor = code.includes('color') && (code.includes('white') || code.includes('#fff') || code.includes('rgb'));
return hasDiv && hasBg && hasColor;`,
      testDescription: "Verifica se tem <div> com background azul e color branca",
    },
  },
  'css-seletores-01': {
    id: 'css-seletores-01',
    conteudoId: 'css',
    topicoId: 'seletores',
    titulo: 'Classes e IDs',
    xp: 55,
    duracaoEstimada: '15min',
    conteudo: `## Seletores CSS

### Classe (.)

Usa \`class\` - pode ser reutilizado:

\`\`\`html
<p class="destaque">Texto 1</p>
<p class="destaque">Texto 2</p>
\`\`\`

\`\`\`css
.destaque {
  color: green;
  font-weight: bold;
}
\`\`\`

### ID (#)

Usa \`id\` - deve ser unico:

\`\`\`html
<h1 id="titulo-principal">Meu Site</h1>
\`\`\`

\`\`\`css
#titulo-principal {
  font-size: 32px;
  color: blue;
}
\`\`\`

## Diferenca: Classe vs ID

| Caracteristica | Classe (\`.\`) | ID (\`#\`) |
|----------------|--------------|----------|
| Uso | Multiplos elementos | Elemento unico |
| Sintaxe CSS | \`.nome\` | \`#nome\` |
| Sintaxe HTML | \`class="nome"\` | \`id="nome"\` |

## Exercicio

Crie um paragrafo com class 'destaque' e um h2 com id 'titulo-principal'.`,
    exercicio: {
      enunciado: "Crie um paragrafo com class 'destaque' e um h2 com id 'titulo-principal'.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie o paragrafo com class e o h2 com id -->',
      validationCode: `const hasP = code.includes('<p') && code.includes('class=') && code.includes('destaque') && code.includes('</p>');
const hasH2 = code.includes('<h2') && code.includes('id=') && code.includes('titulo-principal') && code.includes('</h2>');
return hasP && hasH2;`,
      testDescription: "Verifica se tem <p class='destaque'> e <h2 id='titulo-principal'>",
    },
  },
  'css-seletores-02': {
    id: 'css-seletores-02',
    conteudoId: 'css',
    topicoId: 'seletores',
    titulo: 'Seletores Avancados',
    xp: 55,
    duracaoEstimada: '18min',
    conteudo: `## Seletores Avancados

### Por Atributo

\`\`\`css
a[href] { color: blue; }
a[href="https://google.com"] { color: green; }
a[href*="google"] { color: red; }
\`\`\`

### Pseudo-classes

\`\`\`css
button:hover { background-color: blue; }
li:first-child { font-weight: bold; }
li:last-child { color: red; }
li:nth-child(2) { background-color: #f0f0f0; }
input:focus { border-color: blue; }
\`\`\`

### Pseudo-elementos

\`\`\`css
p::before { content: "Inicio "; }
p::after { content: " Fim"; }
p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }
\`\`\`

### Combinadores

\`\`\`css
div p { color: red; }       /* Descendente */
div > p { color: blue; }     /* Filho direto */
h2 + p { font-weight: bold; } /* Irmao adjacente */
\`\`\`

## Exercicio

Crie uma lista ul com 3 li. Use CSS para estilizar apenas o primeiro li com font-weight bold.`,
    exercicio: {
      enunciado: 'Crie uma lista ul com 3 li. Use CSS para estilizar apenas o primeiro li com font-weight bold.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a lista e o style aqui -->',
      validationCode: `const hasUl = code.includes('<ul') && code.includes('</ul>');
const hasLi = (code.match(/<li/g) || []).length >= 3;
const hasStyle = code.includes('<style') || code.includes('style=');
const hasFirstChild = code.includes('first-child') || code.includes('first_child');
return hasUl && hasLi && hasStyle && hasFirstChild;`,
      testDescription: "Verifica se tem <ul> com 3 <li> e CSS com :first-child",
    },
  },
  'css-boxmodel-01': {
    id: 'css-boxmodel-01',
    conteudoId: 'css',
    topicoId: 'box-model',
    titulo: 'Margin e Padding',
    xp: 55,
    duracaoEstimada: '15min',
    conteudo: `## Box Model

Todo elemento HTML e uma caixa com 4 camadas:

- **MARGIN**: Espaco externo
- **BORDER**: Borda
- **PADDING**: Espaco interno
- **CONTENT**: Conteudo

## Margin (Espaco Externo)

\`\`\`css
margin: 10px;
margin: 10px 20px;
margin: 0 auto; /* Centralizar */
\`\`\`

## Padding (Espaco Interno)

\`\`\`css
padding: 10px;
padding: 10px 20px;
\`\`\`

## Border

\`\`\`css
border: 1px solid black;
border-radius: 8px;
\`\`\`

## Exercicio

Crie uma div com padding 20px e margin 10px.`,
    exercicio: {
      enunciado: 'Crie uma div com padding 20px e margin 10px.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com padding e margin -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('</div>');
const hasPadding = code.includes('padding') && code.includes('20px');
const hasMargin = code.includes('margin') && code.includes('10px');
return hasDiv && hasPadding && hasMargin;`,
      testDescription: "Verifica se tem <div> com padding: 20px e margin: 10px",
    },
  },
  'css-boxmodel-02': {
    id: 'css-boxmodel-02',
    conteudoId: 'css',
    topicoId: 'box-model',
    titulo: 'Width e Height',
    xp: 55,
    duracaoEstimada: '12min',
    conteudo: `## Width e Height

### Valores Fixos

\`\`\`css
width: 300px;
height: 200px;
\`\`\`

### Valores Percentuais

\`\`\`css
width: 50%;
height: 100vh;
\`\`\`

### Min/Max

\`\`\`css
min-width: 200px;
max-width: 800px;
\`\`\`

## Display

\`\`\`css
display: block;       /* Ocupa linha inteira */
display: inline;      /* No fluxo do texto */
display: inline-block; /* Inline com width/height */
display: none;        /* Esconde o elemento */
\`\`\`

## Overflow

\`\`\`css
overflow: visible;  /* Conteudo vaza (padrao) */
overflow: hidden;   /* Esconde o que vaza */
overflow: scroll;   /* Sempre mostra scrollbar */
overflow: auto;     /* Scrollbar quando necessario */
\`\`\`

## Exercicio

Crie uma div com width 300px e height 200px.`,
    exercicio: {
      enunciado: 'Crie uma div com width 300px e height 200px.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com width e height -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('</div>');
const hasWidth = code.includes('width') && code.includes('300px');
const hasHeight = code.includes('height') && code.includes('200px');
return hasDiv && hasWidth && hasHeight;`,
      testDescription: "Verifica se tem <div> com width: 300px e height: 200px",
    },
  },
  'css-flexbox-01': {
    id: 'css-flexbox-01',
    conteudoId: 'css',
    topicoId: 'flexbox',
    titulo: 'Flexbox Basico',
    xp: 60,
    duracaoEstimada: '18min',
    conteudo: `## O que e Flexbox?

Flexbox e um sistema de layout CSS para distribuir espaco entre itens.

## Container Flex

\`\`\`html
<div style="display: flex;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

## Propriedades do Container

### flex-direction

\`\`\`css
flex-direction: row;           /* Horizontal (padrao) */
flex-direction: column;        /* Vertical */
\`\`\`

### justify-content (eixo principal)

\`\`\`css
justify-content: flex-start;    /* Inicio */
justify-content: center;        /* Centro */
justify-content: space-between; /* Espaco entre itens */
\`\`\`

### align-items (eixo cruzado)

\`\`\`css
align-items: stretch;   /* Esticar (padrao) */
align-items: center;    /* Centro vertical */
\`\`\`

### gap

\`\`\`css
gap: 10px;
\`\`\`

## Exercicio

Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.`,
    exercicio: {
      enunciado: 'Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex aqui -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
const hasItems = (code.match(/<div/g) || []).length >= 4;
const hasJustify = code.includes('justify-content') && code.includes('space-between');
return hasDiv && hasItems && hasJustify;`,
      testDescription: "Verifica se tem div com display:flex, justify-content:space-between e 3 itens",
    },
  },
  'css-flexbox-02': {
    id: 'css-flexbox-02',
    conteudoId: 'css',
    topicoId: 'flexbox',
    titulo: 'Flexbox Avancado',
    xp: 60,
    duracaoEstimada: '20min',
    conteudo: `## Flexbox Avancado

### Propriedades dos Itens

#### flex-grow

Controla quanto o item cresce:

\`\`\`css
.item { flex-grow: 1; } /* Cresce para preencher espaco */
.item { flex-grow: 0; } /* Nao cresce (padrao) */
\`\`\`

#### flex-shrink

Controla quanto o item encolhe:

\`\`\`css
.item { flex-shrink: 1; } /* Encolhe (padrao) */
.item { flex-shrink: 0; } /* Nao encolhe */
\`\`\`

#### flex-basis

Tamanho inicial antes de grow/shrink:

\`\`\`css
.item { flex-basis: 200px; }
.item { flex-basis: auto; }
\`\`\`

#### Shorthand

\`\`\`css
.item { flex: 1 1 200px; }
.item { flex: 1; }        /* flex: 1 1 0% */
.item { flex: none; }     /* flex: 0 0 auto */
\`\`\`

#### align-self

Alinhamento individual:

\`\`\`css
.item { align-self: flex-end; }
.item { align-self: center; }
\`\`\`

#### order

Ordem de exibicao:

\`\`\`css
.item { order: 1; }  /* Vai por ultimo */
.item { order: -1; } /* Vai primeiro */
\`\`\`

## Exercicio

Crie um container flex com 3 itens. O primeiro deve ter flex-grow: 1.`,
    exercicio: {
      enunciado: 'Crie um container flex com 3 itens. O primeiro deve ter flex-grow: 1 para ocupar mais espaco.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex com flex-grow aqui -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
const hasItems = (code.match(/<div/g) || []).length >= 4;
const hasGrow = code.includes('flex-grow') && code.includes('1');
return hasDiv && hasItems && hasGrow;`,
      testDescription: "Verifica se tem container flex com flex-grow: 1",
    },
  },
  'css-projeto-01': {
    id: 'css-projeto-01',
    conteudoId: 'css',
    topicoId: 'projeto',
    titulo: 'Estilizando uma Pagina Completa',
    xp: 60,
    duracaoEstimada: '30min',
    conteudo: `## Projeto Final CSS

Neste projeto, voce vai estilizar uma pagina HTML completa usando todos os conceitos de CSS aprendidos.

## Estrutura HTML Base

\`\`\`html
<div class="page">
  <header class="header">
    <h1>Meu Site</h1>
    <nav>
      <a href="#">Inicio</a>
      <a href="#">Sobre</a>
      <a href="#">Contato</a>
    </nav>
  </header>
  <main class="content">
    <div class="card">
      <h2>Titulo do Card</h2>
      <p>Descricao do card com mais texto.</p>
    </div>
  </main>
</div>
\`\`\`

## Exercicio

Estilize a pagina com: layout flex, cores, espacamento e tipografia.`,
    exercicio: {
      enunciado: 'Estilize uma pagina com layout flex, cores, espacamento e tipografia.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o HTML e CSS aqui -->',
      validationCode: `const hasDiv = code.includes('<div') && code.includes('</div>');
const hasStyle = code.includes('<style') || code.includes('style=');
const hasFlex = code.includes('display') && code.includes('flex');
const hasColor = code.includes('color') || code.includes('background');
return hasDiv && hasStyle && hasFlex && hasColor;`,
      testDescription: "Verifica se tem HTML com style, display:flex e cores",
    },
  },

  // ========== JAVASCRIPT ==========
  // --- Introducao ---
  'js-introducao-01': {
    id: 'js-introducao-01',
    conteudoId: 'javascript',
    topicoId: 'introducao',
    titulo: 'O que e JavaScript?',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## O que e JavaScript?

JavaScript e a linguagem da **web**. Ele torna paginas HTML estaticas **interativas**.

## Para que serve?

- Reagir a cliques, teclados e scrolls
- Atualizar conteudo sem recarregar a pagina
- Criar jogos, aplicativos e APIs
- Funcionar no navegador e no servidor (Node.js)

## Exemplo: Pagina ganhando vida

\`\`\`html
<button id="meuBotao">Clique aqui</button>
<p id="resultado">Texto original</p>

<script>
  document.getElementById("meuBotao").addEventListener("click", function() {
    document.getElementById("resultado").textContent = "Voce clicou!";
  });
</script>
\`\`\`

## Boas Práticas

- Sempre declare variaveis com \`let\` ou \`const\` (evite \`var\`)
- Use nomes descritivos para funcoes e variaveis
- Teste sempre no console do navegador

## Atividade

Adicione uma tag \`<script>\` que exibe "Olá, JavaScript!" no console.`,
    exercicio: {
      enunciado: 'Adicione uma tag <script> que exiba "Ola, JavaScript!" no console usando console.log().',
      linguagem: 'javascript',
      codigoInicial: '// Exiba "Ola, JavaScript!" no console',
      validationCode: `const hasConsole = code.includes('console.log');
const hasMessage = code.includes('Ola') || code.includes('Olá') || code.includes('JavaScript');
return hasConsole && hasMessage;`,
      testDescription: "Verifica se tem console.log com mensagem",
    },
  },
  'js-introducao-02': {
    id: 'js-introducao-02',
    conteudoId: 'javascript',
    topicoId: 'introducao',
    titulo: 'Onde o JS Roda',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## Onde o JavaScript executa?

### 1. Navegador (Browser)

O JS roda diretamente no navegador do usuario:

\`\`\`html
<script>
  console.log("Executando no navegador!");
</script>
\`\`\`

### 2. Console do Navegador

Abra o console (F12 > Console) para testar codigo:

\`\`\`javascript
console.log("Mensagem 1");
console.log("Mensagem 2");
console.log("Mensagem 3");
\`\`\`

### 3. Node.js (Servidor)

JavaScript tambem pode rodar fora do navegador com Node.js.

## Boas Práticas

- Use \`console.log()\` para depurar e testar ideias
- O console e seu melhor amigo para encontrar erros
- Nunca deixe console.log em codigo final de producao

## Atividade

Exiba 3 mensagens diferentes no console usando \`console.log()\`.`,
    exercicio: {
      enunciado: 'Exiba 3 mensagens diferentes no console usando console.log().',
      linguagem: 'javascript',
      codigoInicial: '// Exiba 3 mensagens diferentes no console',
      validationCode: `const logCount = (code.match(/console\.log/g) || []).length;
const hasDifferentMessages = code.includes('"') || code.includes("'");
return logCount >= 3 && hasDifferentMessages;`,
      testDescription: "Verifica se tem pelo menos 3 console.log com mensagens",
    },
  },
  // --- Variaveis e Tipos ---
  'js-variaveis-01': {
    id: 'js-variaveis-01',
    conteudoId: 'javascript',
    topicoId: 'variaveis',
    titulo: 'Variaveis (var, let, const)',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Variaveis sao "caixas" para guardar dados

### var (antiga - evite)

\`\`\`javascript
var nome = "Ana";
var nome = "Joao"; // Funciona, mas e perigoso
\`\`\`

### let (pode mudar)

\`\`\`javascript
let idade = 25;
idade = 26; // Funciona! let permite reatribuicao
\`\`\`

### const (nao muda)

\`\`\`javascript
const PI = 3.14;
PI = 3.14159; // ERRO! const nao permite reatribuicao
\`\`\`

## Comparacao

| Declaracao | Reatribuicao | Escopo |
|------------|--------------|--------|
| var | Sim | Funcao |
| let | Sim | Bloco |
| const | Nao | Bloco |

## Boas Práticas

- Use **const** por padrao
- Use **let** quando precisar alterar o valor
- **Nunca** use var em codigo moderno

## Atividade

Corrija o codigo trocando var por let ou const conforme adequado.`,
    exercicio: {
      enunciado: 'Crie 3 variaveis: uma const com nome "PI" valendo 3.14, uma let com nome "contador" valendo 0, e altere contador para 1.',
      linguagem: 'javascript',
      codigoInicial: '// Crie as variaveis aqui',
      validationCode: `const hasConst = code.includes('const') && code.includes('PI');
const hasLet = code.includes('let') && code.includes('contador');
const hasReassign = code.includes('contador') && (code.includes('= 1') || code.includes('=1'));
return hasConst && hasLet && hasReassign;`,
      testDescription: "Verifica se tem const PI, let contador e reatribuicao",
    },
  },
  'js-variaveis-02': {
    id: 'js-variaveis-02',
    conteudoId: 'javascript',
    topicoId: 'variaveis',
    titulo: 'Tipos de Dados',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Os 5 tipos principais

\`\`\`javascript
let nome = "Ana";           // string (texto)
let idade = 25;             // number (numero)
let ativo = true;           // boolean (verdadeiro/falso)
let vazio = null;           // null (vazio intencional)
let indefinido;             // undefined (nao definido)
\`\`\`

## Usando typeof

\`\`\`javascript
console.log(typeof nome);      // "string"
console.log(typeof idade);     // "number"
console.log(typeof ativo);     // "boolean"
console.log(typeof vazio);     // "object" (bug conhecido)
console.log(typeof indefinido); // "undefined"
\`\`\`

## Diferencas importantes

- **string**: sempre entre aspas ("ola" ou 'ola')
- **number**: inteiros ou decimais (25, 3.14)
- **boolean**: apenas true ou false
- **null**: valor vazio proposital
- **undefined**: variavel declarada sem valor

## Atividade

Crie uma variavel de cada tipo e exiba seu typeof no console.`,
    exercicio: {
      enunciado: 'Crie variaveis dos 5 tipos (string, number, boolean, null, undefined) e exiba seus typeof no console.',
      linguagem: 'javascript',
      codigoInicial: '// Crie variaveis de cada tipo e use typeof',
      validationCode: `const hasString = code.includes('"') || code.includes("'");
const hasNumber = /\\d/.test(code);
const hasBoolean = code.includes('true') || code.includes('false');
const hasNull = code.includes('null');
const hasTypeof = (code.match(/typeof/g) || []).length >= 3;
return hasString && hasNumber && hasBoolean && hasNull && hasTypeof;`,
      testDescription: "Verifica se tem os 5 tipos e pelo menos 3 typeof",
    },
  },
  // --- Operadores e Decisao ---
  'js-operadores-01': {
    id: 'js-operadores-01',
    conteudoId: 'javascript',
    topicoId: 'operadores',
    titulo: 'Operadores Aritmeticos e de Comparacao',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Operadores Aritmeticos

\`\`\`javascript
let a = 10 + 5;   // 15 (soma)
let b = 10 - 5;   // 5 (subtracao)
let c = 10 * 5;   // 50 (multiplicacao)
let d = 10 / 5;   // 2 (divisao)
let e = 10 % 3;   // 1 (resto)
let f = 2 ** 3;   // 8 (potencia)
\`\`\`

## Operadores de Comparacao

### Igualdade solta (==)

\`\`\`javascript
console.log(5 == "5");   // true (compara valor)
console.log(5 == 5);     // true
\`\`\`

### Igualdade estrita (===)

\`\`\`javascript
console.log(5 === "5");  // false (compara valor E tipo)
console.log(5 === 5);    // true
\`\`\`

## Diferenca importante

| Expressao | == | === |
|-----------|-----|------|
| 5 == "5" | true | false |
| 0 == false | true | false |
| null == undefined | true | false |

## Boas Práticas

- Sempre use **===** em vez de **==
- Isso evita bugs estranhos de conversao de tipo

## Atividade

Calcule e compare valores usando ===, retornando o resultado.`,
    exercicio: {
      enunciado: 'Crie 2 variaveis numericas e compare com ===. Exiba o resultado no console.',
      linguagem: 'javascript',
      codigoInicial: '// Compare 2 valores usando ===',
      validationCode: `const hasStrictEquality = code.includes('===');
const hasVariables = (code.match(/let |const /g) || []).length >= 2;
const hasConsole = code.includes('console.log');
return hasStrictEquality && hasVariables && hasConsole;`,
      testDescription: "Verifica se tem 2 variaveis, comparacao === e console.log",
    },
  },
  'js-operadores-02': {
    id: 'js-operadores-02',
    conteudoId: 'javascript',
    topicoId: 'operadores',
    titulo: 'Condicionais (if/else, switch)',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## if / else

\`\`\`javascript
let nota = 7;

if (nota >= 6) {
  console.log("Aprovado!");
} else {
  console.log("Reprovado");
}
\`\`\`

## else if (multiplas condicoes)

\`\`\`javascript
let hora = 14;

if (hora < 12) {
  console.log("Bom dia");
} else if (hora < 18) {
  console.log("Boa tarde");
} else {
  console.log("Boa noite");
}
\`\`\`

## switch

\`\`\`javascript
let dia = "segunda";

switch (dia) {
  case "segunda":
    console.log("Inicio da semana");
    break;
  case "sexta":
    console.log("Quase fim de semana!");
    break;
  default:
    console.log("Dia comum");
}
\`\`\`

## Boas Práticas

- Use switch quando tem muitas comparacoes com o mesmo valor
- Sempre inclua \`break\` nos cases do switch
- Use if/else para condicoes complexas

## Atividade

Crie uma funcao que recebe uma nota e retorna "aprovado" (>=6) ou "reprovado".`,
    exercicio: {
      enunciado: 'Crie uma funcao que recebe uma nota (0-10) e retorna "aprovado" se >= 6, senao "reprovado".',
      linguagem: 'javascript',
      codigoInicial: '// Crie a funcao classificarNota',
      validationCode: `const hasFunction = code.includes('function') || code.includes('=>');
const hasIf = code.includes('if');
const hasReturn = code.includes('return');
const hasApproved = code.includes('aprovado') || code.includes('Aprovado');
const hasRejected = code.includes('reprovado') || code.includes('Reprovado');
return hasFunction && hasIf && hasReturn && hasApproved && hasRejected;`,
      testDescription: "Verifica se tem funcao com if, return e mensagens aprovado/reprovado",
    },
  },
  // --- Loops e Repeticao ---
  'js-loops-01': {
    id: 'js-loops-01',
    conteudoId: 'javascript',
    topicoId: 'loops',
    titulo: 'Lacos for e while',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## for (quando sabe quantas vezes repetir)

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Repeticao " + i);
}
// Mostra: 0, 1, 2, 3, 4
\`\`\`

## while (quando nao sabe a quantidade)

\`\`\`javascript
let contador = 0;
while (contador < 3) {
  console.log("Contador: " + contador);
  contador++;
}
\`\`\`

## do...while (executa pelo menos 1 vez)

\`\`\`javascript
let x = 0;
do {
  console.log("Valor: " + x);
  x++;
} while (x < 3);
\`\`\`

## Boas Práticas

- Evite loops infinitos (sempre altere a variavel de controle)
- Use \`for\` quando tem numero definido de repeticoes
- Use \`while\` quando a condicao e dinamica

## Atividade

Crie um loop for que gera a tabuada de um numero (ex: 5 x 1 = 5, 5 x 2 = 10...).`,
    exercicio: {
      enunciado: 'Crie um loop for que exiba a tabuada de 7 (de 1 a 10) no console.',
      linguagem: 'javascript',
      codigoInicial: '// Gere a tabuada de 7',
      validationCode: `const hasFor = code.includes('for');
const hasMultiply = code.includes('*');
const hasSeven = code.includes('7');
const hasConsole = code.includes('console.log');
return hasFor && hasMultiply && hasSeven && hasConsole;`,
      testDescription: "Verifica se tem loop for com multiplicacao por 7 e console.log",
    },
  },
  'js-loops-02': {
    id: 'js-loops-02',
    conteudoId: 'javascript',
    topicoId: 'loops',
    titulo: 'Metodos de Array (forEach, map, filter)',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## forEach (iterar sobre cada item)

\`\`\`javascript
const frutas = ["maca", "banana", "laranja"];
frutas.forEach(function(fruta) {
  console.log(fruta);
});
\`\`\`

## map (transformar cada item)

\`\`\`javascript
const numeros = [1, 2, 3];
const dobro = numeros.map(n => n * 2);
console.log(dobro); // [2, 4, 6]
\`\`\`

## filter (filtrar itens)

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]
\`\`\`

## Comparacao

| Metodo | Retorno | Uso |
|--------|---------|-----|
| forEach | undefined | Executar acao em cada item |
| map | Novo array | Transformar dados |
| filter | Novo array | Filtrar dados |

## Boas Práticas

- Use **map** para transformar arrays
- Use **filter** para selecionar itens
- Evite forEach para criar novos arrays

## Atividade

Filtre e transforme uma lista de produtos usando map/filter.`,
    exercicio: {
      enunciado: 'Crie um array de numeros e use map para dobrar cada valor, depois filter para manter apenas os maiores que 5.',
      linguagem: 'javascript',
      codigoInicial: '// Crie um array, use map e filter',
      validationCode: `const hasArray = code.includes('[') && code.includes(']');
const hasMap = code.includes('.map');
const hasFilter = code.includes('.filter');
const hasDouble = code.includes('* 2') || code.includes('*2');
return hasArray && hasMap && hasFilter && hasDouble;`,
      testDescription: "Verifica se tem array com .map, .filter e multiplicacao",
    },
  },
  // --- Funcoes ---
  'js-funcoes-01': {
    id: 'js-funcoes-01',
    conteudoId: 'javascript',
    topicoId: 'funcoes',
    titulo: 'Declarando Funcoes e Parametros',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Funcoes sao blocos reutilizaveis

\`\`\`javascript
function saudacao(nome) {
  return "Ola, " + nome + "!";
}

console.log(saudacao("Maria")); // "Ola, Maria!"
\`\`\`

## Parametros e Argumentos

\`\`\`javascript
function somar(a, b) {
  return a + b;
}

const resultado = somar(5, 3); // 8
\`\`\`

## Valores padrao

\`\`\`javascript
function saudacao(nome = "Visitante") {
  return "Ola, " + nome + "!";
}

console.log(saudacao());      // "Ola, Visitante!"
console.log(saudacao("Ana")); // "Ola, Ana!"
\`\`\`

## Boas Práticas

- Funcoes devem fazer **uma coisa só**
- Nomes de funcoes devem ser verbos (calcular, exibir, criar)
- Mantenha funcoes pequenas e focadas

## Atividade

Crie uma funcao que recebe 2 numeros e retorna a soma.`,
    exercicio: {
      enunciado: 'Crie uma funcao "somar" que recebe 2 numeros e retorna a soma deles.',
      linguagem: 'javascript',
      codigoInicial: '// Crie a funcao somar(a, b)',
      validationCode: `const hasFunction = code.includes('function') || code.includes('=>');
const hasReturn = code.includes('return');
const hasSum = code.includes('+');
const hasParams = code.includes('a') && code.includes('b');
return hasFunction && hasReturn && hasSum && hasParams;`,
      testDescription: "Verifica se tem funcao com 2 parametros e return com soma",
    },
  },
  'js-funcoes-02': {
    id: 'js-funcoes-02',
    conteudoId: 'javascript',
    topicoId: 'funcoes',
    titulo: 'Arrow Functions e Escopo',
    xp: 40,
    duracaoEstimada: '12min',
    conteudo: `## Arrow Functions (sintaxe curta)

\`\`\`javascript
// Funcao tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function
const somar = (a, b) => a + b;
\`\`\`

## Com um parametro

\`\`\`javascript
const dobro = x => x * 2;
console.log(dobro(5)); // 10
\`\`\`

## Sem parametros

\`\`\`javascript
const ola = () => "Ola!";
console.log(ola()); // "Ola!"
\`\`\`

## Corpo com multiplas linhas

\`\`\`javascript
const calcular = (a, b) => {
  const soma = a + b;
  return soma * 2;
};
\`\`\`

## Escopo

- Arrow functions **nao** tem seu proprio \`this\`
- Sao ideais para callbacks e funcoes curtas

## Atividade

Refatore 3 funcoes tradicionais para arrow functions.`,
    exercicio: {
      enunciado: 'Crie 3 arrow functions: dobrar(x), ehPar(n), e saudar(nome).',
      linguagem: 'javascript',
      codigoInicial: '// Crie as 3 arrow functions',
      validationCode: `const arrowCount = (code.match(/=>/g) || []).length;
const hasDobrar = code.includes('dobrar');
const hasEhPar = code.includes('ehPar') || code.includes('par');
const hasSaudar = code.includes('saudar');
return arrowCount >= 3 && hasDobrar && hasEhPar && hasSaudar;`,
      testDescription: "Verifica se tem 3 arrow functions com nomes corretos",
    },
  },
  // --- Arrays e Objetos ---
  'js-arrays-01': {
    id: 'js-arrays-01',
    conteudoId: 'javascript',
    topicoId: 'arrays',
    titulo: 'Trabalhando com Arrays',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Criando Arrays

\`\`\`javascript
const frutas = ["maca", "banana", "laranja"];
console.log(frutas[0]); // "maca"
console.log(frutas.length); // 3
\`\`\`

## Adicionando e Removendo

\`\`\`javascript
frutas.push("uva");      // Adiciona no final
frutas.pop();             // Remove do final
frutas.unshift("pera");   // Adiciona no inicio
frutas.shift();           // Remove do inicio
\`\`\`

## Encontrando itens

\`\`\`javascript
const numeros = [10, 20, 30, 40];

numeros.indexOf(20);      // 1 (posicao)
numeros.includes(30);     // true
numeros.find(n => n > 25); // 30 (primeiro encontrado)
\`\`\`

## Boas Práticas

- Use \`const\` para arrays (o conteudo pode mudar)
- Use metodos para manipular (nao faca manualmente)
- Cuidado com indices fora do array

## Atividade

Manipule uma lista de tarefas: adicione 3 itens, remova 1, e exiba o resultado.`,
    exercicio: {
      enunciado: 'Crie um array de tarefas, adicione 3 itens com push, remova 1 com pop, e exiba no console.',
      linguagem: 'javascript',
      codigoInicial: '// Manipule a lista de tarefas',
      validationCode: `const hasArray = code.includes('[') && code.includes(']');
const hasPush = code.includes('.push');
const hasPop = code.includes('.pop');
const hasConsole = code.includes('console.log');
return hasArray && hasPush && hasPop && hasConsole;`,
      testDescription: "Verifica se tem array com push, pop e console.log",
    },
  },
  'js-arrays-02': {
    id: 'js-arrays-02',
    conteudoId: 'javascript',
    topicoId: 'arrays',
    titulo: 'Objetos e Propriedades',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Objetos guardam dados em pares chave-valor

\`\`\`javascript
const usuario = {
  nome: "Ana",
  idade: 25,
  email: "ana@email.com"
};
\`\`\`

## Acessando propriedades

\`\`\`javascript
console.log(usuario.nome);      // "Ana" (ponto)
console.log(usuario["idade"]);  // 25 (colchetes)
\`\`\`

## Modificando e adicionando

\`\`\`javascript
usuario.idade = 26;           // Modifica
usuario.telefone = "12345";   // Adiciona nova propriedade
\`\`\`

## Metodos em objetos

\`\`\`javascript
const calculadora = {
  somar: (a, b) => a + b,
  subtrair: (a, b) => a - b
};

console.log(calculadora.somar(5, 3)); // 8
\`\`\`

## Boas Práticas

- Use nomes descritivos para propriedades
- Objetos representam "entidades" (usuario, produto, etc.)
- Evite objetos muito complexos

## Atividade

Crie um objeto "usuario" com nome, idade e email, e exiba seus dados.`,
    exercicio: {
      enunciado: 'Crie um objeto "usuario" com nome, idade e email. Exiba cada propriedade no console.',
      linguagem: 'javascript',
      codigoInicial: '// Crie o objeto usuario',
      validationCode: `const hasObject = code.includes('{') && code.includes('}');
const hasNome = code.includes('nome');
const hasIdade = code.includes('idade');
const hasEmail = code.includes('email');
const hasConsole = code.includes('console.log');
return hasObject && hasNome && hasIdade && hasEmail && hasConsole;`,
      testDescription: "Verifica se tem objeto com nome, idade, email e console.log",
    },
  },
  // --- DOM e Eventos ---
  'js-dom-01': {
    id: 'js-dom-01',
    conteudoId: 'javascript',
    topicoId: 'dom',
    titulo: 'Selecionando Elementos',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## O que e o DOM?

DOM (Document Object Model) e a representacao do HTML como arvore de objetos.

## Selecionando elementos

\`\`\`javascript
// Por ID (retorna 1 elemento)
const titulo = document.getElementById("titulo");

// Por classe (retorna colecao)
const itens = document.getElementsByClassName("item");

// Por seletor CSS (retorna 1 elemento)
const botao = document.querySelector(".btn");

// Por seletor CSS (retorna todos)
const todosItens = document.querySelectorAll("li");
\`\`\`

## Alterando conteudo

\`\`\`javascript
titulo.textContent = "Novo titulo";
titulo.style.color = "blue";
titulo.classList.add("ativo");
\`\`\`

## Boas Práticas

- Use \`querySelector\` e \`querySelectorAll\` (mais flexiveis)
- Evite getElementById quando possivel
- Guarde selecoes em variaveis com nomes claros

## Atividade

Selecione e altere o texto de 3 elementos da pagina.`,
    exercicio: {
      enunciado: 'Use querySelector para selecionar um elemento e alterar seu texto com textContent.',
      linguagem: 'javascript',
      codigoInicial: '// Selecione um elemento e altere seu texto',
      validationCode: `const hasQuerySelector = code.includes('querySelector') || code.includes('getElementById');
const hasTextContent = code.includes('textContent') || code.includes('innerText') || code.includes('innerHTML');
const hasElement = code.includes('document');
return hasQuerySelector && hasTextContent && hasElement;`,
      testDescription: "Verifica se tem querySelector/getElementById e textContent/innerHTML",
    },
  },
  'js-dom-02': {
    id: 'js-dom-02',
    conteudoId: 'javascript',
    topicoId: 'dom',
    titulo: 'Eventos (addEventListener)',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## O que sao Eventos?

Eventos sao acoes do usuario (clique, teclado, scroll, etc.).

## Adicionando listeners

\`\`\`javascript
const botao = document.querySelector("#meuBotao");

botao.addEventListener("click", function() {
  alert("Clicou!");
});
\`\`\`

## Tipos de eventos

| Evento | Quando dispara |
|--------|----------------|
| click | Clique do mouse |
| input | Mudanca em campo de texto |
| submit | Envio de formulario |
| keydown | Tecla pressionada |
| load | Pagina carregada |

## Evento com arrow function

\`\`\`javascript
botao.addEventListener("click", () => {
  console.log("Clicou!");
});
\`\`\`

## Boas Práticas

- Sempre use addEventListener (nao onclick inline)
- Remova listeners quando nao precisar mais
- Use eventos para tornar a pagina interativa

## Atividade

Crie um contador que aumenta/diminui ao clicar em botoes.`,
    exercicio: {
      enunciado: 'Crie 2 funcoes: uma que adiciona 1 a um contador, outra que subtrai 1. Ambas devem usar console.log.',
      linguagem: 'javascript',
      codigoInicial: '// Crie as funcoes de incrementar e decrementar',
      validationCode: `const hasFunctions = (code.match(/function|=>/g) || []).length >= 2;
const hasIncrement = code.includes('+') || code.includes('++');
const hasDecrement = code.includes('-') || code.includes('--');
const hasConsole = code.includes('console.log');
return hasFunctions && hasIncrement && hasDecrement && hasConsole;`,
      testDescription: "Verifica se tem 2 funcoes com incremento, decremento e console.log",
    },
  },
  // --- Assincronismo ---
  'js-assincrono-01': {
    id: 'js-assincrono-01',
    conteudoId: 'javascript',
    topicoId: 'assincrono',
    titulo: 'Promises e Fetch API',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## O que e uma Promise?

Promise e um objeto que representa o resultado futuro de uma operacao.

\`\`\`javascript
const promessa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Dados carregados!");
  }, 2000);
});

promessa.then(dados => console.log(dados));
\`\`\`

## Fetch API (requisicoes HTTP)

\`\`\`javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(dados => {
    console.log(dados.name);
  })
  .catch(erro => {
    console.log("Erro:", erro);
  });
\`\`\`

## Tratamento de erros

\`\`\`javascript
fetch(url)
  .then(res => res.json())
  .then(dados => console.log(dados))
  .catch(err => console.error("Falha:", err));
\`\`\`

## Boas Práticas

- Sempre trate erros com \`.catch()\` ou try/catch
- Use fetch para buscar dados de APIs
- Promises sao encadeadas com .then()

## Atividade

Busque dados de uma API fake e exiba na tela.`,
    exercicio: {
      enunciado: 'Use fetch para buscar dados de https://jsonplaceholder.typicode.com/users/1 e exiba o nome no console.',
      linguagem: 'javascript',
      codigoInicial: '// Busque dados da API e exiba o nome',
      validationCode: `const hasFetch = code.includes('fetch');
const hasThen = code.includes('.then');
const hasJson = code.includes('json');
const hasUrl = code.includes('jsonplaceholder');
return hasFetch && hasThen && hasJson && hasUrl;`,
      testDescription: "Verifica se tem fetch, .then, .json() e URL correta",
    },
  },
  'js-assincrono-02': {
    id: 'js-assincrono-02',
    conteudoId: 'javascript',
    topicoId: 'assincrono',
    titulo: 'Async/Await',
    xp: 50,
    duracaoEstimada: '15min',
    conteudo: `## Async/Await (syntactic sugar)

Async/await torna codigo assincrono mais legivel.

### Com .then()

\`\`\`javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(dados => console.log(dados.name));
\`\`\`

### Com async/await

\`\`\`javascript
async function buscarUsuario() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const dados = await response.json();
  console.log(dados.name);
}

buscarUsuario();
\`\`\`

## Tratamento de erros

\`\`\`javascript
async function buscarDados() {
  try {
    const response = await fetch(url);
    const dados = await response.json();
    console.log(dados);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}
\`\`\`

## Comparacao

| Aspecto | .then() | async/await |
|---------|---------|-------------|
| Legibilidade | Menor | Maior |
| Tratamento erros | .catch() | try/catch |
| Encadeamento | .then().then() | sequencial |

## Atividade

Refatore uma funcao com .then() para async/await.`,
    exercicio: {
      enunciado: 'Crie uma funcao async que busca dados da API e usa try/catch para tratamento de erros.',
      linguagem: 'javascript',
      codigoInicial: '// Crie funcao com async/await e try/catch',
      validationCode: `const hasAsync = code.includes('async');
const hasAwait = code.includes('await');
const hasTry = code.includes('try');
const hasCatch = code.includes('catch');
return hasAsync && hasAwait && hasTry && hasCatch;`,
      testDescription: "Verifica se tem async, await, try e catch",
    },
  },
  // --- Projeto Final ---
  'js-projeto-01': {
    id: 'js-projeto-01',
    conteudoId: 'javascript',
    topicoId: 'projeto',
    titulo: 'To-Do List Interativa',
    xp: 70,
    duracaoEstimada: '40min',
    conteudo: `## Projeto Final: To-Do List

Vamos criar uma lista de tarefas completa usando tudo que aprendemos!

## Funcionalidades

1. **Adicionar** novas tarefas
2. **Marcar** como concluida
3. **Remover** tarefas
4. **Listar** todas as tarefas

## Estrutura HTML

\`\`\`html
<div class="todo-app">
  <h1>Minhas Tarefas</h1>
  <input type="text" id="inputTarefa" placeholder="Nova tarefa...">
  <button id="btnAdicionar">Adicionar</button>
  <ul id="listaTarefas"></ul>
</div>
\`\`\`

## Logica JavaScript

\`\`\`javascript
const tarefas = [];

function adicionarTarefa(texto) {
  tarefas.push({ texto, concluida: false });
  renderizar();
}

function toggleConcluida(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  renderizar();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  renderizar();
}
\`\`\`

## Boas Práticas

- Separe logica de renderizacao
- Use funcoes pequenas e responsaveis
- Mantenha o estado em um array

## Atividade

Construa a To-Do List completa com DOM, eventos e arrays.`,
    exercicio: {
      enunciado: 'Crie as 3 funcoes: adicionarTarefa, toggleConcluida e removerTarefa. Todas devem manipular o array tarefas.',
      linguagem: 'javascript',
      codigoInicial: '// Crie as 3 funcoes da To-Do List',
      validationCode: `const hasAdicionar = code.includes('adicionar') || code.includes('Adicionar');
const hasToggle = code.includes('toggle') || code.includes('concluida') || code.includes('concluido');
const hasRemover = code.includes('remover') || code.includes('Remover') || code.includes('delete');
const hasArray = code.includes('[') && code.includes(']');
return hasAdicionar && hasToggle && hasRemover && hasArray;`,
      testDescription: "Verifica se tem 3 funcoes (adicionar, toggle, remover) e array",
    },
  },

  // ========== REACT ==========
  'react-hooks-01': {
    id: 'react-hooks-01',
    conteudoId: 'react',
    topicoId: 'hooks',
    titulo: 'useState em React',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## O que e useState?

useState e um hook que permite adicionar estado a componentes funcionais.

## Sintaxe

\`\`\`javascript
import { useState } from 'react';

function MeuComponente() {
  const [contagem, setContagem] = useState(0);

  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>
        Incrementar
      </button>
    </div>
  );
}
\`\`\`

## Como funciona

1. \`useState(0)\` - inicializa o estado com valor 0
2. \`contagem\` - e o valor atual do estado
3. \`setContagem\` - e a funcao para atualizar o estado

## Exercicio

Crie um componente com useState que tenha um contador e um botao para incrementar.`,
    exercicio: {
      enunciado: 'Crie um componente React com useState que tenha um contador e um botao para incrementar.',
      linguagem: 'jsx',
      codigoInicial: `import { useState } from 'react';

export default function Contador() {
  // Crie o estado e o botao aqui

  return (
    <div>
      {/* Adicione o contador e o botao */}
    </div>
  );
}`,
      validationCode: `// Verificacao de codigo React
const hasImport = code.includes("import { useState }") || code.includes("import {useState}");
const hasUseState = code.includes("useState(");
const hasSetState = code.includes("setContagem") || code.includes("setCount") || code.includes("set");
const hasIncrement = code.includes("+ 1") || code.includes("+1") || code.includes("contagem + 1");
return hasImport && hasUseState && hasSetState && hasIncrement;`,
      testDescription: "Verifica se tem import useState, useState(), funcao setter e incremento",
    },
  },
};

export default function AulaPage() {
  const params = useParams();
  const { setCurrentLesson, addXp, completeLesson, completedLessons, unlockAchievement, achievements, nivel, xpTotal } = useAppStore();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResult, setTestResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  const checkAchievements = (lessonId: string, newCompletedLessons: string[], newXp: number, newNivel: number) => {
    const checks = [
      { id: 'primeira-aula', condition: newCompletedLessons.length >= 1 },
      { id: '3-aulas', condition: newCompletedLessons.length >= 3 },
      { id: '5-aulas', condition: newCompletedLessons.length >= 5 },
      { id: '10-aulas', condition: newCompletedLessons.length >= 10 },
      { id: 'html-basico', condition: newCompletedLessons.includes('html-introducao-01') && newCompletedLessons.includes('html-introducao-02') },
      { id: 'html-tags', condition: newCompletedLessons.includes('html-tags-01') && newCompletedLessons.includes('html-tags-02') },
      { id: 'html-formularios', condition: newCompletedLessons.includes('html-formularios-01') },
      { id: 'html-semanticas', condition: newCompletedLessons.includes('html-semanticas-01') },
      { id: 'html-tabelas', condition: newCompletedLessons.includes('html-tabelas-01') },
      { id: 'html-imagens', condition: newCompletedLessons.includes('html-imagens-01') },
      { id: 'html-layouts', condition: newCompletedLessons.includes('html-layouts-01') && newCompletedLessons.includes('html-layouts-02') },
      { id: 'html-completo', condition: newCompletedLessons.includes('html-introducao-01') && newCompletedLessons.includes('html-introducao-02') && newCompletedLessons.includes('html-tags-01') && newCompletedLessons.includes('html-tags-02') && newCompletedLessons.includes('html-formularios-01') && newCompletedLessons.includes('html-semanticas-01') && newCompletedLessons.includes('html-tabelas-01') && newCompletedLessons.includes('html-imagens-01') && newCompletedLessons.includes('html-layouts-01') && newCompletedLessons.includes('html-layouts-02') },
      { id: 'css-basico', condition: newCompletedLessons.includes('css-fundamentos-01') && newCompletedLessons.includes('css-fundamentos-02') },
      { id: 'css-seletores', condition: newCompletedLessons.includes('css-seletores-01') && newCompletedLessons.includes('css-seletores-02') },
      { id: 'css-boxmodel', condition: newCompletedLessons.includes('css-boxmodel-01') && newCompletedLessons.includes('css-boxmodel-02') },
      { id: 'css-flexbox', condition: newCompletedLessons.includes('css-flexbox-01') && newCompletedLessons.includes('css-flexbox-02') },
      { id: 'css-completo', condition: newCompletedLessons.includes('css-fundamentos-01') && newCompletedLessons.includes('css-fundamentos-02') && newCompletedLessons.includes('css-seletores-01') && newCompletedLessons.includes('css-seletores-02') && newCompletedLessons.includes('css-boxmodel-01') && newCompletedLessons.includes('css-boxmodel-02') && newCompletedLessons.includes('css-flexbox-01') && newCompletedLessons.includes('css-flexbox-02') },
      { id: 'javascript-basico', condition: newCompletedLessons.includes('js-funcoes-01') && newCompletedLessons.includes('js-funcoes-02') },
      { id: 'javascript-arrays', condition: newCompletedLessons.includes('js-arrays-01') },
      { id: 'javascript-completo', condition: newCompletedLessons.includes('js-funcoes-01') && newCompletedLessons.includes('js-funcoes-02') && newCompletedLessons.includes('js-arrays-01') },
      { id: 'react-iniciante', condition: newCompletedLessons.includes('react-hooks-01') },
      { id: 'nivel-2', condition: newNivel >= 2 },
      { id: 'nivel-3', condition: newNivel >= 3 },
      { id: 'nivel-5', condition: newNivel >= 5 },
      { id: 'todas-aulas', condition: newCompletedLessons.length >= 22 },
    ];

    for (const check of checks) {
      if (check.condition && !achievements.includes(check.id)) {
        unlockAchievement(check.id);
        setNewAchievement(check.id);
        setTimeout(() => setNewAchievement(null), 3000);
      }
    }
  };

  useEffect(() => {
    const lessonId = `${params.conteudo}-${params.topico}-${params.aula}`;
    const foundLesson = lessonsData[lessonId];

    if (foundLesson) {
      setLesson(foundLesson);
      setCurrentLesson(lessonId);
      if (foundLesson.exercicio) {
        setCode(foundLesson.exercicio.codigoInicial);
      }
      if (completedLessons.includes(lessonId)) {
        setIsCompleted(true);
      }
    }
  }, [params, setCurrentLesson, completedLessons]);

  const containsJSX = (code: string): boolean => {
    if (code.includes('import React') ||
        code.includes("from 'react'") ||
        code.includes('from "react"') ||
        code.includes('useState') ||
        code.includes('useEffect')) {
      return true;
    }
    return false;
  };

  const containsHTML = (code: string): boolean => {
    const htmlTags = ['<html', '<head', '<body', '<div', '<p', '<h1', '<h2', '<h3', '<a ', '<img', '<ul', '<ol', '<li', '<table', '<form', '<input', '<button', '<header', '<nav', '<main', '<footer', '<section', '<article'];
    return htmlTags.some(tag => code.includes(tag));
  };

  const validateReactCode = (code: string, validationCode: string): { passed: boolean; checks: string[] } => {
    const checks: string[] = [];
    let passed = true;

    if (validationCode.includes('useState(0)')) {
      if (code.includes('useState(0)')) {
        checks.push('useState(0) encontrado');
      } else {
        checks.push('useState(0) nao encontrado');
        passed = false;
      }
    }

    if (validationCode.includes('useState')) {
      if (code.includes('useState')) {
        checks.push('useState esta sendo importado/usado');
      } else {
        checks.push('useState nao encontrado');
        passed = false;
      }
    }

    if (validationCode.includes('[contagem, setContagem]')) {
      if (code.includes('[contagem, setContagem]') || code.includes('[contagem,setContagem]')) {
        checks.push('Desestruturacao [contagem, setContagem] encontrada');
      } else {
        checks.push('Desestruturacao [contagem, setContagem] nao encontrada');
        passed = false;
      }
    }

    if (validationCode.includes('contagem + 1')) {
      if (code.includes('contagem + 1') || code.includes('contagem+1')) {
        checks.push('Incremento contagem + 1 encontrado');
      } else {
        checks.push('Incremento contagem + 1 nao encontrado');
        passed = false;
      }
    }

    if (checks.length === 0) {
      if (code.length > 50) {
        checks.push('Codigo contem implementacao');
      } else {
        checks.push('Codigo muito curto ou vazio');
        passed = false;
      }
    }

    return { passed, checks };
  };

  const handleRun = () => {
    if (!lesson?.exercicio) return;

    setIsRunning(true);
    setOutput('Executando...');
    setTestResult(null);

    setTimeout(() => {
      try {
        const userCode = code;

        if (containsJSX(userCode)) {
          let outputText = 'Analise do codigo React/JSX:\n\n';
          outputText += 'Codigo React nao pode ser executado diretamente no navegador.\n';
          outputText += 'Abaixo esta uma analise do seu codigo:\n\n';

          if (userCode.includes('import React')) {
            outputText += 'Import do React encontrado\n';
          }
          if (userCode.includes('useState')) {
            outputText += 'useState esta sendo usado\n';
          }
          if (userCode.includes('function') || userCode.includes('=>')) {
            outputText += 'Componente funcional encontrado\n';
          }
          if (userCode.includes('return')) {
            outputText += 'Return encontrado\n';
          }
          if (userCode.includes('<') && userCode.includes('>')) {
            outputText += 'JSX detectado\n';
          }

          outputText += '\nClique em "Enviar" para validar o exercicio.';
          setOutput(outputText);
        } else if (containsHTML(userCode)) {
          let outputText = 'Analise do codigo HTML:\n\n';
          outputText += 'Codigo HTML valido detectado!\n\n';

          const tags = ['html', 'head', 'body', 'div', 'p', 'h1', 'h2', 'h3', 'a', 'img', 'ul', 'li', 'table', 'form', 'input', 'button', 'header', 'nav', 'main', 'footer'];
          tags.forEach(tag => {
            if (userCode.includes(`<${tag}`)) {
              outputText += `Tag <${tag}> encontrada\n`;
            }
          });

          outputText += '\nClique em "Enviar" para validar o exercicio.';
          setOutput(outputText);
        } else {
          const execFunction = new Function(userCode + `
            return {
              pares: typeof pares !== 'undefined' ? pares : undefined,
              multiplicar: typeof multiplicar !== 'undefined' ? multiplicar : undefined,
              somar: typeof somar !== 'undefined' ? somar : undefined,
            };
          `);

          const result = execFunction();

          let outputText = 'Codigo executado com sucesso!\n\n';

          for (const [key, value] of Object.entries(result)) {
            if (value !== undefined) {
              outputText += `${key}: ${typeof value === 'function' ? 'function' : JSON.stringify(value)}\n`;
            }
          }

          setOutput(outputText);
        }
      } catch (error: any) {
        setOutput(`Erro de execucao:\n${error.message}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleSubmit = () => {
    if (!lesson?.exercicio) return;

    setIsRunning(true);
    setOutput('Validando...');
    setTestResult(null);

    setTimeout(() => {
      try {
        const userCode = code;
        const validationCode = lesson.exercicio!.validationCode;

        if (containsJSX(userCode)) {
          const { passed, checks } = validateReactCode(userCode, validationCode);

          if (passed) {
            setTestResult({
              passed: true,
              message: `Exercicio concluido com sucesso!\n\n${checks.join('\n')}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`Parabens! Voce completou o exercicio!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `O exercicio ainda nao esta correto.\n\n${checks.join('\n')}`
            });
            setOutput('Verifique os itens acima e corrija seu codigo.');
          }
        } else if (containsHTML(userCode)) {
          const validateFunction = new Function('code', validationCode);
          const isValid = validateFunction(userCode);

          if (isValid === true) {
            setTestResult({
              passed: true,
              message: `Exercicio concluido com sucesso!\n\n${lesson.exercicio!.testDescription}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`Parabens! Voce completou o exercicio!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `O exercicio ainda nao esta correto.\n\n${lesson.exercicio!.testDescription}`
            });
            setOutput('O exercicio nao passou na validacao.');
          }
        } else {
          const fullCode = userCode + '\n' + validationCode;
          const validateFunction = new Function(fullCode);
          const isValid = validateFunction();

          if (isValid === true) {
            setTestResult({
              passed: true,
              message: `Exercicio concluido com sucesso!\n\n${lesson.exercicio!.testDescription}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`Parabens! Voce completou o exercicio!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `O exercicio ainda nao esta correto.\n\n${lesson.exercicio!.testDescription}`
            });
            setOutput('O exercicio nao passou na validacao.');
          }
        }
      } catch (error: any) {
        setTestResult({
          passed: false,
          message: `Erro durante a validacao:\n${error.message}`
        });
        setOutput(`Erro durante a validacao:\n${error.message}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    if (lesson?.exercicio) {
      setCode(lesson.exercicio.codigoInicial);
      setOutput('');
      setTestResult(null);
    }
  };

  if (!lesson) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Aula nao encontrada</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {newAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Card className="border-yellow-500 bg-yellow-500/10 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-bold text-yellow-500">Conquista Desbloqueada!</p>
                <p className="text-sm text-muted-foreground">{newAchievement}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Header da Aula */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className="capitalize">{lesson.conteudoId}</span>
            <span>/</span>
            <span className="capitalize">{lesson.topicoId}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{lesson.titulo}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lesson.duracaoEstimada}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              +{lesson.xp} XP
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-green-500">
                Concluida
              </span>
            )}
          </div>
        </div>

        {/* Conteudo da Aula */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <MarkdownRenderer content={lesson.conteudo} />
          </CardContent>
        </Card>

        {/* Exercicio */}
        {lesson.exercicio && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="h-4 w-4 text-primary" />
                Exercicio Pratico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">{lesson.exercicio.enunciado}</p>

              {/* Editor de Codigo */}
              <div className="mb-3">
                <div className="bg-[#1e1e1e] rounded-t-md px-3 py-1.5 flex items-center justify-between border-b border-border">
                  <span className="text-xs text-muted-foreground">JavaScript</span>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-6 px-2 text-xs">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Resetar
                  </Button>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-40 p-3 font-mono text-xs bg-[#1e1e1e] text-[#d4d4d4] rounded-b-md border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  spellCheck={false}
                />
              </div>

              {/* Botoes */}
              <div className="flex gap-3 mb-3">
                <Button onClick={handleRun} disabled={isRunning} variant="outline" size="sm">
                  <Play className="h-3 w-3 mr-1" />
                  Rodar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isRunning || isCompleted}
                  variant={isCompleted ? 'secondary' : 'default'}
                  size="sm"
                >
                  <Send className="h-3 w-3 mr-1" />
                  {isCompleted ? 'Concluido' : 'Enviar'}
                </Button>
              </div>

              {/* Output */}
              {output && (
                <Card className="mb-3 bg-[#1e1e1e] border-border">
                  <CardContent className="p-3">
                    <pre className="font-mono text-xs text-[#d4d4d4] whitespace-pre-wrap">{output}</pre>
                  </CardContent>
                </Card>
              )}

              {/* Resultado do Teste */}
              {testResult && (
                <Card className={`border ${testResult.passed ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                  <CardContent className="p-3">
                    <pre className={`font-mono text-xs whitespace-pre-wrap ${testResult.passed ? 'text-green-400' : 'text-red-400'}`}>
                      {testResult.message}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navegacao */}
        <div className="flex justify-between">
          <Button variant="outline" disabled size="sm">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Aula Anterior
          </Button>
          <Button variant="outline" disabled size="sm">
            Proxima Aula
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
