import "./Ocorrencia.css"; // Estilos específicos para a página de Ocorrência

function Ocorrencia() {
  return (
    <div className="ocorrencia-container">
      <h1>Ocorrencia</h1>
      <p>Bem-vindo! Solicite aqui abaixo sua Ocorrencia.</p>

      <div className="solicitacao">
        <input type="text" placeholder="Digite o tipo de ocorrencia" />
        <input type="text" placeholder="Digite os detalhes da ocorrencia" />
        <input type="text" placeholder="Registre sua ocorrencia" />
        <input type="text" placeholder="Recorra à sua ocorrencia" />
      </div>

      <hr />

      <button className="enviar-button">Enviar</button>
      <p className="caroeier">Caroeier Solicitação</p>
    </div>
  );
}

export default Ocorrencia;
