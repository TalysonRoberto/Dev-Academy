import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Trophy, BarChart3 } from 'lucide-react';

export default function Home() {
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
          <Button size="lg" className="text-lg px-8 py-6">
            Começar Agora
          </Button>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Por que usar o Dev Academy?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
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

            <Card>
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

            <Card>
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

            <Card>
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
              <Button size="lg" className="text-lg px-8 py-6">
                Explorar Conteúdos
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
