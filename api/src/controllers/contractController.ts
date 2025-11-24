import { Request, Response } from "express";
import contractService from "../services/contractService";
import { Contract } from "../generated/prisma";
import { contractSchema } from "./zod-validation/schemaValidate"
import { supabase } from "../supabase";
import { IsClient,ReturnUserByCookie,IsAuthenticated} from '../utils/cookies';

const contractController = {
    async getContracts(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        const contracts: Contract[] = await contractService.getContracts();
        res.status(200).json(contracts);
    },

    async getContractById(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        const id: number = parseInt(req.params.id);

        if(isNaN(id) || id <= 0){
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const contract: Contract | null = await contractService.getContractById(id);

        if(!contract){
            res.status(404).json({ message: "Contrato não encontrado" });
            return;
        }

        res.status(200).json(contract)

    },
    async createContract(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        contractSchema.parse(req.body)
        const {  StartDate, EndDate, idClient, idCar } = req.body;

        if( !StartDate || !EndDate || !idClient || !idCar){
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
            return;
        }

        try{
            const newContract: Contract = await contractService.createContract({  StartDate: new Date(StartDate), EndDate: new Date(EndDate), idClient, idCar });
            res.status(201).json(newContract);

        }catch(error){
            res.status(409).json({ message: "Erro ao criar contrato", error });

        }

    },

    async deleteContract(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }
        const id: number = parseInt(req.params.id);

        if(isNaN(id) || id <= 0){
            res.status(400).json({ message: "ID inválido" });
            return;
        }

        try{
            await contractService.deleteContract(id);
            res.status(200).json({ message: "Contrato deletado com sucesso" });

        }catch(error){
            res.status(404).json({ message: "Contrato não encontrado", error });
            
        }

    },

    async updateContract(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const is_client = await IsClient(req.cookies['sb-access-token'],req);
        if (is_client){
            res.status(400).json({ message: "Voce nao tem permissao para acessar essa pagina" });
        }

        const id: number = parseInt(req.params.id);
        
        if(isNaN(id) || id <= 0){
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const { StartDate, EndDate, idClient, idCar } = req.body;
        const datatoupdate: {StartDate?: Date,EndDate?: Date, idClient?: number, idCar?: number} = {};

        if(!StartDate && !EndDate && !idClient && !idCar){
            res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para atualização" });
            return;
        }

        if(StartDate !== undefined){
            if(isNaN(Date.parse(StartDate))){
                res.status(400).json({ message: "Data de início inválida" });
                return;
            }
            datatoupdate.StartDate = StartDate
        }

        if(EndDate !== undefined){
            if(isNaN(Date.parse(EndDate))){
                res.status(400).json({ message: "Data de início inválida" });
                return;
            }
            datatoupdate.EndDate = EndDate
        }

        if(idClient !== undefined){
            if(isNaN(Number(idClient)) || Number(idClient) <= 0){
                res.status(400).json({ message: "ID do cliente inválido" });
                return;
            }
            datatoupdate.idClient = idClient
        }

        if(idCar !== undefined){
            if(isNaN(Number(idCar)) || Number(idClient) <= 0){
                res.status(400).json({ message: "ID do carro inválido" });
                return;
            }
            datatoupdate.idCar = idCar
        }

        if(Object.keys(datatoupdate).length === 0){
            res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido." });
            return;
        }

        try{
            const updatedContract: Contract = await contractService.updateContract(id, datatoupdate);
            res
        }catch(error){
            res.status(404).json({ message: "Contrato não encontrado", error });

        }

    }

};

export default contractController;