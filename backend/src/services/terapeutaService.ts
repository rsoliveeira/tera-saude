import { Terapeuta } from "../models";
import { compararSenha, criptografarSenha } from "../utils/criptografia";
import { gerarToken } from "../utils/jwt";

interface CadastroTerapeutaDTO {
  nome: string;
  email: string;
  senha: string;
}

interface LoginTerapeutaDTO {
  email: string;
  senha: string;
}

export const cadastrarTerapeuta = async (dados: CadastroTerapeutaDTO) => {
  const terapeutaExistente = await Terapeuta.findOne({
    where: { email: dados.email },
  });

  if (terapeutaExistente) {
    throw new Error("E-mail já cadastrado");
  }

  const senhaCriptografada = await criptografarSenha(dados.senha);

  const terapeuta = await Terapeuta.create({
    nome: dados.nome,
    email: dados.email,
    senha: senhaCriptografada,
  });

  return {
    id: terapeuta.id,
    nome: terapeuta.nome,
    email: terapeuta.email,
  };
};

export const loginTerapeuta = async (dados: LoginTerapeutaDTO) => {
  const terapeuta = await Terapeuta.findOne({
    where: { email: dados.email },
  });

  if (!terapeuta) {
    throw new Error("E-mail ou senha inválidos");
  }

  const senhaValida = await compararSenha(dados.senha, terapeuta.senha);

  if (!senhaValida) {
    throw new Error("E-mail ou senha inválidos");
  }

  const token = gerarToken({
    id: terapeuta.id,
    email: terapeuta.email,
  });

  return {
    token,
    terapeuta: {
      id: terapeuta.id,
      nome: terapeuta.nome,
      email: terapeuta.email,
    },
  };
};