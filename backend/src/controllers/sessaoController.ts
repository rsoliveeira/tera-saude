import { Response } from "express";
import { AuthRequest } from "../types/authRequest";

import {
  atualizarSessao,
  buscarSessaoPorId,
  criarSessao,
  excluirSessao,
  listarSessoesPorPaciente,
} from "../services/sessaoService";

export const cadastrar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { dataSessao, descricaoAtendimento, observacoesClinicas, pacienteId } =
      req.body;

    const sessao = await criarSessao({
      dataSessao,
      descricaoAtendimento,
      observacoesClinicas,
      pacienteId,
      terapeutaId: req.terapeuta!.id,
    });

    res.status(201).json({
      mensagem: "Sessão cadastrada com sucesso",
      sessao,
    });
  } catch (error) {
    res.status(400).json({
      mensagem:
        error instanceof Error ? error.message : "Erro ao cadastrar sessão",
    });
  }
};

export const listarPorPaciente = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const sessoes = await listarSessoesPorPaciente(
      Number(req.params.pacienteId),
      req.terapeuta!.id
    );

    res.status(200).json(sessoes);
  } catch (error) {
    res.status(404).json({
      mensagem:
        error instanceof Error ? error.message : "Erro ao listar sessões",
    });
  }
};

export const buscarPorId = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const sessao = await buscarSessaoPorId(
      Number(req.params.id),
      req.terapeuta!.id
    );

    if (!sessao) {
      res.status(404).json({ mensagem: "Sessão não encontrada" });
      return;
    }

    res.status(200).json(sessao);
  } catch {
    res.status(500).json({
      mensagem: "Erro ao buscar sessão",
    });
  }
};

export const atualizar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const sessao = await atualizarSessao(
      Number(req.params.id),
      req.terapeuta!.id,
      req.body
    );

    res.status(200).json({
      mensagem: "Sessão atualizada com sucesso",
      sessao,
    });
  } catch (error) {
    res.status(404).json({
      mensagem:
        error instanceof Error ? error.message : "Erro ao atualizar sessão",
    });
  }
};

export const excluir = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    await excluirSessao(Number(req.params.id), req.terapeuta!.id);

    res.status(200).json({
      mensagem: "Sessão excluída com sucesso",
    });
  } catch (error) {
    res.status(404).json({
      mensagem:
        error instanceof Error ? error.message : "Erro ao excluir sessão",
    });
  }
};