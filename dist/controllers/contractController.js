"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contractService_1 = __importDefault(require("../services/contractService"));
const contractController = {
    getContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = yield contractService_1.default.getContracts();
            res.status(200).json(contracts);
        });
    },
    getContractById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                res.status(400).json({ message: "ID inválido" });
                return;
            }
            const contract = yield contractService_1.default.getContractById(id);
            if (!contract) {
                res.status(404).json({ message: "Contrato não encontrado" });
                return;
            }
            res.status(200).json(contract);
        });
    },
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { StartDate, EndDate, idClient, idCar } = req.body;
            if (!StartDate || !EndDate || !idClient || !idCar) {
                res.status(400).json({ message: "Todos os campos são obrigatórios" });
                return;
            }
            try {
                const newContract = yield contractService_1.default.createContract({ StartDate: new Date(StartDate), EndDate: new Date(EndDate), idClient, idCar });
                res.status(201).json(newContract);
            }
            catch (error) {
                res.status(409).json({ message: "Erro ao criar contrato", error });
            }
        });
    },
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                res.status(400).json({ message: "ID inválido" });
                return;
            }
            try {
                yield contractService_1.default.deleteContract(id);
                res.status(200).json({ message: "Contrato deletado com sucesso" });
            }
            catch (error) {
                res.status(404).json({ message: "Contrato não encontrado", error });
            }
        });
    },
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                res.status(400).json({ message: "ID inválido" });
                return;
            }
            const { StartDate, EndDate, idClient, idCar } = req.body;
            const datatoupdate = {};
            if (!StartDate && !EndDate && !idClient && !idCar) {
                res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para atualização" });
                return;
            }
            if (StartDate !== undefined) {
                if (isNaN(Date.parse(StartDate))) {
                    res.status(400).json({ message: "Data de início inválida" });
                    return;
                }
                datatoupdate.StartDate = StartDate;
            }
            if (EndDate !== undefined) {
                if (isNaN(Date.parse(EndDate))) {
                    res.status(400).json({ message: "Data de início inválida" });
                    return;
                }
                datatoupdate.EndDate = EndDate;
            }
            if (idClient !== undefined) {
                if (isNaN(Number(idClient)) || Number(idClient) <= 0) {
                    res.status(400).json({ message: "ID do cliente inválido" });
                    return;
                }
                datatoupdate.idClient = idClient;
            }
            if (idCar !== undefined) {
                if (isNaN(Number(idCar)) || Number(idClient) <= 0) {
                    res.status(400).json({ message: "ID do carro inválido" });
                    return;
                }
                datatoupdate.idCar = idCar;
            }
            if (Object.keys(datatoupdate).length === 0) {
                res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido." });
                return;
            }
            try {
                const updatedContract = yield contractService_1.default.updateContract(id, datatoupdate);
                res;
            }
            catch (error) {
                res.status(404).json({ message: "Contrato não encontrado", error });
            }
        });
    }
};
exports.default = contractController;
