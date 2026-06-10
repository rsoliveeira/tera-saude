import api from "./api";
import { LoginResponse } from "../types/Terapeuta";

interface CadastroTerapeutaDTO {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

interface LoginTerapeutaDTO {
  email: string;
  senha: string;
}

export const cadastrarTerapeuta = async (
  dados: CadastroTerapeutaDTO
): Promise<void> => {
  await api.post("/terapeutas/cadastro", dados);
};

export const loginTerapeuta = async (
  dados: LoginTerapeutaDTO
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/terapeutas/login", dados);
  return response.data;
};