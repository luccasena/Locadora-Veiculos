import prisma from "../db/prisma"
import { Request, Response } from 'express';
import clientService, { clientBodyData } from "../services/clientService"
import { clientSchema } from "./zod-validation/schemaValidate"
import { supabase } from "../supabase";
import { IsClient,ReturnUserByCookie,IsAdmin,IsAuthenticated} from '../utils/cookies';
const clientController = {

    async getClientById(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_admin = await IsAdmin(req.cookies['sb-access-token'],req);
        const user = await ReturnUserByCookie(req.cookies['sb-access-token']);
        if (is_admin){
            const client = await clientService.getClientById(parseInt(req.params.id));
            if (!client){ 
                res.status(404).json({ message: "Cliente não encontrado" });
            }
            res.status(200).json(client);
        }
        else{
            const is_client = await IsClient(req.cookies['sb-access-token'],req);
            if(is_client && user.id.toString() != req.params.id){
                res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
            }
        const client = await clientService.getClientById(parseInt(req.params.id));
        if (!client){ 
            res.status(404).json({ message: "Cliente não encontrado" });
        }
        res.status(200).json(client);
        }
    },

    async GetAllClient(req:Request, res:Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (!req.cookies['sb-access-token']){
            res.status(401).json({ message: "Usuário não autenticado" });
        }
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        const client = await clientService.getAllClients();
        res.status(200).json(client);
    },


    async CreateClient(req:Request, res:Response):Promise<void>{
        const body: clientBodyData = req.body;
        clientSchema.parse(body)

        try{
           const client = await clientService.CreateClient(body)
            res.status(201).json({message: "Cliente adicionado com sucesso!", cliente: client });

        }catch(error){
            res.status(400).json({ message: "Algo deu errado durante a criacao do cliente"});
        }
    },


    async DeleteClient(req:Request, res:Response):Promise<void>{
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        const  id:number = parseInt(req.params.id);
        const client = await clientService.getClientById(parseInt(req.params.id));

        if (!client){ 
            res.status(404).json({ message: "Cliente não encontrado" });
        }

        try{
            const deletedClient = await clientService.DeleteClient(id);
            res.status(200).json({ message: "Usuário excluído!" })
        }catch(error){
            res.status(400).json({ message: "Algo deu errado!"})
        }
    },

    async UpdateClient(req:Request, res:Response):Promise<void> {
        const user = await ReturnUserByCookie(req.cookies['sb-access-token']);
        if(user && req.params.id != user.id.toString()){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
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