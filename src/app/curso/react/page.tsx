'use client';

import { TechnologyPage } from '@/components/TechnologyPage';

const reactTopics = [
  {
    id: 'hooks',
    nome: 'Hooks',
    lessons: [
      { id: 'react-hooks-01', titulo: 'useState', xp: 50, duracao: '18min' },
    ],
  },
];

export default function ReactPage() {
  return (
    <TechnologyPage
      techId="react"
      titulo="React"
      descricao="Aprenda a criar interfaces com React"
      topics={reactTopics}
    />
  );
}
