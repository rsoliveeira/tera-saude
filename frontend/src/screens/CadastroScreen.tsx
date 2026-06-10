import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { cadastrarTerapeuta } from "../services/terapeutaService";
import { RootStackParamList } from "../types/navigation";

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
    } catch {
      Alert.alert("Erro", "Não foi possível realizar o cadastro");
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Cadastro de Terapeuta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />

      <Button title="Voltar" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}