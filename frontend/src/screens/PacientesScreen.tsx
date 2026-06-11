import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BarraInferior from "../components/BarraInferior";
import Botao from "../components/Botao";
import Cabecalho from "../components/Cabecalho";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";
import { excluirPaciente, listarPacientes } from "../services/pacienteService";
import { Paciente } from "../types/Paciente";
import { RootStackParamList } from "../types/navigation";
import { converterDataParaTela, formatarCpf } from "../utils/formatadores";

type Props = NativeStackScreenProps<RootStackParamList, "Pacientes">;

export default function PacientesScreen({ navigation }: Props) {
  const { logout } = useAuth();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregarPacientes = async () => {
    try {
      setCarregando(true);
      const dados = await listarPacientes();
      setPacientes(dados);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os pacientes");
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPacientes();
    }, [])
  );

  const confirmarExclusao = (id: number) => {
    Alert.alert("Excluir paciente", "Deseja realmente excluir este paciente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await excluirPaciente(id);
            await carregarPacientes();
          } catch {
            Alert.alert("Erro", "Não foi possível excluir o paciente");
          }
        },
      },
    ]);
  };

  const abrirPerfil = () => {
    Alert.alert("Perfil", "Tela de perfil será implementada depois.");
  };

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <View style={styles.topo}>
          <Cabecalho
            titulo="Pacientes"
            subtitulo="Gerencie seus pacientes cadastrados"
          />

          <Botao
            titulo="+ Novo"
            onPress={() => navigation.navigate("FormPaciente", {})}
          />
        </View>

        {carregando && <Text style={styles.textoCarregando}>Carregando...</Text>}

        <FlatList
          data={pacientes}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Card>
              <Text style={styles.vazioTitulo}>Nenhum paciente cadastrado</Text>
              <Text style={styles.vazioTexto}>
                Toque em “+ Novo” para cadastrar o primeiro paciente.
              </Text>
            </Card>
          }
          renderItem={({ item }) => (
            <Card>
              <Pressable
                onPress={() =>
                  navigation.navigate("DetalhesPaciente", {
                    pacienteId: item.id,
                  })
                }
              >
                <View style={styles.cardPaciente}>
                  <View style={styles.infoPaciente}>
                    <Text style={styles.nomePaciente}>{item.nome}</Text>
                    <Text style={styles.textoSecundario}>
                      CPF: {formatarCpf(item.cpf)}
                    </Text>
                    <Text style={styles.textoSecundario}>
                      Nascimento: {converterDataParaTela(item.dataNascimento)}
                    </Text>
                  </View>

                  <Text style={styles.seta}>›</Text>
                </View>
              </Pressable>

              <View style={styles.acoes}>
                <Pressable
                  style={styles.botaoEditar}
                  onPress={() =>
                    navigation.navigate("FormPaciente", {
                      pacienteId: item.id,
                    })
                  }
                >
                  <Text style={styles.textoEditar}>Editar</Text>
                </Pressable>

                <Pressable
                  style={styles.botaoExcluir}
                  onPress={() => confirmarExclusao(item.id)}
                >
                  <Text style={styles.textoExcluir}>Excluir</Text>
                </Pressable>
              </View>
            </Card>
          )}
        />
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
  },
  topo: {
    gap: 18,
    marginBottom: 20,
  },
  lista: {
    gap: 16,
    paddingBottom: 24,
  },
  textoCarregando: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 12,
  },
  cardPaciente: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoPaciente: {
    flex: 1,
    gap: 6,
  },
  nomePaciente: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
  },
  textoSecundario: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 21,
  },
  seta: {
    fontSize: 42,
    color: "#94a3b8",
    marginLeft: 12,
  },
  acoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: "#eff6ff",
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
  },
  textoEditar: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 15,
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: "#fee2e2",
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
  },
  textoExcluir: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 15,
  },
  vazioTitulo: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
    textAlign: "center",
  },
  vazioTexto: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});