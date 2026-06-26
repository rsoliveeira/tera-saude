import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import Cabecalho from "../components/Cabecalho";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { formatarCpf } from "../utils/formatadores";

export default function PerfilScreen() {
  const { terapeuta, logout } = useAuth();

  const handleEditarPerfil = () => {
    Alert.alert(
      "Editar perfil",
      "Funcionalidade prevista para uma próxima versão do TeraSaúde.",
    );
  };

  const handleAlterarSenha = () => {
    Alert.alert(
      "Alterar senha",
      "Funcionalidade prevista para uma próxima versão do TeraSaúde.",
    );
  };

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <Cabecalho titulo="Perfil" subtitulo="Dados do terapeuta logado" />

        <Card destaque>
          <View style={styles.perfilTopo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>👤</Text>
            </View>

            <Text style={styles.nome}>
              {terapeuta?.nome || "Nome não informado"}
            </Text>

            <Text style={styles.cargo}>Terapeuta</Text>
          </View>
        </Card>

        <Card>
          <View style={styles.item}>
            <View style={styles.iconeBox}>
              <Text style={styles.icone}>✉️</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.valor}>
                {terapeuta?.email || "Não informado"}
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.item}>
            <View style={styles.iconeBox}>
              <Text style={styles.icone}>🪪</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>CPF</Text>
              <Text style={styles.valor}>
                {terapeuta?.cpf ? formatarCpf(terapeuta.cpf) : "Não informado"}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.acoes}>
          <Pressable style={styles.botaoPrimario} onPress={handleEditarPerfil}>
            <Text style={styles.botaoIcone}>👤</Text>
            <Text style={styles.botaoPrimarioTexto}>Editar perfil</Text>
            <Text style={styles.seta}>›</Text>
          </Pressable>

          <Pressable
            style={styles.botaoSecundario}
            onPress={handleAlterarSenha}
          >
            <Text style={styles.botaoIcone}>🔒</Text>
            <Text style={styles.botaoSecundarioTexto}>Alterar senha</Text>
            <Text style={styles.seta}>›</Text>
          </Pressable>

          <Pressable style={styles.botaoSair} onPress={logout}>
            <Text style={styles.botaoSairIcone}>↪</Text>
            <Text style={styles.botaoSairTexto}>Sair da conta</Text>
            <Text style={styles.setaSair}>›</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f5f9ff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 58,
    gap: 18,
  },
  perfilTopo: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: {
    fontSize: 42,
  },
  nome: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  cargo: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "700",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
  },
  iconeBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#eaf3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  icone: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "700",
  },
  valor: {
    fontSize: 17,
    color: "#0f172a",
    fontWeight: "600",
  },
  divisor: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
  acoes: {
    gap: 12,
  },
  botaoPrimario: {
    backgroundColor: "#eff6ff",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#93c5fd",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  botaoPrimarioTexto: {
    flex: 1,
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "800",
  },
  botaoSecundario: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#dbeafe",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  botaoSecundarioTexto: {
    flex: 1,
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "800",
  },
  botaoIcone: {
    fontSize: 22,
  },
  seta: {
    fontSize: 28,
    color: "#2563eb",
    fontWeight: "700",
  },
  botaoSair: {
    backgroundColor: "#fff1f2",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#fecaca",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  botaoSairIcone: {
    fontSize: 24,
    color: "#dc2626",
  },
  botaoSairTexto: {
    flex: 1,
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "800",
  },
  setaSair: {
    fontSize: 28,
    color: "#dc2626",
    fontWeight: "700",
  },
});
