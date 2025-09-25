import prisma from "../db/prisma"
import { Cars } from '../generated/prisma/index';

// Definindo o tipo aqui para reutilização
type CarData = {
    carBrand: string;
    carName: string;
    carCategory: string;
    fuelType: string;
    Year: number;
    Price: number;
};
const carsService = {

     async createCar(data: {carBrand: string; carName: string; carCategory: string; fuelType: string; Year: number; Price: number}) : Promise<Cars> {
        return prisma.cars.create({ data });
     },

     async getCars(): Promise<Cars[]>{
        return prisma.cars.findMany();
     },

     async getCarId(id: number): Promise< Cars | null >{
        return prisma.cars.findUnique({ where: {id}});
     },

     async deleteCar(id: number): Promise<void>{

        await prisma.cars.delete({where: {id} });
     },
     async updateCar(id: number, data: Partial<CarData> ): Promise<Cars>{
        return prisma.cars.update({
            where: {id},
            data,
        });
     },

};
export default carsService;