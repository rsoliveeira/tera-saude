import { Terapeuta } from "../models";
import { compararSenha, criptografarSenha } from "../utils/criptografia";
import { gerarToken } from "../utils/jwt";
import {
  limparCpf,
  validarCamposObrigatorios,
  validarCpf,
  validarEmail,
} from "../utils/validadores";

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

export const cadastrarTerapeuta = async (dados: CadastroTerapeutaDTO) => {
  validarCamposObrigatorios({
    nome: dados.nome,
    email: dados.email,
    cpf: dados.cpf,
    senha: dados.senha,
  });

  validarEmail(dados.email);
  validarCpf(dados.cpf);

  const cpfLimpo = limparCpf(dados.cpf);

  const emailExistente = await Terapeuta.findOne({
    where: { email: dados.email.trim() },
  });

  if (emailExistente) {
    throw new Error("E-mail já cadastrado");
  }

  const cpfExistente = await Terapeuta.findOne({
    where: { cpf: cpfLimpo },
  });

  if (cpfExistente) {
    throw new Error("CPF já cadastrado");
  }

  const senhaCriptografada = await criptografarSenha(dados.senha);

  const terapeuta = await Terapeuta.create({
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    cpf: cpfLimpo,
    senha: senhaCriptografada,
  });

  return {
    id: terapeuta.id,
    nome: terapeuta.nome,
    email: terapeuta.email,
    cpf: terapeuta.cpf,
  };
};

export const loginTerapeuta = async (dados: LoginTerapeutaDTO) => {
  validarCamposObrigatorios({
    email: dados.email,
    senha: dados.senha,
  });

  validarEmail(dados.email);

  const terapeuta = await Terapeuta.findOne({
    where: { email: dados.email.trim() },
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
      cpf: terapeuta.cpf,
    },
  };
};