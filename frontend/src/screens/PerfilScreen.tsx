import { StyleSheet, Text, View } from "react-native";

import Cabecalho from "../components/Cabecalho";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { formatarCpf } from "../utils/formatadores";

export default function PerfilScreen() {
  const { terapeuta } = useAuth();

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <Cabecalho
          titulo="Perfil"
          subtitulo="Informações do terapeuta logado"
        />

        <Card destaque>
          <View style={styles.item}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.valor}>
              {terapeuta?.nome || "Não informado"}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.valor}>
              {terapeuta?.email || "Não informado"}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>CPF:</Text>
            <Text style={styles.valor}>
              {terapeuta?.cpf ? formatarCpf(terapeuta.cpf) : "Não informado"}
            </Text>
          </View>
        </Card>
      </View>
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
    gap: 22,
  },
  item: {
    gap: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "700",
  },
  valor: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "600",
  },
});