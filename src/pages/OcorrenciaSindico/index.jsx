import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./OcorrenciaSindico.css";

export default function OcorrenciasLista() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token não encontrado");

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        if (expirationTime < Date.now()) throw new Error("Token expirado");

        const response = await axios.get("http://localhost:8080/ocorrencias", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200)
          throw new Error("Erro ao buscar ocorrências");

        setOcorrencias(response.data);
      } catch (error) {
        console.error("Erro ao carregar as ocorrências:", error);
        setMensagem(error.message);
      }
    };

    fetchOcorrencias();
  }, []);

  return (
    <div className="ocorrencias-container">
      <h1>Lista de Ocorrências</h1>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      {ocorrencias.length > 0 ? (
        <ul className="ocorrencias-lista">
          {ocorrencias.map((ocorrencia) => (
            <li key={ocorrencia.id} className="ocorrencia-item">
              <p>
                <strong>Descrição:</strong> {ocorrencia.descricao}
              </p>
              <p>
                <strong>Tipo:</strong> {ocorrencia.tipo.replace("_", " ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma ocorrência encontrada.</p>
      )}
    </div>
  );
}
