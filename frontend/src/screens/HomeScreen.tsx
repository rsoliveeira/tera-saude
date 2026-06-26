import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BarraInferior from "../components/BarraInferior";
import Cabecalho from "../components/Cabecalho";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { terapeuta, logout } = useAuth();

  const abrirPerfil = () => {
    navigation.navigate("Perfil");
  };

  const abrirPlanoPro = () => {
    Alert.alert(
      "TeraSaúde Pro",
      "Em breve disponibilizaremos uma versão Pro com recursos exclusivos para terapeutas e clínicas.",
    );
  };

  return (
    <View style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Cabecalho
          titulo={`Olá, ${terapeuta?.nome || "Terapeuta"}`}
          subtitulo="Organize seus atendimentos com praticidade"
        />

        <View style={styles.cardsAcoes}>
          <Pressable
            style={[styles.cardAcao, styles.cardAzul]}
            onPress={() => navigation.navigate("FormPaciente", {})}
          >
            <Ionicons name="people-outline" size={30} color="#3b82f6" />
            <Text style={styles.textoAzul}>Novo Paciente</Text>
          </Pressable>

          <Pressable
            style={[styles.cardAcao, styles.cardTurquesa]}
            onPress={abrirPerfil}
          >
            <Ionicons name="person-circle-outline" size={30} color="#14b8a6" />
            <Text style={styles.textoTurquesa}>Perfil</Text>
          </Pressable>

          <Pressable
            style={[styles.cardAcao, styles.cardRoxo]}
            onPress={logout}
          >
            <Ionicons name="log-out-outline" size={30} color="#ffffff" />
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
              Gerencie seus pacientes e acompanhe suas sessões de forma
              organizada.
            </Text>

            <Text style={styles.textoSecundario}>
              Use os atalhos para acessar as principais áreas do aplicativo.
            </Text>
          </View>
        </Card>

        <Card>
          <View style={styles.cardProTopo}>
            <View style={styles.iconePro}>
              <Text style={styles.iconeProTexto}>★</Text>
            </View>

            <View style={styles.proInfo}>
              <Text style={styles.tituloPro}>TeraSaúde Pro</Text>
              <Text style={styles.subtituloPro}>
                Recursos futuros para clínicas e terapeutas.
              </Text>
            </View>
          </View>

          <View style={styles.listaPro}>
            <Text style={styles.itemPro}>✓ Relatórios avançados</Text>
            <Text style={styles.itemPro}>✓ Backup automático em nuvem</Text>
            <Text style={styles.itemPro}>✓ Gráficos completos de evolução</Text>
            <Text style={styles.itemPro}>✓ Exportação ilimitada em PDF</Text>
          </View>

          <Pressable style={styles.botaoPro} onPress={abrirPlanoPro}>
            <Text style={styles.botaoProTexto}>Conheça o Plano Pro</Text>
          </Pressable>
        </Card>
      </ScrollView>

      <BarraInferior
        onInicio={() => {}}
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
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 130,
    gap: 22,
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
    minHeight: 190,
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
  cardProTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconePro: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  iconeProTexto: {
    fontSize: 24,
    color: "#7c3aed",
    fontWeight: "800",
  },
  proInfo: {
    flex: 1,
    gap: 4,
  },
  tituloPro: {
    fontSize: 21,
    fontWeight: "800",
    color: "#1f2937",
  },
  subtituloPro: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  listaPro: {
    marginTop: 18,
    gap: 8,
  },
  itemPro: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "600",
  },
  botaoPro: {
    marginTop: 18,
    backgroundColor: "#7c3aed",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoProTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
