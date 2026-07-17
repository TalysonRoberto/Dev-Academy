# Requisitos — Dev Academy

## Requisitos Funcionais

### RF01: Hierarquia de Conteúdo
O sistema deve organizar o conteúdo em uma hierarquia de 3 níveis:
- **Conteúdo** (ex: "JavaScript") — nível superior
- **Tópico** (ex: "Funções") — nível intermediário
- **Aula** (ex: "Funções em JavaScript") — nível inferior

### RF02: Sidebar de Navegação
A sidebar deve:
- Listar todos os conteúdos com ícones
- Expandir para mostrar tópicos ao clicar em um conteúdo
- Mostrar lista de aulas ao selecionar um tópico
- Ser persistente (não desaparecer ao abrir uma aula)
- Ter modo minimizado (barra fina com ícones)
- Salvar estado de minimização (Zustand/localStorage)

### RF03: Renderização de Aulas
Cada aula deve ser um arquivo `.mdx` com frontmatter estruturado:
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

O sistema deve:
- Ler a pasta `content/` automaticamente
- Montar o índice da sidebar a partir do frontmatter
- Renderizar o MDX na área principal com tipografia cuidada
- Incluir syntax highlight para blocos de código

### RF04: Exercícios com Editor Integrado
Ao final de cada aula, deve haver:
- Editor Monaco/CodeMirror com o `codigoInicial` do frontmatter
- Botão "Rodar" que executa via Sandpack (preview ao vivo)
- Botão "Enviar" que valida contra os `testes` do frontmatter
- Feedback visual de sucesso/erro

### RF05: Sistema de XP e Conquistas
- Cada aula concluída soma XP (definido no frontmatter)
- Barra de nível/XP visível no topo ou painel
- Conquistas desbloqueadas por critérios:
  - "Primeira aula concluída"
  - "5 exercícios seguidos"
  - "Conteúdo 100% concluído"
  - "Sequência de 3 dias estudando"
- Notificação animada (toast/badge) ao desbloquear conquista
- Página "Minhas Conquistas" com grid de badges

### RF06: Painel de Progresso
Dashboard mostrando, por conteúdo:
- % concluído
- Tópicos concluídos/total
- XP ganho naquele conteúdo
- Visual: cards com barra de progresso + ícone

## Requisitos Não Funcionais

### RNF01: Performance
- Páginas devem carregar em < 2 segundos
- Sidebar deve responder em < 100ms
- Editor de código deve inicializar em < 1 segundo

### RNF02: Usabilidade
- Interface intuitiva sem necessidade de tutorial
- Navegação clara e consistente
- Feedback visual imediato para ações do usuário

### RNF03: Manutenibilidade
- Adicionar nova aula = criar arquivo `.mdx` (sem código)
- Código organizado por feature/componentes
- Tipagem TypeScript estrita

### RNF04: Acessibilidade
- Contraste mínimo WCAG AA
- Navegação por teclado funcional
- Leitores de tela suportados (básico)

### RNF05: Responsividade
- Layout funciona em desktop (1024px+) e mobile (375px+)
- Sidebar adaptável (minimiza em mobile)
- Editor de código responsivo

## Cenários de Uso

### CU01: Navegar e Estudar
1. Usuário entra na plataforma
2. Vê sidebar com conteúdos (JavaScript, React, etc.)
3. Clica em "JavaScript" → expande tópicos (Funções, Arrays, etc.)
4. Clica em "Funções" → mostra aulas (Aula 01, Aula 02)
5. Clica em "Aula 01" → abre a aula na área principal
6. Lê o conteúdo (sidebar permanece visível)
7. Pode minimizar sidebar para mais espaço

### CU02: Praticar com Exercício
1. Usuário termina de ler a aula
2. Vê exercício ao final com editor de código
3. Código inicial já está preenchido
4. Clica "Rodar" → vê preview ao vivo
5. Modifica o código
6. Clica "Enviar" → sistema valida contra testes
7. Se correto: feedback positivo + XP adicionado

### CU03: Desbloquear Conquista
1. Usuário completa primeira aula
2. Sistema detecta critério atingido
3. Notificação animada aparece no canto
4. Badge "Primeira Aula" é desbloqueada
5. XP é atualizado na barra de nível

### CU04: Ver Progresso
1. Usuário acessa painel de progresso
2. Vê cards por conteúdo (JavaScript, React, etc.)
3. Cada card mostra: % concluído, XP ganho, tópicos
4. Barras de progresso indicam avanço visualmente

---

*Última atualização: 2026-07-17 após criação inicial dos requisitos*
