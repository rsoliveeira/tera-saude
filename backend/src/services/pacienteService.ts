import { Paciente } from "../models";

interface CriarPacienteDTO {
  nome: string;
  dataNascimento: Date;
  telefone?: string;
  observacoes?: string;
  terapeutaId: number;
}

interface AtualizarPacienteDTO {
  nome?: string;
  dataNascimento?: Date;
  telefone?: string;
  observacoes?: string;
}

export const criarPaciente = async (
  dados: CriarPacienteDTO
): Promise<Paciente> => {
  return Paciente.create(dados);
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