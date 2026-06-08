import { Paciente, Sessao } from "../models";
import { validarCamposObrigatorios } from "../utils/validadores";

interface CriarSessaoDTO {
  dataSessao: Date;
  descricaoAtendimento: string;
  observacoesClinicas?: string;
  pacienteId: number;
  terapeutaId: number;
}

interface AtualizarSessaoDTO {
  dataSessao?: Date;
  descricaoAtendimento?: string;
  observacoesClinicas?: string;
}

export const criarSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  validarCamposObrigatorios({
    dataSessao: dados.dataSessao ? String(dados.dataSessao) : undefined,
    descricaoAtendimento: dados.descricaoAtendimento,
    pacienteId: dados.pacienteId ? String(dados.pacienteId) : undefined,
  });

  const paciente = await Paciente.findOne({
    where: {
      id: dados.pacienteId,
      terapeutaId: dados.terapeutaId,
    },
  });

  if (!paciente) {
    throw new Error("Paciente não encontrado");
  }

  return Sessao.create({
    dataSessao: dados.dataSessao,
    descricaoAtendimento: dados.descricaoAtendimento.trim(),
    observacoesClinicas: dados.observacoesClinicas?.trim(),
    pacienteId: dados.pacienteId,
  });
};

export const listarSessoesPorPaciente = async (
  pacienteId: number,
  terapeutaId: number
): Promise<Sessao[]> => {
  const paciente = await Paciente.findOne({
    where: {
      id: pacienteId,
      terapeutaId,
    },
  });

  if (!paciente) {
    throw new Error("Paciente não encontrado");
  }

  return Sessao.findAll({
    where: { pacienteId },
    order: [["dataSessao", "DESC"]],
  });
};

export const buscarSessaoPorId = async (
  id: number,
  terapeutaId: number
): Promise<Sessao | null> => {
  return Sessao.findOne({
    where: { id },
    include: [
      {
        model: Paciente,
        as: "paciente",
        where: { terapeutaId },
      },
    ],
  });
};

export const atualizarSessao = async (
  id: number,
  terapeutaId: number,
  dados: AtualizarSessaoDTO
): Promise<Sessao> => {
  const sessao = await buscarSessaoPorId(id, terapeutaId);

  if (!sessao) {
    throw new Error("Sessão não encontrada");
  }

  if (dados.dataSessao !== undefined) {
    validarCamposObrigatorios({
      dataSessao: dados.dataSessao ? String(dados.dataSessao) : undefined,
    });
  }

  if (dados.descricaoAtendimento !== undefined) {
    validarCamposObrigatorios({
      descricaoAtendimento: dados.descricaoAtendimento,
    });

    dados.descricaoAtendimento = dados.descricaoAtendimento.trim();
  }

  if (dados.observacoesClinicas !== undefined) {
    dados.observacoesClinicas = dados.observacoesClinicas.trim();
  }

  await sessao.update(dados);

  return sessao;
};

export const excluirSessao = async (
  id: number,
  terapeutaId: number
): Promise<void> => {
  const sessao = await buscarSessaoPorId(id, terapeutaId);

  if (!sessao) {
    throw new Error("Sessão não encontrada");
  }

  await sessao.destroy();
};