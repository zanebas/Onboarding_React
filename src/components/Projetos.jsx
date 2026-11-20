import { useRef, useState } from 'react';
import { Banknote, Building2, Calendar, Flag, Pencil, User } from 'lucide-react';
import {
  MEMBROS_EQUIPE,
  PRIORIDADES,
  estaAtrasado,
  formatarPreco,
  obterIniciais,
  ordenarProjetosPorPrioridade,
} from '../data/mockProjects';
import Badge from './Badge';
import PrioridadeSelect from './PrioridadeSelect';

const MAX_FUNCIONALIDADES = 4;

const novaFuncionalidade = () => ({ id: null, titulo: '', concluida: false });

function formatarDataInput(valorIso) {
  if (!valorIso) return '30/11/2026';
  const partes = valorIso.split('-');
  if (partes.length !== 3) return valorIso;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function dataBrParaIso(dataBr) {
  const partes = String(dataBr ?? '').split('/');
  if (partes.length !== 3) return '';
  return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
}

function valorPrecoParaInput(preco) {
  return String(preco ?? '').replace(/^R\$\s*/, '');
}

function Projetos({
  projetos,
  onSelecionarProjeto,
  onAdicionarProjeto,
  onEditarProjeto,
  onAtualizarPreco,
  onAlternarEntrega,
  onAlterarPrioridade,
}) {
  const dialogRef = useRef(null);
  const pressedOutsideRef = useRef(false);

  const [projetoEditandoId, setProjetoEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [cliente, setCliente] = useState('');
  const [gerente, setGerente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [preco, setPreco] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [descricao, setDescricao] = useState('');
  const [membrosSelecionados, setMembrosSelecionados] = useState([]);
  const [funcionalidades, setFuncionalidades] = useState([novaFuncionalidade()]);
  const [erroForm, setErroForm] = useState('');

  const [editandoPrecoId, setEditandoPrecoId] = useState(null);
  const [valorPrecoEdicao, setValorPrecoEdicao] = useState('');

  function limparFormulario() {
    setProjetoEditandoId(null);
    setNome('');
    setCliente('');
    setGerente('');
    setDataEntrega('');
    setPreco('');
    setPrioridade('Média');
    setDescricao('');
    setMembrosSelecionados([]);
    setFuncionalidades([novaFuncionalidade()]);
    setErroForm('');
  }

  function abrirMenuNovoProjeto() {
    limparFormulario();
    dialogRef.current?.showModal();
  }

  function abrirEdicaoProjeto(projeto) {
    setProjetoEditandoId(projeto.id);
    setNome(projeto.nome);
    setCliente(projeto.cliente);
    setGerente(projeto.gerente);
    setDataEntrega(dataBrParaIso(projeto.dataEntrega));
    setPreco(valorPrecoParaInput(projeto.preco));
    setPrioridade(projeto.prioridade ?? 'Média');
    setDescricao(projeto.descricao ?? '');
    setMembrosSelecionados(projeto.membrosAlocados ?? []);
    setFuncionalidades(
      projeto.tarefas.length > 0
        ? projeto.tarefas.map((t) => ({
            id: t.id,
            titulo: t.titulo,
            concluida: t.concluida,
          }))
        : [novaFuncionalidade()]
    );
    setErroForm('');
    dialogRef.current?.showModal();
  }

  function fecharMenuNovoProjeto() {
    dialogRef.current?.close();
  }

  function iniciarEdicaoPreco(projeto) {
    setEditandoPrecoId(projeto.id);
    setValorPrecoEdicao(projeto.preco);
  }

  function salvarEdicaoPreco(e, projetoId) {
    e.preventDefault();
    if (!valorPrecoEdicao.trim()) return;
    onAtualizarPreco(projetoId, valorPrecoEdicao);
    setEditandoPrecoId(null);
    setValorPrecoEdicao('');
  }

  function atualizarFuncionalidade(index, valor) {
    setErroForm('');
    setFuncionalidades((atuais) =>
      atuais.map((item, i) => (i === index ? { ...item, titulo: valor } : item))
    );
  }

  function alternarMembroSelecionado(nomeMembro) {
    setErroForm('');
    setMembrosSelecionados((atuais) =>
      atuais.includes(nomeMembro)
        ? atuais.filter((nomeAtual) => nomeAtual !== nomeMembro)
        : [...atuais, nomeMembro]
    );
  }

  function adicionarCampoFuncionalidade() {
    if (funcionalidades.length >= MAX_FUNCIONALIDADES) return;
    setFuncionalidades((atuais) => [...atuais, novaFuncionalidade()]);
  }

  function removerCampoFuncionalidade(index) {
    if (funcionalidades.length <= 1) return;
    setFuncionalidades((atuais) => atuais.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nomeLimpo = nome.trim();
    const clienteLimpo = cliente.trim();
    const gerenteLimpo = gerente.trim() || 'Samuel Zanebone';
    const precoLimpo = preco.trim();
    const descricaoLimpa =
      descricao.trim() || 'Projeto cadastrado pela plataforma interna CP2eJr.';

    const listaFuncionalidades = funcionalidades
      .map((f) => ({ ...f, titulo: f.titulo.trim() }))
      .filter((f) => f.titulo)
      .slice(0, MAX_FUNCIONALIDADES);

    if (!nomeLimpo || !clienteLimpo || !dataEntrega || !precoLimpo) {
      setErroForm(
        'Preencha o nome do projeto, o cliente, a data de entrega e o preço.'
      );
      return;
    }

    if (membrosSelecionados.length === 0) {
      setErroForm('Selecione pelo menos 1 pessoa para trabalhar no projeto.');
      return;
    }

    if (listaFuncionalidades.length === 0) {
      setErroForm('Adicione pelo menos 1 funcionalidade a ser implementada.');
      return;
    }

    const tarefas = listaFuncionalidades.map((f, idx) => ({
      id: f.id ?? Date.now() + idx,
      titulo: f.titulo,
      concluida: f.concluida,
    }));

    if (projetoEditandoId !== null) {
      onEditarProjeto(projetoEditandoId, {
        nome: nomeLimpo,
        cliente: clienteLimpo,
        gerente: gerenteLimpo,
        dataEntrega: formatarDataInput(dataEntrega),
        preco: formatarPreco(precoLimpo),
        prioridade,
        descricao: descricaoLimpa,
        membrosAlocados: membrosSelecionados,
        tarefas,
      });
    } else {
      onAdicionarProjeto({
        id: Date.now(),
        nome: nomeLimpo,
        cliente: clienteLimpo,
        gerente: gerenteLimpo,
        dataEntrega: formatarDataInput(dataEntrega),
        preco: formatarPreco(precoLimpo),
        status: 'Em andamento',
        prioridade,
        progresso: 0,
        descricao: descricaoLimpa,
        membrosAlocados: membrosSelecionados,
        tarefas: tarefas.map((t, idx) => ({ ...t, id: idx + 1 })),
      });
    }

    fecharMenuNovoProjeto();
  }

  function isOutsideDialog(e, dialog) {
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  }

  return (
    <div className="pagina">
      <div className="cabecalho-pagina cabecalho-projetos">
        <div>
          <h1>Projetos da Equipe</h1>
        </div>

        <button
          type="button"
          className="botao-novo-projeto"
          onClick={abrirMenuNovoProjeto}
        >
          + Novo Projeto
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="modal-novo-projeto-titulo"
        {...({ closedby: 'any' })}
        className="modal-novo-projeto"
        onClose={limparFormulario}
        onPointerDown={(e) => {
          if (dialogRef.current) {
            pressedOutsideRef.current = isOutsideDialog(e, dialogRef.current);
          }
        }}
        onPointerUp={(e) => {
          if (
            dialogRef.current &&
            !('closedBy' in HTMLDialogElement.prototype) &&
            pressedOutsideRef.current &&
            isOutsideDialog(e, dialogRef.current)
          ) {
            dialogRef.current.close();
          }
          pressedOutsideRef.current = false;
        }}
      >
        <div className="modal-cabecalho">
          <h2 id="modal-novo-projeto-titulo">
            {projetoEditandoId !== null ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
          </h2>
          <button
            type="button"
            className="botao-fechar-modal"
            aria-label="Fechar menu do projeto"
            onClick={fecharMenuNovoProjeto}
          >
            ✕
          </button>
        </div>

        <form className="form-novo-projeto" onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nome-projeto">Nome do Projeto</label>
            <input
              id="nome-projeto"
              name="nome"
              type="text"
              placeholder="Ex: Portal de Eventos CP2eJr"
              value={nome}
              onChange={(e) => {
                setErroForm('');
                setNome(e.target.value);
              }}
              autoFocus
              required
            />
          </div>

          <div className="linha-form-dupla">
            <div className="campo-form">
              <label htmlFor="cliente-projeto">Cliente</label>
              <input
                id="cliente-projeto"
                name="cliente"
                type="text"
                placeholder="Ex: Empresa Parceira"
                value={cliente}
                onChange={(e) => {
                  setErroForm('');
                  setCliente(e.target.value);
                }}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="data-entrega-projeto">Data de Entrega</label>
              <input
                id="data-entrega-projeto"
                name="dataEntrega"
                type="date"
                value={dataEntrega}
                onChange={(e) => {
                  setErroForm('');
                  setDataEntrega(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="linha-form-dupla">
            <div className="campo-form">
              <label htmlFor="preco-projeto">Preço do Projeto (R$)</label>
              <input
                id="preco-projeto"
                name="preco"
                type="text"
                inputMode="decimal"
                placeholder="Ex: R$ 9.500,00"
                value={preco}
                onChange={(e) => {
                  setErroForm('');
                  setPreco(e.target.value);
                }}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="gerente-projeto">Gerente Responsável</label>
              <input
                id="gerente-projeto"
                name="gerente"
                type="text"
                placeholder="Ex: Samuel Zanebone"
                value={gerente}
                onChange={(e) => setGerente(e.target.value)}
              />
            </div>
          </div>

          <div className="campo-form">
            <label htmlFor="prioridade-projeto">Prioridade</label>
            <select
              id="prioridade-projeto"
              name="prioridade"
              className="select-campo-form"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              {PRIORIDADES.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-form">
            <label htmlFor="descricao-projeto">Descrição Breve</label>
            <textarea
              id="descricao-projeto"
              name="descricao"
              rows={2}
              placeholder="Resumo do objetivo do projeto..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <fieldset className="fieldset-funcionalidades">
            <div className="topo-funcionalidades">
              <legend>
                Pessoas alocadas para trabalhar no projeto ({membrosSelecionados.length} selecionadas)
              </legend>
            </div>

            <div className="grid-selecao-membros">
              {MEMBROS_EQUIPE.map((membro) => {
                const selecionado = membrosSelecionados.includes(membro.nome);
                return (
                  <label
                    key={membro.id}
                    className={
                      selecionado
                        ? 'opcao-membro-alocado is-active'
                        : 'opcao-membro-alocado'
                    }
                  >
                    <input
                      type="checkbox"
                      name="membrosAlocados"
                      value={membro.nome}
                      className="checkbox-membro"
                      checked={selecionado}
                      onChange={() => alternarMembroSelecionado(membro.nome)}
                    />
                    <span className="avatar-mini" aria-hidden="true">
                      {membro.iniciais}
                    </span>
                    <span className="info-membro-selecao">
                      <span className="nome-membro-selecao">{membro.nome}</span>
                      <span className="cargo-membro-selecao">{membro.cargo}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="fieldset-funcionalidades">
            <div className="topo-funcionalidades">
              <legend>
                Funcionalidades a serem implementadas ({funcionalidades.length}/{MAX_FUNCIONALIDADES})
              </legend>
              <button
                type="button"
                className="botao-add-funcionalidade"
                onClick={adicionarCampoFuncionalidade}
                disabled={funcionalidades.length >= MAX_FUNCIONALIDADES}
              >
                {funcionalidades.length >= MAX_FUNCIONALIDADES
                  ? 'Limite de 4 atingido'
                  : '+ Adicionar funcionalidade'}
              </button>
            </div>

            <div className="lista-inputs-funcionalidades">
              {funcionalidades.map((func, index) => (
                <div key={index} className="linha-funcionalidade">
                  <label htmlFor={`funcionalidade-${index}`} className="label-funcionalidade">
                    Funcionalidade {index + 1}
                  </label>
                  <div className="input-com-remover">
                    <input
                      id={`funcionalidade-${index}`}
                      name={`funcionalidade_${index + 1}`}
                      type="text"
                      placeholder={`Descreva a funcionalidade ${index + 1}...`}
                      value={func.titulo}
                      onChange={(e) => atualizarFuncionalidade(index, e.target.value)}
                      required={index === 0}
                    />
                    {funcionalidades.length > 1 && (
                      <button
                        type="button"
                        className="botao-remover-funcionalidade"
                        aria-label={`Remover funcionalidade ${index + 1}`}
                        onClick={() => removerCampoFuncionalidade(index)}
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {erroForm && (
            <p className="mensagem-erro-form" role="alert">
              {erroForm}
            </p>
          )}

          <div className="acoes-modal">
            <button
              type="button"
              className="botao-cancelar"
              onClick={fecharMenuNovoProjeto}
            >
              Cancelar
            </button>
            <button type="submit" className="botao-salvar-projeto">
              {projetoEditandoId !== null ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </dialog>

      <div className="grid-projetos">
        {ordenarProjetosPorPrioridade(projetos).map((projeto) => {
          const estaEntregue = projeto.status === 'Entregue';
          const editandoEstePreco = editandoPrecoId === projeto.id;

          return (
            <div key={projeto.id} className="card-projeto">
              <div className="painel-topo">
                <h2>{projeto.nome}</h2>
                <div className="topo-card-acoes">
                  <Badge status={projeto.status} />
                  <button
                    type="button"
                    className="btn-editar-projeto"
                    title="Editar projeto"
                    aria-label={`Editar projeto ${projeto.nome}`}
                    onClick={() => abrirEdicaoProjeto(projeto)}
                  >
                    <Pencil size={14} aria-hidden="true" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>

              <div className="info-projeto">
                <dl className="meta-grid-projeto">
                  <div className="meta-item-projeto">
                    <dt>
                      <Building2 size={13} aria-hidden="true" />
                      <span>Cliente</span>
                    </dt>
                    <dd>{projeto.cliente}</dd>
                  </div>

                  <div className="meta-item-projeto">
                    <dt>
                      <User size={13} aria-hidden="true" />
                      <span>Gerente</span>
                    </dt>
                    <dd>{projeto.gerente}</dd>
                  </div>

                  <div className="meta-item-projeto">
                    <dt>
                      <Calendar size={13} aria-hidden="true" />
                      <span>Entrega</span>
                    </dt>
                    <dd>
                      <span
                        className={
                          estaAtrasado(projeto)
                            ? 'data-entrega data-atrasada'
                            : 'data-entrega'
                        }
                      >
                        {projeto.dataEntrega}
                      </span>
                      {estaAtrasado(projeto) && (
                        <span className="indicador-atraso">Atrasado</span>
                      )}
                    </dd>
                  </div>

                  <div className="meta-item-projeto">
                    <dt>
                      <Flag size={13} aria-hidden="true" />
                      <label htmlFor={`prioridade-${projeto.id}`}>Prioridade</label>
                    </dt>
                    <dd>
                      <PrioridadeSelect
                        id={`prioridade-${projeto.id}`}
                        prioridade={projeto.prioridade}
                        nomeProjeto={projeto.nome}
                        onChange={(novaPrioridade) =>
                          onAlterarPrioridade(projeto.id, novaPrioridade)
                        }
                      />
                    </dd>
                  </div>

                  <div className="meta-item-projeto meta-item-largo">
                    <dt>
                      <Banknote size={13} aria-hidden="true" />
                      <span>Preço</span>
                    </dt>
                    <dd>
                      {editandoEstePreco ? (
                        <form
                          className="form-editar-preco"
                          onSubmit={(e) => salvarEdicaoPreco(e, projeto.id)}
                        >
                          <label
                            htmlFor={`input-preco-${projeto.id}`}
                            className="sr-only"
                          >
                            Novo preço do projeto {projeto.nome}
                          </label>
                          <input
                            id={`input-preco-${projeto.id}`}
                            name="preco"
                            type="text"
                            inputMode="decimal"
                            value={valorPrecoEdicao}
                            onChange={(e) => setValorPrecoEdicao(e.target.value)}
                            autoFocus
                          />
                          <button type="submit" className="btn-salvar-preco">
                            Salvar
                          </button>
                          <button
                            type="button"
                            className="btn-cancelar-preco"
                            onClick={() => setEditandoPrecoId(null)}
                          >
                            Cancelar
                          </button>
                        </form>
                      ) : (
                        <span className="texto-preco-card">
                          <span className="valor-preco-destaque">
                            {projeto.preco}
                          </span>
                          <button
                            type="button"
                            className="btn-editar-inline"
                            title="Editar preço"
                            aria-label={`Editar preço de ${projeto.nome}`}
                            onClick={() => iniciarEdicaoPreco(projeto)}
                          >
                            <Pencil size={13} aria-hidden="true" />
                          </button>
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>

                {projeto.membrosAlocados?.length > 0 && (
                  <div className="equipe-projeto">
                    <span className="label-projetos-membro">Equipe</span>
                    <div className="pilha-avatares">
                      {projeto.membrosAlocados.map((nomeMembro) => (
                        <span
                          key={nomeMembro}
                          className="avatar-pilha"
                          role="img"
                          title={nomeMembro}
                          aria-label={nomeMembro}
                        >
                          {obterIniciais(nomeMembro)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="area-progresso">
                <p>Progresso {projeto.progresso ?? 0}%</p>
                <div className="barra-progresso">
                  <div
                    className={
                      estaEntregue
                        ? 'barra-preenchida barra-concluida'
                        : 'barra-preenchida'
                    }
                    style={{ width: `${projeto.progresso ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="acoes-card-projeto">
                <button
                  type="button"
                  className="botao-detalhes"
                  onClick={() => onSelecionarProjeto(projeto)}
                >
                  Ver Detalhes
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
                  {estaEntregue ? '↺ Voltar p/ Em Andamento' : '✓ Entregar Projeto'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projetos;
