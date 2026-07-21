'use client';

import { TechnologyPage } from '@/components/TechnologyPage';

const htmlTopics = [
  {
    id: 'introducao',
    nome: 'Introducao',
    lessons: [
      { id: 'html-introducao-01', titulo: 'O que e HTML?', xp: 30, duracao: '10min' },
      { id: 'html-introducao-02', titulo: 'Elementos e Atributos', xp: 30, duracao: '10min' },
    ],
  },
  {
    id: 'tags-basicas',
    nome: 'Tags Basicas',
    lessons: [
      { id: 'html-tags-01', titulo: 'Titulos e Paragrafos', xp: 35, duracao: '12min' },
      { id: 'html-tags-02', titulo: 'Links e Navegacao', xp: 35, duracao: '12min' },
    ],
  },
  {
    id: 'formularios',
    nome: 'Formularios',
    lessons: [
      { id: 'html-formularios-01', titulo: 'Formularios HTML', xp: 40, duracao: '15min' },
    ],
  },
  {
    id: 'semanticas',
    nome: 'Semanticas',
    lessons: [
      { id: 'html-semanticas-01', titulo: 'HTML Semantico', xp: 40, duracao: '15min' },
    ],
  },
  {
    id: 'tabelas',
    nome: 'Tabelas',
    lessons: [
      { id: 'html-tabelas-01', titulo: 'Criando Tabelas', xp: 45, duracao: '15min' },
    ],
  },
  {
    id: 'imagens',
    nome: 'Imagens e Midia',
    lessons: [
      { id: 'html-imagens-01', titulo: 'Imagens e Midia', xp: 45, duracao: '15min' },
    ],
  },
  {
    id: 'layouts',
    nome: 'Layouts',
    lessons: [
      { id: 'html-layouts-01', titulo: 'Divs e Spans', xp: 45, duracao: '12min' },
      { id: 'html-layouts-02', titulo: 'Flexbox Basico', xp: 50, duracao: '18min' },
    ],
  },
  {
    id: 'projeto',
    nome: 'Projeto Final',
    lessons: [
      { id: 'html-projeto-01', titulo: 'Pagina Completa', xp: 60, duracao: '30min' },
    ],
  },
];

export default function HTMLPage() {
  return (
    <TechnologyPage
      techId="html"
      titulo="HTML"
      descricao="Aprenda a estruturar paginas web com HTML"
      topics={htmlTopics}
    />
  );
}
