'use client';

import { TechnologyPage } from '@/components/TechnologyPage';

const jsTopics = [
  {
    id: 'introducao',
    nome: 'Introducao',
    lessons: [
      { id: 'js-introducao-01', titulo: 'O que e JavaScript?', xp: 30, duracao: '10min' },
      { id: 'js-introducao-02', titulo: 'Onde o JS Roda', xp: 30, duracao: '10min' },
    ],
  },
  {
    id: 'variaveis',
    nome: 'Variaveis e Tipos',
    lessons: [
      { id: 'js-variaveis-01', titulo: 'Variaveis (var, let, const)', xp: 30, duracao: '12min' },
      { id: 'js-variaveis-02', titulo: 'Tipos de Dados', xp: 30, duracao: '12min' },
    ],
  },
  {
    id: 'operadores',
    nome: 'Operadores e Decisao',
    lessons: [
      { id: 'js-operadores-01', titulo: 'Operadores Aritmeticos', xp: 30, duracao: '12min' },
      { id: 'js-operadores-02', titulo: 'Condicionais (if/else)', xp: 40, duracao: '15min' },
    ],
  },
  {
    id: 'loops',
    nome: 'Loops e Repeticao',
    lessons: [
      { id: 'js-loops-01', titulo: 'Lacos for e while', xp: 40, duracao: '15min' },
      { id: 'js-loops-02', titulo: 'Metodos de Array', xp: 50, duracao: '18min' },
    ],
  },
  {
    id: 'funcoes',
    nome: 'Funcoes',
    lessons: [
      { id: 'js-funcoes-01', titulo: 'Declarando Funcoes', xp: 40, duracao: '15min' },
      { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 40, duracao: '12min' },
    ],
  },
  {
    id: 'arrays',
    nome: 'Arrays e Objetos',
    lessons: [
      { id: 'js-arrays-01', titulo: 'Trabalhando com Arrays', xp: 40, duracao: '15min' },
      { id: 'js-arrays-02', titulo: 'Objetos e Propriedades', xp: 40, duracao: '15min' },
    ],
  },
  {
    id: 'dom',
    nome: 'DOM e Eventos',
    lessons: [
      { id: 'js-dom-01', titulo: 'Selecionando Elementos', xp: 40, duracao: '15min' },
      { id: 'js-dom-02', titulo: 'Eventos (addEventListener)', xp: 50, duracao: '18min' },
    ],
  },
  {
    id: 'assincrono',
    nome: 'Assincronismo',
    lessons: [
      { id: 'js-assincrono-01', titulo: 'Promises e Fetch', xp: 50, duracao: '18min' },
      { id: 'js-assincrono-02', titulo: 'Async/Await', xp: 50, duracao: '15min' },
    ],
  },
  {
    id: 'projeto',
    nome: 'Projeto Final',
    lessons: [
      { id: 'js-projeto-01', titulo: 'To-Do List Interativa', xp: 70, duracao: '40min' },
    ],
  },
];

export default function JavaScriptPage() {
  return (
    <TechnologyPage
      techId="javascript"
      titulo="JavaScript"
      descricao="Aprenda a programar com JavaScript - 700 XP disponivel"
      topics={jsTopics}
    />
  );
}
