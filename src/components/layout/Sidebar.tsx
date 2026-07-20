'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, BookOpen, Menu, X, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';

interface Content {
  id: string;
  nome: string;
  icone: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  nome: string;
  icone: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  titulo: string;
  xp: number;
}

// Dados de exemplo (será substituído pelo parser MDX)
const contents: Content[] = [
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: '⚡',
    topics: [
      {
        id: 'funcoes',
        nome: 'Funções',
        icone: '🔧',
        lessons: [
          { id: 'js-funcoes-01', titulo: 'Funções em JavaScript', xp: 50 },
          { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 50 },
        ],
      },
      {
        id: 'arrays',
        nome: 'Arrays',
        icone: '📦',
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
    topics: [
      {
        id: 'hooks',
        nome: 'Hooks',
        icone: '🪝',
        lessons: [
          { id: 'react-hooks-01', titulo: 'useState', xp: 50 },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    sidebarOpen, 
    toggleSidebar, 
    currentLesson, 
    setCurrentLesson,
    expandedContents,
    expandedTopics,
    toggleContent,
    toggleTopic,
    completedLessons,
  } = useAppStore();

  // Expandir automaticamente o conteúdo e tópico da aula atual
  useEffect(() => {
    if (pathname.startsWith('/curso/')) {
      const parts = pathname.split('/');
      const conteudo = parts[2];
      const topico = parts[3];
      
      if (conteudo && !expandedContents.includes(conteudo)) {
        toggleContent(conteudo);
      }
      if (topico && !expandedTopics.includes(topico)) {
        toggleTopic(topico);
      }
      
      // Definir aula atual baseada na URL
      const aulaNum = parts[4];
      if (aulaNum) {
        const lessonId = `${conteudo}-${topico}-${aulaNum}`;
        setCurrentLesson(lessonId);
      }
    }
  }, [pathname]);

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    const parts = lessonId.split('-');
    const conteudo = parts[0];
    const topico = parts[1];
    const aula = parts[2];
    router.push(`/curso/${conteudo}/${topico}/${aula}`);
  };

  const getProgress = (content: Content) => {
    const totalLessons = content.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
    const completed = content.topics.reduce(
      (acc, topic) => acc + topic.lessons.filter((l) => completedLessons.includes(l.id)).length,
      0
    );
    return totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
  };

  const getTopicProgress = (topic: Topic) => {
    const total = topic.lessons.length;
    const completed = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonActive = (lessonId: string) => {
    return currentLesson === lessonId;
  };

  return (
    <AnimatePresence mode="wait">
      {sidebarOpen ? (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen border-r border-border bg-card overflow-y-auto flex-shrink-0"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Conteúdos</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {contents.map((content) => {
                const progress = getProgress(content);
                const isExpanded = expandedContents.includes(content.id);
                
                return (
                  <div key={content.id} className="mb-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:bg-accent/50"
                      onClick={() => toggleContent(content.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{content.icone}</span>
                        <span className="font-medium">{content.nome}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {progress > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {Math.round(progress)}%
                          </span>
                        )}
                        <Progress value={progress} className="w-12 h-1.5" />
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </Button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 space-y-1">
                            {content.topics.map((topic) => {
                              const topicProgress = getTopicProgress(topic);
                              const isTopicExpanded = expandedTopics.includes(topic.id);
                              
                              return (
                                <div key={topic.id}>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-between text-sm hover:bg-accent/50"
                                    onClick={() => toggleTopic(topic.id)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>{topic.icone}</span>
                                      <span>{topic.nome}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {topicProgress > 0 && (
                                        <span className="text-xs text-muted-foreground">
                                          {Math.round(topicProgress)}%
                                        </span>
                                      )}
                                      {isTopicExpanded ? (
                                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                      )}
                                    </div>
                                  </Button>

                                  <AnimatePresence>
                                    {isTopicExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="ml-4 mt-1 space-y-0.5">
                                          {topic.lessons.map((lesson) => {
                                            const completed = isLessonCompleted(lesson.id);
                                            const active = isLessonActive(lesson.id);
                                            
                                            return (
                                              <Button
                                                key={lesson.id}
                                                variant={active ? 'secondary' : 'ghost'}
                                                className={`w-full justify-start text-sm ${
                                                  active ? 'bg-primary/10 text-primary' : ''
                                                } ${completed ? 'text-green-500' : ''}`}
                                                onClick={() => handleLessonClick(lesson.id)}
                                              >
                                                <div className="flex items-center gap-2 w-full">
                                                  {completed ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                  ) : active ? (
                                                    <div className="h-4 w-4 rounded-full border-2 border-primary flex-shrink-0" />
                                                  ) : (
                                                    <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                  )}
                                                  <span className="truncate">{lesson.titulo}</span>
                                                  <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                                                    +{lesson.xp}
                                                  </span>
                                                </div>
                                              </Button>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.aside>
      ) : (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen border-r border-border bg-card flex flex-col items-center py-4 flex-shrink-0"
        >
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mb-4">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            {contents.map((content) => (
              <Button
                key={content.id}
                variant="ghost"
                size="icon"
                title={content.nome}
                onClick={() => {
                  toggleSidebar();
                  toggleContent(content.id);
                }}
              >
                <span className="text-lg">{content.icone}</span>
              </Button>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
