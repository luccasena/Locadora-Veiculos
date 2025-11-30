import axios from "axios";
import { ENV } from "@/config/env";
import { Car } from "@/types/Car";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const GetAllCars = async (): Promise<Car[]> => {
  const response = await axios.get(`${API_URL}carros/`);
  return response.data as Car[];
};
