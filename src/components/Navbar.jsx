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
          aria-label="Ir para o Dashboard"
        >
          <img
            src={logoCp2eJr}
            alt="Logo CP2eJr"
            width="806"
            height="397"
            className="navbar-logo"
          />
        </button>

        <span className="navbar-titulo" onClick={irParaDashboard}>
          Projetos Internos CP2eJr
        </span>

        <div className="navbar-botoes">
          <button
            type="button"
            className={paginaAtual === 'dashboard' ? 'nav-btn ativo' : 'nav-btn'}
            onClick={irParaDashboard}
          >
            Dashboard
          </button>

          <button
            type="button"
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
