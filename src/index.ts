import express from "express";

import ClienteRoutes from "./routes/clientRoutes";
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

app.use("/clientes/",ClienteRoutes);
app.use("/carros/", carsRoutes);
app.use("/contratos/", contractRouters)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
});
