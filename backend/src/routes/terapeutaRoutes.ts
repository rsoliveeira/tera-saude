import { Router } from "express";
import { cadastrar, login } from "../controllers/terapeutaController";

const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", login);

export default router;