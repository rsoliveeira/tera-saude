import { Router } from "express";

import {
  atualizar,
  buscarPorId,
  cadastrar,
  excluir,
  listar,
} from "../controllers/pacienteController";

import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.use(autenticar);

router.post("/", cadastrar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.put("/:id", atualizar);
router.delete("/:id", excluir);

export default router;