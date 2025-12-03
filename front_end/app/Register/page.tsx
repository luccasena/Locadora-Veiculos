"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "../../schemas/validations";
import { set, type ZodIssue } from "zod";
import { registerUser } from "../../services/userService";
import axios from "axios";
import "./style.css";
import type { RegisterUserData } from "@/types/user/RegisterUser";

const REDIRECT_DELAY = 2000;

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterUserData>({
    name: "",
    cpf: "",
    password: "",
    phone: "",
    lastname: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgSucesso, setMsgSucesso] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, [name]: "" }));
      setMsgErro("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = registerSchema.safeParse(formData);
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
        const response = await registerUser(formData);
        if (
          response &&
          response.data &&
          (response.status === 201 || response.status === 200)
        ) {

          localStorage.setItem("auth", "true");
          localStorage.setItem("user", JSON.stringify(response.data.cliente));
          localStorage.setItem("userType", "cliente");

          setMsgSucesso(response.data.message || "cadastrado com sucesso!");
          setTimeout(() => router.push("/Home"), REDIRECT_DELAY);
        } else {
          setMsgErro(response?.data?.message || "Erro ao cadastrar usuário");
        }
      } catch (error: unknown) {
        console.error("Erro no cadastro:", error);
        let msg = "Erro ao cadastrar usuário";
        if (axios.isAxiosError(error)) {
          msg = error.response?.data?.message ?? error.message ?? msg;
        } else if (error instanceof Error) {
          msg = error.message;
        }
        setMsgErro(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router]
  );

  return (
    <main className="login-page">
      <div className="form-card">
        <h2 className="title-login">preencha suas informações</h2>

        {msgSucesso && <div className="alert alert-success">{msgSucesso}</div>}
        {msgErro && <div className="alert alert-error">{msgErro}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input
              name="cpf"
              type="text"
              placeholder="CPF"
              className="input-field"
              value={formData.cpf}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.cpf && <span className="error-text">{errors.cpf}</span>}
          </div>

          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input-field"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              name="name"
              type="text"
              placeholder="Nome"
              className="input-field"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              name="lastname"
              type="text"
              placeholder="Sobrenome (opcional)"
              className="input-field"
              value={formData.lastname}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              name="phone"
              type="text"
              placeholder="Telefone"
              className="input-field"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="input-field"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="box-btn">
            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <Link href="/" className="btn-login btn-secondary">
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
