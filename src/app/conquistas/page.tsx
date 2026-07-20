'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, Star, Zap, Target, Award, Crown, BookOpen, Flame, Calendar } from 'lucide-react';
import { useAppStore } from '@/store';

interface Achievement {
  id: string;
  nome: string;
  descricao: string;
  icone: React.ReactNode;
  criterio: string;
  xp: number;
  check: (state: { completedLessons: string[]; xpTotal: number; nivel: number; achievements: string[] }) => boolean;
}

const allAchievements: Achievement[] = [
  {
    id: 'primeira-aula',
    nome: 'Primeira Aula',
    descricao: 'Complete sua primeira aula',
    icone: <BookOpen className="h-8 w-8" />,
    criterio: 'Complete qualquer aula',
    xp: 100,
    check: (state) => state.completedLessons.length >= 1,
  },
  {
    id: '3-aulas',
    nome: 'Estudante Dedicado',
    descricao: 'Complete 3 aulas',
    icone: <Star className="h-8 w-8" />,
    criterio: 'Complete 3 aulas',
    xp: 150,
    check: (state) => state.completedLessons.length >= 3,
  },
  {
    id: '5-aulas',
    nome: 'Estudante Focado',
    descricao: 'Complete 5 aulas',
    icone: <Flame className="h-8 w-8" />,
    criterio: 'Complete 5 aulas',
    xp: 200,
    check: (state) => state.completedLessons.length >= 5,
  },
  {
    id: '10-aulas',
    nome: 'Estudante Dedicado',
    descricao: 'Complete 10 aulas',
    icone: <Flame className="h-8 w-8" />,
    criterio: 'Complete 10 aulas',
    xp: 300,
    check: (state) => state.completedLessons.length >= 10,
  },
  // Conquistas de HTML
  {
    id: 'html-basico',
    nome: 'HTML Básico',
    descricao: 'Complete a introdução ao HTML',
    icone: <BookOpen className="h-8 w-8" />,
    criterio: 'Complete html-introducao-01 e html-introducao-02',
    xp: 100,
    check: (state) => state.completedLessons.includes('html-introducao-01') && state.completedLessons.includes('html-introducao-02'),
  },
  {
    id: 'html-tags',
    nome: 'Tags HTML',
    descricao: 'Complete as aulas de tags básicas',
    icone: <Target className="h-8 w-8" />,
    criterio: 'Complete html-tags-01 e html-tags-02',
    xp: 100,
    check: (state) => state.completedLessons.includes('html-tags-01') && state.completedLessons.includes('html-tags-02'),
  },
  {
    id: 'html-formularios',
    nome: 'Formulários HTML',
    descricao: 'Complete a aula de formulários',
    icone: <Award className="h-8 w-8" />,
    criterio: 'Complete html-formularios-01',
    xp: 120,
    check: (state) => state.completedLessons.includes('html-formularios-01'),
  },
  {
    id: 'html-semanticas',
    nome: 'HTML Semântico',
    descricao: 'Complete a aula de HTML semântico',
    icone: <Crown className="h-8 w-8" />,
    criterio: 'Complete html-semanticas-01',
    xp: 120,
    check: (state) => state.completedLessons.includes('html-semanticas-01'),
  },
  {
    id: 'html-completo',
    nome: 'Mestre HTML',
    descricao: 'Complete todas as aulas de HTML',
    icone: <Trophy className="h-8 w-8" />,
    criterio: 'Complete todas as 6 aulas de HTML',
    xp: 300,
    check: (state) => 
      state.completedLessons.includes('html-introducao-01') && 
      state.completedLessons.includes('html-introducao-02') && 
      state.completedLessons.includes('html-tags-01') && 
      state.completedLessons.includes('html-tags-02') && 
      state.completedLessons.includes('html-formularios-01') && 
      state.completedLessons.includes('html-semanticas-01'),
  },
  // Conquistas de JavaScript
  {
    id: 'javascript-basico',
    nome: 'JavaScript Básico',
    descricao: 'Complete todas as aulas de Funções',
    icone: <Zap className="h-8 w-8" />,
    criterio: 'Complete js-funcoes-01 e js-funcoes-02',
    xp: 200,
    check: (state) => state.completedLessons.includes('js-funcoes-01') && state.completedLessons.includes('js-funcoes-02'),
  },
  {
    id: 'javascript-arrays',
    nome: 'Mestre de Arrays',
    descricao: 'Complete a aula de Métodos de Array',
    icone: <Target className="h-8 w-8" />,
    criterio: 'Complete js-arrays-01',
    xp: 150,
    check: (state) => state.completedLessons.includes('js-arrays-01'),
  },
  {
    id: 'javascript-completo',
    nome: 'Mestre JavaScript',
    descricao: 'Complete todas as aulas de JavaScript',
    icone: <Award className="h-8 w-8" />,
    criterio: 'Complete todas as aulas de JavaScript',
    xp: 400,
    check: (state) => 
      state.completedLessons.includes('js-funcoes-01') && 
      state.completedLessons.includes('js-funcoes-02') && 
      state.completedLessons.includes('js-arrays-01'),
  },
  // Conquistas de React
  {
    id: 'react-iniciante',
    nome: 'React Iniciante',
    descricao: 'Complete a aula de useState',
    icone: <Crown className="h-8 w-8" />,
    criterio: 'Complete react-hooks-01',
    xp: 200,
    check: (state) => state.completedLessons.includes('react-hooks-01'),
  },
  // Conquistas de Nível
  {
    id: 'nivel-2',
    nome: 'Nível 2',
    descricao: 'Alcance o nível 2',
    icone: <Star className="h-8 w-8" />,
    criterio: 'Ganhe 100 XP',
    xp: 50,
    check: (state) => state.nivel >= 2,
  },
  {
    id: 'nivel-3',
    nome: 'Nível 3',
    descricao: 'Alcance o nível 3',
    icone: <Star className="h-8 w-8" />,
    criterio: 'Ganhe 200 XP',
    xp: 100,
    check: (state) => state.nivel >= 3,
  },
  {
    id: 'nivel-5',
    nome: 'Nível 5',
    descricao: 'Alcance o nível 5',
    icone: <Star className="h-8 w-8" />,
    criterio: 'Ganhe 500 XP',
    xp: 200,
    check: (state) => state.nivel >= 5,
  },
  // Conquista Final
  {
    id: 'todas-aulas',
    nome: 'Mestre Dev Academy',
    descricao: 'Complete todas as aulas disponíveis',
    icone: <Trophy className="h-8 w-8" />,
    criterio: 'Complete todas as 10 aulas',
    xp: 1000,
    check: (state) => state.completedLessons.length >= 10,
  },
];

export default function ConquistasPage() {
  const { achievements, xpTotal, nivel, completedLessons } = useAppStore();

  const state = { completedLessons, xpTotal, nivel, achievements };

  const getAchievementStatus = (achievement: Achievement) => {
    return achievements.includes(achievement.id) || achievement.check(state);
  };

  const unlockedAchievements = allAchievements.filter(a => getAchievementStatus(a));
  const lockedAchievements = allAchievements.filter(a => !getAchievementStatus(a));
  const totalXpFromAchievements = unlockedAchievements.reduce((acc, a) => acc + a.xp, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Conquistas</h1>
              <p className="text-muted-foreground">Desbloqueie badges completando desafios</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{unlockedAchievements.length}</p>
                  <p className="text-xs text-muted-foreground">Desbloqueadas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Star className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalXpFromAchievements}</p>
                  <p className="text-xs text-muted-foreground">XP de Conquistas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Nível {nivel}</p>
                  <p className="text-xs text-muted-foreground">{xpTotal} XP Total</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conquistas Desbloqueadas */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Desbloqueadas ({unlockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className="border-primary/50 shadow-lg shadow-primary/10 bg-primary/5"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-primary">
                        {achievement.icone}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">
                            {achievement.nome}
                          </h3>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                            +{achievement.xp} XP
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.descricao}
                        </p>
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {achievement.criterio}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-green-500">
                          <Award className="h-4 w-4" />
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
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              Bloqueadas ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lockedAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className="opacity-60"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-muted-foreground">
                        <Lock className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-muted-foreground">
                            {achievement.nome}
                          </h3>
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            +{achievement.xp} XP
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.descricao}
                        </p>
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-muted-foreground" />
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Progresso das Conquistas</CardTitle>
            <CardDescription>
              {unlockedAchievements.length} de {allAchievements.length} conquistas desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-secondary rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / allAchievements.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {Math.round((unlockedAchievements.length / allAchievements.length) * 100)}% completo
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
