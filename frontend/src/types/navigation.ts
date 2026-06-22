export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Pacientes: undefined;
  Perfil: undefined;
  FormPaciente: {
    pacienteId?: number;
  };
  DetalhesPaciente: {
    pacienteId: number;
  };
  FormSessao: {
    pacienteId: number;
    sessaoId?: number;
  };
};