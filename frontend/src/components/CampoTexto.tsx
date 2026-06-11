import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface CampoTextoProps extends TextInputProps {}

export default function CampoTexto(props: CampoTextoProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#94a3b8"
      style={[styles.input, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1f2937",
  },
});