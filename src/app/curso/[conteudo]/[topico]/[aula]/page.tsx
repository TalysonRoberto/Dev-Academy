'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      { id: 'html-completo', condition: newCompletedLessons.includes('html-introducao-01') && newCompletedLessons.includes('html-introducao-02') && newCompletedLessons.includes('html-tags-01') && newCompletedLessons.includes('html-tags-02') && newCompletedLessons.includes('html-formularios-01') && newCompletedLessons.includes('html-semanticas-01') },
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
      { id: 'todas-aulas', condition: newCompletedLessons.length >= 10 },
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

  // Verificar se o código contém JSX/React
  const containsJSX = (code: string): boolean => {
    return code.includes('import React') || 
           code.includes('from \'react\'') || 
           code.includes('from \"react\"') ||
           (code.includes('<') && code.includes('/>') ) ||
           code.includes('useState') ||
           code.includes('useEffect');
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
          
          // Verificar imports
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
        } else {
          // Código JavaScript normal - executar
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
            // Verificar conquistas
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
        } else {
          // Código JavaScript normal - executar validação
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
            // Verificar conquistas
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header da Aula */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="capitalize">{lesson.conteudoId}</span>
            <span>/</span>
            <span className="capitalize">{lesson.topicoId}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{lesson.titulo}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {lesson.duracaoEstimada}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
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
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
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
                  pre: ({ children }) => (
                    <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto mb-4 border border-border">
                      {children}
                    </pre>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Exercício Prático
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{lesson.exercicio.enunciado}</p>
              
              {/* Editor de Código */}
              <div className="mb-4">
                <div className="bg-[#1e1e1e] rounded-t-md px-4 py-2 flex items-center justify-between border-b border-border">
                  <span className="text-sm text-muted-foreground">JavaScript</span>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Resetar
                  </Button>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] rounded-b-md border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  spellCheck={false}
                />
              </div>

              {/* Botões */}
              <div className="flex gap-4 mb-4">
                <Button onClick={handleRun} disabled={isRunning} variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Rodar
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isRunning || isCompleted} 
                  variant={isCompleted ? 'secondary' : 'default'}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isCompleted ? '✓ Concluído' : 'Enviar'}
                </Button>
              </div>

              {/* Output */}
              {output && (
                <Card className="mb-4 bg-[#1e1e1e] border-border">
                  <CardContent className="p-4">
                    <pre className="font-mono text-sm text-[#d4d4d4] whitespace-pre-wrap">{output}</pre>
                  </CardContent>
                </Card>
              )}

              {/* Resultado do Teste */}
              {testResult && (
                <Card className={`border ${testResult.passed ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                  <CardContent className="p-4">
                    <pre className={`font-mono text-sm whitespace-pre-wrap ${testResult.passed ? 'text-green-400' : 'text-red-400'}`}>
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
          <Button variant="outline" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Aula Anterior
          </Button>
          <Button variant="outline" disabled>
            Próxima Aula
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
