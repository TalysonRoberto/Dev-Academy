'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TechIcon, TopicIcon } from '@/components/ui/TechIcon';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';
import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  titulo: string;
  xp: number;
  duracao: string;
}

interface Topic {
  id: string;
  nome: string;
  lessons: Lesson[];
}

interface TechnologyPageProps {
  techId: 'html' | 'css' | 'javascript' | 'react';
  titulo: string;
  descricao: string;
  topics: Topic[];
}

export function TechnologyPage({ techId, titulo, descricao, topics }: TechnologyPageProps) {
  const router = useRouter();
  const { completedLessons } = useAppStore();

  const totalLessons = topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
  const completedCount = topics.reduce(
    (acc, topic) => acc + topic.lessons.filter((l) => completedLessons.includes(l.id)).length,
    0
  );
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const getTopicProgress = (topic: Topic) => {
    const total = topic.lessons.length;
    const completed = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const handleLessonClick = (lessonId: string) => {
    const parts = lessonId.split('-');
    const conteudo = parts[0];
    const topico = parts[1];
    const aula = parts[2];
    router.push(`/curso/${conteudo}/${topico}/${aula}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <TechIcon tech={techId} size={40} />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{titulo}</h1>
              <p className="text-sm text-muted-foreground">{descricao}</p>
            </div>
          </div>

          {/* Progresso */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progresso</span>
                <span className="text-sm text-muted-foreground">{completedCount}/{totalLessons} aulas</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Topicos */}
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicProgress = getTopicProgress(topic);
            const completedInTopic = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;

            return (
              <Card key={topic.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TopicIcon contentId={techId} size={20} />
                      <div>
                        <CardTitle className="text-sm">{topic.nome}</CardTitle>
                        <CardDescription className="text-xs">
                          {completedInTopic}/{topic.lessons.length} aulas - {Math.round(topicProgress)}% completo
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {topic.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors ${
                            isCompleted ? 'bg-green-500/5' : ''
                          }`}
                          onClick={() => handleLessonClick(lesson.id)}
                        >
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <span className={`text-sm ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {lesson.titulo}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {lesson.duracao}
                            </span>
                            <span className={`text-xs ${isCompleted ? 'text-green-500' : 'text-muted-foreground'}`}>
                              +{lesson.xp} XP
                            </span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
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
