import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Botao from "../components/Botao";
import CampoTexto from "../components/CampoTexto";
import Card from "../components/Card";

import { cadastrarTerapeuta } from "../services/terapeutaService";
import { RootStackParamList } from "../types/navigation";
import { formatarCpf } from "../utils/formatadores";
import { tratarErro } from "../utils/tratarErro";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function CadastroScreen({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    try {
      await cadastrarTerapeuta({
        nome,
        email,
        cpf,
        senha,
      });

      Alert.alert("Sucesso", "Cadastro realizado com sucesso");
      navigation.navigate("Login");
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
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.wrapper}>
          <Card destaque>
            <View style={styles.conteudo}>
              <View style={styles.logo}>
                <Text style={styles.logoTexto}>✦</Text>
              </View>

              <Text style={styles.titulo}>TeraSaúde</Text>

              <Text style={styles.subtitulo}>
                Crie sua conta para gerenciar seus pacientes
              </Text>

              <View style={styles.formulario}>
                <View style={styles.grupoCampo}>
                  <Text style={styles.label}>Nome</Text>
                  <CampoTexto
                    placeholder="Seu nome"
                    value={nome}
                    onChangeText={setNome}
                  />
                </View>

                <View style={styles.grupoCampo}>
                  <Text style={styles.label}>E-mail</Text>
                  <CampoTexto
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.grupoCampo}>
                  <Text style={styles.label}>CPF</Text>
                  <CampoTexto
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChangeText={(texto) => setCpf(formatarCpf(texto))}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.grupoCampo}>
                  <Text style={styles.label}>Senha</Text>
                  <CampoTexto
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                  />
                </View>

                <Botao titulo="Cadastrar" onPress={handleCadastro} />
              </View>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkLogin}>Já tenho conta</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8ff",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 120,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  conteudo: {
    alignItems: "center",
    gap: 18,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  logoTexto: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "800",
  },
  titulo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#7c3aed",
  },
  subtitulo: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 8,
  },
  formulario: {
    width: "100%",
    gap: 13,
  },
  grupoCampo: {
    gap: 7,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },
  linkLogin: {
    marginTop: 6,
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "700",
  },
});