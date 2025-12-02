
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
        const body: clientBodyData = data;

        const currentClient = await prisma.client.findUnique({
            where: { id: id }
        });

        if (!currentClient) {
            throw new Error('Cliente não encontrado');
        }

        const { data: users } = await supabase.auth.admin.listUsers();
        const supabaseUser = users?.users.find(u => u.email === currentClient.email);

        if (supabaseUser) {
            const supabaseUpdateData: any = {};
            
            if (body.email && body.email !== currentClient.email) {
                supabaseUpdateData.email = body.email;
            }
            
            if (body.password) {
                supabaseUpdateData.password = body.password;
            }

            if (Object.keys(supabaseUpdateData).length > 0) {
                const { error: authError } = await supabase.auth.admin.updateUserById(
                    supabaseUser.id,
                    supabaseUpdateData
                );

                if (authError) {
                    throw new Error(`Erro ao atualizar usuário no Supabase: ${authError.message}`);
                }
            }
        }

        const updatedClient = await prisma.client.update({
            where: { id: id },
            data: body,
        });
        
        return updatedClient;
    },
}

export default clientService;