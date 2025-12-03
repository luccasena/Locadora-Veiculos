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
const carService_1 = __importDefault(require("../services/carService"));
const carsController = {
    createCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carData = req.body;
            const newCar = yield carService_1.default.createCar(carData);
            res.status(201).json(newCar);
        });
    },
    getCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield carService_1.default.getCar();
            res.status(200).json(cars);
        });
    },
    getCarsId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const car = yield carService_1.default.getCarId(id);
            if (!car) {
                res.status(404).json({ message: "Carro não encontrado" });
                return;
            }
            res.status(200).json(car);
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const carData = req.body;
            const carExists = yield carService_1.default.getCarId(id);
            if (!carExists) {
                res.status(404).json({ message: "Carro não encontrado para atualização." });
                return;
            }
            const updatedCar = yield carService_1.default.updateCar(id, carData);
            res.status(200).json({ message: "Carro atualizado com sucesso!", car: updatedCar });
        });
    },
    deleteCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const carExists = yield carService_1.default.getCarId(id);
            if (!carExists) {
                res.status(404).json({ message: "Carro não encontrado para exclusão." });
                return;
            }
            yield carService_1.default.deleteCar(id);
            res.status(200).json({ message: "Carro excluído com sucesso!" });
        });
    },
};
exports.default = carsController;
