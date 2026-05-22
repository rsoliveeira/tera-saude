import { NextFunction, Response } from "express";
import { verificarToken } from "../utils/jwt";
import { AuthRequest } from "../types/authRequest";

export const autenticar = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ mensagem: "Token não informado" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const terapeuta = verificarToken(token);
    req.terapeuta = terapeuta;
    next();
  } catch {
    res.status(401).json({ mensagem: "Token inválido" });
  }
};