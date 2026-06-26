import {
  cadastrarTerapeuta,
  loginTerapeuta,
} from "../../src/services/terapeutaService";

import { Terapeuta } from "../../src/models";
import { compararSenha, criptografarSenha } from "../../src/utils/criptografia";
import { gerarToken } from "../../src/utils/jwt";

jest.mock("../../src/models", () => ({
  Terapeuta: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../src/utils/criptografia", () => ({
  criptografarSenha: jest.fn(),
  compararSenha: jest.fn(),
}));

jest.mock("../../src/utils/jwt", () => ({
  gerarToken: jest.fn(),
}));

describe("TerapeutaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve cadastrar um terapeuta quando os dados forem válidos", async () => {
    const dadosTerapeuta = {
      nome: " Ana Souza ",
      email: "ana@email.com",
      cpf: "120.040.999-09",
      senha: "123456",
    };

    const terapeutaCriado = {
      id: 1,
      nome: "Ana Souza",
      email: "ana@email.com",
      cpf: "12004099909",
      senha: "senhaCriptografada",
    };

    (Terapeuta.findOne as jest.Mock)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    (criptografarSenha as jest.Mock).mockResolvedValue("senhaCriptografada");
    (Terapeuta.create as jest.Mock).mockResolvedValue(terapeutaCriado);

    const resultado = await cadastrarTerapeuta(dadosTerapeuta);

    expect(Terapeuta.findOne).toHaveBeenCalledWith({
      where: { email: "ana@email.com" },
    });

    expect(Terapeuta.findOne).toHaveBeenCalledWith({
      where: { cpf: "12004099909" },
    });

    expect(Terapeuta.create).toHaveBeenCalledWith({
      nome: "Ana Souza",
      email: "ana@email.com",
      cpf: "12004099909",
      senha: "senhaCriptografada",
    });

    expect(resultado).toEqual({
      id: 1,
      nome: "Ana Souza",
      email: "ana@email.com",
      cpf: "12004099909",
    });
  });

  it("deve lançar erro quando o e-mail já estiver cadastrado", async () => {
    const dadosTerapeuta = {
      nome: "Ana Souza",
      email: "ana@email.com",
      cpf: "120.040.999-09",
      senha: "123456",
    };

    (Terapeuta.findOne as jest.Mock).mockResolvedValueOnce({
      id: 1,
      email: "ana@email.com",
    });

    await expect(cadastrarTerapeuta(dadosTerapeuta)).rejects.toThrow(
      "E-mail já cadastrado",
    );

    expect(criptografarSenha).not.toHaveBeenCalled();
    expect(Terapeuta.create).not.toHaveBeenCalled();
  });

  it("deve lançar erro ao tentar login com senha inválida", async () => {
    const dadosLogin = {
      email: "ana@email.com",
      senha: "senhaErrada",
    };

    const terapeutaEncontrado = {
      id: 1,
      nome: "Ana Souza",
      email: "ana@email.com",
      cpf: "12004099909",
      senha: "senhaCriptografada",
    };

    (Terapeuta.findOne as jest.Mock).mockResolvedValue(terapeutaEncontrado);
    (compararSenha as jest.Mock).mockResolvedValue(false);

    await expect(loginTerapeuta(dadosLogin)).rejects.toThrow(
      "E-mail ou senha inválidos",
    );

    expect(gerarToken).not.toHaveBeenCalled();
  });
});
