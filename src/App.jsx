import { useState } from 'react';
import './App.css';
import mockProjects from './data/mockProjects';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Projetos from './components/Projetos';
import ProjetoDetalhes from './components/ProjetoDetalhes';

const USUARIO_ATUAL = 'Samuel Zanebone';

const INITIAL_FEED = [
  {
    id: 1,
    autor: 'Petrus de Souza Matos Pfaffenbach',
    texto: 'Fez a documentação',
    tempo: 'Há 30 minutos',
    curtidas: 3,
    curtido: false,
    comentarios: [
      {
        id: 101,
        autor: 'Vitor Hugo Felipe Noronha',
        texto: 'Ficou muito bem detalhada!',
        tempo: 'Há 15 min',
        curtidas: 2,
        curtido: false,
      },
    ],
  },
  {
    id: 2,
    autor: 'Vitor Hugo Felipe Noronha',
    texto: 'Revisou as tarefas da semana',
    tempo: 'Há 1 hora',
    curtidas: 2,
    curtido: false,
    comentarios: [],
  },
  {
    id: 3,
    autor: 'Enzo Ribeiro da Silva',
    texto: 'Atualizou o banco de dados',
    tempo: 'Há 2 horas',
    curtidas: 5,
    curtido: false,
    comentarios: [],
  },
  {
    id: 4,
    autor: 'Lucas Pereira Maciel Luz',
    texto: 'Organizou o protótipo das telas',
    tempo: 'Há 3 horas',
    curtidas: 3,
    curtido: false,
    comentarios: [],
  },
];

function App() {
  const [paginaAtual, setPaginaAtual] = useState('dashboard');
  const [projetos, setProjetos] = useState(mockProjects);
  const [projetoSelecionadoId, setProjetoSelecionadoId] = useState(null);
  const [feedAtividades, setFeedAtividades] = useState(INITIAL_FEED);

  const projetoSelecionado =
    projetos.find((p) => p.id === projetoSelecionadoId) ?? null;

  function adicionarProjeto(novoProjeto) {
    setProjetos((atuais) => [...atuais, novoProjeto]);
  }

  function adicionarTarefaNoProjeto(projetoId, tituloTarefa) {
    setProjetos((atuais) =>
      atuais.map((projeto) => {
        if (projeto.id !== projetoId) return projeto;
        return {
          ...projeto,
          tarefas: [
            ...projeto.tarefas,
            {
              id: Date.now(),
              titulo: tituloTarefa,
              concluida: false,
            },
          ],
        };
      })
    );
  }

  function adicionarPostFeed(texto) {
    const novoItem = {
      id: Date.now(),
      autor: USUARIO_ATUAL,
      texto,
      tempo: 'Agora mesmo',
      curtidas: 0,
      curtido: false,
      comentarios: [],
    };
    setFeedAtividades((atuais) => [novoItem, ...atuais]);
  }

  function alternarCurtidaFeed(itemId) {
    setFeedAtividades((atuais) =>
      atuais.map((item) => {
        if (item.id !== itemId) return item;
        const proximoCurtido = !item.curtido;
        return {
          ...item,
          curtido: proximoCurtido,
          curtidas: proximoCurtido ? item.curtidas + 1 : item.curtidas - 1,
        };
      })
    );
  }

  function adicionarComentarioFeed(itemId, textoComentario) {
    setFeedAtividades((atuais) =>
      atuais.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          comentarios: [
            ...item.comentarios,
            {
              id: Date.now(),
              autor: USUARIO_ATUAL,
              texto: textoComentario,
              tempo: 'Agora mesmo',
              curtidas: 0,
              curtido: false,
            },
          ],
        };
      })
    );
  }

  function alternarCurtidaComentario(itemId, comentarioId) {
    setFeedAtividades((atuais) =>
      atuais.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          comentarios: item.comentarios.map((comentario) => {
            if (comentario.id !== comentarioId) return comentario;
            const proximoCurtido = !comentario.curtido;
            return {
              ...comentario,
              curtido: proximoCurtido,
              curtidas: proximoCurtido
                ? comentario.curtidas + 1
                : comentario.curtidas - 1,
            };
          }),
        };
      })
    );
  }

  return (
    <div className="app">
      <Navbar
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        setProjetoSelecionado={() => setProjetoSelecionadoId(null)}
      />

      <main className="conteudo-principal">
        {paginaAtual === 'dashboard' && (
          <Dashboard
            projetos={projetos}
            usuarioAtual={USUARIO_ATUAL}
            feedAtividades={feedAtividades}
            onAdicionarPostFeed={adicionarPostFeed}
            onCurtirFeed={alternarCurtidaFeed}
            onComentarFeed={adicionarComentarioFeed}
            onCurtirComentario={alternarCurtidaComentario}
            irParaProjetos={() => {
              setProjetoSelecionadoId(null);
              setPaginaAtual('projetos');
            }}
          />
        )}

        {paginaAtual === 'projetos' && projetoSelecionado === null && (
          <Projetos
            projetos={projetos}
            onSelecionarProjeto={(projeto) => setProjetoSelecionadoId(projeto.id)}
            onAdicionarProjeto={adicionarProjeto}
          />
        )}

        {paginaAtual === 'projetos' && projetoSelecionado !== null && (
          <ProjetoDetalhes
            projeto={projetoSelecionado}
            onVoltar={() => setProjetoSelecionadoId(null)}
            onAdicionarTarefa={adicionarTarefaNoProjeto}
          />
        )}
      </main>
    </div>
  );
}

export default App;
