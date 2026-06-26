import { criarSessao } from "../../src/services/sessaoService";
import { Paciente, Sessao } from "../../src/models";

jest.mock("../../src/models", () => ({
  Paciente: {
    findOne: jest.fn(),
  },
  Sessao: {
    create: jest.fn(),
  },
}));

describe("SessaoService - criarSessao", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma sessão quando o paciente existir", async () => {
    const dadosSessao = {
      dataSessao: new Date("2026-06-23"),
      descricaoAtendimento: " Atendimento inicial ",
      observacoesClinicas: " Paciente respondeu bem ",
      pacienteId: 1,
      terapeutaId: 1,
    };

    const pacienteEncontrado = {
      id: 1,
      terapeutaId: 1,
    };

    const sessaoCriada = {
      id: 1,
      dataSessao: dadosSessao.dataSessao,
      descricaoAtendimento: "Atendimento inicial",
      observacoesClinicas: "Paciente respondeu bem",
      pacienteId: 1,
    };

    (Paciente.findOne as jest.Mock).mockResolvedValue(pacienteEncontrado);
    (Sessao.create as jest.Mock).mockResolvedValue(sessaoCriada);

    const resultado = await criarSessao(dadosSessao);

    expect(Paciente.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
        terapeutaId: 1,
      },
    });

    expect(Sessao.create).toHaveBeenCalledWith({
      dataSessao: dadosSessao.dataSessao,
      descricaoAtendimento: "Atendimento inicial",
      observacoesClinicas: "Paciente respondeu bem",
      pacienteId: 1,
    });

    expect(resultado).toEqual(sessaoCriada);
  });

  it("deve lançar erro quando o paciente não existir", async () => {
    const dadosSessao = {
      dataSessao: new Date("2026-06-23"),
      descricaoAtendimento: "Atendimento inicial",
      pacienteId: 999,
      terapeutaId: 1,
    };

    (Paciente.findOne as jest.Mock).mockResolvedValue(null);

    await expect(criarSessao(dadosSessao)).rejects.toThrow(
      "Paciente não encontrado",
    );

    expect(Sessao.create).not.toHaveBeenCalled();
  });
});
