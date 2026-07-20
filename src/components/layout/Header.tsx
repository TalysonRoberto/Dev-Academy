'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Trophy, BarChart3, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';

export function Header() {
  const router = useRouter();
  const { xpTotal, nivel, achievements } = useAppStore();

  const xpProgress = ((xpTotal % 100) / 100) * 100;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
        >
          <BookOpen className="h-4 w-4 text-primary" />
          <h1 className="text-sm font-bold text-foreground">Dev Academy</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* XP e Nível */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/progresso')}
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-foreground flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                {xpTotal} XP
              </div>
              <div className="text-[10px] text-muted-foreground">Nível {nivel}</div>
            </div>
            <div className="w-16">
              <Progress value={xpProgress} className="h-1.5" />
            </div>
          </div>

          {/* Conquistas */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Conquistas"
            onClick={() => router.push('/conquistas')}
            className="relative h-8 w-8"
          >
            <Trophy className="h-4 w-4" />
            {achievements.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
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
            className="h-8 w-8"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>

          {/* Perfil */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Perfil"
            onClick={() => router.push('/progresso')}
            className="h-8 w-8"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
