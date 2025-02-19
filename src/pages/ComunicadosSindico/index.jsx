import { useEffect, useState } from "react";
import "./CondoSindico.css";

export default function CondoNotices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState(""); // Para armazenar o título do comunicado
  const [message, setMessage] = useState(""); // Para armazenar a mensagem do comunicado

  // Acessando o token (supondo que ele esteja no localStorage, mas pode ser de outra forma)
  const token = localStorage.getItem("authToken");
  console.log("Token enviado:", token);

  // Função para enviar um novo comunicado via POST
  const postNotice = () => {
    const noticeData = {
      condominioNome: "argus", // Nome fixo do condomínio
      titulo: title, // Título do comunicado
      mensagem: message, // Mensagem do comunicado
    };

    fetch("http://localhost:8080/comunicado", {
      method: "POST", // Usando o método POST
      headers: {
        Authorization: `Bearer ${token}`, // Coloca o token no cabeçalho de Authorization
        "Content-Type": "application/json", // Indica que estamos enviando um JSON
      },
      body: JSON.stringify(noticeData), // Corpo da requisição com os dados do comunicado
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar comunicado");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Comunicado enviado:", data);
        // Aqui você pode atualizar a lista de comunicados ou mostrar uma mensagem de sucesso
      })
      .catch((error) => console.error("Erro ao enviar comunicado:", error));
  };

  // UseEffect para buscar os comunicados se necessário
  useEffect(() => {
    fetch("http://localhost:8080/comunicado", {
      method: "GET", // Para buscar os comunicados já existentes
      headers: {
        Authorization: `Bearer ${token}`, // Coloca o token no cabeçalho de Authorization
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar comunicados");
        }
        return response.json();
      })
      .then((data) => setNotices(data))
      .catch((error) => console.error("Erro ao buscar comunicados:", error));
  }, [token]); // Adiciona o token como dependência para refazer a requisição caso o token mude

  return (
    <div className="container">
      <div className="header">
        <img src="/COMUNICADO.png" alt="Smartphone" className="image" />
      </div>

      {/* Formulário para criar um novo comunicado */}
      <div className="create-notice-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Atualiza o título
        />
        <textarea
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Atualiza a mensagem
        ></textarea>
        <button onClick={postNotice}>Enviar Comunicado</button>
      </div>

      <div className="notices">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="notice">
              <h3>{notice.titulo}</h3> {/* Exibe o título do comunicado */}
              <p>{notice.mensagem}</p> {/* Exibe a mensagem do comunicado */}
              <span>{notice.condominioNome}</span>{" "}
              {/* Exibe o nome do condomínio */}
            </div>
          ))
        ) : (
          <p className="loading">Carregando comunicados...</p>
        )}
      </div>
    </div>
  );
}
