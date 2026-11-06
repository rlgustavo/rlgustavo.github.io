
// Componente que recebe duas props:
// texto e link

function BotaoLink({ texto, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="botao-link">
      {texto}
    </a>
  );
}

export default BotaoLink;
