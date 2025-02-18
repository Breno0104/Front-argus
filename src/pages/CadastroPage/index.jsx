import "./style.css";

export default function RegisterPage() {
  return (
    <>
      <section className="register-page">
        <div className="register-container">
          <img src="/argus-icon.png" alt="Argus" className="icon" />
          <div className="text"></div>
        </div>
        <div className="register-forms">
          <div>
            <h2 className="title">Crie sua Conta</h2>
            <h4 className="description">
              Registre-se para começar a administrar seu apartamento
            </h4>
          </div>
          <form action="" method="post">
            {/* Campo para o nome completo */}
            <div className="fields-options">
              <label htmlFor="fullname">Nome Completo*</label>
              <input
                type="text"
                placeholder="Ex: Antônio Cortês Santana de Veiga"
                id="fullname"
                name="fullname"
                required
              />
            </div>

            {/* Campo para o CPF */}
            <div className="fields-options">
              <label htmlFor="cpf">CPF*</label>
              <input
                type="text"
                placeholder="Ex: xxx.xxx.xxx-xx"
                id="inputCpf"
                maxLength={14}
                name="cpf"
                required
              />
            </div>

            {/* Campo para o e-mail */}
            <div className="fields-options">
              <label htmlFor="email">E-mail*</label>
              <input
                type="email"
                placeholder="Ex: argus@gmail.com"
                id="email"
                name="email"
                required
              />
            </div>

            {/* Campo para a senha */}
            <div className="fields-options">
              <label htmlFor="password">Senha*</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
            </div>

            {/* Campo para confirmar a senha */}
            <div className="fields-options">
              <label htmlFor="confirm-password">Confirmar Senha*</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>

            {/* Termos e condições */}
            <div className="additional-options">
              <div>
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  Li e aceito os <a href="/terms">termos e condições</a>
                </label>
              </div>
            </div>

            {/* Botão de cadastro */}
            <input
              className="register-button"
              type="submit"
              value="CADASTRAR"
            />

            {/* Link para voltar ao login */}
            <div className="register-button">
              <p>
                Já tem uma conta? <a href="/login">Faça login</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}