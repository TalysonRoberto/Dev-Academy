'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Trophy, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Aprenda a programar de forma interativa
          </h2>
          <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Aulas técnicas com exercícios práticos, sistema de XP e conquistas.
            Evolua no seu ritmo.
          </p>
          <Button size="lg" className="text-base px-6 py-4" onClick={() => router.push('/curso/html/introducao/01')}>
            Começar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-foreground text-center mb-8">
            Por que usar o Dev Academy?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/html/introducao/01')}>
              <CardHeader className="pb-2">
                <BookOpen className="h-6 w-6 text-primary mb-1" />
                <CardTitle className="text-base">Aulas Estruturadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Conteúdo organizado em tópicos progressivos, do básico ao avançado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/html/introducao/01')}>
              <CardHeader className="pb-2">
                <Code className="h-6 w-6 text-primary mb-1" />
                <CardTitle className="text-base">Editor Integrado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Pratique diretamente no navegador com editor de código e preview ao vivo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <Trophy className="h-6 w-6 text-primary mb-1" />
                <CardTitle className="text-base">Gamificação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Ganhe XP, suba de nível e desbloqueie conquistas ao completar aulas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <BarChart3 className="h-6 w-6 text-primary mb-1" />
                <CardTitle className="text-base">Progresso Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Acompanhe seu progresso por conteúdo com gráficos e estatísticas.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conteúdos Disponíveis */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-foreground text-center mb-8">
            Conteúdos Disponíveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/html/introducao/01')}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <img src="/icons/icon-html-5.png" alt="HTML" width={28} height={28} />
                  <div>
                    <CardTitle className="text-base">HTML</CardTitle>
                    <CardDescription className="text-xs">Estrutura da web</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">10 aulas</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    Começar <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/css/fundamentos/01')}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <img src="/icons/icon-css-3.png" alt="CSS" width={28} height={28} />
                  <div>
                    <CardTitle className="text-base">CSS</CardTitle>
                    <CardDescription className="text-xs">Estilização visual</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">8 aulas</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    Começar <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/javascript/funcoes/01')}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <img src="/icons/icon-js.png" alt="JavaScript" width={28} height={28} />
                  <div>
                    <CardTitle className="text-base">JavaScript</CardTitle>
                    <CardDescription className="text-xs">Lógica e interatividade</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">3 aulas</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    Começar <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/react/hooks/01')}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <img src="/icons/icon-react.svg" alt="React" width={28} height={28} />
                  <div>
                    <CardTitle className="text-base">React</CardTitle>
                    <CardDescription className="text-xs">Interfaces modernas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">1 aula</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    Começar <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Pronto para começar?</CardTitle>
              <CardDescription className="text-sm">
                Comece sua jornada de aprendizado agora mesmo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="text-base px-6 py-4" onClick={() => router.push('/curso/html/introducao/01')}>
                Explorar Conteúdos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
