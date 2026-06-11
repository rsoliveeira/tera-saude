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

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";
import { tratarErro } from "../utils/tratarErro";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, senha);
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
                Gestão profissional para terapeutas ocupacionais
              </Text>

              <View style={styles.formulario}>
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
                  <Text style={styles.label}>Senha</Text>
                  <CampoTexto
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                  />
                </View>

                <Botao titulo="Entrar" onPress={handleLogin} />
              </View>

              <Pressable onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.linkCadastro}>Cadastre-se</Text>
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
    paddingTop: 80,
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
    width: 92,
    height: 92,
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
    fontSize: 44,
    fontWeight: "800",
  },
  titulo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#7c3aed",
  },
  subtitulo: {
    fontSize: 17,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 12,
  },
  formulario: {
    width: "100%",
    gap: 14,
  },
  grupoCampo: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  linkCadastro: {
    marginTop: 10,
    fontSize: 17,
    color: "#3b82f6",
    fontWeight: "700",
  },
});