// CondoNotices.js
import { useEffect, useState } from "react";
import "./CondoNotices.css";

export default function CondoNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://api.seucondominio.com/notices")
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error("Erro ao buscar comunicados", error));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <img src="/COMUNICADO.png" alt="Smartphone" className="image" />
      </div>
      <div className="notices">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="notice">
              {notice}
            </div>
          ))
        ) : (
          <p className="loading">Carregando comunicados...</p>
        )}
      </div>
    </div>
  );
}
