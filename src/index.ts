import express from "express";
import clienteRoutes from "./routes/clientRoutes";
import carsRoutes from "./routes/carRoutes";
import contractRouters from "./routes/contractRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clientes/", clienteRoutes);
app.use("/carros/", carsRoutes);
app.use("/contratos/", contractRouters)

app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
});
