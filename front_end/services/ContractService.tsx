import axiosInstance from "../config/axios";
import type { Contract } from "../types/Contract";
import { ENV } from "../config/env";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const getContractsUser = async (): Promise<Contract[]> => {
    const res = await axiosInstance.get(`${API_URL}/dashboard/`);
    return res.data;
};

export const getAllContracts = async (): Promise<Contract[]> => {
    const res = await axiosInstance.get(`${API_URL}/contratos/`);
    return res.data;
};

export const deleteContract = async (id: number): Promise<void> => {
    const res = await axiosInstance.delete(`${API_URL}/contratos/${id}/`);
    return res.data;

}
