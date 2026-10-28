import { useState } from 'react';
import './App.css';
import mockProjects from './data/mockProjects';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Projetos from './components/Projetos';
import ProjetoDetalhes from './components/ProjetoDetalhes';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('dashboard');
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  return (
    <div className="app">
      <Navbar
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        setProjetoSelecionado={setProjetoSelecionado}
      />

      <main className="conteudo-principal">
        {paginaAtual === 'dashboard' && (
          <Dashboard
            projetos={mockProjects}
            irParaProjetos={() => {
              setProjetoSelecionado(null);
              setPaginaAtual('projetos');
            }}
          />
        )}

        {paginaAtual === 'projetos' && projetoSelecionado === null && (
          <Projetos
            projetos={mockProjects}
            onSelecionarProjeto={(projeto) => setProjetoSelecionado(projeto)}
          />
        )}

        {paginaAtual === 'projetos' && projetoSelecionado !== null && (
          <ProjetoDetalhes
            projeto={projetoSelecionado}
            onVoltar={() => setProjetoSelecionado(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
