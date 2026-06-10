import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  atualizarPaciente,
  buscarPacientePorId,
  criarPaciente,
} from "../services/pacienteService";
import { RootStackParamList } from "../types/navigation";

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
        setCpf(paciente.cpf);
        setDataNascimento(paciente.dataNascimento);
        setTelefone(paciente.telefone || "");
        setObservacoes(paciente.observacoes || "");
      } catch {
        Alert.alert("Erro", "Não foi possível carregar o paciente");
      }
    };

    carregarPaciente();
  }, [pacienteId]);

  const salvar = async () => {
    try {
      const dados = {
        nome,
        cpf,
        dataNascimento,
        telefone,
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
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o paciente");
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
        onChangeText={setCpf}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Data de nascimento: 2000-05-10"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
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