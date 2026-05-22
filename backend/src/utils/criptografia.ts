import bcrypt from "bcrypt";

export const criptografarSenha = async (senha: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(senha, salt);
};

export const compararSenha = async (
  senha: string,
  senhaCriptografada: string
): Promise<boolean> => {
  return bcrypt.compare(senha, senhaCriptografada);
};