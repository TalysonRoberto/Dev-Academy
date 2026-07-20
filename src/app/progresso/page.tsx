'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen, Trophy, Zap, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
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

const contentsData: ContentData[] = [
  {
    id: 'html',
    nome: 'HTML',
    icone: '🌐',
    totalXp: 315,
    topics: [
      { id: 'introducao', nome: 'Introdução', lessons: [{ id: 'html-introducao-01', titulo: 'O que é HTML?', xp: 30 }, { id: 'html-introducao-02', titulo: 'Elementos e Atributos', xp: 30 }] },
      { id: 'tags-basicas', nome: 'Tags Básicas', lessons: [{ id: 'html-tags-01', titulo: 'Títulos e Parágrafos', xp: 30 }, { id: 'html-tags-02', titulo: 'Listas e Links', xp: 30 }] },
      { id: 'formularios', nome: 'Formulários', lessons: [{ id: 'html-formularios-01', titulo: 'Criando Formulários', xp: 40 }] },
      { id: 'semanticas', nome: 'Semântica', lessons: [{ id: 'html-semanticas-01', titulo: 'HTML Semântico', xp: 40 }] },
      { id: 'tabelas', nome: 'Tabelas', lessons: [{ id: 'html-tabelas-01', titulo: 'Criando Tabelas', xp: 45 }] },
      { id: 'imagens', nome: 'Imagens e Mídia', lessons: [{ id: 'html-imagens-01', titulo: 'Imagens e Mídia', xp: 45 }] },
      { id: 'layouts', nome: 'Layouts', lessons: [{ id: 'html-layouts-01', titulo: 'Divs e Spans', xp: 45 }, { id: 'html-layouts-02', titulo: 'Flexbox Básico', xp: 50 }] },
    ],
  },
  {
    id: 'css',
    nome: 'CSS',
    icone: '🎨',
    totalXp: 435,
    topics: [
      { id: 'fundamentos', nome: 'Fundamentos', lessons: [{ id: 'css-fundamentos-01', titulo: 'Introdução ao CSS', xp: 50 }, { id: 'css-fundamentos-02', titulo: 'Cores e Backgrounds', xp: 50 }] },
      { id: 'seletores', nome: 'Seletores', lessons: [{ id: 'css-seletores-01', titulo: 'Classes e IDs', xp: 55 }, { id: 'css-seletores-02', titulo: 'Seletores Avançados', xp: 55 }] },
      { id: 'box-model', nome: 'Box Model', lessons: [{ id: 'css-boxmodel-01', titulo: 'Margin e Padding', xp: 55 }, { id: 'css-boxmodel-02', titulo: 'Width e Height', xp: 55 }] },
      { id: 'flexbox', nome: 'Flexbox', lessons: [{ id: 'css-flexbox-01', titulo: 'Flexbox Básico', xp: 60 }, { id: 'css-flexbox-02', titulo: 'Flexbox Avançado', xp: 60 }] },
    ],
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: '⚡',
    totalXp: 150,
    topics: [
      { id: 'funcoes', nome: 'Funções', lessons: [{ id: 'js-funcoes-01', titulo: 'Funções em JavaScript', xp: 50 }, { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 50 }] },
      { id: 'arrays', nome: 'Arrays', lessons: [{ id: 'js-arrays-01', titulo: 'Métodos de Array', xp: 50 }] },
    ],
  },
  {
    id: 'react',
    nome: 'React',
    icone: '⚛️',
    totalXp: 50,
    topics: [
      { id: 'hooks', nome: 'Hooks', lessons: [{ id: 'react-hooks-01', titulo: 'useState', xp: 50 }] },
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Meu Progresso</h1>
              <p className="text-sm text-muted-foreground">Acompanhe sua evolução nos estudos</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-1.5 bg-yellow-500/10 rounded-lg">
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{xpTotal}</p>
                <p className="text-[10px] text-muted-foreground">XP Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-1.5 bg-purple-500/10 rounded-lg">
                <Trophy className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">Nível {nivel}</p>
                <p className="text-[10px] text-muted-foreground">Nível Atual</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-1.5 bg-green-500/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{completedCount}/{totalLessons}</p>
                <p className="text-[10px] text-muted-foreground">Aulas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <Trophy className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{achievements.length}</p>
                <p className="text-[10px] text-muted-foreground">Conquistas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso Geral */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Progresso Geral</CardTitle>
            <CardDescription className="text-xs">
              {completedCount} de {totalLessons} aulas concluídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Progress value={overallProgress} className="h-2" />
              </div>
              <span className="text-sm font-bold text-foreground">
                {Math.round(overallProgress)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Progresso por Conteúdo */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-foreground">Progresso por Conteúdo</h2>
          
          {contentsData.map((content) => {
            const progress = getContentProgress(content);
            
            return (
              <Card key={content.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`/icons/icon-${content.id === 'javascript' ? 'js' : content.id}-5.png`} 
                        alt={content.nome} 
                        width={20} 
                        height={20}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `/icons/icon-${content.id === 'javascript' ? 'js' : content.id}-3.png`;
                        }}
                      />
                      <div>
                        <CardTitle className="text-sm">{content.nome}</CardTitle>
                        <CardDescription className="text-[10px]">
                          {progress.completed}/{progress.total} aulas
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => router.push(`/curso/${content.id}/${content.topics[0]?.id || 'funcoes'}/01`)}
                    >
                      Continuar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-2">
                    <Progress value={progress.percent} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">
                      {Math.round(progress.percent)}%
                    </p>
                  </div>
                  
                  {/* Tópicos */}
                  <div className="space-y-1">
                    {content.topics.map((topic) => {
                      const topicProgress = getTopicProgress(topic);
                      
                      return (
                        <div key={topic.id} className="flex items-center gap-2">
                          <div className="flex-shrink-0">
                            {topicProgress.percent === 100 ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <Circle className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-foreground truncate">
                                {topic.nome}
                              </span>
                              <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">
                                {topicProgress.completed}/{topicProgress.total}
                              </span>
                            </div>
                            <Progress value={topicProgress.percent} className="h-1 mt-0.5" />
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
      </div>
    </Layout>
  );
}
