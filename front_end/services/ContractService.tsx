import axios from "../config/axios";
import type { Contract } from "../types/Contract";

export const getContracts = async (): Promise<Contract[]> => {
  const res = await axios.get("contratos/");
  return res.data;
};




