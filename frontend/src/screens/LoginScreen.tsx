import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Button
        title="Criar conta"
        onPress={() => navigation.navigate("Cadastro")}
      />
    </View>
  );
}