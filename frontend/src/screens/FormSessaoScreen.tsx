import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Botao from "../components/Botao";
import Cabecalho from "../components/Cabecalho";
import CampoTexto from "../components/CampoTexto";
import Card from "../components/Card";

import {
  atualizarSessao,
  buscarSessaoPorId,
  criarSessao,
} from "../services/sessaoService";
import { RootStackParamList } from "../types/navigation";
import {
  converterDataParaApi,
  converterDataParaTela,
  formatarData,
  validarDataBrasileira,
} from "../utils/formatadores";
import { tratarErro } from "../utils/tratarErro";

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

        setDataSessao(converterDataParaTela(sessao.dataSessao));
        setDescricaoAtendimento(sessao.descricaoAtendimento);
        setObservacoesClinicas(sessao.observacoesClinicas || "");
      } catch (error) {
        Alert.alert("Erro", tratarErro(error));
      }
    };

    carregarSessao();
  }, [sessaoId]);

  const salvar = async () => {
    try {
      if (!validarDataBrasileira(dataSessao)) {
        Alert.alert("Erro", "Data da sessão inválida");
        return;
      }

      if (sessaoId) {
        await atualizarSessao(sessaoId, {
          dataSessao: converterDataParaApi(dataSessao),
          descricaoAtendimento,
          observacoesClinicas,
        });

        Alert.alert("Sucesso", "Sessão atualizada com sucesso");
      } else {
        await criarSessao({
          dataSessao: converterDataParaApi(dataSessao),
          descricaoAtendimento,
          observacoesClinicas,
          pacienteId,
        });

        Alert.alert("Sucesso", "Sessão cadastrada com sucesso");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", tratarErro(error));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Cabecalho
          titulo={sessaoId ? "Editar sessão" : "Cadastrar sessão"}
          subtitulo="Registre as informações do atendimento"
        />

        <Card destaque>
          <View style={styles.formulario}>
            <CampoTexto
              placeholder="Data da sessão: 10/06/2026"
              value={dataSessao}
              onChangeText={(texto) => setDataSessao(formatarData(texto))}
              keyboardType="numeric"
            />

            <CampoTexto
              placeholder="Descrição do atendimento"
              value={descricaoAtendimento}
              onChangeText={setDescricaoAtendimento}
              multiline
              style={styles.descricao}
            />

            <CampoTexto
              placeholder="Observações clínicas"
              value={observacoesClinicas}
              onChangeText={setObservacoesClinicas}
              multiline
              style={styles.observacoes}
            />

            <View style={styles.botoes}>
              <Botao titulo="Salvar" onPress={salvar} />

              <Botao
                titulo="Cancelar"
                variante="secundario"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8ff",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 140,
    gap: 22,
  },
  formulario: {
    gap: 14,
  },
  descricao: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  observacoes: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  botoes: {
    gap: 12,
    marginTop: 8,
  },
});