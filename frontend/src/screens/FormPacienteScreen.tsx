import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  atualizarPaciente,
  buscarPacientePorId,
  criarPaciente,
} from "../services/pacienteService";
import { RootStackParamList } from "../types/navigation";

import {
  converterDataParaApi,
  converterDataParaTela,
  formatarCpf,
  formatarData,
  formatarTelefone,
  limparMascara,
  validarDataBrasileira,
  validarTelefoneBrasileiro,
} from "../utils/formatadores";

import { tratarErro } from "../utils/tratarErro";

type Props = NativeStackScreenProps<RootStackParamList, "FormPaciente">;

export default function FormPacienteScreen({ navigation, route }: Props) {
  const pacienteId = route.params?.pacienteId;

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    const carregarPaciente = async () => {
      if (!pacienteId) return;

      try {
        const paciente = await buscarPacientePorId(pacienteId);

        setNome(paciente.nome);
        setCpf(formatarCpf(paciente.cpf));
        setDataNascimento(converterDataParaTela(paciente.dataNascimento));
        setTelefone(formatarTelefone(paciente.telefone || ""));
        setObservacoes(paciente.observacoes || "");
      } catch {
        Alert.alert("Erro", "Não foi possível carregar o paciente");
      }
    };

    carregarPaciente();
  }, [pacienteId]);

  const salvar = async () => {
    try {
      if (!validarDataBrasileira(dataNascimento)) {
        Alert.alert("Erro", "Data de nascimento inválida");
        return;
      }

      if (telefone && !validarTelefoneBrasileiro(telefone)) {
        Alert.alert("Erro", "Telefone inválido");
        return;
      }

      const dados = {
        nome,
        cpf: limparMascara(cpf),
        dataNascimento: converterDataParaApi(dataNascimento),
        telefone: telefone ? limparMascara(telefone) : "",
        observacoes,
      };

      if (pacienteId) {
        await atualizarPaciente(pacienteId, dados);
        Alert.alert("Sucesso", "Paciente atualizado com sucesso");
      } else {
        await criarPaciente(dados);
        Alert.alert("Sucesso", "Paciente cadastrado com sucesso");
      }

      navigation.navigate("Pacientes");
    } catch (error) {
      Alert.alert("Erro", tratarErro(error));
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>{pacienteId ? "Editar paciente" : "Cadastrar paciente"}</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={(texto) => setCpf(formatarCpf(texto))}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Data de nascimento: 10/05/2000"
        value={dataNascimento}
        onChangeText={(texto) => setDataNascimento(formatarData(texto))}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        style={{ borderWidth: 1, padding: 10, minHeight: 80 }}
      />

      <Button title="Salvar" onPress={salvar} />

      <Button title="Cancelar" onPress={() => navigation.navigate("Pacientes")} />
    </View>
  );
}