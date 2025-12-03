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
const clientService = {
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.client.findUnique({ where: { id } });
        });
    },
    getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.client.findMany();
        });
    },
    CreateClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = data;
            const novocliente = yield prisma_1.default.client.create({ data: body });
            if (novocliente) {
                return novocliente;
            }
            return novocliente;
        });
    },
    DeleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield prisma_1.default.client.findUnique({ where: { id: id } });
            if (!cliente) {
                return false;
            }
            ;
            const deleteClient = yield prisma_1.default.client.delete({ where: { id } });
            return true;
        });
    },
    UpdateClient(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = data;
            const updatedClient = yield prisma_1.default.client.update({
                where: { id: id },
                data: body,
            });
            return updatedClient;
        });
    },
};
exports.default = clientService;
