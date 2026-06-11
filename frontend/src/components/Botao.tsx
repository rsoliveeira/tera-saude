import { Pressable, StyleSheet, Text } from "react-native";

interface BotaoProps {
  titulo: string;
  onPress: () => void;
  variante?: "primario" | "secundario" | "perigo";
}

export default function Botao({
  titulo,
  onPress,
  variante = "primario",
}: BotaoProps) {
  return (
    <Pressable
      style={[styles.botao, styles[variante]]}
      onPress={onPress}
    >
      <Text style={[styles.texto, styles[`texto_${variante}`]]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primario: {
    backgroundColor: "#3b82f6",
  },
  secundario: {
    backgroundColor: "#ecfeff",
    borderWidth: 1,
    borderColor: "#14b8a6",
  },
  perigo: {
    backgroundColor: "#fee2e2",
  },
  texto: {
    fontSize: 16,
    fontWeight: "700",
  },
  texto_primario: {
    color: "#ffffff",
  },
  texto_secundario: {
    color: "#0f766e",
  },
  texto_perigo: {
    color: "#dc2626",
  },
});