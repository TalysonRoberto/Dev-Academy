'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen, Clock, Trophy, Zap, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';

interface ContentProgress {
  id: string;
  nome: string;
  icone: string;
  totalLessons: number;
  completedLessons: number;
  totalXp: number;
  earnedXp: number;
  topics: TopicProgress[];
}

interface TopicProgress {
  id: string;
  nome: string;
  totalLessons: number;
  completedLessons: number;
}

// Dados de exemplo (será substituído pelo parser MDX)
const contentsProgress: ContentProgress[] = [
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: '⚡',
    totalLessons: 3,
    completedLessons: 0,
    totalXp: 150,
    earnedXp: 0,
    topics: [
      {
        id: 'funcoes',
        nome: 'Funções',
        totalLessons: 2,
        completedLessons: 0,
      },
      {
        id: 'arrays',
        nome: 'Arrays',
        totalLessons: 1,
        completedLessons: 0,
      },
    ],
  },
  {
    id: 'react',
    nome: 'React',
    icone: '⚛️',
    totalLessons: 1,
    completedLessons: 0,
    totalXp: 50,
    earnedXp: 0,
    topics: [
      {
        id: 'hooks',
        nome: 'Hooks',
        totalLessons: 1,
        completedLessons: 0,
      },
    ],
  },
];

export default function ProgressoPage() {
  const router = useRouter();
  const { xpTotal, nivel, achievements } = useAppStore();

  const totalLessons = contentsProgress.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessons = contentsProgress.reduce((acc, c) => acc + c.completedLessons, 0);
  const totalXpAvailable = contentsProgress.reduce((acc, c) => acc + c.totalXp, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meu Progresso</h1>
              <p className="text-muted-foreground">Acompanhe sua evolução nos estudos</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{xpTotal}</p>
                <p className="text-xs text-muted-foreground">XP Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Nível {nivel}</p>
                <p className="text-xs text-muted-foreground">Nível Atual</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedLessons}/{totalLessons}</p>
                <p className="text-xs text-muted-foreground">Aulas Concluídas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{achievements.length}</p>
                <p className="text-xs text-muted-foreground">Conquistas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso Geral */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progresso Geral</CardTitle>
            <CardDescription>
              {completedLessons} de {totalLessons} aulas concluídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={overallProgress} className="h-4" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{xpTotal} XP ganhos</span>
              <span>{totalXpAvailable - xpTotal} XP restantes</span>
            </div>
          </CardContent>
        </Card>

        {/* Progresso por Conteúdo */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Progresso por Conteúdo</h2>
          
          {contentsProgress.map((content) => {
            const progress = content.totalLessons > 0 
              ? (content.completedLessons / content.totalLessons) * 100 
              : 0;
            
            return (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{content.icone}</span>
                      <div>
                        <CardTitle>{content.nome}</CardTitle>
                        <CardDescription>
                          {content.completedLessons}/{content.totalLessons} aulas • {content.earnedXp}/{content.totalXp} XP
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push(`/curso/${content.id}/${content.topics[0]?.id || 'funcoes'}/01`)}
                    >
                      Continuar <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Progress value={progress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {Math.round(progress)}%
                    </p>
                  </div>
                  
                  {/* Tópicos */}
                  <div className="space-y-3">
                    {content.topics.map((topic) => {
                      const topicProgress = topic.totalLessons > 0
                        ? (topic.completedLessons / topic.totalLessons) * 100
                        : 0;
                      
                      return (
                        <div key={topic.id} className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {topicProgress === 100 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">
                                {topic.nome}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {topic.completedLessons}/{topic.totalLessons}
                              </span>
                            </div>
                            <Progress value={topicProgress} className="h-2" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dicas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dicas para Evoluir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Estude Regularmente</h4>
                  <p className="text-sm text-muted-foreground">
                    Dedique pelo menos 15 minutos por dia para manter o ritmo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Pratique os Exercícios</h4>
                  <p className="text-sm text-muted-foreground">
                    A teoria só fixa com prática. Faça todos os exercícios!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
