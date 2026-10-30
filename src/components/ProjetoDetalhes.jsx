import { useState } from 'react';
import Badge from './Badge';

function ProjetoDetalhes({ projeto, onVoltar, onAdicionarTarefa }) {
  const [novaTarefa, setNovaTarefa] = useState('');

  function handleAdicionarTarefa(e) {
    e.preventDefault();
    const titulo = novaTarefa.trim();
    if (!titulo) return;
    onAdicionarTarefa(projeto.id, titulo);
    setNovaTarefa('');
  }

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

      <div className="cards-detalhes cards-detalhes-quatro">
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
          <span>Progresso Geral</span>
          <strong className="texto-medio">{projeto.progresso ?? 0}%</strong>
        </div>
      </div>

      <div className="card-painel">
        <div className="painel-topo">
          <h2>Tarefas / Funcionalidades do Projeto ({projeto.progresso ?? 0}% concluído)</h2>
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
