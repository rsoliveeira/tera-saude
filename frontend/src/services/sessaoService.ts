import api from "./api";
import {
  AtualizarSessaoDTO,
  CriarSessaoDTO,
  Sessao,
} from "../types/Sessao";

export const listarSessoesPorPaciente = async (
  pacienteId: number
): Promise<Sessao[]> => {
  const response = await api.get<Sessao[]>(`/sessoes/paciente/${pacienteId}`);
  return response.data;
};

export const buscarSessaoPorId = async (id: number): Promise<Sessao> => {
  const response = await api.get<Sessao>(`/sessoes/${id}`);
  return response.data;
};

export const criarSessao = async (
  dados: CriarSessaoDTO
): Promise<Sessao> => {
  const response = await api.post<{ sessao: Sessao }>("/sessoes", dados);
  return response.data.sessao;
};

export const atualizarSessao = async (
  id: number,
  dados: AtualizarSessaoDTO
): Promise<Sessao> => {
  const response = await api.put<{ sessao: Sessao }>(`/sessoes/${id}`, dados);
  return response.data.sessao;
};

export const excluirSessao = async (id: number): Promise<void> => {
  await api.delete(`/sessoes/${id}`);
};