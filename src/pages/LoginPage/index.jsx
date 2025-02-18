import { useState } from "react";
import "./style.css";
import axios from "axios";

export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        cpf,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentPassword", password);
        console.log("Token salvo:", token);
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
            "CPF ou senha inválidos. Tente novamente."
        );
      } else {
        setErrorMessage(
          "Erro ao conectar com o servidor. Tente novamente mais tarde."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="logo-container">
          <img src="/argus-icon.png" alt="Argus" className="icon" />
        </div>
        <div className="login-forms">
          <h2 className="title">Acesse a Plataforma</h2>
          <h4 className="description">
            Faça o login ou registre-se para começar a<br />
            administrar seu apartamento
          </h4>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="fields-options">
              <label htmlFor="cpf">CPF*</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="additional-options">
              <a href="/recovery">
                <p>Esqueci minha senha</p>
              </a>
            </div>
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "ENTRAR"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
