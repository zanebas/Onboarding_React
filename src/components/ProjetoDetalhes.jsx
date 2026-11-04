import { useState } from 'react';
import Badge from './Badge';

function ProjetoDetalhes({
  projeto,
  onVoltar,
  onAdicionarTarefa,
  onAlternarTarefa,
  onAtualizarPreco,
  onAlternarEntrega,
}) {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [editandoPreco, setEditandoPreco] = useState(false);
  const [novoPreco, setNovoPreco] = useState(projeto.preco);

  const estaEntregue = projeto.status === 'Entregue';

  function handleAdicionarTarefa(e) {
    e.preventDefault();
    const titulo = novaTarefa.trim();
    if (!titulo) return;
    onAdicionarTarefa(projeto.id, titulo);
    setNovaTarefa('');
  }

  function handleSalvarPreco(e) {
    e.preventDefault();
    if (!novoPreco.trim()) return;
    onAtualizarPreco(projeto.id, novoPreco);
    setEditandoPreco(false);
  }

  return (
    <div className="pagina">
      <div className="topo-detalhes-acoes">
        <button type="button" className="botao-voltar" onClick={onVoltar}>
          ← Voltar para Projetos
        </button>

        <button
          type="button"
          className={
            estaEntregue
              ? 'botao-entrega-status em-andamento'
              : 'botao-entrega-status entregar'
          }
          onClick={() => onAlternarEntrega(projeto.id)}
        >
          {estaEntregue
            ? '↺ Marcar como Em Andamento'
            : '✓ Entregar Projeto (100%)'}
        </button>
      </div>

      <div className="cabecalho-pagina">
        <div className="titulo-com-badge">
          <h1>{projeto.nome}</h1>
          <Badge status={projeto.status} />
        </div>
        <p>{projeto.descricao}</p>
      </div>

      <div className="cards-detalhes cards-detalhes-cinco">
        <div className="card-resumo">
          <span>Cliente</span>
          <strong className="texto-medio">{projeto.cliente}</strong>
        </div>

        <div className="card-resumo">
          <span>Gerente Responsável</span>
          <strong className="texto-medio">{projeto.gerente}</strong>
        </div>

        <div className="card-resumo">
          <span>Data de Entrega</span>
          <strong className="texto-medio">{projeto.dataEntrega}</strong>
        </div>

        <div className="card-resumo">
          <div className="topo-card-preco">
            <span>Preço do Projeto</span>
            {!editandoPreco && (
              <button
                type="button"
                className="btn-editar-inline"
                onClick={() => {
                  setNovoPreco(projeto.preco);
                  setEditandoPreco(true);
                }}
              >
                Editar
              </button>
            )}
          </div>

          {editandoPreco ? (
            <form className="form-editar-preco" onSubmit={handleSalvarPreco}>
              <label htmlFor="editar-preco-detalhes" className="sr-only">
                Preço do projeto
              </label>
              <input
                id="editar-preco-detalhes"
                name="preco"
                type="text"
                inputMode="decimal"
                value={novoPreco}
                onChange={(e) => setNovoPreco(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn-salvar-preco">
                Salvar
              </button>
            </form>
          ) : (
            <strong className="texto-medio valor-preco-destaque">
              {projeto.preco}
            </strong>
          )}
        </div>

        <div className="card-resumo">
          <span>Progresso Geral</span>
          <strong className="texto-medio">{projeto.progresso ?? 0}%</strong>
        </div>
      </div>

      {projeto.membrosAlocados?.length > 0 && (
        <div className="card-painel">
          <div className="painel-topo">
            <h2>Pessoas Alocadas no Projeto</h2>
          </div>
          <div className="lista-projetos-membro">
            {projeto.membrosAlocados.map((nomeMembro) => (
              <span key={nomeMembro} className="tag-projeto-membro">
                {nomeMembro}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card-painel">
        <div className="painel-topo">
          <h2>
            Tarefas / Funcionalidades do Projeto ({projeto.progresso ?? 0}% concluído)
          </h2>
          <span className="item-subtitulo">
            Clique nas tarefas para marcar como concluída ou em andamento
          </span>
        </div>

        <form className="form-adicionar-tarefa" onSubmit={handleAdicionarTarefa}>
          <label htmlFor="nova-tarefa-input" className="sr-only">
            Nova tarefa do projeto
          </label>
          <input
            id="nova-tarefa-input"
            name="novaTarefa"
            type="text"
            placeholder="Adicionar nova tarefa ao projeto..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button type="submit" className="botao-adicionar-tarefa">
            + Adicionar Tarefa
          </button>
        </form>

        <div className="lista-simples">
          {projeto.tarefas.map((tarefa) => (
            <div key={tarefa.id} className="item-lista">
              <label className="tarefa-esquerda tarefa-interativa">
                <input
                  type="checkbox"
                  className="checkbox-tarefa"
                  checked={!!tarefa.concluida}
                  onChange={() => onAlternarTarefa(projeto.id, tarefa.id)}
                />
                <span
                  className={
                    tarefa.concluida
                      ? 'item-titulo tarefa-concluida-texto'
                      : 'item-titulo'
                  }
                >
                  {tarefa.titulo}
                </span>
              </label>

              <span
                className={
                  tarefa.concluida ? 'tag-concluida' : 'tag-pendente'
                }
              >
                {tarefa.concluida ? 'Concluída (100%)' : 'Pendente (0%)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjetoDetalhes;
