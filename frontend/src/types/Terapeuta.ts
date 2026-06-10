export interface Terapeuta {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

export interface LoginResponse {
  token: string;
  terapeuta: Terapeuta;
}