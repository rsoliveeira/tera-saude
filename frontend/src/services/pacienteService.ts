import api from "./api";
import {
  AtualizarPacienteDTO,
  CriarPacienteDTO,
  Paciente,
} from "../types/Paciente";

export const listarPacientes = async (): Promise<Paciente[]> => {
  const response = await api.get<Paciente[]>("/pacientes");
  return response.data;
};

export const buscarPacientePorId = async (
  id: number
): Promise<Paciente> => {
  const response = await api.get<Paciente>(`/pacientes/${id}`);
  return response.data;
};

export const criarPaciente = async (
  dados: CriarPacienteDTO
): Promise<Paciente> => {
  const response = await api.post<{ paciente: Paciente }>("/pacientes", dados);
  return response.data.paciente;
};

export const atualizarPaciente = async (
  id: number,
  dados: AtualizarPacienteDTO
): Promise<Paciente> => {
  const response = await api.put<{ paciente: Paciente }>(
    `/pacientes/${id}`,
    dados
  );

  return response.data.paciente;
};

export const excluirPaciente = async (id: number): Promise<void> => {
  await api.delete(`/pacientes/${id}`);
};