import { useEffect, useState } from "react";
import "./CondoNotices.css";

export default function CondoNotices() {
  const [notices, setNotices] = useState([]);

  // Acessando o token (supondo que ele esteja no localStorage, mas pode ser de outra forma)
  const token = localStorage.getItem("authToken");
  console.log("Token enviado:", token);

  useEffect(() => {
    // Alteração do endpoint para o servidor local com token no cabeçalho
    fetch("http://localhost:8080/comunicado", {
      method: "GET", // Pode omitir o método se for GET, mas é bom especificar
      headers: {
        Authorization: `Bearer ${token}`, // Coloca o token no cabeçalho de Authorization
        "Content-Type": "application/json", // Opcional, mas ajuda em algumas APIs
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
