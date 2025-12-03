"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = __importDefault(require("../controllers/clientController"));
const router = (0, express_1.Router)();
router.get("/:id", clientController_1.default.getClientById);
router.get("/", clientController_1.default.GetAllClient);
router.post("/", clientController_1.default.CreateClient);
router.delete("/:id", clientController_1.default.DeleteClient);
router.put("/:id", clientController_1.default.UpdateClient);
exports.default = router;
