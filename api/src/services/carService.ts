import prisma from "../db/prisma"
import { Car } from '../generated/prisma/index';

// Definindo o tipo aqui para reutilização
type CarData = {
    carBrand: string;
    carName: string;
    carCategory: string;
    fuelType: string;
    Year: number;
    Price: number;
};
const carService = {

     async createCar(data: {carBrand: string; carName: string; carCategory: string; fuelType: string; Year: number; Price: number}) : Promise<Car> {
        return prisma.car.create({ data });
     },

     async getCar(): Promise<Car[]>{
        return prisma.car.findMany();
     },

     async getCarId(id: number): Promise< Car | null >{
        return prisma.car.findUnique({ where: {id}});
     },

     async deleteCar(id: number): Promise<void>{

        await prisma.car.delete({where: {id} });
     },
     async updateCar(id: number, data: Partial<CarData> ): Promise<Car>{
        return prisma.car.update({
            where: {id},
            data,
        });
     },

};
export default carService;