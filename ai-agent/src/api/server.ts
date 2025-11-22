import express from "express";

import aiRoute from "./routes/aiRoute";
import { ENV } from "../config/env";
import ragRoute from "./routes/ragRoute";

const app = express();

app.use(express.json());

app.use("/ai-route", aiRoute);
app.use("/rag-route", ragRoute);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});