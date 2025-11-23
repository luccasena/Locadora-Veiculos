import axios from "axios";
// import type { LoginAutomatico } from "../types/user/LoginAutomatico";
// import type { NomeUsuario } from "../types/user/NomeUsuario";
import { Usuario } from "@/types/user/usuario";

const API_URL = "http://localhost:3000/api";

export const Login = async (
  nome: string,
  email: string,
  senha: string
): Promise<Usuario> => {
  const response = await axios.post<Usuario>(`${API_URL}/login`, {
    nome,
    email,
    senha,
  });
  return response.data;
};
