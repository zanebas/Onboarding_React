import logoCp2eJr from '../assets/logo-cp2ejr.webp';

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
        <button
          type="button"
          className="navbar-marca"
          onClick={irParaDashboard}
        >
          <img
            src={logoCp2eJr}
            alt="Logo CP2eJr"
            width="806"
            height="397"
            className="navbar-logo"
          />
          <span className="navbar-titulo">Projetos Internos CP2eJr</span>
        </button>

        <nav className="navbar-botoes" aria-label="Navegação principal">
          <button
            type="button"
            className={paginaAtual === 'dashboard' ? 'nav-btn ativo' : 'nav-btn'}
            aria-current={paginaAtual === 'dashboard' ? 'page' : undefined}
            onClick={irParaDashboard}
          >
            Dashboard
          </button>

          <button
            type="button"
            className={paginaAtual === 'projetos' ? 'nav-btn ativo' : 'nav-btn'}
            aria-current={paginaAtual === 'projetos' ? 'page' : undefined}
            onClick={irParaProjetos}
          >
            Projetos
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
