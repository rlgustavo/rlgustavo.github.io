
import "./Home.css";

// Importamos o componente de botão
import BotaoLink from "./BotaoLink";

function Home() {
  return (
    <section className="home" id="inicio">

      <div className="home-conteudo">

        <p className="home-introducao">
          Olá, seja bem-vindo!
        </p>

        <h1>
          Eu sou <span>Gustavo Lima</span>
        </h1>

        <h2>
          Desenvolvedor de Jogos e Professor
        </h2>

        <p className="home-descricao">
          Sou apaixonado por desenvolvimento de jogos,
          inteligência artificial e programação.

          Aqui você poderá conhecer meus projetos,
          experiências e tecnologias.
        </p>

        {/* Área dos botões */}
        <div className="home-botoes">

          <BotaoLink
            texto="Meu GitHub"
            link="https://github.com/rlgustavo"
          />

          <BotaoLink
            texto="Meu LinkedIn"
            link="https://www.linkedin.com/in/rlGustavo"
          />


        </div>

      </div>

    </section>
  );
}

export default Home;
