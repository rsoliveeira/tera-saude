import { Response } from "express";
import { AuthRequest } from "../types/authRequest";

import {
  atualizarPaciente,
  buscarPacientePorId,
  criarPaciente,
  excluirPaciente,
  listarPacientes,
} from "../services/pacienteService";

export const cadastrar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { nome, cpf, dataNascimento, telefone, observacoes } = req.body;

    const paciente = await criarPaciente({
      nome,
      cpf,
      dataNascimento,
      telefone,
      observacoes,
      terapeutaId: req.terapeuta!.id,
    });

    res.status(201).json({
      mensagem: "Paciente cadastrado com sucesso",
      paciente,
    });
  } catch (error) {
    res.status(400).json({
      mensagem:
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar paciente",
    });
  }
};

export const listar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const pacientes = await listarPacientes(req.terapeuta!.id);

    res.status(200).json(pacientes);
  } catch {
    res.status(500).json({
      mensagem: "Erro ao listar pacientes",
    });
  }
};

export const buscarPorId = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const paciente = await buscarPacientePorId(
      Number(req.params.id),
      req.terapeuta!.id
    );

    if (!paciente) {
      res.status(404).json({
        mensagem: "Paciente não encontrado",
      });
      return;
    }

    res.status(200).json(paciente);
  } catch {
    res.status(500).json({
      mensagem: "Erro ao buscar paciente",
    });
  }
};

export const atualizar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const paciente = await atualizarPaciente(
      Number(req.params.id),
      req.terapeuta!.id,
      req.body
    );

    res.status(200).json({
      mensagem: "Paciente atualizado com sucesso",
      paciente,
    });
  } catch (error) {
    res.status(404).json({
      mensagem:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar paciente",
    });
  }
};

export const excluir = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    await excluirPaciente(Number(req.params.id), req.terapeuta!.id);

    res.status(200).json({
      mensagem: "Paciente excluído com sucesso",
    });
  } catch (error) {
    res.status(404).json({
      mensagem:
        error instanceof Error
          ? error.message
          : "Erro ao excluir paciente",
    });
  }
};