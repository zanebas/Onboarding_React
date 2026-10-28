function Navbar({ paginaAtual, setPaginaAtual, setProjetoSelecionado }) {
  function irParaDashboard() {
    setPaginaAtual('dashboard');
    setProjetoSelecionado(null);
  }

  function irParaProjetos() {
    setPaginaAtual('projetos');
    setProjetoSelecionado(null);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <span className="navbar-titulo" onClick={irParaDashboard}>
          Projetos Internos CP2eJr
        </span>

        <div className="navbar-botoes">
          <button
            className={paginaAtual === 'dashboard' ? 'nav-btn ativo' : 'nav-btn'}
            onClick={irParaDashboard}
          >
            Dashboard
          </button>

          <button
            className={paginaAtual === 'projetos' ? 'nav-btn ativo' : 'nav-btn'}
            onClick={irParaProjetos}
          >
            Projetos
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
