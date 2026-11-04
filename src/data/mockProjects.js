export function formatarPreco(valor) {
  const limpo = String(valor ?? '').trim();
  if (!limpo) return 'R$ 0,00';
  if (limpo.startsWith('R$')) return limpo;
  const normalizado = limpo.replace(/\./g, '').replace(',', '.');
  const numero = Number(normalizado);
  if (!Number.isNaN(numero)) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return `R$ ${limpo}`;
}

export const MEMBROS_EQUIPE = [
  {
    id: 1,
    nome: 'Samuel Zanebone',
    cargo: 'Dev Front-end',
    iniciais: 'SZ',
  },
  {
    id: 2,
    nome: 'Vitor Hugo Felipe Noronha',
    cargo: 'Gerente',
    iniciais: 'VN',
  },
  {
    id: 3,
    nome: 'Petrus de Souza Matos Pfaffenbach',
    cargo: 'Gerente de Projetos',
    iniciais: 'PP',
  },
  {
    id: 4,
    nome: 'Enzo Ribeiro da Silva',
    cargo: 'Dev Back-end',
    iniciais: 'ER',
  },
  {
    id: 5,
    nome: 'Lucas Pereira Maciel Luz',
    cargo: 'Designer UI/UX',
    iniciais: 'LL',
  },
];

export const mockProjects = [
  {
    id: 1,
    nome: 'SAAS Casa do Gordo',
    cliente: 'Restaurante Casa do Gordo',
    gerente: 'Vitor Hugo Felipe Noronha',
    dataEntrega: '15/11/2026',
    preco: 'R$ 12.500,00',
    status: 'Em andamento',
    progresso: 0,
    descricao: 'Sistema web para gestão de comandas, mesas, pedidos online e relatórios do restaurante.',
    membrosAlocados: [
      'Samuel Zanebone',
      'Vitor Hugo Felipe Noronha',
      'Enzo Ribeiro da Silva',
      'Lucas Pereira Maciel Luz'
    ],
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
    dataEntrega: '28/11/2026',
    preco: 'R$ 8.900,00',
    status: 'Em andamento',
    progresso: 0,
    descricao: 'Aplicativo de delivery com personalização de copos, adicionais e clube de fidelidade por pontos.',
    membrosAlocados: [
      'Vitor Hugo Felipe Noronha',
      'Petrus de Souza Matos Pfaffenbach',
      'Enzo Ribeiro da Silva'
    ],
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
    dataEntrega: '10/10/2026',
    preco: 'R$ 15.000,00',
    status: 'Entregue',
    progresso: 100,
    descricao: 'Portal acadêmico e institucional.',
    membrosAlocados: [
      'Enzo Ribeiro da Silva'
    ],
    tarefas: [
      { id: 1, titulo: 'Reestruturação da página inicial', concluida: true },
      { id: 2, titulo: 'Catálogo de cursos e laboratórios', concluida: true },
      { id: 3, titulo: 'Otimização de SEO e performance', concluida: true },
      { id: 4, titulo: 'Deploy em ambiente de produção', concluida: true }
    ]
  },
  {
    id: 4,
    nome: 'Corporative',
    cliente: 'CP2eJr',
    gerente: 'Lucas Pereira Maciel Luz',
    dataEntrega: '05/12/2026',
    preco: 'R$ 6.400,00',
    status: 'Em andamento',
    progresso: 0,
    descricao: 'Plataforma interna de acompanhamento.',
    membrosAlocados: [
      'Samuel Zanebone',
      'Petrus de Souza Matos Pfaffenbach',
      'Lucas Pereira Maciel Luz'
    ],
    tarefas: [
      { id: 1, titulo: 'Cadastro de membros e diretorias', concluida: false },
      { id: 2, titulo: 'Painel de acompanhamento de metas', concluida: false },
      { id: 3, titulo: 'Controle de presença em reuniões', concluida: false },
      { id: 4, titulo: 'Documentação interna de processos', concluida: false }
    ]
  }
];

export default mockProjects;
