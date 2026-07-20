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
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Aprenda a programar de forma interativa
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Aulas técnicas com exercícios práticos, sistema de XP e conquistas.
            Evolua no seu ritmo.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => router.push('/curso/javascript/funcoes/01')}>
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Por que usar o Dev Academy?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/javascript/funcoes/01')}>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Aulas Estruturadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conteúdo organizado em tópicos progressivos, do básico ao avançado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/javascript/funcoes/01')}>
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Editor Integrado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pratique diretamente no navegador com editor de código e preview ao vivo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gamificação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ganhe XP, suba de nível e desbloqueie conquistas ao completar aulas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Progresso Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acompanhe seu progresso por conteúdo com gráficos e estatísticas.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conteúdos Disponíveis */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Conteúdos Disponíveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/javascript/funcoes/01')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <CardTitle>JavaScript</CardTitle>
                    <CardDescription>Funções, Arrays e mais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">3 aulas</span>
                  <Button variant="ghost" size="sm">
                    Começar <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/curso/react/hooks/01')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚛️</span>
                  <div>
                    <CardTitle>React</CardTitle>
                    <CardDescription>Hooks e componentes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">1 aula</span>
                  <Button variant="ghost" size="sm">
                    Começar <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Pronto para começar?</CardTitle>
              <CardDescription>
                Comece sua jornada de aprendizado agora mesmo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => router.push('/curso/javascript/funcoes/01')}>
                Explorar Conteúdos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
