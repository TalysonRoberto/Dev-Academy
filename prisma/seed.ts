import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Criar conquistas de exemplo
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        nome: 'Primeira Aula',
        descricao: 'Complete sua primeira aula',
        icone: '🎓',
        criterio: 'primeira_aula_concluida',
      },
    }),
    prisma.achievement.create({
      data: {
        nome: '5 Exercícios Seguidos',
        descricao: 'Complete 5 exercícios sem errar',
        icone: '🔥',
        criterio: '5_exercicios_corretos',
      },
    }),
    prisma.achievement.create({
      data: {
        nome: 'Conteúdo 100%',
        descricao: 'Complete todas as aulas de um conteúdo',
        icone: '🏆',
        criterio: 'conteudo_completo',
      },
    }),
    prisma.achievement.create({
      data: {
        nome: 'Sequência de 3 Dias',
        descricao: 'Estude por 3 dias consecutivos',
        icone: '📅',
        criterio: 'sequencia_3_dias',
      },
    }),
    prisma.achievement.create({
      data: {
        nome: 'Mestre JavaScript',
        descricao: 'Complete todas as aulas de JavaScript',
        icone: '⚡',
        criterio: 'javascript_completo',
      },
    }),
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  // Criar usuário de exemplo (opcional)
  const user = await prisma.user.create({
    data: {
      nome: 'Desenvolvedor',
      xpTotal: 0,
      nivel: 1,
    },
  });

  console.log(`✅ Created user: ${user.nome}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
