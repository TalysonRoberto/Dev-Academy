'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen, Clock, Trophy, Zap, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';

interface ContentData {
  id: string;
  nome: string;
  icone: string;
  totalXp: number;
  topics: TopicData[];
}

interface TopicData {
  id: string;
  nome: string;
  lessons: LessonData[];
}

interface LessonData {
  id: string;
  titulo: string;
  xp: number;
}

// Dados de exemplo (será substituído pelo parser MDX)
const contentsData: ContentData[] = [
  {
    id: 'html',
    nome: 'HTML',
    icone: '🌐',
    totalXp: 415,
    topics: [
      {
        id: 'introducao',
        nome: 'Introdução',
        lessons: [
          { id: 'html-introducao-01', titulo: 'O que é HTML?', xp: 30 },
          { id: 'html-introducao-02', titulo: 'Elementos e Atributos', xp: 30 },
        ],
      },
      {
        id: 'tags-basicas',
        nome: 'Tags Básicas',
        lessons: [
          { id: 'html-tags-01', titulo: 'Títulos e Parágrafos', xp: 30 },
          { id: 'html-tags-02', titulo: 'Listas e Links', xp: 30 },
        ],
      },
      {
        id: 'formularios',
        nome: 'Formulários',
        lessons: [
          { id: 'html-formularios-01', titulo: 'Criando Formulários', xp: 40 },
        ],
      },
      {
        id: 'semanticas',
        nome: 'Semântica',
        lessons: [
          { id: 'html-semanticas-01', titulo: 'HTML Semântico', xp: 40 },
        ],
      },
      {
        id: 'tabelas',
        nome: 'Tabelas',
        lessons: [
          { id: 'html-tabelas-01', titulo: 'Criando Tabelas', xp: 45 },
        ],
      },
      {
        id: 'imagens',
        nome: 'Imagens e Mídia',
        lessons: [
          { id: 'html-imagens-01', titulo: 'Imagens e Mídia', xp: 45 },
        ],
      },
      {
        id: 'css-basico',
        nome: 'CSS Básico',
        lessons: [
          { id: 'html-css-01', titulo: 'Introdução ao CSS', xp: 50 },
          { id: 'html-css-02', titulo: 'Classes e IDs', xp: 50 },
        ],
      },
      {
        id: 'layouts',
        nome: 'Layouts',
        lessons: [
          { id: 'html-layouts-01', titulo: 'Divs e Spans', xp: 45 },
          { id: 'html-layouts-02', titulo: 'Flexbox Básico', xp: 50 },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: '⚡',
    totalXp: 150,
    topics: [
      {
        id: 'funcoes',
        nome: 'Funções',
        lessons: [
          { id: 'js-funcoes-01', titulo: 'Funções em JavaScript', xp: 50 },
          { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 50 },
        ],
      },
      {
        id: 'arrays',
        nome: 'Arrays',
        lessons: [
          { id: 'js-arrays-01', titulo: 'Métodos de Array', xp: 50 },
        ],
      },
    ],
  },
  {
    id: 'react',
    nome: 'React',
    icone: '⚛️',
    totalXp: 50,
    topics: [
      {
        id: 'hooks',
        nome: 'Hooks',
        lessons: [
          { id: 'react-hooks-01', titulo: 'useState', xp: 50 },
        ],
      },
    ],
  },
];

export default function ProgressoPage() {
  const router = useRouter();
  const { xpTotal, nivel, achievements, completedLessons } = useAppStore();

  const totalLessons = contentsData.reduce(
    (acc, content) => acc + content.topics.reduce((tAcc, topic) => tAcc + topic.lessons.length, 0),
    0
  );
  const completedCount = completedLessons.length;
  const totalXpAvailable = contentsData.reduce((acc, content) => acc + content.totalXp, 0);
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const getContentProgress = (content: ContentData) => {
    const total = content.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
    const completed = content.topics.reduce(
      (acc, topic) => acc + topic.lessons.filter((l) => completedLessons.includes(l.id)).length,
      0
    );
    return { total, completed, percent: total > 0 ? (completed / total) * 100 : 0 };
  };

  const getTopicProgress = (topic: TopicData) => {
    const total = topic.lessons.length;
    const completed = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return { total, completed, percent: total > 0 ? (completed / total) * 100 : 0 };
  };

  const getContentXp = (content: ContentData) => {
    return content.topics.reduce(
      (acc, topic) => acc + topic.lessons.filter((l) => completedLessons.includes(l.id)).reduce((lAcc, l) => lAcc + l.xp, 0),
      0
    );
  };

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
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-500" />
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
                <p className="text-2xl font-bold text-foreground">{completedCount}/{totalLessons}</p>
                <p className="text-xs text-muted-foreground">Aulas Concluídas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-500" />
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
              {completedCount} de {totalLessons} aulas concluídas
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
          
          {contentsData.map((content) => {
            const progress = getContentProgress(content);
            const earnedXp = getContentXp(content);
            
            return (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{content.icone}</span>
                      <div>
                        <CardTitle>{content.nome}</CardTitle>
                        <CardDescription>
                          {progress.completed}/{progress.total} aulas • {earnedXp}/{content.totalXp} XP
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
                    <Progress value={progress.percent} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {Math.round(progress.percent)}%
                    </p>
                  </div>
                  
                  {/* Tópicos */}
                  <div className="space-y-3">
                    {content.topics.map((topic) => {
                      const topicProgress = getTopicProgress(topic);
                      
                      return (
                        <div key={topic.id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              {topic.nome}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {topicProgress.completed}/{topicProgress.total}
                            </span>
                          </div>
                          <Progress value={topicProgress.percent} className="h-2" />
                          
                          {/* Aulas */}
                          <div className="mt-2 ml-4 space-y-1">
                            {topic.lessons.map((lesson) => {
                              const isCompleted = completedLessons.includes(lesson.id);
                              
                              return (
                                <div 
                                  key={lesson.id}
                                  className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer hover:bg-accent/50 ${
                                    isCompleted ? 'text-green-500' : 'text-muted-foreground'
                                  }`}
                                  onClick={() => router.push(`/curso/${content.id}/${topic.id}/${lesson.id.split('-').pop()}`)}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-4 w-4 flex-shrink-0" />
                                  )}
                                  <span className="flex-1">{lesson.titulo}</span>
                                  <span className="text-xs">
                                    {isCompleted ? `+${lesson.xp} XP` : `${lesson.xp} XP`}
                                  </span>
                                </div>
                              );
                            })}
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
                    A teoria só fixa com pratique. Faça todos os exercícios!
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
