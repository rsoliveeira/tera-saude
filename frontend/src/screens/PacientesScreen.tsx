import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { excluirPaciente, listarPacientes } from "../services/pacienteService";
import { Paciente } from "../types/Paciente";
import { RootStackParamList } from "../types/navigation";
import { converterDataParaTela, formatarCpf } from "../utils/formatadores";

type Props = NativeStackScreenProps<RootStackParamList, "Pacientes">;

export default function PacientesScreen({ navigation }: Props) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregarPacientes = async () => {
    try {
      setCarregando(true);
      const dados = await listarPacientes();
      setPacientes(dados);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os pacientes");
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPacientes();
    }, [])
  );

  const confirmarExclusao = (id: number) => {
    Alert.alert("Excluir paciente", "Deseja realmente excluir este paciente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await excluirPaciente(id);
            await carregarPacientes();
          } catch {
            Alert.alert("Erro", "Não foi possível excluir o paciente");
          }
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Pacientes</Text>

      <Button
        title="Cadastrar paciente"
        onPress={() => navigation.navigate("FormPaciente", {})}
      />

      {carregando && <Text>Carregando...</Text>}

      <FlatList
        data={pacientes}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>Nenhum paciente cadastrado.</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 12,
              marginBottom: 10,
              gap: 6,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetalhesPaciente", {
                  pacienteId: item.id,
                })
              }
            >
              <Text>{item.nome}</Text>
              <Text>CPF: {formatarCpf(item.cpf)}</Text>
              <Text>Nascimento: {converterDataParaTela(item.dataNascimento)}</Text>
            </TouchableOpacity>

            <Button
              title="Editar"
              onPress={() =>
                navigation.navigate("FormPaciente", {
                  pacienteId: item.id,
                })
              }
            />

            <Button
              title="Excluir"
              onPress={() => confirmarExclusao(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}