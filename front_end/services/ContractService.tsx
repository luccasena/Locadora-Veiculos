import axiosInstance from "../config/axios";
import type { Contract } from "../types/Contract";

export const getContractsUser = async (): Promise<Contract[]> => {
    const res = await axiosInstance.get("dashboard/");
    return res.data;
};

export const getAllContracts = async (): Promise<Contract[]> => {
    const res = await axiosInstance.get("contratos/");
    return res.data;
};

export const deleteContract = async (id: number): Promise<void> => {
    const res = await axiosInstance.delete(`contratos/${id}/`);
    return res.data;

}
