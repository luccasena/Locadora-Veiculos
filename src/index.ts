import express from "express";
import ClienteRoutes from "./routes/clienteRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clientes/",ClienteRoutes);

app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
});
