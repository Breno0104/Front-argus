import { useState } from "react";

function App() {
  // Estado para a mensagem
  const [message, setMessage] = useState("ola mundo");

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Olá mundo foi clicado")}>
        Mudar mensagem
      </button>
    </div>
  );
}

export default App;
