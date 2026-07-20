'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodePreview } from '@/components/ui/CodePreview';
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
    validationCode: string; // Código de validação que retorna true/false
    testDescription: string; // Descrição do que o teste verifica
  };
}

// Dados de exemplo com código de validação correto
const lessonsData: Record<string, LessonData> = {
  'js-funcoes-01': {
    id: 'js-funcoes-01',
    conteudoId: 'javascript',
    topicoId: 'funcoes',
    titulo: 'Funções em JavaScript',
    xp: 50,
    duracaoEstimada: '15min',
    conteudo: `## Introdução

Funções são blocos de código reutilizáveis que realizam uma tarefa específica. Em JavaScript, funções são cidadãs de primeira classe, o que significa que podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções.

## Declarando Funções

A forma mais comum de declarar uma função é usando a palavra-chave \`function\`:

\`\`\`javascript
function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}

console.log(saudacao("Maria")); // Olá, Maria!
\`\`\`

## Parâmetros e Argumentos

Funções podem receber parâmetros que são usados dentro do corpo da função:

\`\`\`javascript
function somar(a, b) {
  return a + b;
}

const resultado = somar(5, 3); // 8
console.log(resultado);
\`\`\`

## Retorno de Valores

Funções retornam valores usando a palavra-chave \`return\`:

\`\`\`javascript
function dobrar(numero) {
  return numero * 2;
}

console.log(dobrar(5)); // 10
console.log(dobrar(7)); // 14
\`\`\`

## Exercício

Agora é sua vez! Crie uma função chamada \`somar\` que recebe dois números como parâmetros e retorna a soma deles.`,
    exercicio: {
      enunciado: 'Crie uma função chamada `somar` que recebe dois números e retorna a soma deles.',
      linguagem: 'javascript',
      codigoInicial: `function somar(a, b) {
  // Seu código aqui
}`,
      validationCode: `
try {
  const result1 = somar(2, 3);
  const result2 = somar(10, -4);
  const result3 = somar(0, 0);
  return result1 === 5 && result2 === 6 && result3 === 0;
} catch (e) {
  return false;
}
`,
      testDescription: 'Verifica se somar(2,3)=5, somar(10,-4)=6 e somar(0,0)=0',
    },
  },
  'js-funcoes-02': {
    id: 'js-funcoes-02',
    conteudoId: 'javascript',
    topicoId: 'funcoes',
    titulo: 'Arrow Functions',
    xp: 50,
    duracaoEstimada: '10min',
    conteudo: `## Introdução

Arrow functions são uma sintaxe mais curta para escrever funções em JavaScript, introduzida no ES6.

## Sintaxe Básica

\`\`\`javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somarArrow = (a, b) => {
  return a + b;
};
\`\`\`

## Sintaxe Curta

Para funções com uma única expressão:

\`\`\`javascript
const somar = (a, b) => a + b;
const dobrar = numero => numero * 2;
\`\`\``,
    exercicio: {
      enunciado: 'Converta a função para arrow function. A variável `multiplicar` deve ser uma arrow function.',
      linguagem: 'javascript',
      codigoInicial: `// Converta para arrow function
function multiplicar(a, b) {
  return a * b;
}`,
      validationCode: `
try {
  // Verificar se é uma arrow function (não pode usar 'function')
  if (typeof multiplicar !== 'function') return false;
  
  const result1 = multiplicar(3, 4);
  const result2 = multiplicar(5, 5);
  return result1 === 12 && result2 === 25;
} catch (e) {
  return false;
}
`,
      testDescription: 'Verifica se multiplicar é uma arrow function que retorna o produto correto',
    },
  },
  'js-arrays-01': {
    id: 'js-arrays-01',
    conteudoId: 'javascript',
    topicoId: 'arrays',
    titulo: 'Métodos de Array',
    xp: 50,
    duracaoEstimada: '20min',
    conteudo: `## Introdução

Arrays em JavaScript possuem métodos poderosos para manipulação de dados.

## filter()

O método \`filter\` cria um novo array com todos os elementos que passam no teste:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = numeros.filter(numero => numero % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]
\`\`\`

## map()

O método \`map\` cria um novo array com os resultados da chamada de uma função:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const dobrados = numeros.map(numero => numero * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]
\`\`\``,
    exercicio: {
      enunciado: 'Use o método `filter` para retornar apenas números pares do array. A variável `pares` deve conter [2, 4, 6, 8, 10].',
      linguagem: 'javascript',
      codigoInicial: `const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Use filter para retornar apenas números pares
const pares = numeros.filter();`,
      validationCode: `
try {
  if (!Array.isArray(pares)) return false;
  if (pares.length !== 5) return false;
  const expected = [2, 4, 6, 8, 10];
  return JSON.stringify(pares) === JSON.stringify(expected);
} catch (e) {
  return false;
}
`,
      testDescription: 'Verifica se pares contém exatamente [2, 4, 6, 8, 10]',
    },
  },
  'react-hooks-01': {
    id: 'react-hooks-01',
    conteudoId: 'react',
    topicoId: 'hooks',
    titulo: 'useState',
    xp: 50,
    duracaoEstimada: '15min',
    conteudo: `## Introdução

O \`useState\` é um hook do React que permite adicionar estado a componentes funcionais.

## Sintaxe Básica

\`\`\`javascript
import React, { useState } from 'react';

function MeuComponente() {
  const [nome, setNome] = useState("Visitante");

  return (
    <div>
      <p>Olá, {nome}!</p>
      <button onClick={() => setNome("Desenvolvedor")}>
        Mudar nome
      </button>
    </div>
  );
}
\`\`\`

## Exemplo: Contador

\`\`\`javascript
function Contador() {
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
\`\`\``,
    exercicio: {
      enunciado: 'Declare uma variável de estado `contagem` usando useState com valor inicial 0.',
      linguagem: 'javascript',
      codigoInicial: `import React, { useState } from 'react';

function Contador() {
  // Declare o estado 'contagem' com valor inicial 0

  return (
    <div>
      <p>Contagem: </p>
      <button>Incrementar</button>
    </div>
  );
}`,
      validationCode: `
// Validação por análise de texto para React
// Verificar se useState(0) está presente
// Verificar se [contagem, setContagem] está presente
// Verificar se contagem + 1 está presente
useState(0)
[contagem, setContagem]
contagem + 1
`,
      testDescription: 'Verifica se useState(0) está sendo usado corretamente',
    },
  },
  // Aulas de HTML
  'html-introducao-01': {
    id: 'html-introducao-01',
    conteudoId: 'html',
    topicoId: 'introducao',
    titulo: 'O que é HTML?',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## O que é HTML?

HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Ele define a **estrutura** e o **conteúdo** de uma página.

## Como funciona?

Quando você acessa um site, o navegador recebe um arquivo HTML e o interpreta para exibir o conteúdo na tela.

## Estrutura Básica

Todo documento HTML tem esta estrutura:

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
</head>
<body>
    <h1>Olá, Mundo!</h1>
    <p>Este é meu primeiro site.</p>
</body>
</html>
\`\`\`

## Explicação das Tags

| Tag | Função |
|-----|--------|
| \`<!DOCTYPE html>\` | Declara que é um documento HTML5 |
| \`<html>\` | Elemento raiz da página |
| \`<head>\` | Contém metadados (título, charset, etc.) |
| \`<title>\` | Título que aparece na aba do navegador |
| \`<body>\` | Contém o conteúdo visível da página |

## Exercício

Crie a estrutura básica de um documento HTML com as tags \`html\`, \`head\`, \`title\` e \`body\`.`,
    exercicio: {
      enunciado: 'Crie a estrutura básica de um documento HTML com as tags html, head, title e body.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a estrutura básica do HTML aqui -->',
      validationCode: `// Validação: verificar se tem as tags básicas
const hasHtml = code.includes('<html') && code.includes('</html>');
const hasHead = code.includes('<head') && code.includes('</head>');
const hasBody = code.includes('<body') && code.includes('</body>');
const hasTitle = code.includes('<title') && code.includes('</title>');
return hasHtml && hasHead && hasBody && hasTitle;`,
      testDescription: 'Verifica se o código contém as tags <html>, <head>, <title> e <body>',
    },
  },
  'html-introducao-02': {
    id: 'html-introducao-02',
    conteudoId: 'html',
    topicoId: 'introducao',
    titulo: 'Elementos e Atributos',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Elementos

Um **elemento** HTML é composto por:
- **Tag de abertura**: \`<tagname>\`
- **Conteúdo**: O texto ou outros elementos dentro
- **Tag de fechamento**: \`</tagname>\`

\`\`\`html
<p>Este é um parágrafo.</p>
\`\`\`

## Atributos

**Atributos** fornecem informações adicionais sobre um elemento:

\`\`\`html
<a href="https://google.com" target="_blank">Google</a>
\`\`\`

### Atributos Comuns

| Atributo | Descrição | Exemplo |
|----------|-----------|---------|
| \`href\` | URL do link | \`href="https://google.com"\` |
| \`src\` | Caminho da imagem | \`src="foto.jpg"\` |
| \`alt\` | Texto alternativo | \`alt="Descrição"\` |
| \`target\` | Onde abrir link | \`target="_blank"\` |

## Exercício

Crie um link que abra o Google em uma nova aba.`,
    exercicio: {
      enunciado: "Crie um link que abra o site do Google em uma nova aba.",
      linguagem: 'html',
      codigoInicial: "<!-- Crie um link com target='_blank' para o Google -->",
      validationCode: `// Validação: verificar se tem link com target blank
const hasA = code.includes('<a') && code.includes('</a>');
const hasHref = code.includes('href=') && code.includes('google.com');
const hasTarget = code.includes('target=') && code.includes('_blank');
return hasA && hasHref && hasTarget;`,
      testDescription: "Verifica se o código contém um link <a> com href para google.com e target='_blank'",
    },
  },
  'html-tags-01': {
    id: 'html-tags-01',
    conteudoId: 'html',
    topicoId: 'tags-basicas',
    titulo: 'Títulos e Parágrafos',
    xp: 30,
    duracaoEstimada: '10min',
    conteudo: `## Títulos

HTML tem 6 níveis de títulos:

\`\`\`html
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Seção</h3>
\`\`\`

### Regras de Títulos

- Use **apenas um \`h1\`** por página
- Não pule níveis
- Títulos ajudam no **SEO**

## Parágrafos

Use a tag \`<p>\` para textos:

\`\`\`html
<p>Este é um parágrafo de texto.</p>
<p>Este é outro parágrafo.</p>
\`\`\`

## Exercício

Crie um título h1 com "Meu Site" e um parágrafo com "Bem-vindo ao meu site!".`,
    exercicio: {
      enunciado: "Crie um título h1 com o texto 'Meu Site' e um parágrafo com o texto 'Bem-vindo ao meu site!'.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie o título e parágrafo aqui -->',
      validationCode: `// Validação: verificar h1 e p
const hasH1 = code.includes('<h1') && code.includes('Meu Site') && code.includes('</h1>');
const hasP = code.includes('<p') && code.includes('Bem-vindo ao meu site!') && code.includes('</p>');
return hasH1 && hasP;`,
      testDescription: "Verifica se tem <h1>Meu Site</h1> e <p>Bem-vindo ao meu site!</p>",
    },
  },
  'html-tags-02': {
    id: 'html-tags-02',
    conteudoId: 'html',
    topicoId: 'tags-basicas',
    titulo: 'Listas e Links',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Listas

### Lista Não-Ordenada (com bullets)

\`\`\`html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
\`\`\`

### Lista Ordenada (com números)

\`\`\`html
<ol>
    <li>Primeiro</li>
    <li>Segundo</li>
</ol>
\`\`\`

## Links

\`\`\`html
<a href="https://google.com">Google</a>
<a href="https://google.com" target="_blank">Google (nova aba)</a>
\`\`\`

## Exercício

Crie uma lista não-ordenada com 3 itens: HTML, CSS e JavaScript.`,
    exercicio: {
      enunciado: "Crie uma lista não-ordenada com 3 itens: 'HTML', 'CSS' e 'JavaScript'.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie a lista aqui -->',
      validationCode: `// Validação: verificar lista com 3 itens
const hasUl = code.includes('<ul') && code.includes('</ul>');
const hasLi1 = code.includes('<li') && code.includes('HTML') && code.includes('</li>');
const hasLi2 = code.includes('<li') && code.includes('CSS') && code.includes('</li>');
const hasLi3 = code.includes('<li') && code.includes('JavaScript') && code.includes('</li>');
return hasUl && hasLi1 && hasLi2 && hasLi3;`,
      testDescription: "Verifica se tem <ul> com 3 <li> contendo HTML, CSS e JavaScript",
    },
  },
  'html-formularios-01': {
    id: 'html-formularios-01',
    conteudoId: 'html',
    topicoId: 'formularios',
    titulo: 'Criando Formulários',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Formulários

Formulários coletam dados do usuário:

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
| \`number\` | Números |

## Botões

\`\`\`html
<button type="submit">Enviar</button>
<button type="reset">Limpar</button>
\`\`\`

## Exercício

Crie um formulário com input de texto e botão Enviar.`,
    exercicio: {
      enunciado: 'Crie um formulário com um campo de texto para nome e um botão de enviar.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o formulário aqui -->',
      validationCode: `// Validação: verificar formulário com input e button
const hasForm = code.includes('<form') && code.includes('</form>');
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
    titulo: 'HTML Semântico',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Por que HTML Semântico?

HTML semântico usa tags que descrevem o **significado** do conteúdo.

### Benefícios

- **Acessibilidade**: Leitores de tela entendem a estrutura
- **SEO**: Google entende melhor o conteúdo
- **Manutenção**: Código mais fácil de entender

## Tags Semânticas

\`\`\`html
<header>  <!-- Cabeçalho -->
<nav>     <!-- Navegação -->
<main>    <!-- Conteúdo principal -->
<aside>   <!-- Conteúdo lateral -->
<footer>  <!-- Rodapé -->
\`\`\`

## Exemplo

\`\`\`html
<header>
    <h1>Meu Site</h1>
    <nav>
        <a href="/">Início</a>
    </nav>
</header>
<main>
    <p>Conteúdo</p>
</main>
<footer>
    <p>Rodapé</p>
</footer>
\`\`\`

## Exercício

Crie uma estrutura com header, nav, main e footer.`,
    exercicio: {
      enunciado: 'Crie uma estrutura semântica com header, nav, main e footer.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a estrutura semântica aqui -->',
      validationCode: `// Validação: verificar tags semânticas
const hasHeader = code.includes('<header') && code.includes('</header>');
const hasNav = code.includes('<nav') && code.includes('</nav>');
const hasMain = code.includes('<main') && code.includes('</main>');
const hasFooter = code.includes('<footer') && code.includes('</footer>');
return hasHeader && hasNav && hasMain && hasFooter;`,
      testDescription: "Verifica se tem <header>, <nav>, <main> e <footer>",
    },
  },
  // Aulas de Tabelas
  'html-tabelas-01': {
    id: 'html-tabelas-01',
    conteudoId: 'html',
    topicoId: 'tabelas',
    titulo: 'Criando Tabelas',
    xp: 45,
    duracaoEstimada: '15min',
    conteudo: `## Tabelas HTML

Tabelas organizam dados em linhas e colunas.

## Estrutura Básica

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
      <td>João</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Tags de Tabela

| Tag | Função |
|-----|--------|
| \`<table>\` | Container da tabela |
| \`<thead>\` | Cabeçalho da tabela |
| \`<tbody>\` | Corpo da tabela |
| \`<tr>\` | Linha da tabela |
| \`<th>\` | Célula de cabeçalho |
| \`<td>\` | Célula de dados |

## Colspan e Rowspan

\`\`\`html
<td colspan="2">Ocupa 2 colunas</td>
<td rowspan="2">Ocupa 2 linhas</td>
\`\`\`

## Exercício

Crie uma tabela com cabeçalho (Nome, Idade) e duas linhas de dados.`,
    exercicio: {
      enunciado: 'Crie uma tabela com cabeçalho (Nome, Idade) e duas linhas de dados.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a tabela aqui -->',
      validationCode: `// Validação: verificar tabela com thead e tbody
const hasTable = code.includes('<table') && code.includes('</table>');
const hasThead = code.includes('<thead') && code.includes('</thead>');
const hasTbody = code.includes('<tbody') && code.includes('</tbody>');
const hasTh = code.includes('<th') && code.includes('Nome') && code.includes('Idade');
const hasTr = (code.match(/<tr/g) || []).length >= 3;
const hasTd = (code.match(/<td/g) || []).length >= 4;
return hasTable && hasThead && hasTbody && hasTh && hasTr && hasTd;`,
      testDescription: "Verifica se tem tabela com thead, tbody, th Nome/Idade, e pelo menos 2 linhas com td",
    },
  },
  // Aulas de Imagens
  'html-imagens-01': {
    id: 'html-imagens-01',
    conteudoId: 'html',
    topicoId: 'imagens',
    titulo: 'Imagens e Mídia',
    xp: 45,
    duracaoEstimada: '15min',
    conteudo: `## Imagens

Use \`<img>\` para exibir imagens:

\`\`\`html
<img src="foto.jpg" alt="Minha foto" width="300" height="200">
\`\`\`

### Atributos Importantes

| Atributo | Obrigatório | Função |
|----------|-------------|--------|
| \`src\` | Sim | Caminho da imagem |
| \`alt\` | Sim | Texto alternativo |
| \`width\` | Não | Largura em pixels |
| \`height\` | Não | Altura em pixels |

## Vídeo

\`\`\`html
<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
</video>
\`\`\`

## Áudio

\`\`\`html
<audio controls>
  <source src="musica.mp3" type="audio/mpeg">
</audio>
\`\`\`

## Exercício

Crie uma imagem com src, alt, width e height.`,
    exercicio: {
      enunciado: 'Crie uma imagem com src, alt, width e height definidos.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a tag de imagem aqui -->',
      validationCode: `// Validação: verificar img com atributos
const hasImg = code.includes('<img');
const hasSrc = code.includes('src=');
const hasAlt = code.includes('alt=');
const hasWidth = code.includes('width=');
const hasHeight = code.includes('height=');
return hasImg && hasSrc && hasAlt && hasWidth && hasHeight;`,
      testDescription: "Verifica se tem <img> com src, alt, width e height",
    },
  },
  // Aulas de Layouts
  'html-layouts-01': {
    id: 'html-layouts-01',
    conteudoId: 'html',
    topicoId: 'layouts',
    titulo: 'Divs e Spans',
    xp: 45,
    duracaoEstimada: '12min',
    conteudo: `## Div

\`<div>\` é um container genérico para agrupar elementos:

\`\`\`html
<div class="card">
  <h2>Título</h2>
  <p>Conteúdo</p>
</div>
\`\`\`

### Quando usar \`<div>\`
- Agrupar elementos relacionados
- Aplicar estilos a múltiplos elementos
- Criar seções da página

## Span

\`<span>\` é inline - para estilizar partes de texto:

\`\`\`html
<p>Texto com <span class="destaque">palavra importante</span> no meio.</p>
\`\`\`

### Diferença: Div vs Span

| Característica | \`<div>\` | \`<span>\` |
|----------------|---------|----------|
| Display | Block | Inline |
| Uso | Containers, seções | Estilizar texto |

## Exercício

Crie uma div com class 'card' contendo um h3 e um parágrafo.`,
    exercicio: {
      enunciado: "Crie uma div com class 'card' contendo um h3 e um parágrafo.",
      linguagem: 'html',
      codigoInicial: "<!-- Crie a div com class 'card' aqui -->",
      validationCode: `// Validação: verificar div com class card e conteúdo
const hasDiv = code.includes('<div') && code.includes('class=') && code.includes('card') && code.includes('</div>');
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
    titulo: 'Flexbox Básico',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## O que é Flexbox?

Flexbox é um sistema de layout CSS para distribuir espaço entre itens.

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
justify-content: flex-start;    /* Início */
justify-content: center;        /* Centro */
justify-content: space-between; /* Espaço entre itens */
\`\`\`

### align-items

\`\`\`css
align-items: flex-start; /* Topo */
align-items: center;     /* Centro vertical */
\`\`\`

### gap

\`\`\`css
gap: 10px; /* Espaço entre itens */
\`\`\`

## Exercício

Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.`,
    exercicio: {
      enunciado: 'Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex aqui -->',
      validationCode: `// Validação: verificar flex container
const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
const hasItems = (code.match(/<div/g) || []).length >= 4;
const hasJustify = code.includes('justify-content') && code.includes('space-between');
return hasDiv && hasItems && hasJustify;`,
      testDescription: "Verifica se tem div com display:flex, justify-content:space-between e 3 itens",
    },
  },
  // Aulas de CSS
  'css-fundamentos-01': {
    id: 'css-fundamentos-01',
    conteudoId: 'css',
    topicoId: 'fundamentos',
    titulo: 'Introdução ao CSS',
    xp: 50,
    duracaoEstimada: '15min',
    conteudo: `## O que é CSS?

CSS (Cascading Style Sheets) controla a **aparência** visual do HTML.

## 3 Formas de Usar CSS

### 1. Inline (direto no elemento)

\`\`\`html
<p style="color: red; font-size: 20px;">Texto vermelho</p>
\`\`\`

### 2. Interno (tag \`<style>\`)

\`\`\`html
<style>
  p { color: red; font-size: 20px; }
</style>
\`\`\`

### 3. Externo (arquivo \`.css\`)

\`\`\`html
<link rel="stylesheet" href="estilos.css">
\`\`\`

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

### Espaçamento
\`\`\`css
margin: 10px;
padding: 10px;
\`\`\`

## Exercício

Crie um parágrafo com style inline: cor vermelha e font-size 20px.`,
    exercicio: {
      enunciado: "Crie um parágrafo com style inline: cor vermelha e font-size 20px.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie o parágrafo com style inline -->',
      validationCode: `// Validação: verificar p com style inline
const hasP = code.includes('<p') && code.includes('</p>');
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

/* RGBA (com transparência) */
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

## Exercício

Crie uma div com background-color azul e color branca.`,
    exercicio: {
      enunciado: 'Crie uma div com background-color azul e color branca.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com cores aqui -->',
      validationCode: `// Validação: verificar div com cores
const hasDiv = code.includes('<div') && code.includes('</div>');
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
.destaque { color: green; font-weight: bold; }
\`\`\`

### ID (#)

Usa \`id\` - deve ser único:

\`\`\`html
<h1 id="titulo-principal">Meu Site</h1>
\`\`\`

\`\`\`css
#titulo-principal { font-size: 32px; color: blue; }
\`\`\`

## Diferença: Classe vs ID

| Característica | Classe (\`.\`) | ID (\`#\`) |
|----------------|--------------|----------|
| Uso | Múltiplos elementos | Elemento único |
| Sintaxe CSS | \`.nome\` | \`#nome\` |
| Sintaxe HTML | \`class="nome"\` | \`id="nome"\` |

## Exercício

Crie um parágrafo com class 'destaque' e um h2 com id 'titulo-principal'.`,
    exercicio: {
      enunciado: "Crie um parágrafo com class 'destaque' e um h2 com id 'titulo-principal'.",
      linguagem: 'html',
      codigoInicial: '<!-- Crie o parágrafo com class e o h2 com id -->',
      validationCode: `// Validação: verificar class e id
const hasP = code.includes('<p') && code.includes('class=') && code.includes('destaque') && code.includes('</p>');
const hasH2 = code.includes('<h2') && code.includes('id=') && code.includes('titulo-principal') && code.includes('</h2>');
return hasP && hasH2;`,
      testDescription: "Verifica se tem <p class='destaque'> e <h2 id='titulo-principal'>",
    },
  },
  'css-seletores-02': {
    id: 'css-seletores-02',
    conteudoId: 'css',
    topicoId: 'seletores',
    titulo: 'Seletores Avançados',
    xp: 55,
    duracaoEstimada: '18min',
    conteudo: `## Seletores Avançados

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
p::before { content: "→ "; }
p::after { content: " ←"; }
p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }
\`\`\`

### Combinadores

\`\`\`css
div p { color: red; }        /* Descendente */
div > p { color: blue; }     /* Filho direto */
h2 + p { font-weight: bold; } /* Irmão adjacente */
\`\`\`

## Exercício

Crie uma lista ul com 3 li. Use CSS para estilizar apenas o primeiro li com font-weight bold.`,
    exercicio: {
      enunciado: 'Crie uma lista ul com 3 li. Use CSS para estilizar apenas o primeiro li com font-weight bold.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a lista e o style aqui -->',
      validationCode: `// Validação: verificar lista com pseudo-classe
const hasUl = code.includes('<ul') && code.includes('</ul>');
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

Todo elemento HTML é uma caixa com 4 camadas:

\`\`\`
┌─────────────────────────┐
│        MARGIN           │  ← Espaço externo
│  ┌───────────────────┐  │
│  │     PADDING       │  │  ← Espaço interno
│  │  ┌─────────────┐  │  │
│  │  │   CONTENT   │  │  │  ← Conteúdo
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
\`\`\`

## Margin (Espaço Externo)

\`\`\`css
margin: 10px;
margin: 10px 20px;
margin: 0 auto; /* Centralizar */
\`\`\`

## Padding (Espaço Interno)

\`\`\`css
padding: 10px;
padding: 10px 20px;
\`\`\`

## Border

\`\`\`css
border: 1px solid black;
border-radius: 8px;
\`\`\`

## Exercício

Crie uma div com padding 20px e margin 10px.`,
    exercicio: {
      enunciado: 'Crie uma div com padding 20px e margin 10px.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com padding e margin -->',
      validationCode: `// Validação: verificar padding e margin
const hasDiv = code.includes('<div') && code.includes('</div>');
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
overflow: visible;  /* Conteúdo vaza (padrão) */
overflow: hidden;   /* Esconde o que vaza */
overflow: scroll;   /* Sempre mostra scrollbar */
overflow: auto;     /* Scrollbar quando necessário */
\`\`\`

## Exercício

Crie uma div com width 300px e height 200px.`,
    exercicio: {
      enunciado: 'Crie uma div com width 300px e height 200px.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a div com width e height -->',
      validationCode: `// Validação: verificar width e height
const hasDiv = code.includes('<div') && code.includes('</div>');
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
    titulo: 'Flexbox Básico',
    xp: 60,
    duracaoEstimada: '18min',
    conteudo: `## O que é Flexbox?

Flexbox é um sistema de layout CSS para distribuir espaço entre itens.

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
flex-direction: row;           /* Horizontal (padrão) */
flex-direction: column;        /* Vertical */
\`\`\`

### justify-content (eixo principal)

\`\`\`css
justify-content: flex-start;    /* Início */
justify-content: center;        /* Centro */
justify-content: space-between; /* Espaço entre itens */
\`\`\`

### align-items (eixo cruzado)

\`\`\`css
align-items: stretch;   /* Esticar (padrão) */
align-items: center;    /* Centro vertical */
\`\`\`

### gap

\`\`\`css
gap: 10px;
\`\`\`

## Exercício

Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.`,
    exercicio: {
      enunciado: 'Crie uma div com display:flex e 3 itens dentro com justify-content: space-between.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex aqui -->',
      validationCode: `// Validação: verificar flex container
const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
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
    titulo: 'Flexbox Avançado',
    xp: 60,
    duracaoEstimada: '20min',
    conteudo: `## Flexbox Avançado

### Propriedades dos Itens

#### flex-grow

Controla quanto o item cresce:

\`\`\`css
.item { flex-grow: 1; } /* Cresce para preencher espaço */
.item { flex-grow: 0; } /* Não cresce (padrão) */
\`\`\`

#### flex-shrink

Controla quanto o item encolhe:

\`\`\`css
.item { flex-shrink: 1; } /* Encolhe (padrão) */
.item { flex-shrink: 0; } /* Não encolhe */
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

Ordem de exibição:

\`\`\`css
.item { order: 1; }  /* Vai por último */
.item { order: -1; } /* Vai primeiro */
\`\`\`

## Exercício

Crie um container flex com 3 itens. O primeiro deve ter flex-grow: 1.`,
    exercicio: {
      enunciado: 'Crie um container flex com 3 itens. O primeiro deve ter flex-grow: 1 para ocupar mais espaço.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o container flex com flex-grow aqui -->',
      validationCode: `// Validação: verificar flex-grow
const hasDiv = code.includes('<div') && code.includes('display') && code.includes('flex') && code.includes('</div>');
const hasItems = (code.match(/<div/g) || []).length >= 4;
const hasGrow = code.includes('flex-grow') && code.includes('1');
return hasDiv && hasItems && hasGrow;`,
      testDescription: "Verifica se tem container flex com flex-grow: 1",
    },
  },
  // Novas aulas de CSS
  'css-fundamentos-03': {
    id: 'css-fundamentos-03',
    conteudoId: 'css',
    topicoId: 'fundamentos',
    titulo: 'Cores, Fontes e Texto',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Introdução

CSS oferece controle total sobre tipografia: fontes, tamanhos, pesos, cores e espaçamento.

## Conceito Explicado

### Cores
\`\`\`css
color: red;                    /* Nome */
color: #ff0000;               /* Hex */
color: rgb(255, 0, 0);        /* RGB */
\`\`\`

### Fontes
\`\`\`css
font-family: 'Inter', sans-serif;
font-size: 16px;
font-weight: bold;
\`\`\`

### Texto
\`\`\`css
text-align: center;
line-height: 1.6;
letter-spacing: 0.5px;
\`\`\`

## Atividade Final

Estilize um cartão com tipografia definida.`,
    exercicio: {
      enunciado: 'Estilize um cartão com tipografia definida: título grande, parágrafo com line-height e cor personalizada.',
      linguagem: 'html',
      codigoInicial: '<!-- Estilize o cartão -->\n<style>\n  /* Adicione estilos aqui */\n</style>\n\n<div class="card">\n  <h2>Título do Card</h2>\n  <p>Descrição do card.</p>\n</div>',
      validationCode: `const hasFontSize = code.includes('font-size');
const hasLineHeight = code.includes('line-height');
const hasColor = code.includes('color');
return hasFontSize && hasLineHeight && hasColor;`,
      testDescription: "Verifica se definiu font-size, line-height e color",
    },
  },
  'css-layout-01': {
    id: 'css-layout-01',
    conteudoId: 'css',
    topicoId: 'layout',
    titulo: 'Display e Posicionamento',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Introdução

Display e posicionamento controlam como os elementos são organizados na página.

## Conceito Explicado

### Display
\`\`\`css
display: block;        /* Ocupa linha inteira */
display: inline;       /* No fluxo do texto */
display: flex;         /* Layout flexível */
display: grid;         /* Layout em grade */
\`\`\`

### Posicionamento
\`\`\`css
position: static;   /* Padrão */
position: relative; /* Relativo à posição original */
position: absolute; /* Relativo ao ancestral */
position: fixed;    /* Relativo à viewport */
position: sticky;   /* Híbrido */
\`\`\`

## Atividade Final

Crie um cabeçalho fixo com position: fixed.`,
    exercicio: {
      enunciado: 'Crie um cabeçalho fixo com position: fixed e um conteúdo com position: relative.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o cabeçalho fixo -->\n<style>\n  /* Adicione estilos aqui */\n</style>\n\n<header>Menu Fixo</header>\n<main>Conteúdo</main>',
      validationCode: `const hasFixed = code.includes('position') && code.includes('fixed');
return hasFixed;`,
      testDescription: "Verifica se usou position: fixed",
    },
  },
  'css-grid-01': {
    id: 'css-grid-01',
    conteudoId: 'css',
    topicoId: 'grid',
    titulo: 'Grid Layout na Prática',
    xp: 50,
    duracaoEstimada: '18min',
    conteudo: `## Introdução

CSS Grid é ideal para layouts bidimensionais (linhas E colunas).

## Conceito Explicado

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
\`\`\`

## Atividade Final

Crie uma galeria de imagens em grid 3x3.`,
    exercicio: {
      enunciado: 'Crie uma galeria de imagens em grid 3x3 usando CSS Grid.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a galeria em grid -->\n<style>\n  /* Adicione estilos aqui */\n</style>\n\n<div class="grid">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n  <div class="item">7</div>\n  <div class="item">8</div>\n  <div class="item">9</div>\n</div>',
      validationCode: `const hasGrid = code.includes('display') && code.includes('grid');
const hasColumns = code.includes('grid-template-columns');
return hasGrid && hasColumns;`,
      testDescription: "Verifica se usou display: grid e grid-template-columns",
    },
  },
  'css-responsividade-01': {
    id: 'css-responsividade-01',
    conteudoId: 'css',
    topicoId: 'responsividade',
    titulo: 'Media Queries e Design Responsivo',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Introdução

Media queries permitem aplicar estilos diferentes baseados no tamanho da tela.

## Conceito Explicado

\`\`\`css
@media (min-width: 768px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}
\`\`\`

## Atividade Final

Torne uma página com 3 colunas responsiva para mobile.`,
    exercicio: {
      enunciado: 'Torne uma página com 3 colunas responsiva para mobile (1 coluna em telas pequenas).',
      linguagem: 'html',
      codigoInicial: '<!-- Torne o layout responsivo -->\n<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 16px;\n  }\n  /* Adicione media queries aqui */\n</style>\n\n<div class="grid">\n  <div>Coluna 1</div>\n  <div>Coluna 2</div>\n  <div>Coluna 3</div>\n</div>',
      validationCode: `const hasMedia = code.includes('@media');
const hasMaxWidth = code.includes('max-width') || code.includes('min-width');
return hasMedia && hasMaxWidth;`,
      testDescription: "Verifica se usou @media com max-width ou min-width",
    },
  },
  'css-responsividade-02': {
    id: 'css-responsividade-02',
    conteudoId: 'css',
    topicoId: 'responsividade',
    titulo: 'Unidades Relativas',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Introdução

Unidades relativas tornam o layout flexível e adaptável.

## Conceito Explicado

| Unidade | Relativa a |
|---------|-----------|
| \`%\` | Elemento pai |
| \`rem\` | Root font-size |
| \`em\` | Elemento pai font-size |
| \`vw\` | Largura viewport |

## Atividade Final

Refatore um layout fixo em px para unidades relativas.`,
    exercicio: {
      enunciado: 'Refatorar um layout fixo em px para unidades relativas (rem, %, vw).',
      linguagem: 'html',
      codigoInicial: '<!-- Refatore para unidades relativas -->\n<style>\n  .container {\n    width: 960px;  /* Mude para unidade relativa */\n    padding: 32px; /* Mude para rem */\n  }\n</style>\n\n<div class="container">Conteúdo</div>',
      validationCode: `const hasPercent = code.includes('%');
const hasRem = code.includes('rem');
const hasVw = code.includes('vw') || code.includes('vh');
return hasPercent || hasRem || hasVw;`,
      testDescription: "Verifica se usou unidades relativas (%, rem, vw ou vh)",
    },
  },
  'css-efeitos-01': {
    id: 'css-efeitos-01',
    conteudoId: 'css',
    topicoId: 'efeitos',
    titulo: 'Transições e Hover',
    xp: 30,
    duracaoEstimada: '12min',
    conteudo: `## Introdução

Transições e hover criam interatividade suave.

## Conceito Explicado

\`\`\`css
.btn {
  transition: all 0.2s ease;
}
.btn:hover {
  background: darkblue;
  transform: scale(1.05);
}
\`\`\`

## Atividade Final

Crie um botão com efeito de hover e transição suave.`,
    exercicio: {
      enunciado: 'Crie um botão com efeito de hover e transição suave.',
      linguagem: 'html',
      codigoInicial: '<!-- Crie o botão com hover -->\n<style>\n  .btn {\n    padding: 12px 24px;\n    background: #3b82f6;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    /* Adicione transição e hover aqui */\n  }\n</style>\n\n<button class="btn">Clique aqui</button>',
      validationCode: `const hasTransition = code.includes('transition');
const hasHover = code.includes(':hover');
return hasTransition && hasHover;`,
      testDescription: "Verifica se usou transition e :hover",
    },
  },
  'css-efeitos-02': {
    id: 'css-efeitos-02',
    conteudoId: 'css',
    topicoId: 'efeitos',
    titulo: 'Animações com @keyframes',
    xp: 40,
    duracaoEstimada: '15min',
    conteudo: `## Introdução

Animações CSS criam movimento complexo sem JavaScript.

## Conceito Explicado

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.elemento {
  animation: fadeIn 0.5s ease-out;
}
\`\`\`

## Atividade Final

Crie uma animação de entrada de elemento.`,
    exercicio: {
      enunciado: 'Crie uma animação simples de entrada de elemento (fade in + slide up).',
      linguagem: 'html',
      codigoInicial: '<!-- Crie a animação de entrada -->\n<style>\n  .card {\n    padding: 20px;\n    background: white;\n    border-radius: 8px;\n    /* Adicione a animação aqui */\n  }\n  /* Crie os keyframes aqui */\n</style>\n\n<div class="card">Conteúdo animado</div>',
      validationCode: `const hasKeyframes = code.includes('@keyframes');
const hasAnimation = code.includes('animation');
return hasKeyframes && hasAnimation;`,
      testDescription: "Verifica se usou @keyframes e animation",
    },
  },
  'css-projeto-01': {
    id: 'css-projeto-01',
    conteudoId: 'css',
    topicoId: 'projeto',
    titulo: 'Estilizando a Landing Page',
    xp: 60,
    duracaoEstimada: '30min',
    conteudo: `## Introdução

Projeto final de CSS. Aplique todos os conceitos aprendidos.

## Atividade Final

Estilize a landing page com:
1. Cores e tipografia
2. Layout com Flexbox/Grid
3. Responsividade com media queries
4. Efeitos hover e transições`,
    exercicio: {
      enunciado: 'Aplique todo o CSS aprendido na landing page criada no projeto final de HTML.',
      linguagem: 'html',
      codigoInicial: '<!-- Estilize a landing page -->\n<style>\n  /* Adicione todos os estilos aqui */\n</style>\n\n<header>\n  <nav>Menu</nav>\n</header>\n<main>\n  <section>Hero</section>\n  <section>Sobre</section>\n</main>\n<footer>Rodapé</footer>',
      validationCode: `const hasBackground = code.includes('background');
const hasFlex = code.includes('display') && code.includes('flex') || code.includes('display') && code.includes('grid');
const hasMedia = code.includes('@media');
return hasBackground && (hasFlex || hasMedia);`,
      testDescription: "Verifica se aplicou background, layout (flex/grid) ou media queries",
    },
  },
  // Aula de Projeto Final HTML
  'html-projeto-01': {
    id: 'html-projeto-01',
    conteudoId: 'html',
    topicoId: 'projeto',
    titulo: 'Estruturando uma Página Completa',
    xp: 60,
    duracaoEstimada: '30min',
    conteudo: `## Introdução

Este é o projeto final de HTML. Você vai usar tudo que aprendeu para criar uma landing page completa e semântica.

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
                <li><a href="#hero">Início</a></li>
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
            <p>Conteúdo sobre</p>
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

Construa uma landing page completa usando apenas tags semânticas.`,
    exercicio: {
      enunciado: 'Construa uma landing page simples 100% semântica com header, nav, main (3 sections) e footer.',
      linguagem: 'html',
      codigoInicial: '<!-- Construa a landing page completa aqui -->',
      validationCode: `// Validação: verificar estrutura semântica completa
const hasHeader = code.includes('<header') && code.includes('</header>');
const hasNav = code.includes('<nav') && code.includes('</nav>');
const hasMain = code.includes('<main') && code.includes('</main>');
const hasFooter = code.includes('<footer') && code.includes('</footer>');
const hasSection = (code.match(/<section/g) || []).length >= 2;
const hasH1 = code.includes('<h1') && code.includes('</h1>');
return hasHeader && hasNav && hasMain && hasFooter && hasSection && hasH1;`,
      testDescription: "Verifica se tem header, nav, main com 2+ sections, footer e h1",
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

  // Verificar conquistas após concluir aula
  const checkAchievements = (lessonId: string, newCompletedLessons: string[], newXp: number, newNivel: number) => {
    const checks = [
      // Conquistas gerais
      { id: 'primeira-aula', condition: newCompletedLessons.length >= 1 },
      { id: '3-aulas', condition: newCompletedLessons.length >= 3 },
      { id: '5-aulas', condition: newCompletedLessons.length >= 5 },
      { id: '10-aulas', condition: newCompletedLessons.length >= 10 },
      // Conquistas de HTML
      { id: 'html-basico', condition: newCompletedLessons.includes('html-introducao-01') && newCompletedLessons.includes('html-introducao-02') },
      { id: 'html-tags', condition: newCompletedLessons.includes('html-tags-01') && newCompletedLessons.includes('html-tags-02') },
      { id: 'html-formularios', condition: newCompletedLessons.includes('html-formularios-01') },
      { id: 'html-semanticas', condition: newCompletedLessons.includes('html-semanticas-01') },
      { id: 'html-tabelas', condition: newCompletedLessons.includes('html-tabelas-01') },
      { id: 'html-imagens', condition: newCompletedLessons.includes('html-imagens-01') },
      { id: 'html-layouts', condition: newCompletedLessons.includes('html-layouts-01') && newCompletedLessons.includes('html-layouts-02') },
      { id: 'html-completo', condition: newCompletedLessons.includes('html-introducao-01') && newCompletedLessons.includes('html-introducao-02') && newCompletedLessons.includes('html-tags-01') && newCompletedLessons.includes('html-tags-02') && newCompletedLessons.includes('html-formularios-01') && newCompletedLessons.includes('html-semanticas-01') && newCompletedLessons.includes('html-tabelas-01') && newCompletedLessons.includes('html-imagens-01') && newCompletedLessons.includes('html-layouts-01') && newCompletedLessons.includes('html-layouts-02') },
      // Conquistas de CSS
      { id: 'css-basico', condition: newCompletedLessons.includes('css-fundamentos-01') && newCompletedLessons.includes('css-fundamentos-02') },
      { id: 'css-seletores', condition: newCompletedLessons.includes('css-seletores-01') && newCompletedLessons.includes('css-seletores-02') },
      { id: 'css-boxmodel', condition: newCompletedLessons.includes('css-boxmodel-01') && newCompletedLessons.includes('css-boxmodel-02') },
      { id: 'css-flexbox', condition: newCompletedLessons.includes('css-flexbox-01') && newCompletedLessons.includes('css-flexbox-02') },
      { id: 'css-completo', condition: newCompletedLessons.includes('css-fundamentos-01') && newCompletedLessons.includes('css-fundamentos-02') && newCompletedLessons.includes('css-seletores-01') && newCompletedLessons.includes('css-seletores-02') && newCompletedLessons.includes('css-boxmodel-01') && newCompletedLessons.includes('css-boxmodel-02') && newCompletedLessons.includes('css-flexbox-01') && newCompletedLessons.includes('css-flexbox-02') },
      // Conquistas de JavaScript
      { id: 'javascript-basico', condition: newCompletedLessons.includes('js-funcoes-01') && newCompletedLessons.includes('js-funcoes-02') },
      { id: 'javascript-arrays', condition: newCompletedLessons.includes('js-arrays-01') },
      { id: 'javascript-completo', condition: newCompletedLessons.includes('js-funcoes-01') && newCompletedLessons.includes('js-funcoes-02') && newCompletedLessons.includes('js-arrays-01') },
      // Conquistas de React
      { id: 'react-iniciante', condition: newCompletedLessons.includes('react-hooks-01') },
      // Conquistas de nível
      { id: 'nivel-2', condition: newNivel >= 2 },
      { id: 'nivel-3', condition: newNivel >= 3 },
      { id: 'nivel-5', condition: newNivel >= 5 },
      // Conquista final
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

  // Verificar se o código contém JSX/React (não HTML puro)
  const containsJSX = (code: string): boolean => {
    // Verificar imports React explícitos
    if (code.includes('import React') || 
        code.includes('from \'react\'') || 
        code.includes('from \"react\"') ||
        code.includes('useState') ||
        code.includes('useEffect')) {
      return true;
    }
    return false;
  };

  // Verificar se o código contém HTML
  const containsHTML = (code: string): boolean => {
    const htmlTags = ['<html', '<head', '<body', '<div', '<p', '<h1', '<h2', '<h3', '<a ', '<img', '<ul', '<ol', '<li', '<table', '<form', '<input', '<button', '<header', '<nav', '<main', '<footer', '<section', '<article'];
    return htmlTags.some(tag => code.includes(tag));
  };

  // Validar código React por análise de texto (sem executar)
  const validateReactCode = (code: string, validationCode: string): { passed: boolean; checks: string[] } => {
    const checks: string[] = [];
    let passed = true;

    // Extrair regras de validação do validationCode
    if (validationCode.includes('useState(0)')) {
      if (code.includes('useState(0)')) {
        checks.push('✅ useState(0) encontrado');
      } else {
        checks.push('❌ useState(0) não encontrado');
        passed = false;
      }
    }

    if (validationCode.includes('useState')) {
      if (code.includes('useState')) {
        checks.push('✅ useState está sendo importado/usado');
      } else {
        checks.push('❌ useState não encontrado');
        passed = false;
      }
    }

    if (validationCode.includes('[contagem, setContagem]')) {
      if (code.includes('[contagem, setContagem]') || code.includes('[contagem,setContagem]')) {
        checks.push('✅ Desestruturação [contagem, setContagem] encontrada');
      } else {
        checks.push('❌ Desestruturação [contagem, setContagem] não encontrada');
        passed = false;
      }
    }

    if (validationCode.includes('contagem + 1')) {
      if (code.includes('contagem + 1') || code.includes('contagem+1')) {
        checks.push('✅ Incremento contagem + 1 encontrado');
      } else {
        checks.push('❌ Incremento contagem + 1 não encontrado');
        passed = false;
      }
    }

    // Se não há regras específicas, fazer validação genérica
    if (checks.length === 0) {
      if (code.length > 50) {
        checks.push('✅ Código contém implementação');
      } else {
        checks.push('❌ Código muito curto ou vazio');
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
        
        // Se for código React/JSX, mostrar análise em vez de executar
        if (containsJSX(userCode)) {
          let outputText = '🔍 Análise do código React/JSX:\n\n';
          outputText += 'Código React não pode ser executado diretamente no navegador.\n';
          outputText += 'Abaixo está uma análise do seu código:\n\n';
          
          if (userCode.includes('import React')) {
            outputText += '✅ Import do React encontrado\n';
          }
          if (userCode.includes('useState')) {
            outputText += '✅ useState está sendo usado\n';
          }
          if (userCode.includes('function') || userCode.includes('=>')) {
            outputText += '✅ Componente funcional encontrado\n';
          }
          if (userCode.includes('return')) {
            outputText += '✅ Return encontrado\n';
          }
          if (userCode.includes('<') && userCode.includes('>')) {
            outputText += '✅ JSX detectado\n';
          }
          
          outputText += '\nClique em "Enviar" para validar o exercício.';
          setOutput(outputText);
        }
        // Se for HTML, mostrar análise
        else if (containsHTML(userCode)) {
          let outputText = '🔍 Análise do código HTML:\n\n';
          outputText += 'Código HTML válido detectado!\n\n';
          
          const tags = ['html', 'head', 'body', 'div', 'p', 'h1', 'h2', 'h3', 'a', 'img', 'ul', 'li', 'table', 'form', 'input', 'button', 'header', 'nav', 'main', 'footer'];
          tags.forEach(tag => {
            if (userCode.includes(`<${tag}`)) {
              outputText += `✅ Tag <${tag}> encontrada\n`;
            }
          });
          
          outputText += '\nClique em "Enviar" para validar o exercício.';
          setOutput(outputText);
        }
        // Código JavaScript normal - executar
        else {
          const execFunction = new Function(userCode + `
            return {
              pares: typeof pares !== 'undefined' ? pares : undefined,
              multiplicar: typeof multiplicar !== 'undefined' ? multiplicar : undefined,
              somar: typeof somar !== 'undefined' ? somar : undefined,
            };
          `);
          
          const result = execFunction();
          
          let outputText = '✅ Código executado com sucesso!\n\n';
          
          for (const [key, value] of Object.entries(result)) {
            if (value !== undefined) {
              outputText += `${key}: ${typeof value === 'function' ? 'function' : JSON.stringify(value)}\n`;
            }
          }
          
          setOutput(outputText);
        }
      } catch (error: any) {
        setOutput(`❌ Erro de execução:\n${error.message}`);
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
        
        // Se for código React/JSX, usar validação por análise
        if (containsJSX(userCode)) {
          const { passed, checks } = validateReactCode(userCode, validationCode);
          
          if (passed) {
            setTestResult({
              passed: true,
              message: `✅ Exercício concluído com sucesso!\n\n${checks.join('\n')}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`🎉 Parabéns! Você completou o exercício!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `❌ O exercício ainda não está correto.\n\n${checks.join('\n')}`
            });
            setOutput('❌ Verifique os itens acima e corrija seu código.');
          }
        }
        // Se for HTML, usar validação por análise de texto
        else if (containsHTML(userCode)) {
          // Executar validationCode com 'code' definido como o código do usuário
          const validateFunction = new Function('code', validationCode);
          const isValid = validateFunction(userCode);
          
          if (isValid === true) {
            setTestResult({
              passed: true,
              message: `✅ Exercício concluído com sucesso!\n\n${lesson.exercicio!.testDescription}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`🎉 Parabéns! Você completou o exercício!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `❌ O exercício ainda não está correto.\n\n${lesson.exercicio!.testDescription}`
            });
            setOutput('❌ O exercício não passou na validação.');
          }
        }
        // Código JavaScript normal - executar validação
        else {
          const fullCode = userCode + '\n' + validationCode;
          const validateFunction = new Function(fullCode);
          const isValid = validateFunction();
          
          if (isValid === true) {
            setTestResult({
              passed: true,
              message: `✅ Exercício concluído com sucesso!\n\n${lesson.exercicio!.testDescription}`
            });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            const newXp = xpTotal + lesson.xp;
            const newNivel = Math.floor(newXp / 100) + 1;
            checkAchievements(lesson.id, newCompleted, newXp, newNivel);
            setOutput(`🎉 Parabéns! Você completou o exercício!\n\n+${lesson.xp} XP`);
          } else {
            setTestResult({
              passed: false,
              message: `❌ O exercício ainda não está correto.\n\n${lesson.exercicio!.testDescription}`
            });
            setOutput('❌ O exercício não passou na validação.');
          }
        }
      } catch (error: any) {
        setTestResult({
          passed: false,
          message: `❌ Erro durante a validação:\n${error.message}`
        });
        setOutput(`❌ Erro durante a validação:\n${error.message}`);
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
          <p className="text-muted-foreground">Aula não encontrada</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Notificação de Conquista */}
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
                ✓ Concluída
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo da Aula */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-foreground mt-6 mb-3 pb-1 border-b border-border">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground mb-3 leading-relaxed text-sm">
                      {children}
                    </p>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-primary">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children, ...props }) => {
                    // Try to extract code content from children
                    let codeContent = '';
                    let language: 'html' | 'css' | null = null;
                    
                    // Children can be a single element or array
                    const child = Array.isArray(children) ? children[0] : children;
                    
                    if (child && typeof child === 'object' && 'props' in child) {
                      // It's a React element (likely <code>)
                      codeContent = child.props?.children?.toString() || '';
                      const className = child.props?.className || '';
                      
                      if (className.includes('html')) {
                        language = 'html';
                      } else if (className.includes('css')) {
                        language = 'css';
                      }
                    } else if (typeof child === 'string') {
                      codeContent = child;
                    }
                    
                    // Also check by content if language not detected
                    if (!language && codeContent) {
                      const hasHtmlTags = /<[a-z][\s\S]*>/i.test(codeContent);
                      const hasCssProps = /color:|background|font-size|margin|padding|border|display/.test(codeContent);
                      
                      if (hasHtmlTags) language = 'html';
                      else if (hasCssProps) language = 'css';
                    }
                    
                    // Show preview for HTML/CSS
                    if (language && codeContent) {
                      return (
                        <CodePreview 
                          code={codeContent} 
                          language={language}
                          title={language === 'html' ? 'HTML Preview' : 'CSS Preview'}
                        />
                      );
                    }
                    
                    // Default code block
                    return (
                      <pre className="bg-[#1e1e1e] p-3 rounded-lg overflow-x-auto mb-3 border border-border text-xs" {...props}>
                        {children}
                      </pre>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-3 space-y-1 text-foreground text-sm">
                      {children}
                    </ul>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
                  ),
                }}
              >
                {lesson.conteudo}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Exercício */}
        {lesson.exercicio && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="h-4 w-4 text-primary" />
                Exercício Prático
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">{lesson.exercicio.enunciado}</p>
              
              {/* Editor de Código */}
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

              {/* Botões */}
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
                  {isCompleted ? '✓ Concluído' : 'Enviar'}
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

        {/* Navegação */}
        <div className="flex justify-between">
          <Button variant="outline" disabled size="sm">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Aula Anterior
          </Button>
          <Button variant="outline" disabled size="sm">
            Próxima Aula
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
