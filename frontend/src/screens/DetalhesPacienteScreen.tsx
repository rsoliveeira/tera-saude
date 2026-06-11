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

import { buscarPacientePorId } from "../services/pacienteService";
import {
  excluirSessao,
  listarSessoesPorPaciente,
} from "../services/sessaoService";

import { Paciente } from "../types/Paciente";
import { Sessao } from "../types/Sessao";
import { RootStackParamList } from "../types/navigation";

import {
  converterDataParaTela,
  formatarCpf,
  formatarTelefone,
} from "../utils/formatadores";

import { tratarErro } from "../utils/tratarErro";

type Props = NativeStackScreenProps<RootStackParamList, "DetalhesPaciente">;

export default function DetalhesPacienteScreen({ navigation, route }: Props) {
  const { pacienteId } = route.params;

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregarDados = async () => {
    try {
      setCarregando(true);

      const pacienteEncontrado = await buscarPacientePorId(pacienteId);
      const sessoesEncontradas = await listarSessoesPorPaciente(pacienteId);

      setPaciente(pacienteEncontrado);
      setSessoes(sessoesEncontradas);
    } catch (error) {
      Alert.alert("Erro", tratarErro(error));
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [pacienteId])
  );

  const confirmarExclusaoSessao = (sessaoId: number) => {
    Alert.alert("Excluir sessão", "Deseja realmente excluir esta sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await excluirSessao(sessaoId);
            await carregarDados();
          } catch (error) {
            Alert.alert("Erro", tratarErro(error));
          }
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Detalhes do Paciente</Text>

      {carregando && <Text>Carregando...</Text>}

      {paciente && (
        <View style={{ borderWidth: 1, padding: 12, gap: 6 }}>
          <Text>Nome: {paciente.nome}</Text>
          <Text>CPF: {formatarCpf(paciente.cpf)}</Text>
          <Text>Nascimento: {converterDataParaTela(paciente.dataNascimento)}</Text>
          <Text>
            Telefone:{" "}
            {paciente.telefone ? formatarTelefone(paciente.telefone) : "Não informado"}
          </Text>
          <Text>Observações: {paciente.observacoes || "Não informado"}</Text>
        </View>
      )}

      <Button
        title="Nova sessão"
        onPress={() =>
          navigation.navigate("FormSessao", {
            pacienteId,
          })
        }
      />

      <Text>Sessões</Text>

      <FlatList
        data={sessoes}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>Nenhuma sessão cadastrada.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FormSessao", {
                pacienteId,
                sessaoId: item.id,
              })
            }
          >
            <View
              style={{
                borderWidth: 1,
                padding: 12,
                marginBottom: 10,
                gap: 6,
              }}
            >
              <Text>Data: {converterDataParaTela(item.dataSessao)}</Text>
              <Text>Descrição: {item.descricaoAtendimento}</Text>
              <Text>
                Observações: {item.observacoesClinicas || "Não informado"}
              </Text>

              <Button
                title="Excluir sessão"
                onPress={() => confirmarExclusaoSessao(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <Button title="Voltar" onPress={() => navigation.navigate("Pacientes")} />
    </View>
  );
}