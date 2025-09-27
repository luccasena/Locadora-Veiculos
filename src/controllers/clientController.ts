import prisma from "../db/prisma"
import { Request, Response } from 'express';
import clientService, { clientBodyData } from "../services/clientService"

const clientController = {


    async getClientById(req: Request, res: Response): Promise<void>{
        const client = await clientService.getClientById(parseInt(req.params.id));
        if (!client){ 
            res.status(404).json({ message: "Cliente não encontrado" });
        }
        res.status(200).json(client);
    },


    async GetAllClient(req:Request, res:Response): Promise<void>{
        const client = await clientService.getAllClients();
        res.status(200).json(client);
    },


    async CreateClient(req:Request, res:Response):Promise<void>{
        const body: clientBodyData = req.body;
        if(body.email == undefined){
            res.status(400).json({ message: "Campo Email tem que ser inserido" })
        }
        else if(body.name == undefined){
            res.status(400).json({ message: "Campo name tem que ser inserido" })
        }
        const client = await clientService.CreateClient(body)
        if(client){
            res.status(201).json({ message: "Cliente adicionado com sucesso!", cliente: client });
        }
        res.status(400).json({ message: "Algo deu errado durante a criacao do cliente"});
    },


    async DeleteClient(req:Request, res:Response):Promise<void>{
        const  id:number = parseInt(req.params.id);
        const deletedClient = await clientService.DeleteClient(id);
        if(deletedClient){
            res.status(200).json({ message: "Usuário excluído!" })
        };
        res.status(400).json({ message: "Usuário excluído!"})
    },


    async UpdateClient(req:Request, res:Response):Promise<void> {
        const id = parseInt(req.params.id);
        const client = await prisma.client.findUnique({ where: { id:id } });
        if (!client){
            res.status(404).json({ message: "Id  inválido ou não existe!" })
        };
        const body: clientBodyData = req.body;

        const updatedClient = await clientService.UpdateClient(id,body)
        if(updatedClient){res.status(200).json({ message: "Cliente atualizado com sucesso!", client: updatedClient });}

        res.status(400).json({ message: "Algo deu errado durante a atualizacao dos dados do cliente"});
    },


}
export default clientController;