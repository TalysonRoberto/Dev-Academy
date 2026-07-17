# ROADMAP — Dev Academy

## Visão Geral

Fases de implementação do Dev Academy, derivadas do PRD. Cada fase entrega um incremento funcional e testável.

---

## Fase 1: Setup e Estrutura Base

**Objetivo:** Configurar o projeto Next.js com todas as dependências e criar a estrutura de pastas básica.

**Entregáveis:**
- Projeto Next.js 14+ com App Router inicializado
- Tailwind CSS configurado
- shadcn/ui instalado com componentes base
- Estrutura de pastas `/content` criada
- Configuração do tema escuro
- Fontes (Inter/Geist, JetBrains Mono) configuradas

**Critérios de UAT:**
- [ ] `npm run dev` roda sem erros
- [ ] Página inicial renderiza com tema escuro
- [ ] Componentes shadcn/ui funcionam (Button, Card, etc.)
- [ ] Estrutura de pastas `/content/javascript/funcoes/` existe

**Dependências:** Nenhuma

---

## Fase 2: Parser MDX e Índice da Sidebar

**Objetivo:** Ler arquivos `.mdx` da pasta `/content` e gerar automaticamente o índice para a sidebar.

**Entregáveis:**
- Parser de frontmatter dos arquivos `.mdx`
- Geração automática do índice (conteúdo → tópico → aula)
- Tipos TypeScript para o schema de aula
- Dados mock de exemplo (1 conteúdo, 1 tópico, 2 aulas)

**Critérios de UAT:**
- [ ] Frontmatter é parseado corretamente
- [ ] Índice hierárquico é gerado (conteúdo → tópico → aulas)
- [ ] Dados de exemplo estão disponíveis no componente

**Dependências:** Fase 1

---

## Fase 3: Sidebar de Navegação

**Objetivo:** Implementar a sidebar com estados expandido/minimizado e navegação por conteúdos/tópicos.

**Entregáveis:**
- Componente de sidebar com lista de conteúdos (expansível)
- Indicadores visuais de progresso por tópico
- Modo minimizado (barra fina com ícones)
- Estado gerenciado pelo Zustand (aberta/fechada)
- Animações de transição (Framer Motion)

**Critérios de UAT:**
- [ ] Sidebar mostra conteúdos com ícones
- [ ] Clicar em conteúdo expande tópicos
- [ ] Clicar em tópico mostra lista de aulas
- [ ] Botão de recolher minimiza sidebar
- [ ] Estado de minimização é persistido

**Dependências:** Fase 2

---

## Fase 4: Renderização da Aula

**Objetivo:** Renderizar o conteúdo MDX da aula selecionada na área principal.

**Entregáveis:**
- Pipeline de renderização MDX (next-mdx-remote ou @next/mdx)
- Tipografia cuidada (@tailwindcss/typography)
- Syntax highlight para blocos de código (Shiki)
- Componentes customizados (CodeBlock, Callout)
- Layout com sidebar persistente

**Critérios de UAT:**
- [ ] Aula é renderizada a partir do arquivo `.mdx`
- [ ] Títulos, parágrafos, listas são estilizados
- [ ] Blocos de código têm syntax highlight
- [ ] Sidebar permanece visível durante a leitura

**Dependências:** Fase 3

---

## Fase 5: Editor de Código e Exercícios

**Objetivo:** Integrar editor de código ao final de cada aula com validação de exercícios.

**Entregáveis:**
- Componente de exercício com Monaco Editor/CodeMirror
- Integração com Sandpack para preview ao vivo
- Botão "Rodar" executa código no preview
- Botão "Enviar" valida contra testes do frontmatter
- Feedback visual (sucesso/erro)

**Critérios de UAT:**
- [ ] Editor aparece ao final da aula com código inicial
- [ ] Botão "Rodar" mostra preview ao vivo
- [ ] Botão "Enviar" valida contra testes
- [ ] Exercício correto mostra feedback de sucesso

**Dependências:** Fase 4

---

## Fase 6: Prisma e Modelos de Dados

**Objetivo:** Configurar banco de dados local para persistir progresso, XP e conquistas.

**Entregáveis:**
- Prisma configurado com SQLite
- Modelos: User, Progress, Achievement, UserAchievement
- Migrations criadas
- Seed com conquistas de exemplo
- API Routes para operações básicas

**Critérios de UAT:**
- [ ] `npx prisma migrate dev` roda sem erros
- [ ] Tabelas são criadas no SQLite
- [ ] Conquistas de exemplo estão no banco
- [ ] API de progresso retorna dados

**Dependências:** Fase 1

---

## Fase 7: Sistema de XP e Conquistas

**Objetivo:** Implementar lógica de XP, níveis e desbloqueio de conquistas.

**Entregáveis:**
- Lógica de soma de XP ao concluir aula
- Cálculo de nível baseado em XP total
- Verificação de critérios de conquistas
- Notificação animada ao desbloquear (Framer Motion)
- Página "Minhas Conquistas" com grid de badges

**Critérios de UAT:**
- [ ] Concluir exercício soma XP corretamente
- [ ] Nível é atualizado ao atingir threshold
- [ ] Conquista "Primeira aula" é desbloqueada
- [ ] Notificação animada aparece
- [ ] Página de conquistas mostra badges (desbloqueados/bloqueados)

**Dependências:** Fase 5, Fase 6

---

## Fase 8: Painel de Progresso

**Objetivo:** Dashboard mostrando progresso por conteúdo com visualizações.

**Entregáveis:**
- Cards por conteúdo com barra de progresso
- % concluído, tópicos concluídos/total, XP ganho
- Visual com ícones e barras de progresso
- Layout responsivo

**Critérios de UAT:**
- [ ] Painel mostra progresso por conteúdo
- [ ] Barras de progresso refletem conclusão real
- [ ] XP ganho por conteúdo é exibido
- [ ] Layout funciona em diferentes tamanhos de tela

**Dependências:** Fase 7

---

## Fase 9: Polimento Visual e Microinterações

**Objetivo:** Refinar a qualidade visual e adicionar microinterações.

**Entregáveis:**
- Glassmorphism sutil em cards e sidebar
- Micro-interações (hover, transições)
- Confetes/pulse ao ganhar conquista
- Loading skeletons
- Estados vazios amigáveis
- Responsividade completa

**Critérios de UAT:**
- [ ] Efeitos visuais (glassmorphism) estão presentes
- [ ] Hover states funcionam em elementos interativos
- [ ] Confetes aparecem ao ganhar conquista
- [ ] Loading states são exibidos durante carregamento
- [ ] Estados vazios têm mensagens amigáveis
- [ ] Layout funciona em mobile e desktop

**Dependências:** Fase 8

---

## Ordem de Execução

```
Fase 1 (Setup) → Fase 2 (Parser) → Fase 3 (Sidebar) → Fase 4 (Aula) → Fase 5 (Exercício)
                                                                                    ↓
Fase 6 (Prisma) ←───────────────────────────────────────────────────────────────────┘
        ↓
Fase 7 (XP/Conquistas) → Fase 8 (Painel) → Fase 9 (Polimento)
```

**Fases paralelas possíveis:**
- Fase 6 (Prisma) pode ser iniciada após Fase 1, independente das fases 2-5
- Fase 9 (Polimento) pode ter tarefas iniciadas durante Fase 8

---

## Conteúdo de Exemplo

Para validar o fluxo, criar pelo menos:

**JavaScript (conteúdo)**
- **Funções (tópico)**
  - `aula-01.mdx` — Funções em JavaScript (XP: 50)
  - `aula-02.mdx` — Arrow Functions (XP: 50)
- **Arrays (tópico)**
  - `aula-01.mdx` — Métodos de Array (XP: 50)

**React (conteúdo)**
- **Hooks (tópico)**
  - `aula-01.mdx` — useState (XP: 50)

---

*Última atualização: 2026-07-17 após criação inicial do roadmap*
