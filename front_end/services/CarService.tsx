import axios from "axios";
import { ENV } from "../config/env";
import { RegisterCarData } from "../types/car/RegisterCarData";
import { Rent } from "@/types/Rent";
import { CarUpdate } from "@/types/car/CarUpdate";
import axiosInstance from "@/config/axios";
import { Car } from "@/types/car/Car";

const API_URL = ENV.NEXT_PUBLIC_API_URL;

export const createCar = async (car: RegisterCarData) => {
  const response = await axiosInstance.post(`${API_URL}/carros/`, car);
  return response;
}

export const updateCar = async (car: CarUpdate, id: number) => {
  console.log("Updating Car with ID:", id, "and data:", car);
  const response = await axiosInstance.put(`${API_URL}/carros/${id}/`, car);
  return response;
}

export const getAllCars  = async () => {
  const MOCK_CARS_DATA: Car[] = [
      { id: 1, carName: "Corolla", carBrand: "Toyota", carCategory: "Sedan", fuelType: "Híbrido", Year: 2023, Price: 250.00 },
      { id: 2, carName: "Civic", carBrand: "Honda", carCategory: "Sedan", fuelType: "Gasolina", Year: 2022, Price: 230.00 },
      { id: 3, carName: "Compass", carBrand: "Jeep", carCategory: "SUV", fuelType: "Flex", Year: 2024, Price: 350.00 },
      { id: 4, carName: "Mobi", carBrand: "Fiat", carCategory: "Hatch", fuelType: "Flex", Year: 2021, Price: 90.00 },
      { id: 5, carName: "Mustang", carBrand: "Ford", carCategory: "Esportivo", fuelType: "Gasolina", Year: 2020, Price: 850.00 },
  ];
  /*const response = await axiosInstance.get(`${API_URL}/carros/`, 
    { withCredentials: true }
  );
  return response;*/
  return { data: MOCK_CARS_DATA };

}

export const getCarById  = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}/carros/${id}/`, 
    { withCredentials: true }
  );
  return response;
}

export const deleteCar = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}/carros/${id}/`);
  return response;
};

export const RentCar = async (rent: { StartDate: string; EndDate: string; idClient: number; idCar: number }) => {
  const response = await axiosInstance.post(`${API_URL}/contratos/`, rent);
  return response;
};
