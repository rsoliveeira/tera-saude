export interface Sessao {
  id: number;
  dataSessao: string;
  descricaoAtendimento: string;
  observacoesClinicas?: string;
  pacienteId: number;
}

export interface CriarSessaoDTO {
  dataSessao: string;
  descricaoAtendimento: string;
  observacoesClinicas?: string;
  pacienteId: number;
}

export interface AtualizarSessaoDTO {
  dataSessao?: string;
  descricaoAtendimento?: string;
  observacoesClinicas?: string;
}