import axiosInstance from "../config/axios";
import type { Contract } from "../types/Contract";

export const getContractsUser = async () => {
    const res = await axiosInstance.get("dashboard/");
    return res.data;
};

export const getAllContracts = async () => {
    const res = await axiosInstance.get("contratos/");
    return res.data;
};

export const deleteContract = async (id: number) => {
    const res = await axiosInstance.delete(`contratos/${id}/`);
    return res.data;
}
