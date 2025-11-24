import axios from "axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import type { NomeUsuario } from "../types/user/NomeUsuario";
import { ENV } from "../config/env";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const Login = async (login: LoginRequest) => {

  const response = await axios.post(`${API_URL}login/`, login);

  return response;
};
