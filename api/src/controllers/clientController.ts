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
                return;
            }
            res.status(200).json(client);
            return;
        }
        else{
            const is_client = await IsClient(req.cookies['sb-access-token'],req);
            if(is_client && user.id.toString() != req.params.id){
                res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
                return;
            }
        const client = await clientService.getClientById(parseInt(req.params.id));
        if (!client){ 
            res.status(404).json({ message: "Cliente não encontrado" });
            return;
        }
        res.status(200).json(client);
        return;
        }
    },

    async GetAllClient(req:Request, res:Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (!req.cookies['sb-access-token']){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
            return;
        }
        const client = await clientService.getAllClients();
        res.status(200).json(client);
        return;
    },

    async CreateClient(req:Request, res:Response):Promise<void>{
        const body: clientBodyData = req.body;
        clientSchema.parse(body)
        try{
           const client = await clientService.CreateClient(body)
            res.status(201).json({message: "Cliente adicionado com sucesso!", cliente: client });
            return;

        }catch(error){
            res.status(400).json({ message: `Algo deu errado durante a criacao do cliente ${error}`});
        }
    },


    async DeleteClient(req:Request, res:Response):Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
            return;
        }
        const  id:number = parseInt(req.params.id);
        const client = await clientService.getClientById(parseInt(req.params.id));

        if (!client){ 
            res.status(404).json({ message: "Cliente não encontrado" });
            return;
        }

        try{
            const deletedClient = await clientService.DeleteClient(id);
            res.status(200).json({ message: "Usuário excluído!" })
            return;
        }catch(error){
            res.status(400).json({ message: "Algo deu errado!"})
            return
        }
    },

    async UpdateClient(req:Request, res:Response):Promise<void> {
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return
        }
        
        const user = await ReturnUserByCookie(req.cookies['sb-access-token']);
        const is_admin: boolean = await IsAdmin(req.cookies['sb-access-token'],req);;
        if (!is_admin && user.id.toString() != req.params.id){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
            return;
        }
        const id = parseInt(req.params.id);
        const body: clientBodyData = req.body;

        const updatedClient = await clientService.UpdateClient(id,body)

        if(updatedClient){res.status(200).json({ message: "Cliente atualizado com sucesso!", client: updatedClient }); return;}

        res.status(400).json({ message: "Algo deu errado durante a atualizacao dos dados do cliente"});
        return
    },

}
export default clientController;