import { useLocation } from "react-router-dom"; // Importe o useLocation
import "./ReservaForm.css";

function ReservaForm() {
  const location = useLocation(); // Hook para acessar o estado passado
  const lugar = location.state?.lugar; // Acesse o lugar passado

  // Se o lugar não estiver definido, exiba uma mensagem de erro
  if (!lugar) {
    return <div>Erro: Lugar não encontrado.</div>;
  }

  return (
    <div className="reserva-form-container">
      <h1>Reserva de {lugar.nome}</h1>
      <p>Preencha os detalhes da reserva abaixo.</p>

      <div className="solicitacao">
        <input type="date" placeholder="Data da reserva" />
        <input type="time" placeholder="Horário de início" />
        <input type="time" placeholder="Horário de término" />
        <input type="text" placeholder="Motivo da reserva" />
      </div>

      <hr />

      <button className="enviar-button">Reservar</button>
      <button className="cancelar-button">Cancelar</button>
    </div>
  );
}

export default ReservaForm;
