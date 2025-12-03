import axios from "axios";
import type { LoginRequest } from "../types/user/LoginRequest";
import { ENV } from "../config/env";
import { RegisterUserData } from "@/types/user/RegisterUser";
import { UserUpdate } from "@/types/user/UserUpdate";
import axiosInstance from "@/config/axios";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const loginUser = async (login: LoginRequest) => {
  const response = await axiosInstance.post(`${API_URL}/login/`, login);
  return response;
};

export const registerUser = async (usuario: RegisterUserData) => {
  const response = await axiosInstance.post(`${API_URL}/clientes/`, usuario);
  return response;
};

export const updateUser = async (user: UserUpdate, id: number) => {
  const response = await axiosInstance.put(`${API_URL}/clientes/${id}/`, user);
  return response;
}

export const getUsers = async () => {
  const response = await axiosInstance.get(`${API_URL}/clientes/`, 
    { withCredentials: true }
  );
  return response;
}

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}/clientes/${id}/`);
  return response;
};

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}/clientes/${id}/`);
  return response;
};
