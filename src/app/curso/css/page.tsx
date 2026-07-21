'use client';

import { TechnologyPage } from '@/components/TechnologyPage';

const cssTopics = [
  {
    id: 'fundamentos',
    nome: 'Fundamentos',
    lessons: [
      { id: 'css-fundamentos-01', titulo: 'Introducao ao CSS', xp: 50, duracao: '15min' },
      { id: 'css-fundamentos-02', titulo: 'Cores e Backgrounds', xp: 50, duracao: '12min' },
    ],
  },
  {
    id: 'seletores',
    nome: 'Seletores',
    lessons: [
      { id: 'css-seletores-01', titulo: 'Classes e IDs', xp: 55, duracao: '15min' },
      { id: 'css-seletores-02', titulo: 'Seletores Avancados', xp: 55, duracao: '18min' },
    ],
  },
  {
    id: 'box-model',
    nome: 'Box Model',
    lessons: [
      { id: 'css-boxmodel-01', titulo: 'Margin e Padding', xp: 55, duracao: '15min' },
      { id: 'css-boxmodel-02', titulo: 'Width e Height', xp: 55, duracao: '12min' },
    ],
  },
  {
    id: 'flexbox',
    nome: 'Flexbox',
    lessons: [
      { id: 'css-flexbox-01', titulo: 'Flexbox Basico', xp: 60, duracao: '18min' },
      { id: 'css-flexbox-02', titulo: 'Flexbox Avancado', xp: 60, duracao: '20min' },
    ],
  },
  {
    id: 'projeto',
    nome: 'Projeto Final',
    lessons: [
      { id: 'css-projeto-01', titulo: 'Pagina Completa', xp: 60, duracao: '30min' },
    ],
  },
];

export default function CSSPage() {
  return (
    <TechnologyPage
      techId="css"
      titulo="CSS"
      descricao="Aprenda a estilizar paginas web com CSS"
      topics={cssTopics}
    />
  );
}
