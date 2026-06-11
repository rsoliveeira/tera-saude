import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BarraInferior from "../components/BarraInferior";
import Cabecalho from "../components/Cabecalho";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { terapeuta, logout } = useAuth();

  const abrirPerfil = () => {
    Alert.alert("Perfil", "Tela de perfil será implementada depois.");
  };

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <Cabecalho
          titulo={`Olá, ${terapeuta?.nome || "Terapeuta"}`}
          subtitulo="Organize seus atendimentos com praticidade"
        />

        <View style={styles.cardsAcoes}>
          <Pressable
            style={[styles.cardAcao, styles.cardAzul]}
            onPress={() => navigation.navigate("Pacientes")}
          >
            <Text style={styles.iconeAzul}>👥</Text>
            <Text style={styles.textoAzul}>Pacientes</Text>
          </Pressable>

          <Pressable
            style={[styles.cardAcao, styles.cardTurquesa]}
            onPress={abrirPerfil}
          >
            <Text style={styles.iconeTurquesa}>👤</Text>
            <Text style={styles.textoTurquesa}>Perfil</Text>
          </Pressable>

          <Pressable style={[styles.cardAcao, styles.cardRoxo]} onPress={logout}>
            <Text style={styles.iconeBranco}>↪</Text>
            <Text style={styles.textoBranco}>Sair</Text>
          </Pressable>
        </View>

        <Card destaque>
          <View style={styles.cardTopo}>
            <Text style={styles.tituloCard}>Resumo do TeraSaúde</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>Mobile</Text>
            </View>
          </View>

          <View style={styles.conteudoCentral}>
            <View style={styles.circuloIcone}>
              <Text style={styles.iconeCentral}>🩺</Text>
            </View>

            <Text style={styles.textoPrincipal}>
              Gerencie seus pacientes e acompanhe suas sessões de forma organizada.
            </Text>

            <Text style={styles.textoSecundario}>
              Use os atalhos para acessar as principais áreas do aplicativo.
            </Text>
          </View>
        </Card>
      </View>

      <BarraInferior
        onInicio={() => navigation.navigate("Home")}
        onPacientes={() => navigation.navigate("Pacientes")}
        onPerfil={abrirPerfil}
        onSair={logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8ff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 58,
    gap: 28,
  },
  cardsAcoes: {
    flexDirection: "row",
    gap: 12,
  },
  cardAcao: {
    flex: 1,
    height: 112,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardAzul: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  cardTurquesa: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccfbf1",
  },
  cardRoxo: {
    backgroundColor: "#8b5cf6",
  },
  iconeAzul: {
    fontSize: 24,
    color: "#3b82f6",
  },
  iconeTurquesa: {
    fontSize: 24,
    color: "#14b8a6",
  },
  iconeBranco: {
    fontSize: 24,
    color: "#ffffff",
  },
  textoAzul: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3b82f6",
  },
  textoTurquesa: {
    fontSize: 15,
    fontWeight: "700",
    color: "#14b8a6",
  },
  textoBranco: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },
  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloCard: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "#eef5ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeTexto: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  conteudoCentral: {
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  circuloIcone: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#f1f5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconeCentral: {
    fontSize: 36,
  },
  textoPrincipal: {
    fontSize: 19,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
    lineHeight: 27,
  },
  textoSecundario: {
    fontSize: 15,
    color: "#7b8496",
    textAlign: "center",
    lineHeight: 22,
  },
});