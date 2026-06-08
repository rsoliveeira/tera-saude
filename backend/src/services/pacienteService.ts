import { Paciente } from "../models";
import {
  limparCpf,
  validarCamposObrigatorios,
  validarCpf,
} from "../utils/validadores";

interface CriarPacienteDTO {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone?: string;
  observacoes?: string;
  terapeutaId: number;
}

interface AtualizarPacienteDTO {
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  telefone?: string;
  observacoes?: string;
}

const buscarPacientePorCpfETerapeuta = async (
  cpf: string,
  terapeutaId: number
): Promise<Paciente | null> => {
  return Paciente.findOne({
    where: {
      cpf,
      terapeutaId,
    },
  });
};

export const criarPaciente = async (
  dados: CriarPacienteDTO
): Promise<Paciente> => {
  validarCamposObrigatorios({
    nome: dados.nome,
    cpf: dados.cpf,
    dataNascimento: dados.dataNascimento,
  });

  validarCpf(dados.cpf);

  const cpfLimpo = limparCpf(dados.cpf);

  const pacienteExistente = await buscarPacientePorCpfETerapeuta(
    cpfLimpo,
    dados.terapeutaId
  );

  if (pacienteExistente) {
    throw new Error("Paciente já cadastrado com este CPF");
  }

  return Paciente.create({
    nome: dados.nome.trim(),
    cpf: cpfLimpo,
    dataNascimento: dados.dataNascimento,
    telefone: dados.telefone?.trim(),
    observacoes: dados.observacoes?.trim(),
    terapeutaId: dados.terapeutaId,
  });
};

export const listarPacientes = async (
  terapeutaId: number
): Promise<Paciente[]> => {
  return Paciente.findAll({
    where: { terapeutaId },
    order: [["createdAt", "DESC"]],
  });
};

export const buscarPacientePorId = async (
  id: number,
  terapeutaId: number
): Promise<Paciente | null> => {
  return Paciente.findOne({
    where: {
      id,
      terapeutaId,
    },
  });
};

export const atualizarPaciente = async (
  id: number,
  terapeutaId: number,
  dados: AtualizarPacienteDTO
): Promise<Paciente> => {
  const paciente = await buscarPacientePorId(id, terapeutaId);

  if (!paciente) {
    throw new Error("Paciente não encontrado");
  }

  if (dados.nome !== undefined) {
    validarCamposObrigatorios({ nome: dados.nome });
    dados.nome = dados.nome.trim();
  }

  if (dados.cpf !== undefined) {
    validarCamposObrigatorios({ cpf: dados.cpf });
    validarCpf(dados.cpf);

    const cpfLimpo = limparCpf(dados.cpf);

    const pacienteComMesmoCpf = await buscarPacientePorCpfETerapeuta(
      cpfLimpo,
      terapeutaId
    );

    if (pacienteComMesmoCpf && pacienteComMesmoCpf.id !== paciente.id) {
      throw new Error("Paciente já cadastrado com este CPF");
    }

    dados.cpf = cpfLimpo;
  }

  if (dados.dataNascimento !== undefined) {
    validarCamposObrigatorios({
      dataNascimento: dados.dataNascimento,
    });
  }

  if (dados.telefone !== undefined) {
    dados.telefone = dados.telefone.trim();
  }

  if (dados.observacoes !== undefined) {
    dados.observacoes = dados.observacoes.trim();
  }

  await paciente.update(dados);

  return paciente;
};

export const excluirPaciente = async (
  id: number,
  terapeutaId: number
): Promise<void> => {
  const paciente = await buscarPacientePorId(id, terapeutaId);

  if (!paciente) {
    throw new Error("Paciente não encontrado");
  }

  await paciente.destroy();
};