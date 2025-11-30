import axios from "axios";
import { ENV } from "../config/env";
import { RegisterCarData } from "../types/car/RegisterCarData";
import { CarUpdate } from "@/types/car/CarUpdate";
import axiosInstance from "@/config/axios";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const createCar = async (car: RegisterCarData) => {
  const response = await axiosInstance.post(`${API_URL}carros/`, car);
  return response;
}

export const updateCar = async (car: CarUpdate, id: number) => {
  console.log("Updating Car with ID:", id, "and data:", car);
  const response = await axiosInstance.put(`${API_URL}carros/${id}/`, car);
  return response;
}

export const getCars = async () => {
  const response = await axiosInstance.get(`${API_URL}carros/`, 
    { withCredentials: true }
  );
  return response;
}

export const deleteCar = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}carros/${id}/`);
  return response;
};
