import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ReservaForm.css";

function ReservaForm() {
  const location = useLocation();
  const lugar = location.state?.lugar;

  const [areas, setAreas] = useState([]);
  const [areaNome, setAreaNome] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Token de autenticação não encontrado!");
          return;
        }

        const response = await fetch("http://localhost:8080/areascomuns", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAreas(data);
        } else {
          console.error(
            "Erro ao buscar áreas comuns. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao servidor", error);
      }
    };

    fetchAreas();
  }, []);

  if (!lugar) {
    return <div>Erro: Lugar não encontrado.</div>;
  }

  const handleReserva = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Erro: Token de autenticação não encontrado!");
      return;
    }

    // Converter data para formato dd/MM/yyyy
    const [year, month, day] = dataReserva.split("-");
    const formattedDataReserva = `${day}/${month}/${year}`;

    const reservaData = {
      areaNome,
      dataReserva: formattedDataReserva,
      horaInicio,
      horaFim,
    };

    try {
      const response = await fetch("http://localhost:8080/reservas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        alert("Reserva feita com sucesso!");
      } else {
        alert("Erro ao realizar a reserva. Status: " + response.status);
      }
    } catch (error) {
      alert("Erro ao conectar-se ao servidor.");
      console.error(error);
    }
  };

  return (
    <div className="reserva-form-container">
      <h1>Reserva</h1>
      <p>Preencha os detalhes da reserva abaixo.</p>

      <div className="solicitacao">
        <select value={areaNome} onChange={(e) => setAreaNome(e.target.value)}>
          <option value="">Selecione uma área</option>
          {areas.map((area) => (
            <option key={area.id} value={area.nome}>
              {area.nome}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dataReserva}
          onChange={(e) => setDataReserva(e.target.value)}
          placeholder="Data da reserva"
        />
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          placeholder="Horário de início"
        />
        <input
          type="time"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
          placeholder="Horário de término"
        />
      </div>

      <hr />

      <button className="enviar-button" onClick={handleReserva}>
        Reservar
      </button>
      <button className="cancelar-button">Cancelar</button>
    </div>
  );
}

export default ReservaForm;
