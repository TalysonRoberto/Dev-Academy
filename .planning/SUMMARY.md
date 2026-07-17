# Resumo do Projeto — Dev Academy

## O que é o Dev Academy?

Plataforma web de aulas técnicas interativas para desenvolvedores, com:
- **Navegação** por conteúdos e tópicos via sidebar
- **Aulas** em formato MDX (Markdown enriquecido)
- **Exercícios** com editor de código integrado
- **Gamificação** com XP, níveis e conquistas
- **Progresso** visual por conteúdo

## Stack Tecnológica

| Camada | Tecnologia | Propósito |
|--------|------------|-----------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, roteamento |
| Linguagem | TypeScript | Tipagem estática |
| Estilo | Tailwind CSS | Estilização rápida |
| Componentes | shadcn/ui | UI base acessível |
| Estado | Zustand | Gerenciamento leve |
| Animações | Framer Motion | Microinterações |
| Ícones | lucide-react | Ícones consistentes |
| Editor | Monaco/Sandpack | Editor de código |
| Conteúdo | MDX | Aulas em Markdown |
| Banco | Prisma/SQLite | Persistência local |
| Auth | NextAuth.js | Autenticação (MVP) |

## Estrutura de Conteúdo

```
content/
  javascript/          # Conteúdo
    _meta.json         # Metadados (ícone, nome, ordem)
    funcoes/           # Tópico
      _meta.json       # Metadados do tópico
      aula-01.mdx      # Aula com frontmatter
      aula-02.mdx
    arrays/
      _meta.json
      aula-01.mdx
  react/
    _meta.json
    hooks/
      _meta.json
      aula-01.mdx
```

## Hierarquia

```
Conteúdo (ex: "JavaScript")
 └── Tópico (ex: "Funções")
      └── Aula (documento .mdx)
           └── Exercício (schema de código + testes)
```

## Frontmatter de Aula

```yaml
---
id: "js-funcoes-01"
conteudoId: "javascript"
topicoId: "funcoes"
titulo: "Funções em JavaScript"
xp: 50
duracaoEstimada: "15min"
exercicio:
  enunciado: "Crie uma função que soma dois números."
  linguagem: "javascript"
  codigoInicial: "function somar(a, b) {\n  // seu código aqui\n}"
  testes:
    - input: [2, 3]
      output: 5
---
```

## Fases de Implementação

| Fase | Objetivo | Status |
|------|----------|--------|
| 1 | Setup Next.js + Tailwind + shadcn/ui | Não iniciada |
| 2 | Parser MDX + Índice da Sidebar | Não iniciada |
| 3 | Sidebar de Navegação | Não iniciada |
| 4 | Renderização da Aula | Não iniciada |
| 5 | Editor de Código e Exercícios | Não iniciada |
| 6 | Prisma e Modelos de Dados | Não iniciada |
| 7 | XP e Conquistas | Não iniciada |
| 8 | Painel de Progresso | Não iniciada |
| 9 | Polimento Visual | Não iniciada |

## Design

- **Tema:** Escuro (dev-friendly)
- **Cores:** Acento vibrante (roxo/azul)
- **Tipografia:** Inter/Geist para texto, JetBrains Mono para código
- **Efeitos:** Cantos arredondados, glassmorphism sutil, microinterações

## Valor Central

Validar o fluxo completo (navegar → estudar → praticar → desbloquear conquista → ver progresso) com o menor stack possível, mas já com boa qualidade visual e facilidade para adicionar novas aulas sem tocar em código.

---

*Última atualização: 2026-07-17 após criação do resumo*
