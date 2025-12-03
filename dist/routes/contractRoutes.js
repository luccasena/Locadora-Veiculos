"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contractController_1 = __importDefault(require("../controllers/contractController"));
const router = (0, express_1.Router)();
router.get("/", contractController_1.default.getContracts);
router.get("/:id", contractController_1.default.getContractById);
router.post("/", contractController_1.default.createContract);
router.delete("/:id", contractController_1.default.deleteContract);
router.put("/:id", contractController_1.default.updateContract);
exports.default = router;
