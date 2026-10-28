import Badge from './Badge';

function Projetos({ projetos, onSelecionarProjeto }) {
  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <h1>Projetos da Equipe</h1>
      </div>

      <div className="grid-projetos">
        {projetos.map((projeto) => (
          <div key={projeto.id} className="card-projeto">
            <div className="painel-topo">
              <h2>{projeto.nome}</h2>
              <Badge status={projeto.status} />
            </div>

            <div className="info-projeto">
              <p><strong>Cliente:</strong> {projeto.cliente}</p>
              <p><strong>Gerente:</strong> {projeto.gerente}</p>
            </div>

            <div className="area-progresso">
              <p>Progresso 0%</p>
              <div className="barra-progresso">
                <div className="barra-preenchida" style={{ width: '0%' }}></div>
              </div>
            </div>

            <button
              className="botao-detalhes"
              onClick={() => onSelecionarProjeto(projeto)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projetos;
