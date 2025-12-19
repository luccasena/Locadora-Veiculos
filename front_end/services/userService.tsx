import type { LoginRequest } from "@/types/user/LoginRequest";
import { ENV } from "@/config/env";
import { User } from "@/types/user/User";
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
  const MOCK_USERS_DATA: User[] = [
    { 
        id: 1, 
        cpf: "123.456.789-00", 
        email: "joao.silva@email.com", 
        name: "João", 
        lastname: "Silva", 
        phone: "(11) 99999-0001", 
        password: "hash_password_1", 
        createdAt: "2025-01-15T10:00:00Z", 
        updatedAt: "2025-02-20T14:30:00Z" 
    },
    { 
        id: 2, 
        cpf: "234.567.890-11", 
        email: "maria.souza@email.com", 
        name: "Maria", 
        lastname: "Souza", 
        phone: "(21) 98888-0002", 
        password: "hash_password_2", 
        createdAt: "2025-03-10T09:15:00Z", 
        updatedAt: "2025-03-10T09:15:00Z" 
    },
    { 
        id: 3, 
        cpf: "345.678.901-22", 
        email: "carlos.pereira@email.com", 
        name: "Carlos", 
        lastname: "Pereira", 
        phone: "(31) 97777-0003", 
        password: "hash_password_3", 
        createdAt: "2025-05-05T16:45:00Z", 
        updatedAt: "2025-06-01T11:20:00Z" 
    },
];
  /*
  const response = await axiosInstance.get(`${API_URL}/clientes/`, 
    { withCredentials: true }
  );
  */
  return { data: MOCK_USERS_DATA };
}

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}/clientes/${id}/`);
  return response;
};

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}/clientes/${id}/`);
  return response;
};
