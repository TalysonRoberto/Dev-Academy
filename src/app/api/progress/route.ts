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

    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id },
      include: { user: true },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { aulaId, concluida } = await request.json();

    const progress = await prisma.progress.upsert({
      where: {
        userId_aulaId: {
          userId: session.user.id,
          aulaId,
        },
      },
      update: {
        concluida,
        dataConclusao: concluida ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        aulaId,
        concluida,
        dataConclusao: concluida ? new Date() : null,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
