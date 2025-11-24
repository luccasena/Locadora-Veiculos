import prisma from "../db/prisma";
import { Contract } from '../generated/prisma/index';

const dashBoardService = {
    async getDashBoardForClient(email:string): Promise<Contract[]>{
        return await prisma.contract.findMany({ where: { client: { email } }, include: { client: true, car: true } });
    },

    async getDashBoardForAdmin(): Promise<Contract[]>{
        return await prisma.contract.findMany({ include: { client: true, car: true } });
    }
};

export default dashBoardService;