import axios from "axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import { ENV } from "../config/env";
import { RegisterUser } from "@/types/user/RegisterUser";
import { UserUpdate } from "@/types/user/UserUpdate";

const API_URL = ENV.NEXT_PUBLIC_API_URL

export const Login = async (login: LoginRequest) => {
  const response = await axios.post(`${API_URL}login/`, login);
  return response;
};

export const Register = async (usuario: RegisterUser) => {
  const response = await axios.post(`${API_URL}clientes/`, usuario);

  return response;
};

export const updateUser = async (user: UserUpdate, id: number) => {
  const response = await axios.put(`${API_URL}clientes/${id}/`, user);
  return response;
}