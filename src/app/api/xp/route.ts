import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { xp } = await request.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        xpTotal: { increment: xp },
      },
    });

    // Calcular novo nível
    const nivel = Math.floor(user.xpTotal / 100) + 1;

    if (nivel > user.nivel) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { nivel },
      });
    }

    return NextResponse.json({
      xpTotal: user.xpTotal,
      nivel: Math.floor(user.xpTotal / 100) + 1,
    });
  } catch (error) {
    console.error('Error adding XP:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
