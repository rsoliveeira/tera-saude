import "dotenv/config";
import express from "express";
import cors from "cors";
import terapeutaRoutes from "./routes/terapeutaRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/terapeutas", terapeutaRoutes);

export default app;