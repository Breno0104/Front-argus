import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import "./Reserva.css";

function Reserva() {
  const navigate = useNavigate(); // Hook para navegação

  const lugares = [
    { nome: "Psicina", imagem: "psicina.jpg" },
    { nome: "Quadra", imagem: "quadra.jpg" },
    { nome: "Salão de Festas", imagem: "salao.jpg" },
    { nome: "Academia", imagem: "academia.jpg" },
  ];

  const handleReservar = (lugar) => {
    // Navegar para a página de reserva e passar o lugar como estado
    navigate("/reservar", { state: { lugar } });
  };

  return (
    <div className="reserva-container">
      <h1>Reserva de Espaços Públicos</h1>
      <p>Bem-vindo! Selecione abaixo o espaço que deseja reservar.</p>

      <div className="lugares-container">
        {lugares.map((lugar, index) => (
          <div
            key={index}
            className="lugar-card"
            onClick={() => handleReservar(lugar)}
          >
            <img src={lugar.imagem} alt={lugar.nome} className="lugar-imagem" />
            <h2>{lugar.nome}</h2>
            <button className="reservar-button">Reservar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reserva;
