import { useState } from 'react';
import Badge from './Badge';

function obterIniciais(nomeCompleto) {
  if (!nomeCompleto) return 'SZ';
  const partes = nomeCompleto.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function Dashboard({
  projetos,
  usuarioAtual = 'Samuel Zanebone',
  feedAtividades,
  onAdicionarPostFeed,
  onCurtirFeed,
  onComentarFeed,
  onCurtirComentario,
  irParaProjetos,
}) {
  const [novoPost, setNovoPost] = useState('');
  const [comentariosAbertos, setComentariosAbertos] = useState({ 1: true });
  const [textoComentarios, setTextoComentarios] = useState({});

  const equipe = [
    { id: 1, nome: 'Samuel Zanebone', cargo: 'Dev Front-end', iniciais: 'SZ', tarefas: '2 entregas ativas' },
    { id: 2, nome: 'Vitor Hugo Felipe Noronha', cargo: 'Gerente', iniciais: 'VN', tarefas: '2 entregas ativas' },
    { id: 3, nome: 'Enzo Ribeiro da Silva', cargo: 'Dev Back-end', iniciais: 'ER', tarefas: '3 entregas ativas' },
    { id: 4, nome: 'Lucas Pereira Maciel Luz', cargo: 'Designer UI/UX', iniciais: 'LL', tarefas: '2 entregas ativas' }
  ];

  const projetosAtivos = projetos.filter((p) => p.status !== 'Entregue').length;
  const projetosConcluidos = projetos.filter((p) => p.status === 'Entregue').length;
  const tarefasPendentes = projetos.reduce(
    (total, p) => total + p.tarefas.filter((t) => !t.concluida).length,
    0
  );

  function handlePublicarFeed(e) {
    e.preventDefault();
    const textoLimpo = novoPost.trim();
    if (!textoLimpo) return;
    onAdicionarPostFeed(textoLimpo);
    setNovoPost('');
  }

  function handleKeyDownNovoPost(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (e.nativeEvent.isComposing || e.keyCode === 229) {
        return;
      }
      e.currentTarget.form?.requestSubmit();
    }
  }

  function alternarAbaComentarios(itemId) {
    setComentariosAbertos((atuais) => ({
      ...atuais,
      [itemId]: !atuais[itemId],
    }));
  }

  function handleEnviarComentario(e, itemId) {
    e.preventDefault();
    const texto = (textoComentarios[itemId] || '').trim();
    if (!texto) return;
    onComentarFeed(itemId, texto);
    setTextoComentarios((atuais) => ({ ...atuais, [itemId]: '' }));
    setComentariosAbertos((atuais) => ({ ...atuais, [itemId]: true }));
  }

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <h1>Dashboard Geral</h1>
        <p>Acompanhe o status das entregas, demandas pendentes e o ritmo da equipe em tempo real.</p>
      </div>

      {/* 4 Cards do Topo */}
      <div className="cards-topo">
        <div className="card-resumo">
          <div className="card-resumo-topo">
            <span className="status-dot dot-azul" aria-hidden="true"></span>
            <span>Projetos Ativos</span>
          </div>
          <strong>{projetosAtivos}</strong>
        </div>

        <div className="card-resumo">
          <div className="card-resumo-topo">
            <span className="status-dot dot-laranja" aria-hidden="true"></span>
            <span>Tarefas Pendentes</span>
          </div>
          <strong>{tarefasPendentes}</strong>
        </div>

        <div className="card-resumo">
          <div className="card-resumo-topo">
            <span className="status-dot dot-verde" aria-hidden="true"></span>
            <span>Projetos Concluídos</span>
          </div>
          <strong>{projetosConcluidos}</strong>
        </div>

        <div className="card-resumo">
          <div className="card-resumo-topo">
            <span className="status-dot dot-roxo" aria-hidden="true"></span>
            <span>Membros da Equipe</span>
          </div>
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
                    <p className="item-subtitulo">
                      {projeto.gerente} • Entrega: {projeto.dataEntrega}
                    </p>
                  </div>

                  <div className="item-direita">
                    <span className="porcentagem">{projeto.progresso ?? 0}%</span>
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

            <form className="form-postar-feed" onSubmit={handlePublicarFeed}>
              <div className="aba-usuario-logado">
                <span className="avatar-mini" aria-hidden="true">
                  {obterIniciais(usuarioAtual)}
                </span>
                <span>
                  Publicando como <strong>{usuarioAtual}</strong>
                </span>
              </div>

              <label htmlFor="novo-post-feed" className="sr-only">
                Publicar atualização no feed
              </label>
              <textarea
                id="novo-post-feed"
                name="novoPost"
                rows={2}
                placeholder="Compartilhe uma atualização no feed... (Enter para publicar)"
                value={novoPost}
                onChange={(e) => setNovoPost(e.target.value)}
                onKeyDown={handleKeyDownNovoPost}
              />
              <button type="submit" className="botao-publicar-feed">
                Publicar no Feed
              </button>
            </form>

            <div className="lista-simples">
              {feedAtividades.map((item) => {
                const aberto = !!comentariosAbertos[item.id];
                const totalComentarios = item.comentarios?.length ?? 0;

                return (
                  <div key={item.id} className="item-feed">
                    {/* Aba acima da publicação com o nome completo de quem fez */}
                    <div className="aba-autor-publicacao">
                      <div className="aba-autor-esquerda">
                        <span className="avatar-mini" aria-hidden="true">
                          {obterIniciais(item.autor)}
                        </span>
                        <span className="nome-autor-completo">{item.autor}</span>
                      </div>
                      <span className="item-subtitulo">{item.tempo}</span>
                    </div>

                    <div className="corpo-publicacao-feed">
                      <p className="item-titulo">{item.texto}</p>
                    </div>

                    <div className="acoes-feed">
                      <button
                        type="button"
                        className={
                          item.curtido ? 'btn-acao-feed curtido' : 'btn-acao-feed'
                        }
                        aria-pressed={item.curtido}
                        onClick={() => onCurtirFeed(item.id)}
                      >
                        <span aria-hidden="true">{item.curtido ? '♥' : '♡'}</span>
                        <span>
                          {item.curtido ? 'Curtido' : 'Curtir'} ({item.curtidas})
                        </span>
                      </button>

                      <button
                        type="button"
                        className={
                          aberto ? 'btn-acao-feed ativo' : 'btn-acao-feed'
                        }
                        aria-expanded={aberto}
                        aria-controls={`comentarios-feed-${item.id}`}
                        onClick={() => alternarAbaComentarios(item.id)}
                      >
                        <span aria-hidden="true">💬</span>
                        <span>Comentar ({totalComentarios})</span>
                      </button>
                    </div>

                    {aberto && (
                      <div
                        id={`comentarios-feed-${item.id}`}
                        className="area-comentarios-feed"
                      >
                        {totalComentarios > 0 ? (
                          <div className="lista-comentarios-feed">
                            {item.comentarios.map((comentario) => (
                              <div
                                key={comentario.id}
                                className="comentario-card-feed"
                              >
                                {/* Aba acima de cada comentário com o nome completo de quem fez */}
                                <div className="aba-autor-comentario">
                                  <div className="aba-autor-esquerda">
                                    <span className="avatar-mini avatar-comentario" aria-hidden="true">
                                      {obterIniciais(comentario.autor)}
                                    </span>
                                    <strong>{comentario.autor}</strong>
                                  </div>
                                  <span>{comentario.tempo}</span>
                                </div>

                                <div className="comentario-corpo-linha">
                                  <p>{comentario.texto}</p>

                                  <button
                                    type="button"
                                    className={
                                      comentario.curtido
                                        ? 'btn-curtir-comentario curtido'
                                        : 'btn-curtir-comentario'
                                    }
                                    aria-pressed={comentario.curtido}
                                    aria-label={`Curtir comentário de ${comentario.autor}`}
                                    onClick={() =>
                                      onCurtirComentario(item.id, comentario.id)
                                    }
                                  >
                                    <span aria-hidden="true">
                                      {comentario.curtido ? '♥' : '♡'}
                                    </span>{' '}
                                    {comentario.curtidas}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="sem-comentarios">
                            Nenhum comentário ainda. Seja o primeiro a comentar!
                          </p>
                        )}

                        <form
                          className="form-comentar-item"
                          onSubmit={(e) => handleEnviarComentario(e, item.id)}
                        >
                          <div className="aba-usuario-logado aba-usuario-comentario">
                            <span className="avatar-mini avatar-comentario" aria-hidden="true">
                              {obterIniciais(usuarioAtual)}
                            </span>
                            <span>
                              Comentando como <strong>{usuarioAtual}</strong>
                            </span>
                          </div>

                          <div className="linha-input-comentario">
                            <label
                              htmlFor={`input-comentario-${item.id}`}
                              className="sr-only"
                            >
                              Adicionar comentário na publicação de {item.autor}
                            </label>
                            <input
                              id={`input-comentario-${item.id}`}
                              name="comentario"
                              type="text"
                              placeholder="Escreva um comentário..."
                              value={textoComentarios[item.id] || ''}
                              onChange={(e) =>
                                setTextoComentarios((atuais) => ({
                                  ...atuais,
                                  [item.id]: e.target.value,
                                }))
                              }
                            />
                            <button type="submit" className="botao-enviar-comentario">
                              Enviar
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
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
