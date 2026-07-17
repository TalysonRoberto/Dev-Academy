# Dev Academy

Plataforma web de aulas técnicas interativas para desenvolvedores.

## Stack Tecnológica

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Zustand** (estado)
- **Framer Motion** (animações)
- **Monaco Editor** (editor de código)
- **Sandpack** (execução de código)
- **MDX** (conteúdo)
- **Prisma/SQLite** (banco de dados)
- **NextAuth.js** (autenticação)

## Getting Started

### Pré-requisitos

- Node.js 18.17 ou superior
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd dev-academy

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma generate
npx prisma db push

# Popule com dados de exemplo
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

### Acesse

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
src/
├── app/                    # Rotas do Next.js (App Router)
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   └── page.tsx           # Página inicial
├── components/
│   ├── layout/            # Componentes de layout (Sidebar, Header)
│   └── ui/                # Componentes shadcn/ui
├── lib/
│   ├── auth.ts            # Configuração do NextAuth
│   ├── prisma.ts          # Client do Prisma
│   └── utils.ts           # Utilitários
└── store/
    └── index.ts           # Store Zustand

content/                    # Conteúdo em MDX
├── javascript/
│   ├── _meta.json
│   ├── funcoes/
│   │   ├── _meta.json
│   │   ├── aula-01.mdx
│   │   └── aula-02.mdx
│   └── arrays/
│       ├── _meta.json
│       └── aula-01.mdx
└── react/
    ├── _meta.json
    └── hooks/
        ├── _meta.json
        └── aula-01.mdx

prisma/
├── schema.prisma          # Schema do banco de dados
└── seed.ts                # Dados de exemplo
```

## Adicionando Nova Aula

1. Crie um arquivo `.mdx` na pasta do tópico correspondente
2. Adicione o frontmatter com metadados:
   ```yaml
   ---
   id: "id-unico-da-aula"
   conteudoId: "id-do-conteudo"
   topicoId: "id-do-topico"
   titulo: "Título da Aula"
   xp: 50
   duracaoEstimada: "15min"
   exercicio:
     enunciado: "Descrição do exercício"
     linguagem: "javascript"
     codigoInicial: "código inicial"
     testes:
       - input: [entrada]
         output: saida
   ---
   ```
3. Escreva o conteúdo da aula em Markdown
4. O sistema detectará automaticamente a nova aula

## Comandos Úteis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar servidor de produção
npm run lint         # Verificar código com ESLint

npx prisma studio    # Abrir interface do banco de dados
npx prisma generate  # Gerar client do Prisma
npx prisma db push   # Sincronizar schema com banco
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
