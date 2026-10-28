import Badge from './Badge';

function ProjetoDetalhes({ projeto, onVoltar }) {
  return (
    <div className="pagina">
      <button className="botao-voltar" onClick={onVoltar}>
        ← Voltar para Projetos
      </button>

      <div className="cabecalho-pagina">
        <div className="titulo-com-badge">
          <h1>{projeto.nome}</h1>
          <Badge status={projeto.status} />
        </div>
        <p>{projeto.descricao}</p>
      </div>

      <div className="cards-detalhes">
        <div className="card-resumo">
          <span>Cliente</span>
          <strong className="texto-medio">{projeto.cliente}</strong>
        </div>

        <div className="card-resumo">
          <span>Gerente Responsável</span>
          <strong className="texto-medio">{projeto.gerente}</strong>
        </div>

        <div className="card-resumo">
          <span>Progresso Geral</span>
          <strong className="texto-medio">0%</strong>
        </div>
      </div>

      <div className="card-painel">
        <div className="painel-topo">
          <h2>Tarefas do Projeto (0% concluído)</h2>
        </div>

        <div className="lista-simples">
          {projeto.tarefas.map((tarefa) => (
            <div key={tarefa.id} className="item-lista">
              <div className="tarefa-esquerda">
                <span className="circulo-checkbox"></span>
                <span className="item-titulo">{tarefa.titulo}</span>
              </div>
              <span className="tag-pendente">Pendente (0%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjetoDetalhes;
