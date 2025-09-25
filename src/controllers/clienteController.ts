import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import { Request, Response } from 'express';


export const GetClientByID = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client){ 
        return res.status(404).json({ message: "Cliente não encontrado" })
    };
    return res.status(200).json(client);
};

export const GetAllClient = async (req:Request, res:Response) => {
    const client = await prisma.client.findMany();
    return res.status(200).json(client);
};

export const CreateClient = async (req:Request, res:Response) => {
    type bodyData = {
        name: string;
        lastname?: string
        email: string;
    }
    const body: bodyData = req.body;

    // validando
    if(body.email == undefined){
        return res.status(400).json({ message: "Campo Email tem que ser inserido" })
    }
    else if(body.name == undefined){
        return res.status(400).json({ message: "Campo name tem que ser inserido" })
    }
   //

    const novocliente = await prisma.client.create({
        data: body,
    });
    return res.status(201).json({ message: "Cliente adicionado com sucesso!", cliente: novocliente });
};

export const DeleteClient= async (req:Request, res:Response) => {
    const  id = parseInt(req.params.id);
    const cliente = await prisma.client.findUnique({ where: { id:id } });
    if (!cliente) return res.status(404).json({ message: "Usuário não encontrado" });
    await prisma.client.delete({ where: { id } });
    return res.status(200).json({ message: "Usuário excluído!" });
};

export const UpdateClient = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const client = await prisma.client.findUnique({ where: { id:id } });
    if (!client) return res.status(404).json({ message: "Id  inválido ou não existe!" });

    type bodyData = {
        name?: string;
        lastname?: string
        email?: string;
    }

    const body: bodyData = req.body;

    const updatedClient = await prisma.client.update({
        where: { id: id },
        data: body,
    });

    return res.status(200).json({ message: "Cliente atualizado com sucesso!", client: updatedClient });
};
