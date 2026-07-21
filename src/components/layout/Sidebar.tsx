'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechIcon, TopicIcon } from '@/components/ui/TechIcon';
import { useAppStore } from '@/store';

interface Topic {
  id: string;
  nome: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  titulo: string;
  xp: number;
}

interface Content {
  id: string;
  nome: string;
  techIcon: 'html' | 'css' | 'javascript' | 'react';
  topics: Topic[];
}

const contents: Content[] = [
  {
    id: 'html',
    nome: 'HTML',
    techIcon: 'html',
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

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    sidebarOpen, 
    toggleSidebar, 
    currentLesson, 
    setCurrentLesson,
    completedLessons,
  } = useAppStore();

  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  // Derive selectedContent directly from pathname
  const selectedContent = pathname.startsWith('/curso/') 
    ? pathname.split('/')[2] || null 
    : null;

  useEffect(() => {
    if (pathname.startsWith('/curso/')) {
      const parts = pathname.split('/');
      const topico = parts[3];
      const aulaNum = parts[4];
      
      if (topico && !expandedTopics.includes(topico)) {
        setExpandedTopics(prev => [...prev, topico]);
      }
      if (aulaNum) {
        const lessonId = `${parts[2]}-${topico}-${aulaNum}`;
        setCurrentLesson(lessonId);
      }
    }
  }, [pathname]);

  const handleContentClick = (contentId: string) => {
    if (selectedContent === contentId) {
      // Navigate to the technology page
      router.push(`/curso/${contentId}`);
    } else {
      // Navigate to the technology page
      router.push(`/curso/${contentId}`);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    const parts = lessonId.split('-');
    const conteudo = parts[0];
    const topico = parts[1];
    const aula = parts[2];
    // Expand the topic when clicking a lesson
    if (!expandedTopics.includes(topico)) {
      setExpandedTopics(prev => [...prev, topico]);
    }
    router.push(`/curso/${conteudo}/${topico}/${aula}`);
  };

  const getTopicProgress = (topic: Topic) => {
    const total = topic.lessons.length;
    const completed = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return { total, completed, percent: total > 0 ? (completed / total) * 100 : 0 };
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonActive = (lessonId: string) => {
    return currentLesson === lessonId;
  };

  const selectedContentData = contents.find(c => c.id === selectedContent);

  return (
    <div className="flex h-screen">
      {/* Barra de icones (sempre visivel) */}
      <div className="w-14 bg-card border-r border-border flex flex-col items-center py-3 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mb-4 h-8 w-8">
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex flex-col gap-2">
          {contents.map((content) => (
            <Button
              key={content.id}
              variant="ghost"
              size="icon"
              title={content.nome}
              onClick={() => handleContentClick(content.id)}
              className={`h-10 w-10 rounded-lg transition-all ${
                selectedContent === content.id 
                  ? 'bg-primary/20 ring-2 ring-primary/50' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <TechIcon tech={content.techIcon} size={24} />
            </Button>
          ))}
        </div>
      </div>

      {/* Painel de topicos (expansivel) */}
      <AnimatePresence>
        {selectedContent && sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-card border-r border-border overflow-hidden flex-shrink-0"
          >
            <div className="w-[260px] h-full overflow-y-auto">
              {/* Header do conteudo */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TechIcon tech={selectedContentData?.techIcon || 'html'} size={20} />
                    <span className="font-semibold text-foreground">
                      {selectedContentData?.nome}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de topicos */}
              <div className="p-2">
                {selectedContentData?.topics.map((topic) => {
                  const progress = getTopicProgress(topic);
                  const isExpanded = expandedTopics.includes(topic.id);
                  
                  return (
                    <div key={topic.id} className="mb-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-9 px-3 hover:bg-accent/50"
                        onClick={() => {
                          if (isExpanded) {
                            setExpandedTopics(prev => prev.filter(t => t !== topic.id));
                          } else {
                            setExpandedTopics(prev => [...prev, topic.id]);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <TopicIcon contentId={selectedContent} size={16} />
                          <span className="text-sm">{topic.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {progress.completed > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {progress.completed}/{progress.total}
                            </span>
                          )}
                          <ChevronRight className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </Button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 mt-0.5 space-y-0.5 pb-2">
                              {topic.lessons.map((lesson) => {
                                const completed = isLessonCompleted(lesson.id);
                                const active = isLessonActive(lesson.id);
                                
                                return (
                                  <Button
                                    key={lesson.id}
                                    variant="ghost"
                                    className={`w-full justify-start h-8 px-3 text-xs ${
                                      active ? 'bg-primary/10 text-primary' : ''
                                    } ${completed ? 'text-green-500' : 'text-muted-foreground'}`}
                                    onClick={() => handleLessonClick(lesson.id)}
                                  >
                                    <div className="flex items-center gap-2 w-full">
                                      {completed ? (
                                        <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                                      ) : active ? (
                                        <div className="h-3 w-3 rounded-full border-2 border-primary flex-shrink-0" />
                                      ) : (
                                        <Circle className="h-3 w-3 flex-shrink-0" />
                                      )}
                                      <span className="truncate">{lesson.titulo}</span>
                                      <span className="text-xs ml-auto flex-shrink-0 opacity-60">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
