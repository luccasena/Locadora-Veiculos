
import prisma from "../db/prisma"
import { Client } from '../generated/prisma/';

export type clientBodyData = {
    name: string;
    cpf: string;
    password: string;
    phone: string;
    lastname?: string
    email: string;
}

const clientService = {
    async getClientById(id: number): Promise<Client | null>{
            return await prisma.client.findUnique({where:{id}});
        },
    
    async getAllClients():Promise<Client[] | null>{
        return await prisma.client.findMany();
    },

    async CreateClient(data:clientBodyData): Promise<Client>{
        const body: clientBodyData = data; 
        const novocliente = await prisma.client.create({data: body});
        if(novocliente){
            return novocliente
        }
        return novocliente
    },
    async DeleteClient(id: number):Promise<boolean>{
        const cliente = await prisma.client.findUnique({ where: { id:id } });
        if (!cliente){return false };
        const deleteClient = await prisma.client.delete({ where: { id } });
        return true
    },

    async UpdateClient(id:number,data:clientBodyData):Promise<Client>{
        type clientBodyData = {
            name?: string;
            lastname?: string
            email?: string;
        }

        const body: clientBodyData = data;

        const updatedClient = await prisma.client.update({
            where: { id: id },
            data: body,
        });
        return updatedClient
    },
}

export default clientService;