'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Trophy, BarChart3, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';

export function Header() {
  const router = useRouter();
  const { xpTotal, nivel, achievements } = useAppStore();

  // Calcular progresso para o próximo nível
  const xpForNextLevel = nivel * 100;
  const xpProgress = ((xpTotal % 100) / 100) * 100;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Dev Academy</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* XP e Nível */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/progresso')}
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-foreground flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                {xpTotal} XP
              </div>
              <div className="text-xs text-muted-foreground">Nível {nivel}</div>
            </div>
            <div className="w-20">
              <Progress value={xpProgress} className="h-2" />
            </div>
          </div>

          {/* Conquistas */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Conquistas"
            onClick={() => router.push('/conquistas')}
            className="relative"
          >
            <Trophy className="h-5 w-5" />
            {achievements.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {achievements.length}
              </span>
            )}
          </Button>

          {/* Progresso */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Progresso"
            onClick={() => router.push('/progresso')}
          >
            <BarChart3 className="h-5 w-5" />
          </Button>

          {/* Perfil */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Perfil"
            onClick={() => router.push('/progresso')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
