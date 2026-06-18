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
      } catch (error) {
        Alert.alert("Erro", tratarErro(error));
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

      if (pacienteId) {
        navigation.goBack();
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Pacientes" }],
        });
      }
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
          titulo={pacienteId ? "Editar paciente" : "Cadastrar paciente"}
          subtitulo="Preencha os dados do paciente"
        />

        <Card destaque>
          <View style={styles.formulario}>
            <CampoTexto
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            <CampoTexto
              placeholder="CPF"
              value={cpf}
              onChangeText={(texto) => setCpf(formatarCpf(texto))}
              keyboardType="numeric"
            />

            <CampoTexto
              placeholder="Data de nascimento: 10/05/2000"
              value={dataNascimento}
              onChangeText={(texto) => setDataNascimento(formatarData(texto))}
              keyboardType="numeric"
            />

            <CampoTexto
              placeholder="Telefone"
              value={telefone}
              onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
              keyboardType="phone-pad"
            />

            <CampoTexto
              placeholder="Observações"
              value={observacoes}
              onChangeText={setObservacoes}
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
  observacoes: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  botoes: {
    gap: 12,
    marginTop: 8,
  },
});