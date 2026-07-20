'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, BookOpen, Menu, X } from 'lucide-react';
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
  concluida: boolean;
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
          { id: 'js-funcoes-01', titulo: 'Funções em JavaScript', xp: 50, concluida: false },
          { id: 'js-funcoes-02', titulo: 'Arrow Functions', xp: 50, concluida: false },
        ],
      },
      {
        id: 'arrays',
        nome: 'Arrays',
        icone: '📦',
        lessons: [
          { id: 'js-arrays-01', titulo: 'Métodos de Array', xp: 50, concluida: false },
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
          { id: 'react-hooks-01', titulo: 'useState', xp: 50, concluida: false },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const { sidebarOpen, toggleSidebar, currentLesson, setCurrentLesson } = useAppStore();
  const [expandedContents, setExpandedContents] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleContent = (contentId: string) => {
    setExpandedContents((prev) =>
      prev.includes(contentId) ? prev.filter((id) => id !== contentId) : [...prev, contentId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    // Navegar para a página da aula
    // Formato: js-funcoes-01 -> /curso/javascript/funcoes/01
    const parts = lessonId.split('-');
    const conteudo = parts[0];
    const topico = parts[1];
    const aula = parts[2];
    router.push(`/curso/${conteudo}/${topico}/${aula}`);
  };

  const getProgress = (content: Content) => {
    const totalLessons = content.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
    const completedLessons = content.topics.reduce(
      (acc, topic) => acc + topic.lessons.filter((l) => l.concluida).length,
      0
    );
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  return (
    <AnimatePresence mode="wait">
      {sidebarOpen ? (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen border-r border-border bg-card overflow-y-auto"
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

            <div className="space-y-2">
              {contents.map((content) => (
                <div key={content.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => toggleContent(content.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{content.icone}</span>
                      <span>{content.nome}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={getProgress(content)} className="w-16 h-2" />
                      {expandedContents.includes(content.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </Button>

                  <AnimatePresence>
                    {expandedContents.includes(content.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 overflow-hidden"
                      >
                        {content.topics.map((topic) => (
                          <div key={topic.id}>
                            <Button
                              variant="ghost"
                              className="w-full justify-between"
                              onClick={() => toggleTopic(topic.id)}
                            >
                              <div className="flex items-center gap-2">
                                <span>{topic.icone}</span>
                                <span>{topic.nome}</span>
                              </div>
                              {expandedTopics.includes(topic.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>

                            <AnimatePresence>
                              {expandedTopics.includes(topic.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-4 overflow-hidden"
                                >
                                  {topic.lessons.map((lesson) => (
                                    <Button
                                      key={lesson.id}
                                      variant={currentLesson === lesson.id ? 'secondary' : 'ghost'}
                                      className="w-full justify-start"
                                      onClick={() => handleLessonClick(lesson.id)}
                                    >
                                      <div className="flex items-center gap-2">
                                        {lesson.concluida ? (
                                          <span className="text-green-500">✓</span>
                                        ) : (
                                          <span className="text-muted-foreground">○</span>
                                        )}
                                        <span>{lesson.titulo}</span>
                                        <span className="text-muted-foreground text-sm ml-auto">
                                          +{lesson.xp} XP
                                        </span>
                                      </div>
                                    </Button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      ) : (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen border-r border-border bg-card flex flex-col items-center py-4"
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
