export const mockProjects = [
  {
    id: 1,
    nome: 'SAAS Casa do Gordo',
    cliente: 'Restaurante Casa do Gordo',
    gerente: 'Vitor Hugo Felipe Noronha',
    status: 'Em andamento',
    progresso: 0,
    descricao: 'Sistema web para gestão de comandas, mesas, pedidos online e relatórios do restaurante.',
    tarefas: [
      { id: 1, titulo: 'Prototipação das telas no Figma', concluida: false },
      { id: 2, titulo: 'Modelagem do banco de dados de comandas', concluida: false },
      { id: 3, titulo: 'Desenvolvimento do painel de pedidos', concluida: false },
      { id: 4, titulo: 'Módulo de relatórios financeiros', concluida: false }
    ]
  },
  {
    id: 2,
    nome: 'Açaí do Gutão',
    cliente: 'Franquia Açaí do Gutão',
    gerente: 'Petrus de Souza Matos Pfaffenbach',
    status: 'Em revisão',
    progresso: 0,
    descricao: 'Aplicativo de delivery com personalização de copos, adicionais e clube de fidelidade por pontos.',
    tarefas: [
      { id: 1, titulo: 'Fluxo de montagem de copos personalizados', concluida: false },
      { id: 2, titulo: 'Integração com gateway de pagamento', concluida: false },
      { id: 3, titulo: 'Sistema de pontuação e fidelidade', concluida: false },
      { id: 4, titulo: 'Testes de usabilidade com cliente', concluida: false }
    ]
  },
  {
    id: 3,
    nome: 'Site para a Inatel',
    cliente: 'Instituto Nacional de Telecomunicações',
    gerente: 'Enzo Ribeiro da Silva',
    status: 'Entregue',
    progresso: 0,
    descricao: 'Portal acadêmico e institucional.',
    tarefas: [
      { id: 1, titulo: 'Reestruturação da página inicial', concluida: false },
      { id: 2, titulo: 'Catálogo de cursos e laboratórios', concluida: false },
      { id: 3, titulo: 'Otimização de SEO e performance', concluida: false },
      { id: 4, titulo: 'Deploy em ambiente de produção', concluida: false }
    ]
  },
  {
    id: 4,
    nome: 'Corporative',
    cliente: 'CP2eJr',
    gerente: 'Lucas Pereira Maciel Luz',
    status: 'Em andamento',
    progresso: 0,
    descricao: 'Plataforma interna de acompanhamento.',
    tarefas: [
      { id: 1, titulo: 'Cadastro de membros e diretorias', concluida: false },
      { id: 2, titulo: 'Painel de acompanhamento de metas', concluida: false },
      { id: 3, titulo: 'Controle de presença em reuniões', concluida: false },
      { id: 4, titulo: 'Documentação interna de processos', concluida: false }
    ]
  }
];

export default mockProjects;
