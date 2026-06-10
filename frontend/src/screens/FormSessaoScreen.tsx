import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  atualizarSessao,
  buscarSessaoPorId,
  criarSessao,
} from "../services/sessaoService";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "FormSessao">;

export default function FormSessaoScreen({ navigation, route }: Props) {
  const { pacienteId, sessaoId } = route.params;

  const [dataSessao, setDataSessao] = useState("");
  const [descricaoAtendimento, setDescricaoAtendimento] = useState("");
  const [observacoesClinicas, setObservacoesClinicas] = useState("");

  useEffect(() => {
    const carregarSessao = async () => {
      if (!sessaoId) return;

      try {
        const sessao = await buscarSessaoPorId(sessaoId);

        setDataSessao(sessao.dataSessao);
        setDescricaoAtendimento(sessao.descricaoAtendimento);
        setObservacoesClinicas(sessao.observacoesClinicas || "");
      } catch {
        Alert.alert("Erro", "Não foi possível carregar a sessão");
      }
    };

    carregarSessao();
  }, [sessaoId]);

  const salvar = async () => {
    try {
      if (sessaoId) {
        await atualizarSessao(sessaoId, {
          dataSessao,
          descricaoAtendimento,
          observacoesClinicas,
        });

        Alert.alert("Sucesso", "Sessão atualizada com sucesso");
      } else {
        await criarSessao({
          dataSessao,
          descricaoAtendimento,
          observacoesClinicas,
          pacienteId,
        });

        Alert.alert("Sucesso", "Sessão cadastrada com sucesso");
      }

      navigation.navigate("DetalhesPaciente", { pacienteId });
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a sessão");
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>{sessaoId ? "Editar sessão" : "Cadastrar sessão"}</Text>

      <TextInput
        placeholder="Data da sessão: 2026-06-10"
        value={dataSessao}
        onChangeText={setDataSessao}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Descrição do atendimento"
        value={descricaoAtendimento}
        onChangeText={setDescricaoAtendimento}
        multiline
        style={{ borderWidth: 1, padding: 10, minHeight: 100 }}
      />

      <TextInput
        placeholder="Observações clínicas"
        value={observacoesClinicas}
        onChangeText={setObservacoesClinicas}
        multiline
        style={{ borderWidth: 1, padding: 10, minHeight: 80 }}
      />

      <Button title="Salvar" onPress={salvar} />

      <Button
        title="Cancelar"
        onPress={() => navigation.navigate("DetalhesPaciente", { pacienteId })}
      />
    </View>
  );
}