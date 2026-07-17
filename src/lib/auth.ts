import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // No MVP, aceita qualquer credencial (sessão anônima)
        // Em produção, validar contra o banco de dados
        if (!credentials?.email) {
          return null;
        }

        // Buscar ou criar usuário
        let user = await prisma.user.findUnique({
          where: { id: credentials.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              id: credentials.email,
              nome: credentials.email.split('@')[0],
              xpTotal: 0,
              nivel: 1,
            },
          });
        }

        return {
          id: user.id,
          name: user.nome,
          email: credentials.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
