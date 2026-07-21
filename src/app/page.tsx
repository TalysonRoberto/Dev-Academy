'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TechIcon } from '@/components/ui/TechIcon';
import { BookOpen, Code, Trophy, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Aprenda a programar
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Aulas interativas com exercicios praticos. Evolua no seu ritmo.
          </p>
          <Button size="lg" className="px-8" onClick={() => router.push('/curso/html')}>
            Comecar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Conteudos Disponiveis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Escolha uma Tecnologia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group" 
              onClick={() => router.push('/curso/html')}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <TechIcon tech="html" size={32} />
                  <div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">HTML</CardTitle>
                    <CardDescription className="text-xs">Estrutura de paginas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">11 aulas</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group" 
              onClick={() => router.push('/curso/css')}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <TechIcon tech="css" size={32} />
                  <div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">CSS</CardTitle>
                    <CardDescription className="text-xs">Estilos visuais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">10 aulas</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group" 
              onClick={() => router.push('/curso/javascript')}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <TechIcon tech="javascript" size={32} />
                  <div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">JavaScript</CardTitle>
                    <CardDescription className="text-xs">Programacao</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">3 aulas</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group" 
              onClick={() => router.push('/curso/react')}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <TechIcon tech="react" size={32} />
                  <div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">React</CardTitle>
                    <CardDescription className="text-xs">Interfaces modernas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">1 aula</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Aulas Estruturadas</h3>
              <p className="text-xs text-muted-foreground">Conteudo organizado do basico ao avancado</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Exercicios Praticos</h3>
              <p className="text-xs text-muted-foreground">Pratique diretamente no navegador</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Sistema de Progresso</h3>
              <p className="text-xs text-muted-foreground">Acompanhe sua evolucao com XP e conquistas</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
