# Calculadora de Desdobramento

Uma aplicação responsiva para calcular desdobramentos de apostas esportivas com versões otimizadas para desktop e mobile.

## Estrutura do Projeto

### Componentes Principais

- **`DesdobramentoCalculator.tsx`** - Componente principal que detecta o tamanho da tela e renderiza a versão apropriada
- **`DesdobramentoCalculatorDesktop.tsx`** - Versão otimizada para desktop com layout em grid e interface expandida
- **`DesdobramentoCalculatorMobile.tsx`** - Versão otimizada para mobile com interface simplificada e telas empilhadas

### Hooks Personalizados

- **`useMediaQuery.ts`** - Hook para detectar o tamanho da tela e responsividade
- **`useDesdobramento.ts`** - Hook compartilhado que contém toda a lógica de negócio dos desdobramentos

### Componentes UI

- **`ui/input.tsx`** - Componente de input reutilizável
- **`ui/button.tsx`** - Componente de botão reutilizável com variantes

## Funcionalidades

### ✨ Principais Features

- **Responsividade Automática**: Detecta automaticamente se é mobile ou desktop
- **Cálculo de Combinações**: Gera todas as combinações possíveis (8 ou 16)
- **Marcação de Odds Ganhadoras**: Interface intuitiva para marcar resultados
- **Persistência Local**: Salva automaticamente no localStorage
- **Navegação Entre Desdobramentos**: Suporte a múltiplos desdobramentos
- **Cálculo de Lucro**: Mostra total apostado, ganhos e lucro em tempo real

### 📱 Versão Mobile

- Interface otimizada para toque
- Layout vertical com cartões
- Botões grandes para facilitar a interação
- Resumo financeiro destacado
- Scroll otimizado para listas longas

### 🖥️ Versão Desktop

- Layout em grid responsivo
- Interface expandida com mais informações visíveis
- Melhor aproveitamento do espaço da tela
- Visualização de múltiplas combinações simultaneamente
- Navegação mais eficiente

## Como Usar

1. **Criar Desdobramento**:

   - Defina o valor da aposta
   - Escolha entre 8 (3 jogos) ou 16 (4 jogos) combinações
   - Insira as odds para cada jogo
   - Clique em "Calcular"

2. **Marcar Resultados**:

   - Clique nas odds que foram ganhadoras
   - O sistema automaticamente calcula quais combinações ganharam
   - Visualize o total de ganhos e lucro

3. **Gerenciar Desdobramentos**:
   - Navegue entre diferentes desdobramentos
   - Adicione novos desdobramentos
   - Conclua desdobramentos finalizados

## Tecnologias

- **React 18** com TypeScript
- **Next.js 14** (App Router)
- **Tailwind CSS** para estilização
- **Custom Hooks** para lógica compartilhada
- **LocalStorage** para persistência

## Estrutura de Arquivos

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout da aplicação
│   └── globals.css           # Estilos globais
├── components/
│   ├── DesdobramentoCalculator.tsx         # Componente principal responsivo
│   ├── DesdobramentoCalculatorDesktop.tsx  # Versão desktop
│   ├── DesdobramentoCalculatorMobile.tsx   # Versão mobile
│   └── ui/
│       ├── input.tsx         # Componente Input
│       └── button.tsx        # Componente Button
└── hooks/
    ├── useDesdobramento.ts   # Lógica compartilhada
    └── useMediaQuery.ts      # Hook de responsividade
```

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

A aplicação estará disponível em `http://localhost:3000`.
