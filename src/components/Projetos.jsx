import { useRef, useState } from 'react';
import Badge from './Badge';

const MAX_FUNCIONALIDADES = 4;

function formatarDataInput(valorIso) {
  if (!valorIso) return '30/11/2026';
  const partes = valorIso.split('-');
  if (partes.length !== 3) return valorIso;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function Projetos({ projetos, onSelecionarProjeto, onAdicionarProjeto }) {
  const dialogRef = useRef(null);
  const pressedOutsideRef = useRef(false);

  const [nome, setNome] = useState('');
  const [cliente, setCliente] = useState('');
  const [gerente, setGerente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [descricao, setDescricao] = useState('');
  const [funcionalidades, setFuncionalidades] = useState(['']);
  const [erroForm, setErroForm] = useState('');

  function abrirMenuNovoProjeto() {
    setErroForm('');
    dialogRef.current?.showModal();
  }

  function fecharMenuNovoProjeto() {
    dialogRef.current?.close();
  }

  function atualizarFuncionalidade(index, valor) {
    setErroForm('');
    setFuncionalidades((atuais) =>
      atuais.map((item, i) => (i === index ? valor : item))
    );
  }

  function adicionarCampoFuncionalidade() {
    if (funcionalidades.length >= MAX_FUNCIONALIDADES) return;
    setFuncionalidades((atuais) => [...atuais, '']);
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
    const descricaoLimpa =
      descricao.trim() || 'Projeto cadastrado pela plataforma interna CP2eJr.';

    const listaFuncionalidades = funcionalidades
      .map((f) => f.trim())
      .filter(Boolean)
      .slice(0, MAX_FUNCIONALIDADES);

    if (!nomeLimpo || !clienteLimpo || !dataEntrega) {
      setErroForm('Preencha o nome do projeto, o cliente e a data de entrega.');
      return;
    }

    if (listaFuncionalidades.length === 0) {
      setErroForm('Adicione pelo menos 1 funcionalidade a ser implementada.');
      return;
    }

    const novoProjeto = {
      id: Date.now(),
      nome: nomeLimpo,
      cliente: clienteLimpo,
      gerente: gerenteLimpo,
      dataEntrega: formatarDataInput(dataEntrega),
      status: 'Em andamento',
      progresso: 0,
      descricao: descricaoLimpa,
      tarefas: listaFuncionalidades.map((titulo, idx) => ({
        id: idx + 1,
        titulo,
        concluida: false,
      })),
    };

    onAdicionarProjeto(novoProjeto);

    setNome('');
    setCliente('');
    setGerente('');
    setDataEntrega('');
    setDescricao('');
    setFuncionalidades(['']);
    setErroForm('');
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
          <p>Gerencie os projetos internos, prazos de entrega e funcionalidades.</p>
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
          <h2 id="modal-novo-projeto-titulo">Adicionar Novo Projeto</h2>
          <button
            type="button"
            className="botao-fechar-modal"
            aria-label="Fechar menu de novo projeto"
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
                      value={func}
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
              Criar Projeto
            </button>
          </div>
        </form>
      </dialog>

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
              <p><strong>Data de Entrega:</strong> {projeto.dataEntrega}</p>
            </div>

            <div className="area-progresso">
              <p>Progresso {projeto.progresso ?? 0}%</p>
              <div className="barra-progresso">
                <div
                  className="barra-preenchida"
                  style={{ width: `${projeto.progresso ?? 0}%` }}
                ></div>
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
