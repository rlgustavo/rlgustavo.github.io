
import "./Header.css";

// Criamos o componente Header
function Header() {
  return (
    <header className="header">
      <h2 className="logo">Gustavo Lima</h2>

      <nav className="menu">
        <a href="#inicio">Início</a>
        <a href="#habilidades"> Habilidades </a>
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
}

// Exportamos o componente para outros arquivos
export default Header;
