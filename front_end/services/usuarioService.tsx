import axiosInstance from "../config/axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import type { UserUpdate } from "../types/user/UserUpdate";

export const Login = async (login: LoginRequest) => {
  const response = await axiosInstance.post("login/", login);
  return response;
};

export const updateUser = async (user: UserUpdate, id: number) => {
  const response = await axiosInstance.put(`clientes/${id}/`, user);
  return response;
}
