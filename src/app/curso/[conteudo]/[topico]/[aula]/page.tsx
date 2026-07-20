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
  // JavaScript
  'js-funcoes-01': { id: 'js-funcoes-01', conteudoId: 'javascript', topicoId: 'funcoes', titulo: 'Funções em JavaScript', xp: 50, duracaoEstimada: '15min', conteudo: `## Introdução\n\nFunções são blocos de código reutilizáveis.\n\n## Declarando Funções\n\n\`\`\`javascript\nfunction somar(a, b) {\n  return a + b;\n}\n\nconsole.log(somar(5, 3)); // 8\n\`\`\`\n\n## Retorno de Valores\n\n\`\`\`javascript\nfunction dobrar(numero) {\n  return numero * 2;\n}\n\`\`\``, exercicio: { enunciado: 'Crie uma função chamada `somar` que recebe dois números e retorna a soma.', linguagem: 'javascript', codigoInicial: 'function somar(a, b) {\n  // Seu código aqui\n}', validationCode: 'try { const r1 = somar(2, 3); const r2 = somar(10, -4); return r1 === 5 && r2 === 6; } catch(e) { return false; }', testDescription: 'Verifica se somar(2,3)=5 e somar(10,-4)=6' } },
  'js-funcoes-02': { id: 'js-funcoes-02', conteudoId: 'javascript', topicoId: 'funcoes', titulo: 'Arrow Functions', xp: 50, duracaoEstimada: '10min', conteudo: `## Introdução\n\nArrow functions são uma sintaxe mais curta para escrever funções em JavaScript.\n\n## Sintaxe\n\n\`\`\`javascript\nconst somar = (a, b) => a + b;\nconst dobrar = numero => numero * 2;\n\`\`\``, exercicio: { enunciado: 'Converta a função para arrow function.', linguagem: 'javascript', codigoInicial: 'function multiplicar(a, b) {\n  return a * b;\n}', validationCode: 'if (typeof multiplicar !== "function") return false; return multiplicar(3, 4) === 12 && multiplicar(5, 5) === 25;', testDescription: 'Verifica se multiplicar é arrow function' } },
  'js-arrays-01': { id: 'js-arrays-01', conteudoId: 'javascript', topicoId: 'arrays', titulo: 'Métodos de Array', xp: 50, duracaoEstimada: '20min', conteudo: `## Introdução\n\nArrays em JavaScript possuem métodos poderosos para manipulação de dados.\n\n## filter()\n\n\`\`\`javascript\nconst numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconst pares = numeros.filter(numero => numero % 2 === 0);\nconsole.log(pares); // [2, 4, 6, 8, 10]\n\`\`\`\n\n## map()\n\n\`\`\`javascript\nconst numeros = [1, 2, 3, 4, 5];\nconst dobrados = numeros.map(numero => numero * 2);\nconsole.log(dobrados); // [2, 4, 6, 8, 10]\n\`\`\``, exercicio: { enunciado: 'Use o método `filter` para retornar apenas números pares do array.', linguagem: 'javascript', codigoInicial: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst pares = numeros.filter();', validationCode: 'if (!Array.isArray(pares)) return false; if (pares.length !== 5) return false; return JSON.stringify(pares) === JSON.stringify([2, 4, 6, 8, 10]);', testDescription: 'Verifica se pares contém [2, 4, 6, 8, 10]' } },
  // React
  'react-hooks-01': { id: 'react-hooks-01', conteudoId: 'react', topicoId: 'hooks', titulo: 'useState', xp: 50, duracaoEstimada: '15min', conteudo: `## Introdução\n\nO \`useState\` é um hook do React que permite adicionar estado a componentes funcionais.\n\n## Sintaxe Básica\n\n\`\`\`javascript\nfunction Contador() {\n  const [contagem, setContagem] = useState(0);\n\n  return (\n    <div>\n      <p>Contagem: {contagem}</p>\n      <button onClick={() => setContagem(contagem + 1)}>\n        Incrementar\n      </button>\n    </div>\n  );\n}\n\`\`\``, exercicio: { enunciado: 'Declare uma variável de estado `contagem` usando useState com valor inicial 0.', linguagem: 'javascript', codigoInicial: "import React, { useState } from 'react';\n\nfunction Contador() {\n  // Declare o estado 'contagem' com valor inicial 0\n\n  return (\n    <div>\n      <p>Contagem: </p>\n      <button>Incrementar</button>\n    </div>\n  );\n}", validationCode: 'useState(0); [contagem, setContagem]; contagem + 1;', testDescription: 'Verifica se useState(0) está sendo usado corretamente' } },
  // HTML - Introdução
  'html-introducao-01': { id: 'html-introducao-01', conteudoId: 'html', topicoId: 'introducao', titulo: 'O que é HTML?', xp: 30, duracaoEstimada: '10min', conteudo: `## Introdução\n\nHTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Ele define a **estrutura** e o **conteúdo** de uma página.\n\n## Conceito Explicado\n\nTodo documento HTML é uma árvore de **elementos**:\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Título da Página</title>\n</head>\n<body>\n    <h1>Olá, Mundo!</h1>\n    <p>Este é meu primeiro site.</p>\n</body>\n</html>\n\`\`\`\n\n## Exemplo Visual\n\n**Sem HTML:** Texto puro, sem estrutura\n\n**Com HTML:** Página com hierarquia, semântica e estilos padrão\n\n## Boas Práticas\n\n- ✅ Sempre declare \`<!DOCTYPE html>\`\n- ✅ Use \`lang="pt-BR"\` no \`<html>\`\n- ❌ Não esqueça as tags de fechamento`, exercicio: { enunciado: 'Monte a estrutura mínima de um documento HTML com as tags html, head, title e body.', linguagem: 'html', codigoInicial: '<!-- Monte a estrutura aqui -->', validationCode: "const hasHtml = code.includes('<html') && code.includes('</html>'); const hasHead = code.includes('<head') && code.includes('</head>'); const hasBody = code.includes('<body') && code.includes('</body>'); const hasTitle = code.includes('<title') && code.includes('</title>'); return hasHtml && hasHead && hasBody && hasTitle;", testDescription: 'Verifica se tem <html>, <head>, <title> e <body>' } },
  'html-introducao-02': { id: 'html-introducao-02', conteudoId: 'html', topicoId: 'introducao', titulo: 'Elementos e Atributos', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\n**Elementos** são os blocos de construção do HTML. **Atributos** fornecem informações adicionais.\n\n## Conceito Explicado\n\n\`\`\`html\n<a href="https://google.com" target="_blank">Google</a>\n<img src="foto.jpg" alt="Descrição da foto">\n<input type="email" placeholder="seu@email.com">\n\`\`\`\n\n## Exemplo Visual\n\n**Sem atributos:** Tags genéricas sem funcionalidade\n\n**Com atributos:** Tags transformadas em elementos funcionais\n\n## Boas Práticas\n\n- ✅ Sempre use \`alt\` em \`<img>\`\n- ✅ Use \`type\` correto em \`<input>\`\n- ❌ Não use atributos sem valores`, exercicio: { enunciado: 'Adicione atributos corretos a 3 elementos: link com href, imagem com src+alt, input com type+placeholder.', linguagem: 'html', codigoInicial: '<!-- Adicione os atributos -->\n<a>Google</a>\n<img>\n<input>', validationCode: "const hasA = code.includes('<a') && code.includes('href='); const hasImg = code.includes('<img') && code.includes('src=') && code.includes('alt='); const hasInput = code.includes('<input') && code.includes('type=') && code.includes('placeholder='); return hasA && hasImg && hasInput;", testDescription: 'Verifica se link tem href, imagem tem src+alt, input tem type+placeholder' } },
  // HTML - Tags Básicas
  'html-tags-01': { id: 'html-tags-01', conteudoId: 'html', topicoId: 'tags-basicas', titulo: 'Títulos e Parágrafos', xp: 30, duracaoEstimada: '10min', conteudo: `## Introdução\n\nTítulos e parágrafos são os elementos mais básicos do HTML.\n\n## Conceito Explicado\n\n\`\`\`html\n<h1>Título Principal</h1>\n<h2>Subtítulo</h2>\n<p>Este é um parágrafo.</p>\n\`\`\`\n\n## Exemplo Visual\n\n- h1: Maior, negrito\n- h2: Médio, negrito\n- p: Texto normal com espaçamento\n\n## Boas Práticas\n\n- ✅ Use apenas um \`<h1>\` por página\n- ✅ Não pule níveis de títulos\n- ❌ Não use títulos para deixar texto grande`, exercicio: { enunciado: 'Monte uma página com hierarquia de títulos (h1, h2, h3) e 2 parágrafos.', linguagem: 'html', codigoInicial: '<!-- Monte a página aqui -->', validationCode: "const hasH1 = code.includes('<h1') && code.includes('</h1>'); const hasH2 = code.includes('<h2') && code.includes('</h2>'); const hasH3 = code.includes('<h3') && code.includes('</h3>'); const hasP = (code.match(/<p[> ]/g) || []).length >= 2; return hasH1 && hasH2 && hasH3 && hasP;", testDescription: 'Verifica se tem h1, h2, h3 e pelo menos 2 parágrafos' } },
  'html-tags-02': { id: 'html-tags-02', conteudoId: 'html', topicoId: 'tags-basicas', titulo: 'Listas e Links', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nListas organizam itens em sequência. Links conectam páginas.\n\n## Conceito Explicado\n\n\`\`\`html\n<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ul>\n\n<a href="https://google.com">Google</a>\n\`\`\`\n\n## Exemplo Visual\n\n**Lista:** Itens com bullets ou números\n**Link:** Texto clicável que leva a outra página\n\n## Boas Práticas\n\n- ✅ Use \`<ul>\` para menus\n- ✅ Use \`<nav>\` para navegação\n- ❌ Não use \`<br>\` para criar listas`, exercicio: { enunciado: 'Crie um menu de navegação com lista de links para Início, Sobre e Contato.', linguagem: 'html', codigoInicial: '<!-- Crie o menu aqui -->', validationCode: "const hasUl = code.includes('<ul') && code.includes('</ul>'); const hasLi = (code.match(/<li[> ]/g) || []).length >= 3; const hasA = (code.match(/<a[> ]/g) || []).length >= 3; return hasUl && hasLi && hasA;", testDescription: 'Verifica se tem <ul> com 3 <li> contendo links' } },
  // HTML - Formulários
  'html-formularios-01': { id: 'html-formularios-01', conteudoId: 'html', topicoId: 'formularios', titulo: 'Criando Formulários', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nFormulários coletam dados do usuário. São essenciais para cadastros e logins.\n\n## Conceito Explicado\n\n\`\`\`html\n<form action="/cadastro" method="POST">\n    <label for="nome">Nome:</label>\n    <input type="text" id="nome" name="nome" required>\n    <button type="submit">Cadastrar</button>\n</form>\n\`\`\`\n\n## Exemplo Visual\n\nFormulário renderizado com campos, rótulos e botão.\n\n## Boas Práticas\n\n- ✅ Sempre use \`<label>\` com \`for\`\n- ✅ Use \`required\` para campos obrigatórios\n- ❌ Não esqueça o \`name\` nos inputs`, exercicio: { enunciado: 'Construa um formulário de cadastro com 4 campos e validação HTML nativa (required).', linguagem: 'html', codigoInicial: '<!-- Crie o formulário aqui -->', validationCode: "const hasForm = code.includes('<form') && code.includes('</form>'); const hasInput = (code.match(/<input/g) || []).length >= 4; const hasRequired = (code.match(/required/g) || []).length >= 3; const hasButton = code.includes('<button') || code.includes('type=\"submit\"'); return hasForm && hasInput && hasRequired && hasButton;", testDescription: 'Verifica se tem formulário com 4+ inputs, required e botão' } },
  'html-formularios-02': { id: 'html-formularios-02', conteudoId: 'html', topicoId: 'formularios', titulo: 'Tipos de Input e Validação', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nHTML5 trouxe muitos tipos de input específicos.\n\n## Conceito Explicado\n\n\`\`\`html\n<input type="text">\n<input type="email">\n<input type="number">\n<input type="date">\n<input type="tel">\n<textarea></textarea>\n\`\`\`\n\n## Exemplo Visual\n\nCada input renderiza diferente — date mostra calendário, number mostra botões +/-.\n\n## Boas Práticas\n\n- ✅ Use \`type="email"\` para emails\n- ✅ Use \`type="number"\` com \`min\`/\`max\`\n- ❌ Não use \`type="text"\` para tudo`, exercicio: { enunciado: 'Crie um formulário de contato usando ao menos 5 tipos de input diferentes.', linguagem: 'html', codigoInicial: '<!-- Crie o formulário aqui -->', validationCode: "const hasForm = code.includes('<form') && code.includes('</form>'); const hasText = code.includes('type=\"text\"'); const hasEmail = code.includes('type=\"email\"'); const hasNumber = code.includes('type=\"number\"'); const hasDate = code.includes('type=\"date\"'); const hasTextarea = code.includes('<textarea'); return hasForm && hasText && hasEmail && hasNumber && (hasDate || hasTextarea);", testDescription: 'Verifica se tem type text, email, number e date ou textarea' } },
  // HTML - Semântica
  'html-semanticas-01': { id: 'html-semanticas-01', conteudoId: 'html', topicoId: 'semanticas', titulo: 'Tags Semânticas', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nTags semânticas descrevem o **significado** do conteúdo.\n\n## Conceito Explicado\n\n\`\`\`html\n<header>  <!-- Cabeçalho -->\n<nav>     <!-- Navegação -->\n<main>    <!-- Conteúdo principal -->\n<section> <!-- Seção temática -->\n<footer>  <!-- Rodapé -->\n\`\`\`\n\n## Exemplo Visual\n\n**Sem semântica:** \`<div class="header">\` — sem significado\n\n**Com semântica:** \`<header>\` — navegador e leitores de tela entendem\n\n## Boas Práticas\n\n- ✅ Use \`<main>\` apenas uma vez por página\n- ✅ Use \`<nav>\` para menus\n- ❌ Não use \`<div>\` quando existe tag semântica`, exercicio: { enunciado: 'Refatore uma página feita só com div para usar tags semânticas (header, main, footer).', linguagem: 'html', codigoInicial: '<!-- Refatore aqui -->\n<div class="header">\n  <h1>Meu Site</h1>\n</div>\n<div class="content">\n  <p>Conteúdo</p>\n</div>', validationCode: "const hasHeader = code.includes('<header') && code.includes('</header>'); const hasMain = code.includes('<main') && code.includes('</main>'); const hasFooter = code.includes('<footer') || code.includes('<section'); return hasHeader && hasMain && hasFooter;", testDescription: 'Verifica se refatorou para tags semânticas' } },
  'html-semanticas-02': { id: 'html-semanticas-02', conteudoId: 'html', topicoId: 'semanticas', titulo: 'Acessibilidade Básica', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nAcessibilidade garante que pessoas com deficiência possam usar seu site.\n\n## Conceito Explicado\n\n\`\`\`html\n<img src="foto.jpg" alt="Pessoa sorrindo">\n<button aria-label="Fechar">X</button>\n<label for="email">Email:</label>\n<input type="email" id="email">\n\`\`\`\n\n## Exemplo Visual\n\n**Sem acessibilidade:** Leitores de tela não entendem elementos\n\n**Com acessibilidade:** Cada elemento tem descrição clara\n\n## Boas Práticas\n\n- ✅ Sempre use \`alt\` descritivo\n- ✅ Associe \`<label>\` a inputs\n- ✅ Use \`aria-label\` em botões sem texto`, exercicio: { enunciado: 'Corrija uma página: adicione alt em imagem, aria-label em botão e label em input.', linguagem: 'html', codigoInicial: '<!-- Corrija aqui -->\n<img src="foto.jpg">\n<button>X</button>\n<input type="text">', validationCode: "const hasImgAlt = code.includes('<img') && code.includes('alt='); const hasAriaLabel = code.includes('aria-label'); const hasLabel = code.includes('<label') || code.includes('aria-label'); return hasImgAlt && hasAriaLabel && hasLabel;", testDescription: 'Verifica se adicionou alt, aria-label e label' } },
  // HTML - Tabelas
  'html-tabelas-01': { id: 'html-tabelas-01', conteudoId: 'html', topicoId: 'tabelas', titulo: 'Tabelas', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nTabelas organizam dados em linhas e colunas. Use apenas para dados tabulares.\n\n## Conceito Explicado\n\n\`\`\`html\n<table>\n    <thead>\n        <tr>\n            <th>Nome</th>\n            <th>Idade</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>Ana</td>\n            <td>25</td>\n        </tr>\n    </tbody>\n</table>\n\`\`\`\n\n## Exemplo Visual\n\nTabela renderizada com cabeçalho destacado e bordas.\n\n## Boas Práticas\n\n- ✅ Use \`<thead>\` para cabeçalho\n- ✅ Use \`<tbody>\` para corpo\n- ❌ Não use tabelas para layout`, exercicio: { enunciado: 'Monte uma tabela de horário de aulas com cabeçalho e 3 linhas.', linguagem: 'html', codigoInicial: '<!-- Monte a tabela aqui -->', validationCode: "const hasTable = code.includes('<table') && code.includes('</table>'); const hasThead = code.includes('<thead'); const hasTbody = code.includes('<tbody'); const hasTh = (code.match(/<th[> ]/g) || []).length >= 3; return hasTable && hasThead && hasTbody && hasTh;", testDescription: 'Verifica se tem tabela com thead, tbody e 3+ th' } },
  // HTML - Imagens
  'html-imagens-01': { id: 'html-imagens-01', conteudoId: 'html', topicoId: 'imagens', titulo: 'Imagens, Áudio e Vídeo', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nHTML suporta mídia nativamente: imagens, áudio e vídeo.\n\n## Conceito Explicado\n\n\`\`\`html\n<img src="foto.jpg" alt="Descrição" style="max-width: 100%;">\n\n<audio controls>\n    <source src="musica.mp3" type="audio/mpeg">\n</audio>\n\n<video controls width="640">\n    <source src="video.mp4" type="video/mp4">\n</video>\n\`\`\`\n\n## Exemplo Visual\n\nImagem renderizada, players de áudio e vídeo com controles nativos.\n\n## Boas Práticas\n\n- ✅ Sempre use \`alt\` em imagens\n- ✅ Use \`max-width: 100%\` para responsividade\n- ❌ Não esqueça \`controls\` em áudio/vídeo`, exercicio: { enunciado: 'Insira uma imagem, áudio e vídeo em uma página.', linguagem: 'html', codigoInicial: '<!-- Insira mídia aqui -->', validationCode: "const hasImg = code.includes('<img') && code.includes('src=') && code.includes('alt='); const hasAudio = code.includes('<audio') && code.includes('controls'); const hasVideo = code.includes('<video') && code.includes('controls'); return hasImg && hasAudio && hasVideo;", testDescription: 'Verifica se tem img, audio e video com controls' } },
  // HTML - Layouts
  'html-layouts-01': { id: 'html-layouts-01', conteudoId: 'html', topicoId: 'layouts', titulo: 'Divs e Spans', xp: 45, duracaoEstimada: '12min', conteudo: `## Introdução\n\n\`<div>\` é um container genérico. \`<span>\` é inline para estilizar texto.\n\n## Conceito Explicado\n\n\`\`\`html\n<div class="card">\n  <h2>Título</h2>\n  <p>Conteúdo</p>\n</div>\n\n<p>Texto com <span class="destaque">palavra importante</span></p>\n\`\`\`\n\n## Exemplo Visual\n\n**div:** Ocupa linha inteira\n**span:** No fluxo do texto\n\n## Boas Práticas\n\n- ✅ Use \`<div>\` para containers\n- ✅ Use \`<span>\` para texto inline\n- ❌ Não use quando existe tag semântica`, exercicio: { enunciado: 'Crie uma div com class "card" contendo um h3 e um parágrafo.', linguagem: 'html', codigoInicial: '<!-- Crie a div aqui -->', validationCode: "const hasDiv = code.includes('<div') && code.includes('class=') && code.includes('card') && code.includes('</div>'); const hasH3 = code.includes('<h3'); const hasP = code.includes('<p'); return hasDiv && hasH3 && hasP;", testDescription: 'Verifica se tem div com class card, h3 e p' } },
  'html-layouts-02': { id: 'html-layouts-02', conteudoId: 'html', topicoId: 'layouts', titulo: 'Flexbox Básico', xp: 50, duracaoEstimada: '18min', conteudo: `## Introdução\n\nFlexbox é o sistema de layout mais usado no CSS moderno.\n\n## Conceito Explicado\n\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\`\`\`\n\n## Exemplo Visual\n\nLogo à esquerda, links à direita, alinhados verticalmente.\n\n## Boas Práticas\n\n- ✅ Use Flexbox para layouts unidimensionais\n- ✅ Use \`gap\` em vez de \`margin\` entre itens\n- ❌ Não use Flexbox para layouts 2D complexos`, exercicio: { enunciado: 'Monte uma barra de navegação responsiva com Flexbox.', linguagem: 'html', codigoInicial: '<!-- Crie a navbar -->\n<style>\n  nav { /* Adicione estilos */ }\n</style>\n<nav>\n  <div class="logo">MeuSite</div>\n  <ul>\n    <li><a href="#">Início</a></li>\n  </ul>\n</nav>', validationCode: "const hasDisplay = code.includes('display') && code.includes('flex'); const hasJustify = code.includes('justify-content'); return hasDisplay && hasJustify;", testDescription: 'Verifica se usou display: flex e justify-content' } },
  // HTML - Projeto Final
  'html-projeto-01': { id: 'html-projeto-01', conteudoId: 'html', topicoId: 'projeto', titulo: 'Estruturando uma Página Completa', xp: 60, duracaoEstimada: '30min', conteudo: `## Introdução\n\nProjeto final de HTML. Use tudo que aprendeu para criar uma landing page completa.\n\n## Conceito Explicado\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Landing Page</title>\n</head>\n<body>\n    <header>\n        <nav>Menu</nav>\n    </header>\n    <main>\n        <section class="hero"><h1>Bem-vindo</h1></section>\n        <section class="sobre"><h2>Sobre</h2></section>\n        <section class="contato"><h2>Contato</h2></section>\n    </main>\n    <footer><p>Rodapé</p></footer>\n</body>\n</html>\n\`\`\`\n\n## Exemplo Visual\n\nLanding page completa com header, nav, main e footer.\n\n## Boas Práticas\n\n- ✅ Use tags semânticas para toda a estrutura\n- ✅ Inclua \`meta viewport\` para responsividade\n- ❌ Não use \`<div>\` quando existe tag semântica`, exercicio: { enunciado: 'Construa uma landing page 100% semântica com header, nav, main (3 sections) e footer.', linguagem: 'html', codigoInicial: '<!-- Construa a landing page aqui -->', validationCode: "const hasHeader = code.includes('<header') && code.includes('</header>'); const hasNav = code.includes('<nav') && code.includes('</nav>'); const hasMain = code.includes('<main') && code.includes('</main>'); const hasFooter = code.includes('<footer') && code.includes('</footer>'); const hasSection = (code.match(/<section/g) || []).length >= 2; return hasHeader && hasNav && hasMain && hasFooter && hasSection;", testDescription: 'Verifica se tem header, nav, main com 2+ sections e footer' } },
  // CSS - Fundamentos
  'css-fundamentos-01': { id: 'css-fundamentos-01', conteudoId: 'css', topicoId: 'fundamentos', titulo: 'O que é CSS e Como Aplicar', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nCSS (Cascading Style Sheets) controla a **aparência** visual do HTML.\n\n## Conceito Explicado\n\n\`\`\`html\n<!-- Inline -->\n<p style="color: red;">Texto vermelho</p>\n\n<!-- Interno -->\n<style>\n  p { color: red; font-size: 20px; }\n</style>\n\n<!-- Externo -->\n<link rel="stylesheet" href="estilos.css">\n\`\`\`\n\n## Exemplo Visual\n\n**Sem CSS:** Texto preto, tamanhos padrão\n\n**Com CSS:** Cores, tamanhos e estilos personalizados\n\n## Boas Práticas\n\n- ✅ Use CSS externo para projetos reais\n- ✅ Use CSS interno para protótipos rápidos\n- ❌ Não misture inline com externo desnecessariamente`, exercicio: { enunciado: 'Aplique CSS externo a uma página HTML dada.', linguagem: 'html', codigoInicial: '<!-- Aplique CSS aqui -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Título</h1>\n  <p>Parágrafo</p>\n</body>\n</html>', validationCode: "const hasStyle = code.includes('<style') || code.includes('style='); const hasColor = code.includes('color'); const hasFontSize = code.includes('font-size'); return hasStyle && hasColor && hasFontSize;", testDescription: 'Verifica se aplicou CSS com color e font-size' } },
  'css-fundamentos-02': { id: 'css-fundamentos-02', conteudoId: 'css', topicoId: 'fundamentos', titulo: 'Seletores (classe, id, elemento)', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nSeletores CSS determinam **quais elementos** serão estilizados.\n\n## Conceito Explicado\n\n\`\`\`css\np { color: blue; }           /* Elemento */\n.destaque { color: green; }  /* Classe */\n#titulo { font-size: 32px; } /* ID */\n\`\`\`\n\n## Exemplo Visual\n\nCada elemento recebe cor diferente baseado no seletor.\n\n## Boas Práticas\n\n- ✅ Use classes para estilos reutilizáveis\n- ✅ Use IDs para elementos únicos\n- ❌ Não use IDs para estilos que precisam ser reutilizados`, exercicio: { enunciado: 'Estilize elementos usando os 3 tipos de seletor: elemento, classe e id.', linguagem: 'html', codigoInicial: '<!-- Estilize aqui -->\n<style>\n  /* Adicione seletores */\n</style>\n<h1 id="titulo">Título</h1>\n<p>Parágrafo</p>\n<p class="destaque">Destaque</p>', validationCode: "const hasElement = code.includes('p {') || code.includes('p{'); const hasClass = code.includes('.destaque'); const hasId = code.includes('#titulo'); return hasElement && hasClass && hasId;", testDescription: 'Verifica se usou seletor elemento (p), classe (.destaque) e id (#titulo)' } },
  'css-fundamentos-03': { id: 'css-fundamentos-03', conteudoId: 'css', topicoId: 'fundamentos', titulo: 'Cores, Fontes e Texto', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nCSS oferece controle total sobre tipografia.\n\n## Conceito Explicado\n\n\`\`\`css\ncolor: red;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;\nline-height: 1.6;\n\`\`\`\n\n## Exemplo Visual\n\nCartão com título grande e parágrafo espaçado.\n\n## Boas Práticas\n\n- ✅ Use \`rem\` para tamanhos de fonte\n- ✅ Defina \`line-height\` para legibilidade\n- ❌ Não use mais de 2-3 fontes diferentes`, exercicio: { enunciado: 'Estilize um cartão com tipografia definida: título, parágrafo e cor.', linguagem: 'html', codigoInicial: '<!-- Estilize o cartão -->\n<style>\n  /* Adicione estilos */\n</style>\n<div class="card">\n  <h2>Título</h2>\n  <p>Descrição</p>\n</div>', validationCode: "const hasFontSize = code.includes('font-size'); const hasLineHeight = code.includes('line-height'); const hasColor = code.includes('color'); return hasFontSize && hasLineHeight && hasColor;", testDescription: 'Verifica se definiu font-size, line-height e color' } },
  // CSS - Box Model
  'css-boxmodel-01': { id: 'css-boxmodel-01', conteudoId: 'css', topicoId: 'box-model', titulo: 'Box Model (margin, padding, border)', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nTodo elemento HTML é uma caixa com 4 camadas.\n\n## Conceito Explicado\n\n\`\`\`css\n.card {\n  margin: 16px;\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n}\n\`\`\`\n\n## Exemplo Visual\n\nCards com espaçamento externo, interno e borda arredondada.\n\n## Boas Práticas\n\n- ✅ Use \`padding\` para espaço dentro\n- ✅ Use \`margin\` para espaço entre\n- ❌ Não use \`margin\` para espaço interno`, exercicio: { enunciado: 'Ajuste espaçamentos de uma lista de cards usando margin, padding e border.', linguagem: 'html', codigoInicial: '<!-- Ajuste os cards -->\n<style>\n  .card { /* Adicione estilos */ }\n</style>\n<div class="card">Card 1</div>\n<div class="card">Card 2</div>', validationCode: "const hasMargin = code.includes('margin'); const hasPadding = code.includes('padding'); const hasBorder = code.includes('border'); return hasMargin && hasPadding && hasBorder;", testDescription: 'Verifica se usou margin, padding e border' } },
  // CSS - Flexbox
  'css-flexbox-01': { id: 'css-flexbox-01', conteudoId: 'css', topicoId: 'flexbox', titulo: 'Flexbox na Prática', xp: 50, duracaoEstimada: '18min', conteudo: `## Introdução\n\nFlexbox é o sistema de layout mais usado no CSS moderno.\n\n## Conceito Explicado\n\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\`\`\`\n\n## Exemplo Visual\n\nLogo à esquerda, links à direita, alinhados.\n\n## Boas Práticas\n\n- ✅ Use Flexbox para layouts unidimensionais\n- ✅ Use \`gap\` em vez de \`margin\`\n- ❌ Não use Flexbox para layouts 2D`, exercicio: { enunciado: 'Monte uma barra de navegação responsiva com Flexbox.', linguagem: 'html', codigoInicial: '<!-- Crie a navbar -->\n<style>\n  nav { /* Adicione estilos */ }\n</style>\n<nav>\n  <div class="logo">MeuSite</div>\n  <ul>\n    <li><a href="#">Início</a></li>\n  </ul>\n</nav>', validationCode: "const hasDisplay = code.includes('display') && code.includes('flex'); const hasJustify = code.includes('justify-content'); return hasDisplay && hasJustify;", testDescription: 'Verifica se usou display: flex e justify-content' } },
  // CSS - Grid
  'css-grid-01': { id: 'css-grid-01', conteudoId: 'css', topicoId: 'grid', titulo: 'Grid Layout na Prática', xp: 50, duracaoEstimada: '18min', conteudo: `## Introdução\n\nCSS Grid é ideal para layouts bidimensionais.\n\n## Conceito Explicado\n\n\`\`\`css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\`\`\`\n\n## Exemplo Visual\n\nGrid 3x3 com itens alinhados uniformemente.\n\n## Boas Práticas\n\n- ✅ Use Grid para layouts 2D\n- ✅ Use \`repeat()\` para padrões repetitivos\n- ❌ Não use Grid para layouts 1D`, exercicio: { enunciado: 'Crie uma galeria de imagens em grid 3x3.', linguagem: 'html', codigoInicial: '<!-- Crie a galeria -->\n<style>\n  /* Adicione estilos */\n</style>\n<div class="grid">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n  <div>5</div>\n  <div>6</div>\n  <div>7</div>\n  <div>8</div>\n  <div>9</div>\n</div>', validationCode: "const hasGrid = code.includes('display') && code.includes('grid'); const hasColumns = code.includes('grid-template-columns'); return hasGrid && hasColumns;", testDescription: 'Verifica se usou display: grid e grid-template-columns' } },
  // CSS - Responsividade
  'css-responsividade-01': { id: 'css-responsividade-01', conteudoId: 'css', topicoId: 'responsividade', titulo: 'Media Queries e Design Responsivo', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nMedia queries permitem aplicar estilos diferentes por tamanho de tela.\n\n## Conceito Explicado\n\n\`\`\`css\n@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: 1fr 1fr 1fr; }\n}\n\`\`\`\n\n## Exemplo Visual\n\nMobile: 1 coluna | Tablet: 2 colunas | Desktop: 3 colunas\n\n## Boas Práticas\n\n- ✅ Use mobile-first\n- ✅ Teste em diferentes tamanhos\n- ❌ Não crie muitos breakpoints`, exercicio: { enunciado: 'Torne uma página com 3 colunas responsiva para mobile.', linguagem: 'html', codigoInicial: '<!-- Torne responsivo -->\n<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 16px;\n  }\n</style>', validationCode: "const hasMedia = code.includes('@media'); const hasMaxWidth = code.includes('max-width') || code.includes('min-width'); return hasMedia && hasMaxWidth;", testDescription: 'Verifica se usou @media com max-width ou min-width' } },
  'css-responsividade-02': { id: 'css-responsividade-02', conteudoId: 'css', topicoId: 'responsividade', titulo: 'Unidades Relativas', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nUnidades relativas tornam o layout flexível.\n\n## Conceito Explicado\n\n\`\`\`css\n/* Fixo */\nwidth: 960px;\n\n/* Relativo */\nwidth: min(960px, 100%);\npadding: 0 2rem;\n\`\`\`\n\n## Exemplo Visual\n\nLayout fixo corta em mobile, relativo se adapta.\n\n## Boas Práticas\n\n- ✅ Use \`rem\` para fontes\n- ✅ Use \`%\` ou \`fr\` para larguras\n- ❌ Não use \`px\` para larguras de layout`, exercicio: { enunciado: 'Refatore um layout fixo em px para unidades relativas.', linguagem: 'html', codigoInicial: '<!-- Refatore -->\n<style>\n  .container { width: 960px; padding: 32px; }\n</style>', validationCode: "const hasPercent = code.includes('%'); const hasRem = code.includes('rem'); const hasVw = code.includes('vw') || code.includes('vh'); return hasPercent || hasRem || hasVw;", testDescription: 'Verifica se usou unidades relativas' } },
  // CSS - Efeitos
  'css-efeitos-01': { id: 'css-efeitos-01', conteudoId: 'css', topicoId: 'efeitos', titulo: 'Transições e Hover', xp: 30, duracaoEstimada: '12min', conteudo: `## Introdução\n\nTransições e hover criam interatividade suave.\n\n## Conceito Explicado\n\n\`\`\`css\n.btn {\n  transition: all 0.2s ease;\n}\n.btn:hover {\n  background: darkblue;\n  transform: scale(1.05);\n}\n\`\`\`\n\n## Exemplo Visual\n\nBotão que muda cor, sobe e ganha sombra ao hover.\n\n## Boas Práticas\n\n- ✅ Duração 150ms-300ms para micro-interações\n- ✅ Use \`ease\` ou \`ease-in-out\`\n- ❌ Não use \`transition: all\` em produção`, exercicio: { enunciado: 'Crie um botão com efeito de hover e transição suave.', linguagem: 'html', codigoInicial: '<!-- Crie o botão -->\n<style>\n  .btn {\n    padding: 12px 24px;\n    background: #3b82f6;\n    color: white;\n    border: none;\n    border-radius: 8px;\n  }\n</style>\n<button class="btn">Clique aqui</button>', validationCode: "const hasTransition = code.includes('transition'); const hasHover = code.includes(':hover'); return hasTransition && hasHover;", testDescription: 'Verifica se usou transition e :hover' } },
  'css-efeitos-02': { id: 'css-efeitos-02', conteudoId: 'css', topicoId: 'efeitos', titulo: 'Animações com @keyframes', xp: 40, duracaoEstimada: '15min', conteudo: `## Introdução\n\nAnimações CSS criam movimento complexo sem JavaScript.\n\n## Conceito Explicado\n\n\`\`\`css\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.elemento {\n  animation: fadeIn 0.5s ease-out;\n}\n\`\`\`\n\n## Exemplo Visual\n\nCard desliza da esquerda e aparece suavemente.\n\n## Boas Práticas\n\n- ✅ Use \`animation\` para movimento complexo\n- ✅ Use \`transition\` para hover/focus\n- ❌ Não anime width/height (causa layout shift)`, exercicio: { enunciado: 'Crie uma animação de entrada (fade in + slide up).', linguagem: 'html', codigoInicial: '<!-- Crie a animação -->\n<style>\n  .card {\n    padding: 20px;\n    background: white;\n    border-radius: 8px;\n  }\n</style>\n<div class="card">Conteúdo animado</div>', validationCode: "const hasKeyframes = code.includes('@keyframes'); const hasAnimation = code.includes('animation'); return hasKeyframes && hasAnimation;", testDescription: 'Verifica se usou @keyframes e animation' } },
  // CSS - Projeto Final
  'css-projeto-01': { id: 'css-projeto-01', conteudoId: 'css', topicoId: 'projeto', titulo: 'Estilizando a Landing Page', xp: 60, duracaoEstimada: '30min', conteudo: `## Introdução\n\nProjeto final de CSS. Aplique todos os conceitos aprendidos.\n\n## Conceito Explicado\n\n\`\`\`css\n* { margin: 0; padding: 0; box-sizing: border-box; }\nnav { display: flex; justify-content: space-between; }\n.hero { display: grid; place-items: center; min-height: 80vh; }\n@media (max-width: 768px) { nav ul { display: none; } }\n\`\`\`\n\n## Exemplo Visual\n\nLanding page estilizada com header fixo, hero, cards e footer.\n\n## Boas Práticas\n\n- ✅ Comece pelo mobile (mobile-first)\n- ✅ Use variáveis CSS para cores\n- ❌ Não sobrescreva estilos desnecessariamente`, exercicio: { enunciado: 'Aplique todo o CSS na landing page criada no projeto final de HTML.', linguagem: 'html', codigoInicial: '<!-- Estilize a landing page -->\n<style>\n  /* Adicione todos os estilos */\n</style>\n<header>\n  <nav>Menu</nav>\n</header>\n<main>\n  <section>Hero</section>\n  <section>Sobre</section>\n</main>\n<footer>Rodapé</footer>', validationCode: "const hasBackground = code.includes('background'); const hasFlex = code.includes('display') && (code.includes('flex') || code.includes('grid')); const hasMedia = code.includes('@media'); return hasBackground && (hasFlex || hasMedia);", testDescription: 'Verifica se aplicou background, layout ou media queries' } },
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

  const checkAchievements = (lessonId: string, newCompleted: string[], newXp: number, newNivel: number) => {
    const checks = [
      { id: 'primeira-aula', condition: newCompleted.length >= 1 },
      { id: '3-aulas', condition: newCompleted.length >= 3 },
      { id: '5-aulas', condition: newCompleted.length >= 5 },
      { id: '10-aulas', condition: newCompleted.length >= 10 },
      { id: 'html-basico', condition: newCompleted.includes('html-introducao-01') && newCompleted.includes('html-introducao-02') },
      { id: 'html-completo', condition: newCompleted.includes('html-introducao-01') && newCompleted.includes('html-introducao-02') && newCompleted.includes('html-tags-01') && newCompleted.includes('html-tags-02') && newCompleted.includes('html-formularios-01') && newCompleted.includes('html-semanticas-01') && newCompleted.includes('html-tabelas-01') && newCompleted.includes('html-imagens-01') && newCompleted.includes('html-layouts-01') && newCompleted.includes('html-layouts-02') },
      { id: 'css-basico', condition: newCompleted.includes('css-fundamentos-01') && newCompleted.includes('css-fundamentos-02') },
      { id: 'css-completo', condition: newCompleted.includes('css-fundamentos-01') && newCompleted.includes('css-fundamentos-02') && newCompleted.includes('css-seletores-01') && newCompleted.includes('css-seletores-02') && newCompleted.includes('css-boxmodel-01') && newCompleted.includes('css-flexbox-01') && newCompleted.includes('css-grid-01') && newCompleted.includes('css-efeitos-01') && newCompleted.includes('css-efeitos-02') },
      { id: 'javascript-basico', condition: newCompleted.includes('js-funcoes-01') && newCompleted.includes('js-funcoes-02') },
      { id: 'javascript-completo', condition: newCompleted.includes('js-funcoes-01') && newCompleted.includes('js-funcoes-02') && newCompleted.includes('js-arrays-01') },
      { id: 'react-iniciante', condition: newCompleted.includes('react-hooks-01') },
      { id: 'nivel-2', condition: newNivel >= 2 },
      { id: 'nivel-3', condition: newNivel >= 3 },
      { id: 'todas-aulas', condition: newCompleted.length >= 30 },
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
      if (foundLesson.exercicio) setCode(foundLesson.exercicio.codigoInicial);
      if (completedLessons.includes(lessonId)) setIsCompleted(true);
    }
  }, [params, setCurrentLesson, completedLessons]);

  const containsJSX = (code: string): boolean => code.includes('import React') || code.includes("from 'react'") || code.includes('useState') || code.includes('useEffect');

  const containsHTML = (code: string): boolean => ['<div', '<p', '<h1', '<a ', '<img', '<ul', '<table', '<form', '<input', '<button', '<header', '<nav', '<main', '<footer'].some(tag => code.includes(tag));

  const validateReactCode = (code: string): { passed: boolean; checks: string[] } => {
    const checks: string[] = [];
    let passed = true;
    if (code.includes('useState(0)')) checks.push('✅ useState(0) encontrado');
    else { checks.push('❌ useState(0) não encontrado'); passed = false; }
    if (code.includes('[contagem, setContagem]')) checks.push('✅ Desestruturação encontrada');
    else { checks.push('❌ Desestruturação não encontrada'); passed = false; }
    return { passed, checks };
  };

  const handleRun = () => {
    if (!lesson?.exercicio) return;
    setIsRunning(true);
    setOutput('Executando...');
    setTimeout(() => {
      try {
        const userCode = code;
        if (containsJSX(userCode)) {
          let out = '🔍 Análise do código React/JSX:\n\n';
          if (userCode.includes('import React')) out += '✅ Import do React encontrado\n';
          if (userCode.includes('useState')) out += '✅ useState está sendo usado\n';
          if (userCode.includes('return')) out += '✅ Return encontrado\n';
          out += '\nClique em "Enviar" para validar.';
          setOutput(out);
        } else if (containsHTML(userCode)) {
          let out = '🔍 Análise do código HTML:\n\n';
          ['html', 'head', 'body', 'div', 'p', 'h1', 'a', 'ul', 'table', 'form', 'input', 'button', 'header', 'nav', 'main', 'footer'].forEach(tag => {
            if (userCode.includes(`<${tag}`)) out += `✅ Tag <${tag}> encontrada\n`;
          });
          out += '\nClique em "Enviar" para validar.';
          setOutput(out);
        } else {
          try {
            const result = new Function(userCode + '\nreturn { pares: typeof pares !== "undefined" ? pares : undefined, multiplicar: typeof multiplicar !== "undefined" ? multiplicar : undefined, somar: typeof somar !== "undefined" ? somar : undefined };')();
            let out = '✅ Código executado com sucesso!\n\n';
            for (const [k, v] of Object.entries(result)) if (v !== undefined) out += `${k}: ${typeof v === 'function' ? 'function' : JSON.stringify(v)}\n`;
            setOutput(out);
          } catch (e: any) { setOutput(`❌ Erro: ${e.message}`); }
        }
      } catch (e: any) { setOutput(`❌ Erro: ${e.message}`); }
      setIsRunning(false);
    }, 500);
  };

  const handleSubmit = () => {
    if (!lesson?.exercicio) return;
    setIsRunning(true);
    setOutput('Validando...');
    setTimeout(() => {
      try {
        const userCode = code;
        if (containsJSX(userCode)) {
          const { passed, checks } = validateReactCode(userCode);
          if (passed) {
            setTestResult({ passed: true, message: `✅ Exercício concluído!\n\n${checks.join('\n')}` });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            checkAchievements(lesson.id, newCompleted, xpTotal + lesson.xp, Math.floor((xpTotal + lesson.xp) / 100) + 1);
            setOutput(`🎉 Parabéns! +${lesson.xp} XP`);
          } else {
            setTestResult({ passed: false, message: `❌ Ainda não está correto.\n\n${checks.join('\n')}` });
            setOutput('❌ Verifique e corrija seu código.');
          }
        } else if (containsHTML(userCode)) {
          const validate = new Function('code', lesson.exercicio!.validationCode);
          if (validate(userCode) === true) {
            setTestResult({ passed: true, message: `✅ Exercício concluído!\n\n${lesson.exercicio!.testDescription}` });
            setIsCompleted(true);
            addXp(lesson.xp);
            completeLesson(lesson.id);
            const newCompleted = [...completedLessons, lesson.id];
            checkAchievements(lesson.id, newCompleted, xpTotal + lesson.xp, Math.floor((xpTotal + lesson.xp) / 100) + 1);
            setOutput(`🎉 Parabéns! +${lesson.xp} XP`);
          } else {
            setTestResult({ passed: false, message: `❌ Ainda não está correto.\n\n${lesson.exercicio!.testDescription}` });
            setOutput('❌ Não passou na validação.');
          }
        } else {
          try {
            const validate = new Function(userCode + '\n' + lesson.exercicio!.validationCode);
            if (validate() === true) {
              setTestResult({ passed: true, message: `✅ Exercício concluído!\n\n${lesson.exercicio!.testDescription}` });
              setIsCompleted(true);
              addXp(lesson.xp);
              completeLesson(lesson.id);
              const newCompleted = [...completedLessons, lesson.id];
              checkAchievements(lesson.id, newCompleted, xpTotal + lesson.xp, Math.floor((xpTotal + lesson.xp) / 100) + 1);
              setOutput(`🎉 Parabéns! +${lesson.xp} XP`);
            } else {
              setTestResult({ passed: false, message: `❌ Ainda não está correto.\n\n${lesson.exercicio!.testDescription}` });
              setOutput('❌ Não passou na validação.');
            }
          } catch (e: any) {
            setTestResult({ passed: false, message: `❌ Erro: ${e.message}` });
            setOutput(`❌ Erro: ${e.message}`);
          }
        }
      } catch (e: any) {
        setTestResult({ passed: false, message: `❌ Erro: ${e.message}` });
        setOutput(`❌ Erro: ${e.message}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => { if (lesson?.exercicio) { setCode(lesson.exercicio.codigoInicial); setOutput(''); setTestResult(null); } };

  if (!lesson) return <Layout><div className="flex items-center justify-center h-full"><p className="text-muted-foreground">Aula não encontrada</p></div></Layout>;

  return (
    <Layout>
      {newAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Card className="border-yellow-500 bg-yellow-500/10 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-bold text-yellow-500 text-sm">Conquista Desbloqueada!</p>
                <p className="text-xs text-muted-foreground">{newAchievement}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className="capitalize">{lesson.conteudoId}</span>
            <span>/</span>
            <span className="capitalize">{lesson.topicoId}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{lesson.titulo}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duracaoEstimada}</span>
            <span className="flex items-center gap-1"><Trophy className="h-3 w-3" />+{lesson.xp} XP</span>
            {isCompleted && <span className="flex items-center gap-1 text-green-500">✓ Concluída</span>}
          </div>
        </div>
        <Card className="mb-6">
          <CardContent className="p-4">
            <MarkdownRenderer content={lesson.conteudo} />
          </CardContent>
        </Card>
        {lesson.exercicio && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Code className="h-4 w-4 text-primary" />Exercício Prático</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">{lesson.exercicio.enunciado}</p>
              <div className="mb-3">
                <div className="bg-[#1e1e1e] rounded-t-md px-3 py-1.5 flex items-center justify-between border-b border-border">
                  <span className="text-xs text-muted-foreground">Código</span>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-6 px-2 text-xs"><RotateCcw className="h-3 w-3 mr-1" />Resetar</Button>
                </div>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-40 p-3 font-mono text-xs bg-[#1e1e1e] text-[#d4d4d4] rounded-b-md border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none" spellCheck={false} />
              </div>
              <div className="flex gap-3 mb-3">
                <Button onClick={handleRun} disabled={isRunning} variant="outline" size="sm"><Play className="h-3 w-3 mr-1" />Rodar</Button>
                <Button onClick={handleSubmit} disabled={isRunning || isCompleted} variant={isCompleted ? 'secondary' : 'default'} size="sm"><Send className="h-3 w-3 mr-1" />{isCompleted ? '✓ Concluído' : 'Enviar'}</Button>
              </div>
              {output && <Card className="mb-3 bg-[#1e1e1e] border-border"><CardContent className="p-3"><pre className="font-mono text-xs text-[#d4d4d4] whitespace-pre-wrap">{output}</pre></CardContent></Card>}
              {testResult && <Card className={`border ${testResult.passed ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}><CardContent className="p-3"><pre className={`font-mono text-xs whitespace-pre-wrap ${testResult.passed ? 'text-green-400' : 'text-red-400'}`}>{testResult.message}</pre></CardContent></Card>}
            </CardContent>
          </Card>
        )}
        <div className="flex justify-between">
          <Button variant="outline" disabled size="sm"><ArrowLeft className="h-3 w-3 mr-1" />Aula Anterior</Button>
          <Button variant="outline" disabled size="sm">Próxima Aula<ArrowRight className="h-3 w-3 ml-1" /></Button>
        </div>
      </div>
    </Layout>
  );
}
