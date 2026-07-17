import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const achievements = await prisma.achievement.findMany({
      include: {
        userAchievements: {
          where: { userId: session.user.id },
        },
      },
    });

    const formattedAchievements = achievements.map((achievement) => ({
      id: achievement.id,
      nome: achievement.nome,
      descricao: achievement.descricao,
      icone: achievement.icone,
      criterio: achievement.criterio,
      desbloqueada: achievement.userAchievements.length > 0,
      dataDesbloqueio: achievement.userAchievements[0]?.dataDesbloqueio || null,
    }));

    return NextResponse.json(formattedAchievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
