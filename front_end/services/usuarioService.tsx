import axios from "axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import type { UserUpdate } from "../types/user/UserUpdate";
import { ENV } from "../config/env";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const Login = async (login: LoginRequest) => {

  const response = await axios.post(`${API_URL}login/`, login);

  return response;
};

export const updateUser = async (user: UserUpdate, id: number) => {

  const response = await axios.put(`${API_URL}clientes/${id}/`, user, {
    withCredentials: true,
  });

  return response;
}
