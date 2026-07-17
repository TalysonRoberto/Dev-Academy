# Dev Academy

## O Que É

Plataforma web de aulas técnicas em formato "conteúdo → tópico → aula", com sidebar de navegação persistente, aulas renderizadas a partir de documentos estruturados (.mdx), exercício com editor de código integrado ao final de cada aula, sistema de XP/conquistas com badges, e painel de progresso por conteúdo. Destinada a desenvolvedores que desejam aprender programação de forma interativa e gamificada.

## Valor Central

Validar o fluxo completo (navegar → estudar → praticar → desbloquear conquista → ver progresso) com o menor stack possível, mas já com boa qualidade visual e facilidade para adicionar novas aulas sem tocar em código.

## Requisitos

### Validados

<!-- Lançados e confirmados como valiosos. -->

(Nenhum ainda — lançar para validar)

### Ativos

<!-- Escopo atual. Construindo em direção a estes. -->

- [ ] Setup Next.js + Tailwind + shadcn/ui + estrutura de pastas `/content`
- [ ] Parser de MDX + geração automática do índice da sidebar a partir do frontmatter
- [ ] Sidebar com estados expandido/minimizado
- [ ] Renderização da aula (MDX → tela)
- [ ] Integração do editor de código (Sandpack/Monaco) + validação de exercício
- [ ] Prisma + SQLite: modelos de progresso, XP, conquistas
- [ ] Lógica de XP/conquistas + notificação animada
- [ ] Painel de progresso
- [ ] Polimento visual e microinterações

### Fora do Escopo

<!-- Limites explícitos. Inclui raciocínio para evitar re-adição. -->

- Execução de código em linguagens de backend (Python, Java etc.) via sandbox remoto — complexidade alta para MVP, foco em front-end
- Sistema de login social / múltiplos usuários reais em produção — MVP usa sessão local/anônima
- Editor de aulas via UI — no MVP, aula nova = criar `.mdx` manualmente
- Ranking entre usuários / modo multiplayer — escopo futuro
- Certificados em PDF — escopo futuro

## Contexto

- **Stack tecnológica:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui, lucide-react, Framer Motion, Zustand, Monaco Editor/Sandpack, MDX, Prisma/SQLite, NextAuth.js
- **Formato das aulas:** Arquivos `.mdx` com frontmatter estruturado (id, conteudoId, topicoId, titulo, xp, duracaoEstimada, exercicio)
- **Hierarquia:** Conteúdo → Tópico → Aula → Exercício
- **Execução de código:** Sandpack para exercícios front-end (HTML/CSS/JS) com preview ao vivo
- **Persistência:** SQLite local para progresso, XP, conquistas (migração natural para PostgreSQL)
- **Deploy:** Vercel (integração nativa com Next.js)
- **Design:** Tema escuro, acento vibrante (roxo/azul), cantos arredondados, glassmorphism sutil

## Restrições

- **Stack:** Next.js 14+ com App Router — escolha do usuário para SSR/SSG e roteamento por conteúdo
- **Persistência:** SQLite para MVP — simplicidade, migração natural para PostgreSQL
- **Execução:** Sandpack para exercícios front-end — sem backend de execução necessário
- **Autenticação:** Sessão local/anônima no MVP — evita complexidade de login social
- **Conteúdo:** Aulas em `.mdx` — permite adicionar aulas sem tocar em código

## Decisões Chave

<!-- Decisões que restringem trabalho futuro. Adicionar ao longo do ciclo de vida do projeto. -->

| Decisão | Justificativa | Resultado |
|---------|---------------|-----------|
| Next.js 14+ App Router | SSR/SSG, roteamento por conteúdo, API Routes integradas | — Pendente |
| MDX para aulas | Permite escrever aulas em Markdown enriquecido com componentes React | — Pendente |
| Sandpack para exercícios | Preview ao vivo de código front-end sem backend de execução | — Pendente |
| Prisma/SQLite | ORM familiar, banco local simples para MVP | — Pendente |
| Zustand para estado | Mais simples que Redux para o escopo do MVP | — Pendente |
| Tema escuro padrão | Dev-friendly, moderno | — Pendente |

---

*Última atualização: 2026-07-17 após criação inicial do projeto*
