'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Lock, Star, Zap, Target, Flame, Award, Crown } from 'lucide-react';
import { useAppStore } from '@/store';

interface Achievement {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  criterio: string;
  desbloqueada: boolean;
  xp: number;
}

const allAchievements: Achievement[] = [
  {
    id: 'primeira-aula',
    nome: 'Primeira Aula',
    descricao: 'Complete sua primeira aula',
    icone: '🎓',
    criterio: 'Complete qualquer aula',
    desbloqueada: false,
    xp: 100,
  },
  {
    id: '5-exercicios',
    nome: '5 Exercícios Seguidos',
    descricao: 'Complete 5 exercícios sem errar',
    icone: '🔥',
    criterio: 'Acerte 5 exercícios consecutivos',
    desbloqueada: false,
    xp: 200,
  },
  {
    id: 'conteudo-completo',
    nome: 'Conteúdo 100%',
    descricao: 'Complete todas as aulas de um conteúdo',
    icone: '🏆',
    criterio: 'Complete todas as aulas de JavaScript ou React',
    desbloqueada: false,
    xp: 500,
  },
  {
    id: 'sequencia-3-dias',
    nome: 'Sequência de 3 Dias',
    descricao: 'Estude por 3 dias consecutivos',
    icone: '📅',
    criterio: 'Acesse a plataforma 3 dias seguidos',
    desbloqueada: false,
    xp: 150,
  },
  {
    id: 'mestre-javascript',
    nome: 'Mestre JavaScript',
    descricao: 'Complete todas as aulas de JavaScript',
    icone: '⚡',
    criterio: 'Complete Funções e Arrays',
    desbloqueada: false,
    xp: 300,
  },
  {
    id: 'mestre-react',
    nome: 'Mestre React',
    descricao: 'Complete todas as aulas de React',
    icone: '⚛️',
    criterio: 'Complete todos os Hooks',
    desbloqueada: false,
    xp: 300,
  },
  {
    id: 'nivel-5',
    nome: 'Nível 5',
    descricao: 'Alcance o nível 5',
    icone: '⭐',
    criterio: 'Ganhe 500 XP total',
    desbloqueada: false,
    xp: 250,
  },
  {
    id: 'nivel-10',
    nome: 'Nível 10',
    descricao: 'Alcance o nível 10',
    icone: '👑',
    criterio: 'Ganhe 1000 XP total',
    desbloqueada: false,
    xp: 500,
  },
];

export default function ConquistasPage() {
  const { achievements, xpTotal, nivel } = useAppStore();

  const getAchievementStatus = (achievement: Achievement) => {
    return achievements.includes(achievement.id);
  };

  const unlockedCount = allAchievements.filter(a => getAchievementStatus(a)).length;
  const totalXpFromAchievements = allAchievements
    .filter(a => getAchievementStatus(a))
    .reduce((acc, a) => acc + a.xp, 0);

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
                  <p className="text-2xl font-bold text-foreground">{unlockedCount}</p>
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

        {/* Grid de Conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAchievements.map((achievement) => {
            const isUnlocked = getAchievementStatus(achievement);
            
            return (
              <Card 
                key={achievement.id}
                className={`transition-all duration-300 ${
                  isUnlocked 
                    ? 'border-primary/50 shadow-lg shadow-primary/10' 
                    : 'opacity-60 grayscale'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl ${isUnlocked ? '' : 'grayscale'}`}>
                      {isUnlocked ? achievement.icone : '🔒'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">
                          {achievement.nome}
                        </h3>
                        {isUnlocked && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            +{achievement.xp} XP
                          </span>
                        )}
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
                      {isUnlocked && (
                        <div className="mt-2 flex items-center gap-1 text-green-500">
                          <Award className="h-4 w-4" />
                          <span className="text-xs font-medium">Desbloqueada!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progresso */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Progresso das Conquistas</CardTitle>
            <CardDescription>
              {unlockedCount} de {allAchievements.length} conquistas desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-secondary rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedCount / allAchievements.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {Math.round((unlockedCount / allAchievements.length) * 100)}% completo
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
