import { useState, useEffect } from "react";
import "./Ocorrencia.css";

function Ocorrencia() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("SOLICITACAO_DE_MANUTENCAO");
  const [mensagem, setMensagem] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    // Simulação de obtenção do ID do usuário logado (poderia vir de um contexto ou autenticação)
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLogado && usuarioLogado.id) {
      setIdUsuario(usuarioLogado.id);
    } else {
      setMensagem("Erro: Usuário não autenticado.");
    }
  }, []);

  const tiposOcorrencia = [
    "PROBLEMA_DE_INFRAESTRUTURA",
    "DESENTENDIMENTO",
    "SOLICITACAO_DE_MANUTENCAO",
    "ASSEMBLEIA",
    "DESVIO_DE_CONDUTA",
  ];

  const handleSubmit = async () => {
    if (!idUsuario) {
      setMensagem("Erro: Usuário não autenticado.");
      return;
    }

    const ocorrencia = {
      titulo,
      descricao,
      tipo,
      idUsuario,
    };

    try {
      const response = await fetch("http://localhost:8080/ocorrencias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ocorrencia),
      });

      if (response.ok) {
        setMensagem("Ocorrência registrada com sucesso!");
      } else {
        setMensagem("Erro ao registrar ocorrência.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="ocorrencia-container">
      <h1>Ocorrência</h1>
      <p>Bem-vindo! Solicite aqui abaixo sua ocorrência.</p>

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

export default Ocorrencia;
