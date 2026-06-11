import { StyleSheet, Text, View } from "react-native";

interface CabecalhoProps {
  titulo: string;
  subtitulo?: string;
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  titulo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1f2937",
  },
  subtitulo: {
    fontSize: 17,
    color: "#7b8496",
  },
});