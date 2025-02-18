import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Ocorrencia.css";

export default function Ocorrencia() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("SOLICITACAO_DE_MANUTENCAO");
  const [mensagem, setMensagem] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token não encontrado");

        const decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken);

        const userCpf = decodedToken.sub;
        if (!userCpf) throw new Error("CPF do usuário não encontrado no token");

        const expirationTime = decodedToken.exp * 1000;
        if (expirationTime < Date.now()) throw new Error("Token expirado");

        const response = await axios.get(
          `http://localhost:8080/usuarios/cpf/${userCpf}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status !== 200)
          throw new Error("Erro ao buscar dados do usuário");

        const userData = response.data;
        console.log("Dados do usuário:", userData);

        if (!userData.id)
          throw new Error("ID do usuário não encontrado na resposta da API");

        setUserId(userData.id);
        setUserData(userData);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
        setMensagem(error.message);
      }
    };

    fetchUserData();
  }, []);

  const tiposOcorrencia = [
    "PROBLEMA_DE_INFRAESTRUTURA",
    "DESENTENDIMENTO",
    "SOLICITACAO_DE_MANUTENCAO",
    "ASSEMBLEIA",
    "DESVIO_DE_CONDUTA",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMensagem("Erro: Usuário não encontrado ou carregando.");
      return;
    }

    const ocorrencia = {
      titulo,
      descricao,
      tipo,
      idUsuario: userId,
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const response = await axios.post(
        "http://localhost:8080/ocorrencias",
        ocorrencia,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMensagem("Ocorrência registrada com sucesso!");
        // Resetando os campos manualmente
        setTitulo("");
        setDescricao("");
        setTipo("SOLICITACAO_DE_MANUTENCAO");
      } else {
        setMensagem("Erro ao registrar ocorrência.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="ocorrencia-container">
      <h1>Ocorrência</h1>
      <p>Bem-vindo! Solicite aqui abaixo sua ocorrência.</p>

      {userData && (
        <div>
          <p>
            <strong>Nome:</strong> {userData.nome}
          </p>
        </div>
      )}

      <div className="solicitacao">
        <input
          type="text"
          placeholder="Digite o título da ocorrência"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite os detalhes da ocorrência"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {tiposOcorrencia.map((tipoOpcao) => (
            <option key={tipoOpcao} value={tipoOpcao}>
              {tipoOpcao.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <hr />

      <button className="enviar-button" onClick={handleSubmit}>
        Enviar
      </button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
