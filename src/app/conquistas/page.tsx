'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Lock, Star, Zap, Target, Award, Crown, BookOpen, Flame } from 'lucide-react';
import { useAppStore } from '@/store';
import { TechIcon } from '@/components/ui/TechIcon';

interface Achievement {
  id: string;
  nome: string;
  descricao: string;
  icone: React.ReactNode;
  criterio: string;
  check: (state: { completedLessons: string[]; xpTotal: number; nivel: number; achievements: string[] }) => boolean;
}

const allAchievements: Achievement[] = [
  {
    id: 'primeira-aula',
    nome: 'Primeira Aula',
    descricao: 'Complete sua primeira aula',
    icone: <BookOpen className="h-6 w-6" />,
    criterio: 'Complete qualquer aula',
    check: (state) => state.completedLessons.length >= 1,
  },
  {
    id: '3-aulas',
    nome: 'Estudante Dedicado',
    descricao: 'Complete 3 aulas',
    icone: <Star className="h-6 w-6" />,
    criterio: 'Complete 3 aulas',
    check: (state) => state.completedLessons.length >= 3,
  },
  {
    id: '5-aulas',
    nome: 'Estudante Focado',
    descricao: 'Complete 5 aulas',
    icone: <Flame className="h-6 w-6" />,
    criterio: 'Complete 5 aulas',
    check: (state) => state.completedLessons.length >= 5,
  },
  {
    id: '10-aulas',
    nome: 'Estudante Incansavel',
    descricao: 'Complete 10 aulas',
    icone: <Flame className="h-6 w-6" />,
    criterio: 'Complete 10 aulas',
    check: (state) => state.completedLessons.length >= 10,
  },
  {
    id: 'html-basico',
    nome: 'HTML Basico',
    descricao: 'Complete a introducao ao HTML',
    icone: <BookOpen className="h-6 w-6" />,
    criterio: 'Complete html-introducao-01 e html-introducao-02',
    check: (state) => state.completedLessons.includes('html-introducao-01') && state.completedLessons.includes('html-introducao-02'),
  },
  {
    id: 'html-tags',
    nome: 'Tags HTML',
    descricao: 'Complete as aulas de tags basicas',
    icone: <Target className="h-6 w-6" />,
    criterio: 'Complete html-tags-01 e html-tags-02',
    check: (state) => state.completedLessons.includes('html-tags-01') && state.completedLessons.includes('html-tags-02'),
  },
  {
    id: 'html-formularios',
    nome: 'Formularios HTML',
    descricao: 'Complete a aula de formularios',
    icone: <Award className="h-6 w-6" />,
    criterio: 'Complete html-formularios-01',
    check: (state) => state.completedLessons.includes('html-formularios-01'),
  },
  {
    id: 'html-semanticas',
    nome: 'HTML Semantico',
    descricao: 'Complete a aula de HTML semantico',
    icone: <Crown className="h-6 w-6" />,
    criterio: 'Complete html-semanticas-01',
    check: (state) => state.completedLessons.includes('html-semanticas-01'),
  },
  {
    id: 'html-tabelas',
    nome: 'Tabelas HTML',
    descricao: 'Complete a aula de tabelas',
    icone: <Target className="h-6 w-6" />,
    criterio: 'Complete html-tabelas-01',
    check: (state) => state.completedLessons.includes('html-tabelas-01'),
  },
  {
    id: 'html-imagens',
    nome: 'Imagens HTML',
    descricao: 'Complete a aula de imagens e midia',
    icone: <Star className="h-6 w-6" />,
    criterio: 'Complete html-imagens-01',
    check: (state) => state.completedLessons.includes('html-imagens-01'),
  },
  {
    id: 'html-layouts',
    nome: 'Layouts HTML',
    descricao: 'Complete as aulas de layouts',
    icone: <Crown className="h-6 w-6" />,
    criterio: 'Complete html-layouts-01 e html-layouts-02',
    check: (state) => state.completedLessons.includes('html-layouts-01') && state.completedLessons.includes('html-layouts-02'),
  },
  {
    id: 'html-completo',
    nome: 'Mestre HTML',
    descricao: 'Complete todas as aulas de HTML',
    icone: <Trophy className="h-6 w-6" />,
    criterio: 'Complete todas as 11 aulas de HTML',
    check: (state) => 
      state.completedLessons.includes('html-introducao-01') && 
      state.completedLessons.includes('html-introducao-02') && 
      state.completedLessons.includes('html-tags-01') && 
      state.completedLessons.includes('html-tags-02') && 
      state.completedLessons.includes('html-formularios-01') && 
      state.completedLessons.includes('html-semanticas-01') &&
      state.completedLessons.includes('html-tabelas-01') &&
      state.completedLessons.includes('html-imagens-01') &&
      state.completedLessons.includes('html-layouts-01') &&
      state.completedLessons.includes('html-layouts-02'),
  },
  {
    id: 'css-basico',
    nome: 'CSS Basico',
    descricao: 'Complete as aulas de fundamentos CSS',
    icone: <BookOpen className="h-6 w-6" />,
    criterio: 'Complete css-fundamentos-01 e css-fundamentos-02',
    check: (state) => state.completedLessons.includes('css-fundamentos-01') && state.completedLessons.includes('css-fundamentos-02'),
  },
  {
    id: 'css-seletores',
    nome: 'Seletores CSS',
    descricao: 'Complete as aulas de seletores',
    icone: <Target className="h-6 w-6" />,
    criterio: 'Complete css-seletores-01 e css-seletores-02',
    check: (state) => state.completedLessons.includes('css-seletores-01') && state.completedLessons.includes('css-seletores-02'),
  },
  {
    id: 'css-boxmodel',
    nome: 'Box Model',
    descricao: 'Complete as aulas de box model',
    icone: <Award className="h-6 w-6" />,
    criterio: 'Complete css-boxmodel-01 e css-boxmodel-02',
    check: (state) => state.completedLessons.includes('css-boxmodel-01') && state.completedLessons.includes('css-boxmodel-02'),
  },
  {
    id: 'css-flexbox',
    nome: 'Flexbox',
    descricao: 'Complete as aulas de flexbox',
    icone: <Crown className="h-6 w-6" />,
    criterio: 'Complete css-flexbox-01 e css-flexbox-02',
    check: (state) => state.completedLessons.includes('css-flexbox-01') && state.completedLessons.includes('css-flexbox-02'),
  },
  {
    id: 'css-completo',
    nome: 'Mestre CSS',
    descricao: 'Complete todas as aulas de CSS',
    icone: <Trophy className="h-6 w-6" />,
    criterio: 'Complete todas as 10 aulas de CSS',
    check: (state) => 
      state.completedLessons.includes('css-fundamentos-01') && 
      state.completedLessons.includes('css-fundamentos-02') && 
      state.completedLessons.includes('css-seletores-01') && 
      state.completedLessons.includes('css-seletores-02') && 
      state.completedLessons.includes('css-boxmodel-01') && 
      state.completedLessons.includes('css-boxmodel-02') &&
      state.completedLessons.includes('css-flexbox-01') &&
      state.completedLessons.includes('css-flexbox-02'),
  },
  {
    id: 'javascript-basico',
    nome: 'JavaScript Basico',
    descricao: 'Complete todas as aulas de Funcoes',
    icone: <Zap className="h-6 w-6" />,
    criterio: 'Complete js-funcoes-01 e js-funcoes-02',
    check: (state) => state.completedLessons.includes('js-funcoes-01') && state.completedLessons.includes('js-funcoes-02'),
  },
  {
    id: 'javascript-arrays',
    nome: 'Mestre de Arrays',
    descricao: 'Complete a aula de Metodos de Array',
    icone: <Target className="h-6 w-6" />,
    criterio: 'Complete js-arrays-01',
    check: (state) => state.completedLessons.includes('js-arrays-01'),
  },
  {
    id: 'javascript-completo',
    nome: 'Mestre JavaScript',
    descricao: 'Complete todas as aulas de JavaScript',
    icone: <Award className="h-6 w-6" />,
    criterio: 'Complete todas as aulas de JavaScript',
    check: (state) => 
      state.completedLessons.includes('js-funcoes-01') && 
      state.completedLessons.includes('js-funcoes-02') && 
      state.completedLessons.includes('js-arrays-01'),
  },
  {
    id: 'react-iniciante',
    nome: 'React Iniciante',
    descricao: 'Complete a aula de useState',
    icone: <Crown className="h-6 w-6" />,
    criterio: 'Complete react-hooks-01',
    check: (state) => state.completedLessons.includes('react-hooks-01'),
  },
  {
    id: 'nivel-2',
    nome: 'Nivel 2',
    descricao: 'Alcance o nivel 2',
    icone: <Star className="h-6 w-6" />,
    criterio: 'Ganhe 100 XP',
    check: (state) => state.nivel >= 2,
  },
  {
    id: 'nivel-3',
    nome: 'Nivel 3',
    descricao: 'Alcance o nivel 3',
    icone: <Star className="h-6 w-6" />,
    criterio: 'Ganhe 200 XP',
    check: (state) => state.nivel >= 3,
  },
  {
    id: 'nivel-5',
    nome: 'Nivel 5',
    descricao: 'Alcance o nivel 5',
    icone: <Star className="h-6 w-6" />,
    criterio: 'Ganhe 500 XP',
    check: (state) => state.nivel >= 5,
  },
  {
    id: 'todas-aulas',
    nome: 'Mestre Dev Academy',
    descricao: 'Complete todas as aulas disponiveis',
    icone: <Trophy className="h-6 w-6" />,
    criterio: 'Complete todas as 26 aulas',
    check: (state) => state.completedLessons.length >= 26,
  },
];

export default function ConquistasPage() {
  const { achievements, nivel, completedLessons } = useAppStore();

  const state = { completedLessons, xpTotal: 0, nivel, achievements };

  const getAchievementStatus = (achievement: Achievement) => {
    return achievements.includes(achievement.id) || achievement.check(state);
  };

  const unlockedAchievements = allAchievements.filter(a => getAchievementStatus(a));
  const lockedAchievements = allAchievements.filter(a => !getAchievementStatus(a));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Conquistas</h1>
              <p className="text-sm text-muted-foreground">Desbloqueie badges completando desafios</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{unlockedAchievements.length}</p>
                  <p className="text-xs text-muted-foreground">Desbloqueadas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">Nivel {nivel}</p>
                  <p className="text-xs text-muted-foreground">Nivel Atual</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookOpen className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{completedLessons.length}</p>
                  <p className="text-xs text-muted-foreground">Aulas Concluidas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conquistas Desbloqueadas */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Desbloqueadas ({unlockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className="border-primary/50 shadow-lg shadow-primary/10 bg-primary/5"
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="text-primary">
                        {achievement.icone}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-0.5">
                          {achievement.nome}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-1">
                          {achievement.descricao}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Target className="h-2.5 w-2.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {achievement.criterio}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-1 text-green-500">
                          <Award className="h-3 w-3" />
                          <span className="text-xs font-medium">Desbloqueada!</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Conquistas Bloqueadas */}
        {lockedAchievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Bloqueadas ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lockedAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className="opacity-60"
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="text-muted-foreground">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-0.5">
                          {achievement.nome}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-1">
                          {achievement.descricao}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Target className="h-2.5 w-2.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {achievement.criterio}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Progresso */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progresso das Conquistas</CardTitle>
            <CardDescription className="text-xs">
              {unlockedAchievements.length} de {allAchievements.length} conquistas desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / allAchievements.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 text-center">
              {Math.round((unlockedAchievements.length / allAchievements.length) * 100)}% completo
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
