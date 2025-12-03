"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const contractRoutes_1 = __importDefault(require("./routes/contractRoutes"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = require("fs");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const file = (0, fs_1.readFileSync)("swagger.json", "utf8");
const swaggerDocument = yaml_1.default.parse(file);
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/clientes/", clientRoutes_1.default);
app.use("/carros/", carRoutes_1.default);
app.use("/contratos/", contractRoutes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
});
