import "./style.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1>Bem-Vindo, Usuario</h1>
        </div>
        <img
          src="header.png" // Substitua pelo URL da sua imagem
          alt="Header Background"
          className="header-image"
        />
      </header>

      <div className="tabs">
        <button className="tab active">Serviços</button>
        <button className="tab">Regras e Normas</button>
      </div>

      <div className="services-container">
        <div className="service">
          <img src="Ocorrencia.png" alt="Manutenção" />
          <p>Ocorrência</p>
        </div>
        <div className="service">
          <img src="https://via.placeholder.com/50" alt="Comunicados" />
          <p>Comunicados</p>
        </div>
        <div className="service">
          <img src="https://via.placeholder.com/50" alt="Reservas" />
          <p>Reservas</p>
        </div>
        <div className="service disabled">
          <img src="https://via.placeholder.com/50" alt="Assembleia" />
          <p>Assembleia</p>
        </div>
        <div className="service disabled">
          <img src="https://via.placeholder.com/50" alt="Financeiro" />
          <p>Financeiro</p>
        </div>
        <div className="service disabled">
          <img src="https://via.placeholder.com/50" alt="Pagamentos" />
          <p>Pagamentos</p>
        </div>
      </div>
    </div>
  );
}
