import { useState } from "react";
import "./HomePage.css"; // Estilos específicos para a HomePage

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Serviços");

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1>Bem-Vindo, Usuario</h1>
        </div>
        <img
          src="header.png"
          alt="Header Background"
          className="header-image"
        />
      </header>

      {/* Abas */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Serviços" ? "active" : ""}`}
          onClick={() => setActiveTab("Serviços")}
        >
          Serviços
        </button>
        <button
          className={`tab ${activeTab === "Regras e Normas" ? "active" : ""}`}
          onClick={() => setActiveTab("Regras e Normas")}
        >
          Regras e Normas
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === "Serviços" && (
        <div className="services-container">
          {/* Primeira linha */}
          <div className="services-row">
            <div className="service">
              <a href="/manu">
                <img src="Ocorrencia.png" alt="Ocorrência" />
                <p>Ocorrência</p>
              </a>
            </div>
            <div className="service">
              <img src="comunicados.png" alt="Comunicados" />
              <p>Comunicados</p>
            </div>
            <div className="service">
              <img src="reserva.png" alt="Reservas" />
              <p>Reservas</p>
            </div>
          </div>

          {/* Segunda linha */}
          <div className="services-row">
            <div className="service disabled">
              <img src="Assembleia.png" alt="Assembleia" />
              <p>Assembleia</p>
            </div>
            <div className="service disabled">
              <img src="Financeiro.png" alt="Financeiro" />
              <p>Financeiro</p>
            </div>
            <div className="service disabled">
              <img src="Pagamento.png" alt="Pagamentos" />
              <p>Pagamentos</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Regras e Normas" && (
        <div className="rules-container">
          <h2>Regras e Normas</h2>
          <div className="norma">
            1. <strong>Horário de silêncio:</strong> O horário de silêncio deve
            ser respeitado das <strong>22h às 7h</strong>, conforme a Lei do
            Silêncio.
          </div>

          <div className="norma">
            2. <strong>Uso das áreas comuns:</strong> As áreas comuns, como
            salão de festas, piscina e academia, devem ser utilizadas de acordo
            com as regras específicas de cada espaço e mediante agendamento,
            quando necessário.
          </div>

          <div className="norma">
            3. <strong>Estacionamento:</strong> Cada morador deve utilizar
            apenas a vaga correspondente à sua unidade. É proibido estacionar em
            locais não autorizados ou bloquear a passagem de outros veículos.
          </div>

          <div className="norma">
            4. <strong>Animais de estimação:</strong> Os moradores podem ter
            animais de estimação, desde que não causem incômodo aos demais e
            sejam mantidos em coleira nas áreas comuns.
          </div>

          <div className="norma">
            5. <strong>Lixo e reciclagem:</strong> O lixo deve ser descartado
            corretamente nos locais apropriados, respeitando a coleta seletiva
            do condomínio.
          </div>

          <div className="norma">
            6. <strong>Obras e reformas:</strong> Qualquer obra ou reforma
            dentro das unidades deve ser previamente comunicada à administração
            e só pode ocorrer em horário comercial, das{" "}
            <strong>8h às 18h</strong>, de segunda a sexta-feira.
          </div>

          <div className="norma">
            7. <strong>Segurança:</strong> O acesso ao condomínio deve ser
            controlado. Visitantes e prestadores de serviço devem ser
            previamente autorizados pelo morador responsável.
          </div>

          <div className="norma">
            8. <strong>Uso da piscina:</strong> O uso da piscina é exclusivo
            para moradores e visitantes autorizados. É proibido consumir
            alimentos ou bebidas dentro da piscina.
          </div>

          <div className="norma">
            9. <strong>Eventos e festas:</strong> Festas e eventos devem ser
            comunicados com antecedência à administração e não podem ultrapassar
            o horário limite das <strong>23h</strong>.
          </div>

          <div className="norma">
            10. <strong>Convivência e respeito:</strong> Todos os moradores
            devem manter uma convivência harmoniosa, evitando atitudes que
            causem transtornos aos vizinhos. Discussões e comportamentos
            agressivos não serão tolerados.
          </div>
        </div>
      )}
    </div>
  );
}
