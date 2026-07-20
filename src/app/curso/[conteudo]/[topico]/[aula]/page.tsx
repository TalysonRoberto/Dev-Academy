'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Code, Play, Send, Trophy, Clock } from 'lucide-react';
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
    testes: Array<{ input: any[]; output: any; functionName?: string }>;
  };
}

// Dados de exemplo (será substituído pelo parser MDX)
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

## Escopo de Variáveis

Variáveis declaradas dentro de uma função são locais:

\`\`\`javascript
function exemplo() {
  const mensagem = "Olá!";
  console.log(mensagem); // Funciona
}

// console.log(mensagem); // Erro! mensagem não existe aqui
\`\`\`

## Exercício

Agora é sua vez! Crie uma função chamada \`somar\` que recebe dois números como parâmetros e retorna a soma deles.`,
    exercicio: {
      enunciado: 'Crie uma função chamada `somar` que recebe dois números e retorna a soma deles.',
      linguagem: 'javascript',
      codigoInicial: `function somar(a, b) {
  // Seu código aqui
}`,
      testes: [
        { input: [2, 3], output: 5, functionName: 'somar' },
        { input: [10, -4], output: 6, functionName: 'somar' },
        { input: [0, 0], output: 0, functionName: 'somar' },
        { input: [100, 50], output: 150, functionName: 'somar' },
      ],
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

Arrow functions são uma sintaxe mais curta para escrever funções em JavaScript, introduzida no ES6. Elas são especialmente úteis para funções anônimas e callbacks.

## Sintaxe Básica

A sintaxe básica de uma arrow function é:

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

Para funções com uma única expressão, podemos omitir as chaves e o \`return\`:

\`\`\`javascript
// Com chaves e return
const somar = (a, b) => {
  return a + b;
};

// Sem chaves e return (implícito)
const somarCurto = (a, b) => a + b;

// Com um parâmetro (parênteses opcionais)
const dobrar = numero => numero * 2;

// Sem parâmetros
const saudacao = () => "Olá!";
\`\`\`

## Quando Usar

Arrow functions são ideais para:

- **Callbacks**: \`array.map(x => x * 2)\`
- **Funções curtas**: \`const dobro = n => n * 2\`
- **Métodos de array**: \`filter\`, \`map\`, \`reduce\`

## Diferença Principal

Arrow functions não têm seu próprio \`this\`:

\`\`\`javascript
const objeto = {
  nome: "Dev Academy",
  saudacao: function() {
    console.log(this.nome); // "Dev Academy"
  },
  saudacaoArrow: () => {
    console.log(this.nome); // undefined (herda do escopo pai)
  }
};
\`\`\``,
    exercicio: {
      enunciado: 'Converta a função tradicional para uma arrow function.',
      linguagem: 'javascript',
      codigoInicial: `// Converta esta função para arrow function
function multiplicar(a, b) {
  return a * b;
}`,
      testes: [
        { input: [3, 4], output: 12, functionName: 'multiplicar' },
        { input: [5, 5], output: 25, functionName: 'multiplicar' },
        { input: [0, 10], output: 0, functionName: 'multiplicar' },
        { input: [-2, 3], output: -6, functionName: 'multiplicar' },
      ],
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

Arrays em JavaScript possuem métodos poderosos para manipulação de dados. Vamos aprender os mais utilizados.

## filter()

O método \`filter\` cria um novo array com todos os elementos que passam no teste:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filtrar números pares
const pares = numeros.filter(numero => numero % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Filtrar números maiores que 5
const maioresQue5 = numeros.filter(numero => numero > 5);
console.log(maioresQue5); // [6, 7, 8, 9, 10]
\`\`\`

## map()

O método \`map\` cria um novo array com os resultados da chamada de uma função:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// Dobrar cada número
const dobrados = numeros.map(numero => numero * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

// Converter para string
const strings = numeros.map(numero => \`Número: \${numero}\`);
console.log(strings); // ["Número: 1", "Número: 2", ...]
\`\`\`

## reduce()

O método \`reduce\` executa uma função reducer para cada elemento, resultando em um único valor:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// Somar todos os números
const soma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(soma); // 15

// Encontrar o maior número
const maior = numeros.reduce((max, numero) => numero > max ? numero : max, 0);
console.log(maior); // 5
\`\`\`

## find()

O método \`find\` retorna o primeiro elemento que satisfaz a condição:

\`\`\`javascript
const usuarios = [
  { nome: "Ana", idade: 25 },
  { nome: "João", idade: 30 },
  { nome: "Maria", idade: 28 }
];

const joao = usuarios.find(u => u.nome === "João");
console.log(joao); // { nome: "João", idade: 30 }
\`\`\``,
    exercicio: {
      enunciado: 'Use o método `filter` para retornar apenas números pares do array.',
      linguagem: 'javascript',
      codigoInicial: `const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Use filter para retornar apenas números pares
const pares = numeros.filter();`,
      testes: [
        { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], output: [2, 4, 6, 8, 10], functionName: 'filter' },
      ],
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

O \`useState\` é um hook do React que permite adicionar estado a componentes funcionais. É um dos hooks mais fundamentais e utilizados.

## Sintaxe Básica

\`\`\`javascript
import React, { useState } from 'react';

function MeuComponente() {
  // useState retorna [valor, funçãoParaAtualizar]
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

## Como Funciona

1. **Declaração**: \`const [estado, setEstado] = useState(valorInicial)\`
2. **Leitura**: Use \`estado\` para ler o valor atual
3. **Atualização**: Use \`setEstado(novoValor)\` para atualizar

## Exemplo: Contador

\`\`\`javascript
import React, { useState } from 'react';

function Contador() {
  const [contagem, setContagem] = useState(0);

  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContagem(0)}>
        Resetar
      </button>
    </div>
  );
}
\`\`\`

## Exemplo: Formulário

\`\`\`javascript
import React, { useState } from 'react';

function Formulario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nome:", nome, "Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
\`\`\`

## Regras dos Hooks

1. **Nível superior**: Só chame hooks no nível superior do componente
2. **Componentes React**: Só chame hooks dentro de componentes funcionais
3. **Não condicional**: Não chame hooks dentro de if/else/loops

## Dica Importante

O \`useState\` é assíncrono. Se precisar do valor atualizado imediatamente, use a forma funcional:

\`\`\`javascript
// Errado (pode usar valor desatualizado)
setContagem(contagem + 1);

// Correto (usa o valor mais recente)
setContagem(prev => prev + 1);
\`\`\``,
    exercicio: {
      enunciado: 'Crie um componente contador usando `useState` que incrementa ao clicar no botão.',
      linguagem: 'javascript',
      codigoInicial: `import React, { useState } from 'react';

function Contador() {
  // Crie o estado 'contagem' com valor inicial 0

  return (
    <div>
      <p>Contagem: </p>
      <button>Incrementar</button>
    </div>
  );
}`,
      testes: [
        { input: [], output: 'useState(0)', functionName: 'Contador' },
      ],
    },
  },
};

export default function AulaPage() {
  const params = useParams();
  const { setCurrentLesson, addXp, completeLesson, completedLessons } = useAppStore();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  useEffect(() => {
    const lessonId = `${params.conteudo}-${params.topico}-${params.aula}`;
    const foundLesson = lessonsData[lessonId];
    
    if (foundLesson) {
      setLesson(foundLesson);
      setCurrentLesson(lessonId);
      if (foundLesson.exercicio) {
        setCode(foundLesson.exercicio.codigoInicial);
      }
      // Verificar se a aula já foi concluída
      if (completedLessons.includes(lessonId)) {
        setIsCompleted(true);
      }
    }
  }, [params, setCurrentLesson]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Executando...');
    setTestResults([]);
    
    setTimeout(() => {
      try {
        // Executar o código do usuário
        const userCode = code;
        
        // Verificar se a função existe
        const funcMatch = userCode.match(/function\s+(\w+)/);
        if (!funcMatch) {
          setOutput('❌ Erro: Nenhuma função encontrada. Certifique-se de declarar uma função.');
          setIsRunning(false);
          return;
        }
        
        const funcName = funcMatch[1];
        const func = new Function(userCode + `\nreturn ${funcName};`)();
        
        // Testar com o primeiro caso
        if (lesson?.exercicio?.testes && lesson.exercicio.testes.length > 0) {
          const teste = lesson.exercicio.testes[0];
          const result = func(...teste.input);
          setOutput(`✅ Função '${funcName}' executada com sucesso!\n\nResultado: ${funcName}(${teste.input.join(', ')}) = ${result}`);
        } else {
          setOutput(`✅ Função '${funcName}' declarada corretamente!`);
        }
      } catch (error: any) {
        setOutput(`❌ Erro: ${error.message}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleSubmit = () => {
    if (!lesson?.exercicio) return;
    
    setIsRunning(true);
    setOutput('Validando...');
    setTestResults([]);
    
    setTimeout(() => {
      try {
        const userCode = code;
        const results: Array<{ passed: boolean; message: string }> = [];
        let allPassed = true;
        
        // Verificar se a função existe
        const funcMatch = userCode.match(/function\s+(\w+)/);
        if (!funcMatch) {
          setOutput('❌ Erro: Nenhuma função encontrada. Certifique-se de declarar uma função.');
          setIsRunning(false);
          return;
        }
        
        const funcName = funcMatch[1];
        const func = new Function(userCode + `\nreturn ${funcName};`)();
        
        for (const teste of lesson.exercicio!.testes) {
          try {
            const result = func(...teste.input);
            if (result === teste.output) {
              results.push({
                passed: true,
                message: `✅ ${funcName}(${teste.input.join(', ')}) = ${teste.output}`
              });
            } else {
              results.push({
                passed: false,
                message: `❌ ${funcName}(${teste.input.join(', ')}) = ${teste.output} (obtido: ${result})`
              });
              allPassed = false;
            }
          } catch (error: any) {
            results.push({
              passed: false,
              message: `❌ ${funcName}(${teste.input.join(', ')}) ERRO: ${error.message}`
            });
            allPassed = false;
          }
        }
        
        setTestResults(results);
        
        if (allPassed) {
          setIsCompleted(true);
          addXp(lesson.xp);
          completeLesson(lesson.id);
          setOutput(`🎉 Parabéns! Todos os testes passaram!\n\n+${lesson.xp} XP`);
        } else {
          setOutput('Alguns testes falharam. Verifique os resultados abaixo.');
        }
      } catch (error: any) {
        setOutput(`❌ Erro: ${error.message}`);
      }
      setIsRunning(false);
    }, 500);
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
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                      {children}
                    </h3>
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
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">
                      {children}
                    </em>
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
                  <span className="text-xs text-muted-foreground">editor.js</span>
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

              {/* Resultados dos Testes */}
              {testResults.length > 0 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Resultados dos Testes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-md text-sm font-mono ${
                            result.passed 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {result.message}
                        </div>
                      ))}
                    </div>
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
