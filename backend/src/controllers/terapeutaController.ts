import { Request, Response } from "express";
import {
  cadastrarTerapeuta,
  loginTerapeuta,
} from "../services/terapeutaService";

export const cadastrar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ mensagem: "Preencha todos os campos" });
      return;
    }

    const terapeuta = await cadastrarTerapeuta({ nome, email, senha });

    res.status(201).json({
      mensagem: "Terapeuta cadastrado com sucesso",
      terapeuta,
    });
  } catch (error) {
    res.status(400).json({
      mensagem: error instanceof Error ? error.message : "Erro ao cadastrar",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ mensagem: "Informe e-mail e senha" });
      return;
    }

    const resultado = await loginTerapeuta({ email, senha });

    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({
      mensagem: error instanceof Error ? error.message : "Erro ao fazer login",
    });
  }
};