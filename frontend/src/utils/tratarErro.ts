import axios from "axios";

export const tratarErro = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const mensagem = error.response?.data?.mensagem;

    if (mensagem) {
      return mensagem;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado";
};