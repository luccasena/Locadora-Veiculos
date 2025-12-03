import axios from "axios";
import { ENV } from "../config/env";
import { RegisterCarData } from "../types/car/RegisterCarData";
import { Car } from "@/types/car/Car";
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

export const getAllCars  = async () => {
  const response = await axiosInstance.get(`${API_URL}carros/`, 
    { withCredentials: true }
  );
  return response;
}

export const getCarById  = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}carros/${id}/`, 
    { withCredentials: true }
  );
  return response;
}

export const deleteCar = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}carros/${id}/`);
  return response;
};

export const RentCar = async (rent: { StartDate: string; EndDate: string; idClient: number; idCar: number }) => {
  const response = await axiosInstance.post(`${API_URL}contratos/`, rent);
  return response;
};
