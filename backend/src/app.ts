import "dotenv/config";
import express from "express";
import cors from "cors";
import terapeutaRoutes from "./routes/terapeutaRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/terapeutas", terapeutaRoutes);
app.use("/pacientes", pacienteRoutes);

export default app;