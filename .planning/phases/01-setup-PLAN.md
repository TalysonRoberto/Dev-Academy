# Plano de Implementação — Fase 1: Setup e Estrutura Base

## Objetivo

Configurar o projeto Next.js 14+ com App Router, Tailwind CSS, shadcn/ui, e criar a estrutura de pastas básica para o Dev Academy.

## Tarefas

### Tarefa 1.1: Inicializar projeto Next.js

**Descrição:** Criar novo projeto Next.js 14+ com App Router usando `create-next-app`.

**Comando:**
```bash
npx create-next-app@latest dev-academy --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Critério de conclusão:** Projeto criado com sucesso, `npm run dev` roda sem erros.

**Dependências:** Nenhuma

---

### Tarefa 1.2: Instalar shadcn/ui

**Descrição:** Inicializar shadcn/ui no projeto e adicionar componentes base.

**Comandos:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog tooltip tabs progress
```

**Critério de conclusão:** Componentes shadcn/ui disponíveis em `src/components/ui/`.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.3: Configurar tema escuro

**Descrição:** Configurar tema escuro como padrão no Tailwind CSS.

**Arquivos a modificar:**
- `tailwind.config.ts` — Adicionar `darkMode: 'class'`
- `src/app/globals.css` — Configurar variáveis CSS para tema escuro
- `src/app/layout.tsx` — Aplicar classe `dark` no elemento `<html>`

**Critério de conclusão:** Página renderiza com tema escuro por padrão.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.4: Configurar fontes

**Descrição:** Configurar fontes Inter/Geist para texto e JetBrains Mono para código.

**Arquivos a modificar:**
- `src/app/layout.tsx` — Importar e aplicar fontes do Google Fonts
- `tailwind.config.ts` — Adicionar fontFamily customizado

**Critério de conclusão:** Fontes aplicadas corretamente na página.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.5: Criar estrutura de componentes

**Descrição:** Criar diretórios e arquivos base para componentes.

**Estrutura:**
```
src/
  components/
    ui/           # Componentes shadcn/ui (já criados)
    layout/       # Componentes de layout (sidebar, header)
    content/      # Componentes de conteúdo (aula, exercicio)
    common/       # Componentes comuns (loading, error)
```

**Critério de conclusão:** Diretórios criados com arquivos placeholder.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.6: Configurar Zustand

**Descrição:** Instalar e configurar Zustand para gerenciamento de estado.

**Comando:**
```bash
npm install zustand
```

**Arquivo a criar:**
- `src/store/index.ts` — Store global com estado inicial

**Estado inicial:**
- `sidebarOpen: boolean` — Estado da sidebar (aberta/fechada)
- `currentContent: string | null` — Conteúdo selecionado
- `currentTopic: string | null` — Tópico selecionado
- `currentLesson: string | null` — Aula selecionada

**Critério de conclusão:** Store criado e exportado.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.7: Configurar Framer Motion

**Descrição:** Instalar Framer Motion para animações.

**Comando:**
```bash
npm install framer-motion
```

**Critério de conclusão:** Framer Motion instalado e disponível para uso.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.8: Configurar lucide-react

**Descrição:** Instalar lucide-react para ícones.

**Comando:**
```bash
npm install lucide-react
```

**Critério de conclusão:** lucide-react instalado e disponível para uso.

**Dependências:** Tarefa 1.1

---

### Tarefa 1.9: Verificar estrutura de conteúdo

**Descrição:** Verificar se a estrutura de pastas `/content` está correta.

**Estrutura esperada:**
```
content/
  javascript/
    _meta.json
    funcoes/
      _meta.json
      aula-01.mdx
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

**Critério de conclusão:** Todos os arquivos existem e têm o formato correto.

**Dependências:** Nenhuma (já criado)

---

### Tarefa 1.10: Testar build de produção

**Descrição:** Executar `npm run build` para verificar se não há erros de compilação.

**Comando:**
```bash
npm run build
```

**Critério de conclusão:** Build completa sem erros.

**Dependências:** Tarefas 1.1 a 1.8

---

## Ordem de Execução

```
Tarefa 1.1 (Next.js)
    ├── Tarefa 1.2 (shadcn/ui)
    ├── Tarefa 1.3 (Tema escuro)
    ├── Tarefa 1.4 (Fontes)
    ├── Tarefa 1.5 (Estrutura componentes)
    ├── Tarefa 1.6 (Zustand)
    ├── Tarefa 1.7 (Framer Motion)
    └── Tarefa 1.8 (lucide-react)
            └── Tarefa 1.10 (Build)
Tarefa 1.9 (Verificar conteúdo) — independente
```

## Estimativa de Tempo

- Tarefa 1.1: 5 minutos
- Tarefa 1.2: 5 minutos
- Tarefa 1.3: 10 minutos
- Tarefa 1.4: 5 minutos
- Tarefa 1.5: 5 minutos
- Tarefa 1.6: 5 minutos
- Tarefa 1.7: 2 minutos
- Tarefa 1.8: 2 minutos
- Tarefa 1.9: 2 minutos
- Tarefa 1.10: 3 minutos

**Total estimado:** ~44 minutos

## Riscos

1. **Versão do Node.js:** Next.js 14+ requer Node.js 18.17 ou superior
2. **Conflitos de dependências:** Possíveis conflitos entre shadcn/ui e outras libs
3. **Configuração do Tailwind:** Configuração incorreta pode afetar o tema escuro

## Mitigações

1. Verificar versão do Node.js antes de iniciar
2. Usar `npm install --legacy-peer-deps` se houver conflitos
3. Seguir documentação oficial do shadcn/ui para configuração

---

*Última atualização: 2026-07-17 após criação do plano*
