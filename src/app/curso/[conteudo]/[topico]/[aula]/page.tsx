'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Play, Send } from 'lucide-react';
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
    testes: Array<{ input: any[]; output: any }>;
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
    conteudo: `
## Introdução

Funções são blocos de código reutilizáveis que realizam uma tarefa específica. Em JavaScript, funções são cidadãs de primeira classe, o que significa que podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções.

## Declarando Funções

A forma mais comum de declarar uma função é usando a palavra-chave \`function\`:

\`\`\`javascript
function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}
\`\`\`

## Parâmetros e Argumentos

Funções podem receber parâmetros que são usados dentro do corpo da função:

\`\`\`javascript
function somar(a, b) {
  return a + b;
}

const resultado = somar(5, 3); // 8
\`\`\`

## Retorno de Valores

Funções retornam valores usando a palavra-chave \`return\`:

\`\`\`javascript
function dobrar(numero) {
  return numero * 2;
}
\`\`\`
    `,
    exercicio: {
      enunciado: 'Crie uma função que soma dois números.',
      linguagem: 'javascript',
      codigoInicial: 'function somar(a, b) {\n  // seu código aqui\n}',
      testes: [
        { input: [2, 3], output: 5 },
        { input: [10, -4], output: 6 },
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
    conteudo: `
## Introdução

Arrow functions são uma sintaxe mais curta para escrever funções em JavaScript, introduzida no ES6. Elas são especialmente úteis para funções anônimas e callbacks.

## Sintaxe Básica

A sintaxe básica de uma arrow function é:

\`\`\`javascript
const saudacao = (nome) => {
  return \`Olá, \${nome}!\`;
};
\`\`\`

## Sintaxe Curta

Para funções com uma única expressão, podemos omitir as chaves e o \`return\`:

\`\`\`javascript
const somar = (a, b) => a + b;
const dobrar = (numero) => numero * 2;
\`\`\`

## Quando Usar

Arrow functions são ideais para:
- Callbacks
- Funções curtas
- Métodos de array (map, filter, reduce)
    `,
    exercicio: {
      enunciado: 'Converta a função tradicional para arrow function.',
      linguagem: 'javascript',
      codigoInicial: '// Converta para arrow function\nfunction multiplicar(a, b) {\n  return a * b;\n}',
      testes: [
        { input: [3, 4], output: 12 },
        { input: [5, 5], output: 25 },
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
    conteudo: `
## Introdução

Arrays em JavaScript possuem métodos poderosos para manipulação de dados. Vamos aprender os mais utilizados.

## filter()

O método \`filter\` cria um novo array com todos os elementos que passam no teste implementado pela função fornecida:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(numero => numero % 2 === 0);
// [2, 4]
\`\`\`

## map()

O método \`map\` cria um novo array com os resultados da chamada de uma função para cada elemento:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const dobrados = numeros.map(numero => numero * 2);
// [2, 4, 6, 8, 10]
\`\`\`

## reduce()

O método \`reduce\` executa uma função reducer para cada elemento, resultando em um único valor:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const soma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
// 15
\`\`\`
    `,
    exercicio: {
      enunciado: 'Use o método filter para retornar apenas números pares.',
      linguagem: 'javascript',
      codigoInicial: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Use filter para retornar apenas números pares\nconst pares = ;',
      testes: [
        { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], output: [2, 4, 6, 8, 10] },
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
    conteudo: `
## Introdução

O \`useState\` é um hook do React que permite adicionar estado a componentes funcionais. É um dos hooks mais fundamentais e utilizados.

## Sintaxe Básica

\`\`\`javascript
import React, { useState } from 'react';

function MeuComponente() {
  const [estado, setEstado] = useState(valorInicial);
  
  return (
    <div>
      <p>{estado}</p>
      <button onClick={() => setEstado(novoValor)}>
        Atualizar
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
\`\`\`

## Regras dos Hooks

1. Só chame hooks no nível superior
2. Só chame hooks dentro de componentes React
3. Só chame hooks em componentes funcionais
    `,
    exercicio: {
      enunciado: 'Crie um componente contador com useState.',
      linguagem: 'javascript',
      codigoInicial: "import React, { useState } from 'react';\n\nfunction Contador() {\n  // Use useState para criar um estado chamado 'contagem'\n  \n  return (\n    <div>\n      <p>Contagem: </p>\n      <button>Incrementar</button>\n    </div>\n  );\n}",
      testes: [
        { input: [], output: 'Componente renderiza com contagem 0' },
      ],
    },
  },
};

export default function AulaPage() {
  const params = useParams();
  const { setCurrentLesson, addXp } = useAppStore();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const lessonId = `${params.conteudo}-${params.topico}-${params.aula}`;
    const foundLesson = lessonsData[lessonId];
    
    if (foundLesson) {
      setLesson(foundLesson);
      setCurrentLesson(lessonId);
      if (foundLesson.exercicio) {
        setCode(foundLesson.exercicio.codigoInicial);
      }
    }
  }, [params, setCurrentLesson]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Executando...');
    
    setTimeout(() => {
      try {
        // Simulação simples de execução
        const func = new Function(code + '\nreturn somar(2, 3);');
        const result = func();
        setOutput(`Resultado: ${result}`);
      } catch (error: any) {
        setOutput(`Erro: ${error.message}`);
      }
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (!lesson?.exercicio) return;
    
    setIsRunning(true);
    setOutput('Validando...');
    
    setTimeout(() => {
      try {
        let allPassed = true;
        const results = [];
        
        for (const teste of lesson.exercicio!.testes) {
          try {
            const func = new Function(code + `\nreturn somar(${teste.input.join(', ')});`);
            const result = func();
            if (result === teste.output) {
              results.push(`✓ Teste ${teste.input} = ${teste.output} PASSOU`);
            } else {
              results.push(`✗ Teste ${teste.input} = ${teste.output} FALHOU (obtido: ${result})`);
              allPassed = false;
            }
          } catch (error: any) {
            results.push(`✗ Teste ${teste.input} ERRO: ${error.message}`);
            allPassed = false;
          }
        }
        
        setOutput(results.join('\n'));
        
        if (allPassed) {
          setIsCompleted(true);
          addXp(lesson.xp);
          setOutput(prev => prev + `\n\n🎉 Parabéns! Você ganhou ${lesson.xp} XP!`);
        }
      } catch (error: any) {
        setOutput(`Erro: ${error.message}`);
      }
      setIsRunning(false);
    }, 1000);
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
            <span>{lesson.conteudoId}</span>
            <span>/</span>
            <span>{lesson.topicoId}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{lesson.titulo}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>⏱️ {lesson.duracaoEstimada}</span>
            <span>⭐ +{lesson.xp} XP</span>
          </div>
        </div>

        {/* Conteúdo da Aula */}
        <Card className="mb-8">
          <CardContent className="prose prose-invert max-w-none p-6">
            <div dangerouslySetInnerHTML={{ __html: lesson.conteudo.replace(/\n/g, '<br/>') }} />
          </CardContent>
        </Card>

        {/* Exercício */}
        {lesson.exercicio && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Exercício Prático
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{lesson.exercicio.enunciado}</p>
              
              {/* Editor de Código */}
              <div className="mb-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  spellCheck={false}
                />
              </div>

              {/* Botões */}
              <div className="flex gap-4 mb-4">
                <Button onClick={handleRun} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  Rodar
                </Button>
                <Button onClick={handleSubmit} disabled={isRunning || isCompleted} variant={isCompleted ? 'secondary' : 'default'}>
                  <Send className="h-4 w-4 mr-2" />
                  {isCompleted ? 'Concluído' : 'Enviar'}
                </Button>
              </div>

              {/* Output */}
              {output && (
                <Card className="bg-[#1e1e1e]">
                  <CardContent className="p-4">
                    <pre className="font-mono text-sm text-[#d4d4d4] whitespace-pre-wrap">{output}</pre>
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
