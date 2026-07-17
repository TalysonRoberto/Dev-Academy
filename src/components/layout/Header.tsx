'use client';

import { BookOpen, Trophy, BarChart3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';

export function Header() {
  const { xpTotal, nivel, achievements } = useAppStore();

  // Calcular progresso para o próximo nível
  const xpForNextLevel = nivel * 100;
  const xpProgress = ((xpTotal % 100) / 100) * 100;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Dev Academy</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* XP e Nível */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Nível {nivel}</div>
              <div className="text-xs text-muted-foreground">{xpTotal} XP</div>
            </div>
            <div className="w-24">
              <Progress value={xpProgress} className="h-2" />
              <div className="text-xs text-muted-foreground text-center mt-1">
                {xpTotal % 100}/{100} XP
              </div>
            </div>
          </div>

          {/* Conquistas */}
          <Button variant="ghost" size="icon" title="Conquistas">
            <Trophy className="h-5 w-5" />
            {achievements.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {achievements.length}
              </span>
            )}
          </Button>

          {/* Progresso */}
          <Button variant="ghost" size="icon" title="Progresso">
            <BarChart3 className="h-5 w-5" />
          </Button>

          {/* Perfil */}
          <Button variant="ghost" size="icon" title="Perfil">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
