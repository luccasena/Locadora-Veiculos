import { validateLogin } from "../../schemas/validations";
import { LoginAutomatico } from "../../types/user/LoginAutomatico";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Login } from "@/services/usuarioService";
import "./style.css";

const REDIRECT_DELAY = 2000;
// useEffect
const LoginUsuario = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setMsgErro("");
    },
    []
  );
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validation = validateLogin(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setIsLoading(true);
      setMsgErro("");
      setMsgSucesso("");

      try {
        const usuario: LoginAutomatico = await Login(
          "",
          formData.email,
          formData.senha
        );
        setMsgSucesso(`Bem-vindo(a), ${usuario.nome}!`);

        setTimeout(() => {
          router.push("/homepage");
        }, REDIRECT_DELAY);
      } catch (error) {
        console.error("Erro no login:", error);
        setMsgErro("Erro ao realizar login. Verifique suas credenciais.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router]
  );
  return (
    <main className="login-page">
      <div className="form-card">
        <h2 className="title-login">Login</h2>

        {msgSucesso && <div className="alert alert-success">{msgSucesso}</div>}

        {msgErro && <div className="alert alert-error">{msgErro}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="senha"
              className="input-field"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.senha && <span className="error-text">{errors.senha}</span>}
          </div>

          <div className="box-btn">
            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </button>

            <a href="#" className="btn-login btn-secondary">
              Cadastrar
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};
export default LoginUsuario;
