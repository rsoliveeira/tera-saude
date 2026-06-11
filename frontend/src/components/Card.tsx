import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  children: ReactNode;
  destaque?: boolean;
}

export default function Card({ children, destaque = false }: CardProps) {
  return (
    <View style={[styles.card, destaque && styles.destaque]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  destaque: {
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
});