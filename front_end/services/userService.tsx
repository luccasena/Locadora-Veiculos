import axios from "axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import { ENV } from "../config/env";
import { RegisterUser } from "@/types/user/RegisterUser";

const API_URL = ENV.API_URL_DATABASE.replace(/\/$/, ""); // remove trailing slash if present

export const Login = async (login: LoginRequest) => {
  const response = await axios.post(`${API_URL}/login/`, login);

  return response;
};
export const Register = async (usuario: RegisterUser) => {
  const response = await axios.post(`${API_URL}/clientes/`, usuario);

  return response;
};
