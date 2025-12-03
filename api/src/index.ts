import "dotenv/config";
import express from "express";
import cors from "cors";

import clienteRoutes from "./routes/clientRoutes";
import loginRoutes from "./routes/loginRoutes";
import carsRoutes from "./routes/carRoutes";
import contractRouters from "./routes/contractRoutes";
import DashboardRoutes from "./routes/dashBoardRoutes";
import { supabase } from "./supabase";
import cookieParser from "cookie-parser";

import YAML from "yaml";
import { readFileSync } from "fs";
import swaggerUi from "swagger-ui-express";

const file = readFileSync("swagger.json", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();
const port = 4647;

app.use(
  cors({
    origin: [ "https://locadora-veiculos-rgph.onrender.com", "http://localhost:3000" ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/clientes/", clienteRoutes);
app.use("/carros/", carsRoutes);
app.use("/contratos/", contractRouters);
app.use("/login/", loginRoutes);
app.use("/dashboard/", DashboardRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`A API subiu na porta ${port}`);
});
