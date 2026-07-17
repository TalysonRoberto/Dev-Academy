# Fase 1: Setup e Estrutura Base - Contexto

**Coletado:** 2026-07-17
**Status:** Pronto para implementação

<domain>
## Limite da Fase

Configurar o projeto Next.js com todas as dependências necessárias e criar a estrutura de pastas básica para o Dev Academy. Esta fase entrega o fundamento técnico para todas as fases subsequentes.

</domain>

<decisions>
## Decisões de Implementação

### Framework e Stack
- **D-01:** Next.js 14+ com App Router — SSR/SSG, roteamento por conteúdo via URL (`/curso/[conteudo]/[topico]`)
- **D-02:** TypeScript para tipagem dos schemas de aula, conquistas e progresso
- **D-03:** Tailwind CSS para estilização rápida e consistente
- **D-04:** shadcn/ui para componentes base (dialog, tooltip, tabs, progress bar)

### Tema e Design
- **D-05:** Tema escuro por padrão (dev-friendly) com acento vibrante (roxo/azul)
- **D-06:** Fontes: Inter ou Geist para texto, JetBrains Mono para código
- **D-07:** Cantos arredondados, glassmorphism sutil

### Estrutura de Pastas
- **D-08:** Pasta `/content` na raiz do projeto para arquivos `.mdx`
- **D-09:** Hierarquia: `content/{conteudoId}/{topicoId}/aula-XX.mdx`
- **D-10:** Arquivos `_meta.json` em cada pasta para metadados (ícone, nome, ordem)

### A Critério do Claude
- Configuração específica do Tailwind (plugins, extensões)
- Organização de componentes dentro de `src/`
- Configuração de aliases de importação

</decisions>

<specifics>
## Ideias Específicas

- "Tema escuro por padrão, dev-friendly"
- "Cantos arredondados, glassmorphism sutil"
- "Inter ou Geist para texto, JetBrains Mono para código"
- "Acento de cor vibrante (ex: roxo/azul)"

</specifics>

<canonical_refs>
## Referências Canônicas

### PRD do Projeto
- `.planning/PROJECT.md` — Visão geral, requisitos, restrições
- `.planning/ROADMAP.md` — Fases e critérios de UAT
- `.planning/requirements.md` — Requisitos funcionais e não funcionais

### Estrutura de Conteúdo
- `content/javascript/_meta.json` — Exemplo de metadados de conteúdo
- `content/javascript/funcoes/_meta.json` — Exemplo de metadados de tópico
- `content/javascript/funcoes/aula-01.mdx` — Exemplo de aula com frontmatter

</canonical_refs>

<code_context>
## Insights do Código Existente

### Ativos Reutilizáveis
- Estrutura de pastas `/content` já criada com exemplos
- Arquivos `_meta.json` com schema definido
- Arquivos `.mdx` com frontmatter de exemplo

### Padrões Estabelecidos
- Frontmatter com campos: id, conteudoId, topicoId, titulo, xp, duracaoEstimada, exercicio
- Hierarquia: conteúdo → tópico → aula
- Exercícios com testes no frontmatter

### Pontos de Integração
- Parser de MDX precisará ler a pasta `content/`
- Sidebar consumirá dados do parser
- Renderização MDX usará os arquivos como fonte

</code_context>

<deferred>
## Ideias Diferidas

- Parser de MDX — Fase 2
- Sidebar — Fase 3
- Renderização de aula — Fase 4
- Editor de código — Fase 5

</deferred>

---

*Fase: 01-setup*
*Contexto coletado: 2026-07-17*
