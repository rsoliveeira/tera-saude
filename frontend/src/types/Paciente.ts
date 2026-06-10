export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone?: string;
  observacoes?: string;
}

export interface CriarPacienteDTO {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone?: string;
  observacoes?: string;
}

export interface AtualizarPacienteDTO {
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  telefone?: string;
  observacoes?: string;
}