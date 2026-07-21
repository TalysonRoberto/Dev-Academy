'use client';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen, Clock, Trophy, Zap, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import { TechIcon, TopicIcon } from '@/components/ui/TechIcon';

interface ContentData {
  id: string;
  nome: string;
  techIcon: 'html' | 'css' | 'javascript' | 'react';
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
    techIcon: 'html',
    totalXp: 425,
    topics: [
      {
        id: 'introducao',
        nome: 'Introducao',
        lessons: [
          { id: 'html-introducao-01', titulo: 'O que e HTML?', xp: 30 },
          { id: 'html-introducao-02', titulo: 'Elementos e Atributos', xp: 30 },
        ],
      },
      {
        id: 'tags-basicas',
        nome: 'Tags Basicas',
        lessons: [
          { id: 'html-tags-01', titulo: 'Titulos e Paragrafos', xp: 35 },
          { id: 'html-tags-02', titulo: 'Links e Navegacao', xp: 35 },
        ],
      },
      {
        id: 'formularios',
        nome: 'Formularios',
        lessons: [
          { id: 'html-formularios-01', titulo: 'Formularios HTML', xp: 40 },
        ],
      },
      {
        id: 'semanticas',
        nome: 'Semanticas',
        lessons: [
          { id: 'html-semanticas-01', titulo: 'HTML Semantico', xp: 40 },
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
        nome: 'Imagens e Midia',
        lessons: [
          { id: 'html-imagens-01', titulo: 'Imagens e Midia', xp: 45 },
        ],
      },
      {
        id: 'layouts',
        nome: 'Layouts',
        lessons: [
          { id: 'html-layouts-01', titulo: 'Divs e Spans', xp: 45 },
          { id: 'html-layouts-02', titulo: 'Flexbox Basico', xp: 50 },
        ],
      },
      {
        id: 'projeto',
        nome: 'Projeto Final',
        lessons: [
          { id: 'html-projeto-01', titulo: 'Pagina Completa', xp: 60 },
        ],
      },
    ],
  },
  {
    id: 'css',
    nome: 'CSS',
    techIcon: 'css',
    totalXp: 550,
    topics: [
      {
        id: 'fundamentos',
        nome: 'Fundamentos',
        lessons: [
          { id: 'css-fundamentos-01', titulo: 'Introducao ao CSS', xp: 50 },
          { id: 'css-fundamentos-02', titulo: 'Cores e Backgrounds', xp: 50 },
        ],
      },
      {
        id: 'seletores',
        nome: 'Seletores',
        lessons: [
          { id: 'css-seletores-01', titulo: 'Classes e IDs', xp: 55 },
          { id: 'css-seletores-02', titulo: 'Seletores Avancados', xp: 55 },
        ],
      },
      {
        id: 'box-model',
        nome: 'Box Model',
        lessons: [
          { id: 'css-boxmodel-01', titulo: 'Margin e Padding', xp: 55 },
          { id: 'css-boxmodel-02', titulo: 'Width e Height', xp: 55 },
        ],
      },
      {
        id: 'flexbox',
        nome: 'Flexbox',
        lessons: [
          { id: 'css-flexbox-01', titulo: 'Flexbox Basico', xp: 60 },
          { id: 'css-flexbox-02', titulo: 'Flexbox Avancado', xp: 60 },
        ],
      },
      {
        id: 'projeto',
        nome: 'Projeto Final',
        lessons: [
          { id: 'css-projeto-01', titulo: 'Pagina Completa', xp: 60 },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    techIcon: 'javascript',
    totalXp: 700,
    topics: [
      {
        id: 'introducao',
        nome: 'Introducao',
        lessons: [
          { id: 'js-introducao-01', titulo: 'O que e JavaScript?', xp: 30 },
          { id: 'js-introducao-02', titulo: 'Onde o JS Roda', xp: 30 },
        ],
      },
      {
        id: 'variaveis',
        nome: 'Variaveis e Tipos',
        lessons: [
          { id: 'js-variaveis-01', titulo: 'Variaveis (var, let, const)', xp: 30 },
          { id: 'js-variaveis-02', titulo: 'Tipos de Dados', xp: 30 },
        ],
      },
      {
        id: 'operadores',
        nome: 'Operadores e Decisao',
        lessons: [
          { id: 'js-operadores-01', titulo: 'Operadores Aritmeticos', xp: 30 },
          { id: 'js-operadores-02', titulo: 'Condicionais (if/else)', xp: 40 },
        ],
      },
      {
        id: 'loops',
        nome: 'Loops e Repeticao',
        lessons: [
          { id: 'js-loops-01', titulo: 'Lacos for e while', xp: 40 },
          { id: 'js-loops-02', titulo: 'Metodos de Array', xp: 50 },
        ],
      },
      {
        id: 'funcoes',
        nome: 'Funcoes',
        lessons: [
          { id: 'js-funcoes-01', titulo: 'Declarando Funcoes', xp: 40 },
          { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 40 },
        ],
      },
      {
        id: 'arrays',
        nome: 'Arrays e Objetos',
        lessons: [
          { id: 'js-arrays-01', titulo: 'Trabalhando com Arrays', xp: 40 },
          { id: 'js-arrays-02', titulo: 'Objetos e Propriedades', xp: 40 },
        ],
      },
      {
        id: 'dom',
        nome: 'DOM e Eventos',
        lessons: [
          { id: 'js-dom-01', titulo: 'Selecionando Elementos', xp: 40 },
          { id: 'js-dom-02', titulo: 'Eventos (addEventListener)', xp: 50 },
        ],
      },
      {
        id: 'assincrono',
        nome: 'Assincronismo',
        lessons: [
          { id: 'js-assincrono-01', titulo: 'Promises e Fetch', xp: 50 },
          { id: 'js-assincrono-02', titulo: 'Async/Await', xp: 50 },
        ],
      },
      {
        id: 'projeto',
        nome: 'Projeto Final',
        lessons: [
          { id: 'js-projeto-01', titulo: 'To-Do List Interativa', xp: 70 },
        ],
      },
    ],
  },
  {
    id: 'react',
    nome: 'React',
    techIcon: 'react',
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
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Meu Progresso</h1>
              <p className="text-sm text-muted-foreground">Acompanhe sua evolucao nos estudos</p>
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
                <p className="text-xs text-muted-foreground">XP Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-1.5 bg-purple-500/10 rounded-lg">
                <Trophy className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">Nivel {nivel}</p>
                <p className="text-xs text-muted-foreground">Nivel Atual</p>
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
                <p className="text-xs text-muted-foreground">Aulas Concluidas</p>
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
                <p className="text-xs text-muted-foreground">Conquistas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso Geral */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progresso Geral</CardTitle>
            <CardDescription className="text-xs">
              {completedCount} de {totalLessons} aulas concluidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Progress value={overallProgress} className="h-3" />
              </div>
              <span className="text-xl font-bold text-foreground">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{xpTotal} XP ganhos</span>
              <span>{totalXpAvailable - xpTotal} XP restantes</span>
            </div>
          </CardContent>
        </Card>

        {/* Progresso por Conteudo */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Progresso por Conteudo</h2>
          
          {contentsData.map((content) => {
            const progress = getContentProgress(content);
            const earnedXp = getContentXp(content);
            
            return (
              <Card key={content.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TechIcon tech={content.techIcon} size={24} />
                      <div>
                        <CardTitle className="text-sm">{content.nome}</CardTitle>
                        <CardDescription className="text-xs">
                          {progress.completed}/{progress.total} aulas - {earnedXp}/{content.totalXp} XP
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push(`/curso/${content.id}/${content.topics[0]?.id || 'funcoes'}/01`)}
                      className="h-7 text-xs"
                    >
                      Continuar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <Progress value={progress.percent} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {Math.round(progress.percent)}%
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {content.topics.map((topic) => {
                      const topicProgress = getTopicProgress(topic);
                      
                      return (
                        <div key={topic.id}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <TopicIcon contentId={content.id} size={12} />
                              <span className="text-xs font-medium text-foreground">
                                {topic.nome}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {topicProgress.completed}/{topicProgress.total}
                            </span>
                          </div>
                          <Progress value={topicProgress.percent} className="h-1.5" />
                          
                          <div className="mt-1 ml-4 space-y-0.5">
                            {topic.lessons.map((lesson) => {
                              const isCompleted = completedLessons.includes(lesson.id);
                              
                              return (
                                <div 
                                  key={lesson.id}
                                  className={`flex items-center gap-1.5 p-1 rounded text-xs cursor-pointer hover:bg-accent/50 ${
                                    isCompleted ? 'text-green-500' : 'text-muted-foreground'
                                  }`}
                                  onClick={() => router.push(`/curso/${content.id}/${topic.id}/${lesson.id.split('-').pop()}`)}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-3 w-3 flex-shrink-0" />
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
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Dicas para Evoluir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Estude Regularmente</h4>
                  <p className="text-xs text-muted-foreground">
                    Dedique pelo menos 15 minutos por dia para manter o ritmo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-green-500/10 rounded-lg">
                  <BookOpen className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Pratique os Exercicios</h4>
                  <p className="text-xs text-muted-foreground">
                    A teoria so fixa com pratique. Faca todos os exercicios!
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
