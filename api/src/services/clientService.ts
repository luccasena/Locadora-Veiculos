
import prisma from "../db/prisma"
import { Client } from '../generated/prisma/';
import { supabase } from "../supabase";

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
        
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
        });

        if (authError) {
            throw new Error(`Erro ao criar usuário no Supabase: ${authError.message}`);
        }

        const novocliente = await prisma.client.create({data: body});
        if(novocliente){
            return novocliente
        }
        return novocliente
    },
    async DeleteClient(id: number):Promise<boolean>{
        const cliente = await prisma.client.findUnique({ where: { id:id } });
        if (!cliente){return false };
        
        const { data } = await supabase.auth.admin.listUsers();
        const user = data?.users.find(u => u.email === cliente.email);
        
        if (user) {
            await supabase.auth.admin.deleteUser(user.id);
        }
        
        await prisma.client.delete({ where: { id } });
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