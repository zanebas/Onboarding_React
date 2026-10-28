import Badge from './Badge';

function Dashboard({ projetos, irParaProjetos }) {
  const equipe = [
    { id: 1, nome: 'Samuel Zanebone', cargo: 'Dev Front-end', iniciais: 'SZ', tarefas: 'Samuel tem 4 tarefas' },
    { id: 2, nome: 'Vitor Noronha', cargo: 'Gerente', iniciais: 'VN', tarefas: 'Vitor tem 2 tarefas' },
    { id: 3, nome: 'Enzo Ribeiro', cargo: 'Dev Back-end', iniciais: 'ER', tarefas: 'Enzo tem 3 tarefas' },
    { id: 4, nome: 'Lucas Luz', cargo: 'Designer UI/UX', iniciais: 'LL', tarefas: 'Lucas tem 2 tarefas' }
  ];

  const feedAtividades = [
    { id: 1, texto: 'Samuel entregou o projeto', tempo: 'Há 10 minutos' },
    { id: 2, texto: 'Petrus fez a documentação', tempo: 'Há 30 minutos' },
    { id: 3, texto: 'Vitor revisou as tarefas da semana', tempo: 'Há 1 hora' },
    { id: 4, texto: 'Enzo atualizou o banco de dados', tempo: 'Há 2 horas' },
    { id: 5, texto: 'Lucas organizou o protótipo das telas', tempo: 'Há 3 horas' }
  ];

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <h1>Dashboard Geral</h1>
        <p>Acompanhe o status das entregas, demandas pendentes e o ritmo da equipe em tempo real.</p>
      </div>

      {/* 4 Cards do Topo */}
      <div className="cards-topo">
        <div className="card-resumo borda-azul">
          <span>Projetos Ativos</span>
          <strong>3</strong>
        </div>

        <div className="card-resumo borda-laranja">
          <span>Tarefas Pendentes</span>
          <strong>16</strong>
        </div>

        <div className="card-resumo borda-verde">
          <span>Projetos Concluídos</span>
          <strong>1</strong>
        </div>

        <div className="card-resumo borda-roxa">
          <span>Membros da Equipe</span>
          <strong>8</strong>
        </div>
      </div>

      {/* Colunas Inferiores */}
      <div className="colunas-dashboard">
        {/* Coluna da Esquerda: Entregas + Feed abaixo */}
        <div className="coluna-esquerda">
          <div className="card-painel">
            <div className="painel-topo">
              <h2>Entregas em Andamento</h2>
              <button className="botao-link" onClick={irParaProjetos}>
                Ver todos os projetos →
              </button>
            </div>

            <div className="lista-simples">
              {projetos.map((projeto) => (
                <div key={projeto.id} className="item-lista">
                  <div>
                    <p className="item-titulo">{projeto.nome}</p>
                    <p className="item-subtitulo">{projeto.gerente}</p>
                  </div>

                  <div className="item-direita">
                    <span className="porcentagem">0%</span>
                    <Badge status={projeto.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed abaixo das Entregas em Andamento */}
          <div className="card-painel">
            <div className="painel-topo">
              <h2>Feed de Atividades</h2>
            </div>

            <div className="lista-simples">
              {feedAtividades.map((item) => (
                <div key={item.id} className="item-lista">
                  <p className="item-titulo">{item.texto}</p>
                  <span className="item-subtitulo">{item.tempo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Equipe Alocada */}
        <div className="coluna-direita">
          <div className="card-painel">
            <div className="painel-topo">
              <h2>Equipe Alocada</h2>
            </div>

            <div className="lista-simples">
              {equipe.map((membro) => (
                <div key={membro.id} className="item-equipe">
                  <div className="membro-esquerda">
                    <div className="avatar">{membro.iniciais}</div>
                    <div>
                      <p className="item-titulo">{membro.nome}</p>
                      <p className="item-subtitulo">{membro.cargo}</p>
                    </div>
                  </div>

                  <span className="tag-tarefas">{membro.tarefas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
