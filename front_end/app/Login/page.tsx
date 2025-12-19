"use client";
import { loginSchema } from "../../schemas/validations";
import type { ZodIssue } from "zod";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/userService";
import styles from "./style.module.css";
import Link from "next/link";
import { LoginRequest } from "@/types/user/LoginRequest";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const REDIRECT_DELAY = 2000;
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

        const usuario = await loginUser(login);

        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(usuario.data.user));
        localStorage.setItem("userType", usuario.data.type);

        if (usuario.data.type === "administrador") {
          setMsgSucesso(`Bem-vindo(a) Administrador!`);
          localStorage.setItem("userType", "administrador");
        } else {
          setMsgSucesso(`Bem-vindo(a), ${usuario.data.user.name}!`);
          localStorage.setItem("userType", "cliente");
        }

        if (localStorage.getItem("auth") === "true") {
          setTimeout(() => {
            router.push("/Home");
          }, REDIRECT_DELAY);
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
    <>
    
    <Link href="/" className={styles["btn-back-lp"]}>
      <ArrowBackIosIcon/> Voltar para Home
    </Link>
    
    <main className={styles["login-page"]}>
      <div className={styles["form-card"]}>
        <h2 className={styles["title-login"]}>Login</h2>

        {msgSucesso && <div className={styles["alert"] + " " + styles["alert-success"]}>{msgSucesso}</div>}

        {msgErro && <div className={styles["alert"] + " " + styles["alert-error"]}>{msgErro}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles["input-group"]}>
            <input
              type="email"
              name="email"
              className={styles["input-field"]}
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && <span className={styles["error-text"]}>{errors.email}</span>}
          </div>

          <div className={styles["input-group"]}>
            <input
              type="password"
              name="senha"
              className={styles["input-field"]}
              placeholder="Senha"
              value={formData.senha}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.senha && <span className={styles["error-text"]}>{errors.senha}</span>}
          </div>

          <div className={styles["box-btn"]}>
            <button type="submit" className={styles["btn-login"]} disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </button>

            <Link href="/Register" className={styles["btn-login"] + " " + styles["btn-secondary"]}>
              Cadastrar
            </Link>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};

export default LoginUser;
