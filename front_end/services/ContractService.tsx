import axios from "axios";
import { ENV } from "../config/env";
import { Contract } from "@/types/Contract";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const Contracts = async (contract: Contract) => {
    const response = await axios.post(`${API_URL}contratos/`, contract);
    return response.data;
};