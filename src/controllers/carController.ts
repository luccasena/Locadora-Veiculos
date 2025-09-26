import {Request, Response} from "express";
import carsService from "../services/carService";
import { Car } from "../generated/prisma";

// Para evitar repetição, podemos definir um tipo para os dados do carro
type CarData = {
    carBrand: string;
    carName: string;
    carCategory: string;
    fuelType: string;
    Year: number;
    Price: number;
}

const carsController = {

    async createCar(req: Request, res: Response): Promise<void>{
        const carData: CarData = req.body;
        const newCar: Car = await carsService.createCar(carData);
        res.status(201).json(newCar);
    },

    async getCars(req: Request, res: Response): Promise<void>{
        const cars: Car[] = await carsService.getCar();
        res.status(200).json(cars);
    },
    async getCarsId(req: Request, res: Response): Promise<void>{
        const id: number = parseInt(req.params.id,10);

        const car: Car | null = await carsService.getCarId(id);
        if (!car) {
            res.status(404).json({ message: "Carro não encontrado" });
            return;
        }
        res.status(200).json(car);
    },

    async update(req: Request, res: Response): Promise<void>{
        const id : number = parseInt(req.params.id, 10);
        const carData: Partial<CarData> = req.body;

        const carExists = await carsService.getCarId(id);
        if (!carExists) {
            res.status(404).json({ message: "Carro não encontrado para atualização." });
            return;
        }

        const updatedCar = await carsService.updateCar(id, carData );
        res.status(200).json({ message: "Carro atualizado com sucesso!", car: updatedCar });
    },

    async deleteCar(req: Request, res: Response): Promise<void>{
        const id: number = parseInt(req.params.id, 10);

        const carExists = await carsService.getCarId(id);
        if (!carExists) {
            res.status(404).json({ message: "Carro não encontrado para exclusão." });
            return;
        }

        await carsService.deleteCar(id);
        res.status(200).json({ message: "Carro excluído com sucesso!" });
    },
}
export  default carsController;