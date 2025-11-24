"use client";
import { loginSchema } from "../../schemas/validations";
import type { ZodIssue } from "zod";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/services/usuarioService";
import "./style.css";
import { User } from "@/types/user/User";
import { LoginRequest } from "@/types/user/LoginRequest";

const REDIRECT_DELAY = 2000;
// useEffect
const LoginUser = () => {
  
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
      const validation = loginSchema.safeParse(formData);

      if (!validation.success) {
        const zodErrors: Record<string, string> = {};
        validation.error.issues.forEach((err: ZodIssue) => {
          const key = err.path[0] ? String(err.path[0]) : "form";
          // keep first error message per field
          if (!zodErrors[key]) zodErrors[key] = err.message;
        });
        setErrors(zodErrors);
        return;
      }

      setIsLoading(true);
      setMsgErro("");
      setMsgSucesso("");

      try {
        const login: LoginRequest = {
          email: formData.email,
          password: formData.senha,
        };

        const usuario = await Login(login);
        
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(usuario.data.user));
        localStorage.setItem("userType", usuario.data.type);
        
        setMsgSucesso(`Bem-vindo(a), ${usuario.data.user.name}!`);

        if (localStorage.getItem("auth") === "true"){
            setTimeout(() => {
                router.push("/home");
            },REDIRECT_DELAY);

        }

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
export default LoginUser;
