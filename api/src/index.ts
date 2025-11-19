import express from "express";

import clienteRoutes from "./routes/clientRoutes";
import loginRoutes from "./routes/loginRoutes";
import carsRoutes from "./routes/carRoutes";
import contractRouters from "./routes/contractRoutes";

import YAML from "yaml";
import { readFileSync } from "fs";
import swaggerUi from "swagger-ui-express";

const file = readFileSync("swagger.json", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clientes/",clienteRoutes);
app.use("/carros/", carsRoutes);
app.use("/contratos/", contractRouters);
app.use("/login/", loginRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
});
