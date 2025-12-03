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
const prisma_1 = __importDefault(require("../db/prisma"));
const clientService_1 = __importDefault(require("../services/clientService"));
const clientController = {
    getClientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield clientService_1.default.getClientById(parseInt(req.params.id));
            if (!client) {
                res.status(404).json({ message: "Cliente não encontrado" });
            }
            res.status(200).json(client);
        });
    },
    GetAllClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield clientService_1.default.getAllClients();
            res.status(200).json(client);
        });
    },
    CreateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (body.email == undefined) {
                res.status(400).json({ message: "Campo Email tem que ser inserido" });
            }
            else if (body.name == undefined) {
                res.status(400).json({ message: "Campo name tem que ser inserido" });
            }
            const client = yield clientService_1.default.CreateClient(body);
            if (client) {
                res.status(201).json({ message: "Cliente adicionado com sucesso!", cliente: client });
            }
            res.status(400).json({ message: "Algo deu errado durante a criacao do cliente" });
        });
    },
    DeleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const deletedClient = yield clientService_1.default.DeleteClient(id);
            if (deletedClient) {
                res.status(200).json({ message: "Usuário excluído!" });
            }
            ;
            res.status(400).json({ message: "Usuário excluído!" });
        });
    },
    UpdateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const client = yield prisma_1.default.client.findUnique({ where: { id: id } });
            if (!client) {
                res.status(404).json({ message: "Id  inválido ou não existe!" });
            }
            ;
            const body = req.body;
            const updatedClient = yield clientService_1.default.UpdateClient(id, body);
            if (updatedClient) {
                res.status(200).json({ message: "Cliente atualizado com sucesso!", client: updatedClient });
            }
            res.status(400).json({ message: "Algo deu errado durante a atualizacao dos dados do cliente" });
        });
    },
};
exports.default = clientController;
