import { criarPaciente } from "../../src/services/pacienteService";
import { Paciente } from "../../src/models";

jest.mock("../../src/models", () => ({
  Paciente: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("PacienteService - criarPaciente", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um paciente quando os dados forem válidos", async () => {
    const dadosPaciente = {
      nome: " Maria Silva ",
      cpf: "120.040.999-09",
      dataNascimento: "1995-05-10",
      telefone: " 44999999999 ",
      observacoes: " Primeira consulta ",
      terapeutaId: 1,
    };

    const pacienteCriado = {
      id: 1,
      nome: "Maria Silva",
      cpf: "12004099909",
      dataNascimento: "1995-05-10",
      telefone: "44999999999",
      observacoes: "Primeira consulta",
      terapeutaId: 1,
    };

    (Paciente.findOne as jest.Mock).mockResolvedValue(null);
    (Paciente.create as jest.Mock).mockResolvedValue(pacienteCriado);

    const resultado = await criarPaciente(dadosPaciente);

    expect(Paciente.findOne).toHaveBeenCalledWith({
      where: {
        cpf: "12004099909",
        terapeutaId: 1,
      },
    });

    expect(Paciente.create).toHaveBeenCalledWith({
      nome: "Maria Silva",
      cpf: "12004099909",
      dataNascimento: "1995-05-10",
      telefone: "44999999999",
      observacoes: "Primeira consulta",
      terapeutaId: 1,
    });

    expect(resultado).toEqual(pacienteCriado);
  });

  it("deve lançar erro quando o CPF for inválido", async () => {
    const dadosPaciente = {
      nome: "Maria Silva",
      cpf: "123.456.789-00",
      dataNascimento: "1995-05-10",
      terapeutaId: 1,
    };

    await expect(criarPaciente(dadosPaciente)).rejects.toThrow();
    expect(Paciente.create).not.toHaveBeenCalled();
  });

  it("deve lançar erro quando já existir paciente com o mesmo CPF", async () => {
    const dadosPaciente = {
      nome: "Maria Silva",
      cpf: "120.040.999-09",
      dataNascimento: "1995-05-10",
      terapeutaId: 1,
    };

    (Paciente.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      cpf: "12004099909",
      terapeutaId: 1,
    });

    await expect(criarPaciente(dadosPaciente)).rejects.toThrow(
      "Paciente já cadastrado com este CPF",
    );

    expect(Paciente.create).not.toHaveBeenCalled();
  });
});
