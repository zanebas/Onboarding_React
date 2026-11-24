# Projetos Internos — CP2eJr (Onboarding React)

Aplicação web (SPA) desenvolvida em **React** e **Vite** como entrega do processo de onboarding do Núcleo de Projetos da **CP2eJr**. O sistema centraliza o acompanhamento operacional de projetos internos, alocação da equipe, controle dinâmico de entregas e comunicação rápida entre os membros.

 **Acesse a aplicação online:** [https://zanebas.github.io/Onboarding_React/](https://zanebas.github.io/Onboarding_React/)

---

## Funcionalidades Principais

* **Dashboard Geral:**
  * Indicadores consolidados em tempo real (projetos ativos, tarefas pendentes, projetos concluídos e total de membros da equipe).
  * Lista rápida de entregas em andamento com barra de progresso e status visual.
  * Painel de **Equipe Alocada** que cruza automaticamente gerentes e membros alocados para exibir a carga de entregas ativas de cada integrante.
* **Feed de Atividades Interno:**
  * Publicação de atualizações rápidas (com envio direto pela tecla `Enter`).
  * Interação em tempo real com curtidas e sistema de comentários aninhados por publicação.
* **Gestão de Projetos:**
  * Listagem completa em cards com acompanhamento de cliente, gerente responsável, prazo de entrega, orçamento e barra de progresso.
  * Cadastro de novos projetos com validação de campos, seleção múltipla de membros da equipe e definição dinâmica de funcionalidades/tarefas.
  * Edição rápida de valores (preço do projeto) diretamente no card ou na tela de detalhes.
* **Controle Dinâmico de Entregas e Tarefas:**
  * Checklist interativo de tarefas dentro de cada projeto: o progresso percentual é recalculado automaticamente a cada tarefa concluída ou reaberta.
  * Alternância de status em um clique (*Em andamento* ↔ *Entregue 100%*), sincronizando automaticamente o estado de todas as tarefas vinculadas.

---

## Tecnologias Utilizadas

* **React**
* **Vite**
* **JavaScript**
* **CSS3** 

---

## Como Rodar Localmente

Para executar o projeto na sua máquina, siga os passos abaixo no terminal:

1. **Clone o repositório e acesse a pasta do projeto:**
   git clone https://github.com/zanebas/Onboarding_React

2. **Instale as dependências:**
   npm install

3. **Inicie o servidor de desenvolvimento:**
   npm run dev
