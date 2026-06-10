import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { terapeuta, logout } = useAuth();

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Olá, {terapeuta?.nome}</Text>
      <Text>Bem-vindo ao TeraSaúde</Text>

      <Button
        title="Pacientes"
        onPress={() => navigation.navigate("Pacientes")}
      />

      <Button title="Sair" onPress={logout} />
    </View>
  );
}