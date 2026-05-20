import { Router } from "express";

import {
  atualizar,
  buscarPorId,
  cadastrar,
  excluir,
  listarPorPaciente,
} from "../controllers/sessaoController";

import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.use(autenticar);

router.post("/", cadastrar);
router.get("/paciente/:pacienteId", listarPorPaciente);
router.get("/:id", buscarPorId);
router.put("/:id", atualizar);
router.delete("/:id", excluir);

export default router;