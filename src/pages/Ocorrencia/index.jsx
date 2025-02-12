import "react";
import "./style.css";

function App() {
  return (
    <div className="container">
      {/* Seção Início */}
      <section className="section">
        <h1>Início</h1>
        <h2>Mediação de Conflitos</h2>
        <h3>Falar com a Administração</h3>
        <h4>FAQ</h4>
        <p>
          <strong>Perfil</strong>
        </p>
        <hr />
      </section>

      {/* Seção Manutenção */}
      <section className="section">
        <h1>Manutenção</h1>
        <p>Bem-vindo! Solicite aqui abaixo sua manutenção.</p>

        <div className="solicitacao">
          <p>[Solicitare o tipo de solicitação]</p>
          <p>[Solicitare cada dona exceto a contratação]</p>
          <p>[Solicitare a registrar da sua solicitação]</p>
          <p>[Recorrer à sua solicitação]</p>
        </div>

        <hr />

        <button className="enviar-button">Enviar</button>
        <p className="caroeier">Caroeier Solicitação</p>
      </section>
    </div>
  );
}

export default App;
