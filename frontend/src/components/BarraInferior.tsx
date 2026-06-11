import { Pressable, StyleSheet, Text, View } from "react-native";

interface BarraInferiorProps {
  onInicio: () => void;
  onPacientes: () => void;
  onPerfil: () => void;
  onSair: () => void;
}

export default function BarraInferior({
  onInicio,
  onPacientes,
  onPerfil,
  onSair,
}: BarraInferiorProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.itemAtivo} onPress={onInicio}>
        <Text style={styles.iconeAtivo}>⌂</Text>
        <Text style={styles.textoAtivo}>Início</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onPacientes}>
        <Text style={styles.icone}>👥</Text>
        <Text style={styles.texto}>Pacientes</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onPerfil}>
        <Text style={styles.icone}>👤</Text>
        <Text style={styles.texto}>Perfil</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onSair}>
        <Text style={styles.icone}>↪</Text>
        <Text style={styles.texto}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 86,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },
  item: {
    alignItems: "center",
    gap: 4,
  },
  itemAtivo: {
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  icone: {
    fontSize: 20,
    color: "#64748b",
  },
  iconeAtivo: {
    fontSize: 22,
    color: "#3b82f6",
  },
  texto: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  textoAtivo: {
    fontSize: 13,
    color: "#3b82f6",
    fontWeight: "700",
  },
});