import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Serviços");
  const [userName, setUserName] = useState("Usuário");
  const [setUserCpf] = useState(""); // Estado para armazenar o CPF

  useEffect(() => {
    // Função para obter os dados do usuário a partir do token JWT
    const fetchUserData = async () => {
      try {
        // Obtém o token JWT do localStorage (ou onde você armazenou o token)
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        // Decodifica o token para obter o id do usuário
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Verifique a estrutura do token

        // Usando 'sub' como ID do usuário
        const userId = decodedToken.sub;
        if (!userId) {
          throw new Error("ID do usuário não encontrado no token");
        }

        // Verifica se o token tem expiração e está válido (opcional)
        const expirationTime = decodedToken.exp * 1000; // Convertendo expiração para milissegundos
        if (expirationTime < Date.now()) {
          throw new Error("Token expirado");
        }

        // Faz a requisição para a API com o id do usuário
        const response = await fetch(
          `http://localhost:8080/usuarios/cpf/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Passando o token no cabeçalho
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const userData = await response.json();
        console.log(userData); // Verifique a estrutura de dados retornada

        // Armazenando o nome e o CPF do usuário
        setUserName(userData.nome); // Define o nome do usuário no estado
        setUserCpf(userData.cpf || "CPF não encontrado"); // Defina o CPF se presente
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-page">
      <header className="headerHome">
        <div className="header-content">
          <h1>Bem-Vindo, {userName}</h1>
        </div>
        <img
          src="header.png"
          alt="Header Background"
          className="header-image"
        />
      </header>

      {/* Abas */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Serviços" ? "active" : ""}`}
          onClick={() => setActiveTab("Serviços")}
        >
          Serviços
        </button>
        <button
          className={`tab ${activeTab === "Regras e Normas" ? "active" : ""}`}
          onClick={() => setActiveTab("Regras e Normas")}
        >
          Regras e Normas
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === "Serviços" && (
        <div className="services-container">
          {/* Primeira linha */}
          <div className="services-row">
            <div className="service">
              <Link to="/manu">
                <img src="Ocorrencia.png" alt="Ocorrência" />
                <p>Ocorrência</p>
              </Link>
            </div>
            <div className="service">
              <Link to="/comu">
                <img src="comunicados.png" alt="Comunicados" />
                <p>Comunicados</p>
              </Link>
            </div>
            <div className="service">
              <Link to="/rese">
                <img src="reserva.png" alt="Reservas" />
                <p>Reservas</p>
              </Link>
            </div>
          </div>

          {/* Segunda linha */}
          <div className="services-row">
            <div className="service disabled">
              <img src="Assembleia.png" alt="Assembleia" />
              <p>Assembleia</p>
            </div>
            <div className="service disabled">
              <img src="Financeiro.png" alt="Financeiro" />
              <p>Financeiro</p>
            </div>
            <div className="service disabled">
              <img src="Pagamento.png" alt="Pagamentos" />
              <p>Pagamentos</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Regras e Normas" && (
        <div className="rules-container">
          <h2>Regras e Normas</h2>
          <div className="norma">
            1. <strong>Horário de silêncio:</strong> O horário de silêncio deve
            ser respeitado das <strong>22h às 7h</strong>, conforme a Lei do
            Silêncio.
          </div>
          <div className="norma">
            2. <strong>Uso das áreas comuns:</strong> As áreas comuns, como
            salão de festas, piscina e academia, devem ser utilizadas de acordo
            com as regras específicas de cada espaço e mediante agendamento,
            quando necessário.
          </div>
          <div className="norma">
            3. <strong>Estacionamento:</strong> Cada morador deve utilizar
            apenas a vaga correspondente à sua unidade. É proibido estacionar em
            locais não autorizados ou bloquear a passagem de outros veículos.
          </div>
          <div className="norma">
            4. <strong>Animais de estimação:</strong> Os moradores podem ter
            animais de estimação, desde que não causem incômodo aos demais e
            sejam mantidos em coleira nas áreas comuns.
          </div>
          <div className="norma">
            5. <strong>Lixo e reciclagem:</strong> O lixo deve ser descartado
            corretamente nos locais apropriados, respeitando a coleta seletiva
            do condomínio.
          </div>
          <div className="norma">
            6. <strong>Obras e reformas:</strong> Qualquer obra ou reforma
            dentro das unidades deve ser previamente comunicada à administração
            e só pode ocorrer em horário comercial, das{" "}
            <strong>8h às 18h</strong>, de segunda a sexta-feira.
          </div>
          <div className="norma">
            7. <strong>Segurança:</strong> O acesso ao condomínio deve ser
            controlado. Visitantes e prestadores de serviço devem ser
            previamente autorizados pelo morador responsável.
          </div>
          <div className="norma">
            8. <strong>Uso da piscina:</strong> O uso da piscina é exclusivo
            para moradores e visitantes autorizados. É proibido consumir
            alimentos ou bebidas dentro da piscina.
          </div>
          <div className="norma">
            9. <strong>Eventos e festas:</strong> Festas e eventos devem ser
            comunicados com antecedência à administração e não podem ultrapassar
            o horário limite das <strong>23h</strong>.
          </div>
          <div className="norma">
            10. <strong>Convivência e respeito:</strong> Todos os moradores
            devem manter uma convivência harmoniosa, evitando atitudes que
            causem transtornos aos vizinhos. Discussões e comportamentos
            agressivos não serão tolerados.
          </div>
        </div>
      )}
    </div>
  );
}
