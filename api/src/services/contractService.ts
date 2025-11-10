import prisma from "../db/prisma";
import { Contract } from '../generated/prisma/index';

const contractService = {
    async getContracts(): Promise<Contract[]>{
        return prisma.contract.findMany();
    },

    async getContractById(id: number): Promise<Contract | null>{
            return prisma.contract.findUnique(
                {where:{ id },
                include: { client: true, car: true }}
            );
            
    },

    async createContract(data: { StartDate: Date; EndDate: Date; idClient: number; idCar: number}): Promise<Contract>{
        return prisma.contract.create({ data });
    },

    async deleteContract(id: number): Promise<void>{
        await prisma.contract.delete( {where: {id}} );
    },

    async updateContract(id: number, data: {StartDate?: Date; EndDate?: Date; idClient?: number; idCar?: number}): Promise<Contract>{
        return prisma.contract.update({
            where: {id},
            data,
        });
    }
};

export default contractService;