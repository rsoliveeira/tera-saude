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
import { buscarPacientePorId } from "../services/pacienteService";
import {
  excluirSessao,
  listarSessoesPorPaciente,
} from "../services/sessaoService";

import { Paciente } from "../types/Paciente";
import { Sessao } from "../types/Sessao";
import { RootStackParamList } from "../types/navigation";
import {
  converterDataParaTela,
  formatarCpf,
  formatarTelefone,
} from "../utils/formatadores";
import { tratarErro } from "../utils/tratarErro";

type Props = NativeStackScreenProps<RootStackParamList, "DetalhesPaciente">;

type AbaAtiva = "dados" | "sessoes" | "evolucao";

export default function DetalhesPacienteScreen({ navigation, route }: Props) {
  const { logout } = useAuth();
  const { pacienteId } = route.params;

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>("dados");

  const carregarDados = async () => {
    try {
      setCarregando(true);

      const pacienteEncontrado = await buscarPacientePorId(pacienteId);
      const sessoesEncontradas = await listarSessoesPorPaciente(pacienteId);

      setPaciente(pacienteEncontrado);
      setSessoes(sessoesEncontradas);
    } catch (error) {
      Alert.alert("Erro", tratarErro(error));
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [pacienteId]),
  );

  const confirmarExclusaoSessao = (sessaoId: number) => {
    Alert.alert("Excluir sessão", "Deseja realmente excluir esta sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await excluirSessao(sessaoId);
            await carregarDados();
          } catch (error) {
            Alert.alert("Erro", tratarErro(error));
          }
        },
      },
    ]);
  };

  const abrirPerfil = () => {
    navigation.navigate("Perfil");
  };

  const sessoesOrdenadas = [...sessoes].sort(
    (a, b) =>
      new Date(b.dataSessao).getTime() - new Date(a.dataSessao).getTime(),
  );

  const totalSessoes = sessoesOrdenadas.length;
  const ultimaSessao = sessoesOrdenadas[0];
  const primeiraSessao = sessoesOrdenadas[sessoesOrdenadas.length - 1];

  const obterStatusAcompanhamento = () => {
    if (totalSessoes === 0) {
      return {
        icone: "⚪",
        titulo: "Sem acompanhamento",
        cor: "#64748b",
        descricao:
          "Ainda não há sessões registradas para este paciente. Cadastre a primeira sessão para iniciar o acompanhamento.",
      };
    }

    if (totalSessoes === 1) {
      return {
        icone: "🔵",
        titulo: "Acompanhamento iniciado",
        cor: "#2563eb",
        descricao:
          "O acompanhamento foi iniciado e já possui o primeiro atendimento registrado.",
      };
    }

    if (totalSessoes <= 7) {
      return {
        icone: "🟡",
        titulo: "Acompanhamento intermediário",
        cor: "#f59e0b",
        descricao:
          "O paciente possui sessões registradas e já apresenta um histórico inicial de acompanhamento.",
      };
    }

    return {
      icone: "🟢",
      titulo: "Acompanhamento avançado",
      cor: "#10b981",
      descricao:
        "O paciente possui um histórico amplo de atendimentos registrados, facilitando a análise da evolução clínica.",
    };
  };

  const statusAcompanhamento = obterStatusAcompanhamento();

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        {paciente ? (
          <Cabecalho
            titulo={paciente.nome}
            subtitulo={`CPF: ${formatarCpf(paciente.cpf)}`}
          />
        ) : (
          <Cabecalho titulo="Paciente" subtitulo="Carregando informações" />
        )}

        {carregando && (
          <Text style={styles.textoCarregando}>Carregando...</Text>
        )}

        <View style={styles.abas}>
          <Pressable
            style={[styles.aba, abaAtiva === "dados" && styles.abaAtiva]}
            onPress={() => setAbaAtiva("dados")}
          >
            <Text
              style={[
                styles.textoAba,
                abaAtiva === "dados" && styles.textoAbaAtiva,
              ]}
            >
              Dados
            </Text>
          </Pressable>

          <Pressable
            style={[styles.aba, abaAtiva === "sessoes" && styles.abaAtiva]}
            onPress={() => setAbaAtiva("sessoes")}
          >
            <Text
              style={[
                styles.textoAba,
                abaAtiva === "sessoes" && styles.textoAbaAtiva,
              ]}
            >
              Sessões
            </Text>
          </Pressable>

          <Pressable
            style={[styles.aba, abaAtiva === "evolucao" && styles.abaAtiva]}
            onPress={() => setAbaAtiva("evolucao")}
          >
            <Text
              style={[
                styles.textoAba,
                abaAtiva === "evolucao" && styles.textoAbaAtiva,
              ]}
            >
              Evolução
            </Text>
          </Pressable>
        </View>

        {abaAtiva === "dados" && paciente && (
          <Card destaque>
            <Text style={styles.tituloSecao}>Informações gerais</Text>

            <View style={styles.infoLinha}>
              <Text style={styles.label}>Data de nascimento</Text>
              <Text style={styles.valor}>
                {converterDataParaTela(paciente.dataNascimento)}
              </Text>
            </View>

            <View style={styles.infoLinha}>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.valor}>
                {paciente.telefone
                  ? formatarTelefone(paciente.telefone)
                  : "Não informado"}
              </Text>
            </View>

            <View style={styles.infoLinha}>
              <Text style={styles.label}>Observações</Text>
              <Text style={styles.valor}>
                {paciente.observacoes || "Não informado"}
              </Text>
            </View>
          </Card>
        )}

        {abaAtiva === "sessoes" && (
          <>
            <View style={styles.sessaoTopo}>
              <Text style={styles.tituloSecao}>Histórico de sessões</Text>

              <Botao
                titulo="+ Nova sessão"
                onPress={() =>
                  navigation.navigate("FormSessao", {
                    pacienteId,
                  })
                }
              />
            </View>

            <FlatList
              data={sessoesOrdenadas}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={styles.lista}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Card>
                  <Text style={styles.vazioTitulo}>
                    Nenhuma sessão cadastrada
                  </Text>
                  <Text style={styles.vazioTexto}>
                    Toque em “+ Nova sessão” para registrar o primeiro
                    atendimento.
                  </Text>
                </Card>
              }
              renderItem={({ item }) => (
                <Card>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("FormSessao", {
                        pacienteId,
                        sessaoId: item.id,
                      })
                    }
                  >
                    <View style={styles.cardSessaoTopo}>
                      <View style={styles.infoSessao}>
                        <Text style={styles.dataSessao}>
                          {converterDataParaTela(item.dataSessao)}
                        </Text>

                        <Text style={styles.descricaoSessao}>
                          {item.descricaoAtendimento}
                        </Text>

                        <Text style={styles.observacaoSessao}>
                          {item.observacoesClinicas ||
                            "Sem observações clínicas"}
                        </Text>
                      </View>

                      <Text style={styles.seta}>›</Text>
                    </View>
                  </Pressable>

                  <View style={styles.acoes}>
                    <Pressable
                      style={styles.botaoEditar}
                      onPress={() =>
                        navigation.navigate("FormSessao", {
                          pacienteId,
                          sessaoId: item.id,
                        })
                      }
                    >
                      <Text style={styles.textoEditar}>Editar</Text>
                    </Pressable>

                    <Pressable
                      style={styles.botaoExcluir}
                      onPress={() => confirmarExclusaoSessao(item.id)}
                    >
                      <Text style={styles.textoExcluir}>Excluir</Text>
                    </Pressable>
                  </View>
                </Card>
              )}
            />
          </>
        )}

        {abaAtiva === "evolucao" && (
          <FlatList
            data={sessoesOrdenadas}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <Card destaque>
                  <Text style={styles.tituloSecao}>
                    Evolução do acompanhamento
                  </Text>

                  <View style={styles.statusLinha}>
                    <Text style={styles.statusIcone}>
                      {statusAcompanhamento.icone}
                    </Text>

                    <View style={styles.statusInfo}>
                      <Text
                        style={[
                          styles.statusTitulo,
                          { color: statusAcompanhamento.cor },
                        ]}
                      >
                        {statusAcompanhamento.titulo}
                      </Text>

                      <Text style={styles.statusDescricao}>
                        {statusAcompanhamento.descricao}
                      </Text>
                    </View>
                  </View>
                </Card>

                <Card>
                  <Text style={styles.tituloSecao}>Resumo</Text>

                  <View style={styles.resumoGrid}>
                    <View style={styles.resumoItem}>
                      <Text style={styles.resumoNumero}>{totalSessoes}</Text>
                      <Text style={styles.resumoLabel}>
                        Sessões registradas
                      </Text>
                    </View>

                    <View style={styles.resumoItem}>
                      <Text style={styles.resumoNumero}>
                        {primeiraSessao
                          ? converterDataParaTela(primeiraSessao.dataSessao)
                          : "--"}
                      </Text>
                      <Text style={styles.resumoLabel}>Primeira sessão</Text>
                    </View>

                    <View style={styles.resumoItem}>
                      <Text style={styles.resumoNumero}>
                        {ultimaSessao
                          ? converterDataParaTela(ultimaSessao.dataSessao)
                          : "--"}
                      </Text>
                      <Text style={styles.resumoLabel}>Última sessão</Text>
                    </View>
                  </View>
                </Card>

                <Text style={styles.tituloTimeline}>Histórico da evolução</Text>
              </>
            }
            ListEmptyComponent={
              <Card>
                <Text style={styles.vazioTitulo}>
                  Nenhuma evolução registrada
                </Text>
                <Text style={styles.vazioTexto}>
                  Cadastre sessões para visualizar o acompanhamento deste
                  paciente.
                </Text>
              </Card>
            }
            renderItem={({ item, index }) => (
              <Card>
                <View style={styles.timelineItem}>
                  <View style={styles.timelineMarcador}>
                    <Text style={styles.timelineNumero}>{index + 1}</Text>
                  </View>

                  <View style={styles.timelineConteudo}>
                    <Text style={styles.dataSessao}>
                      {converterDataParaTela(item.dataSessao)}
                    </Text>

                    <Text style={styles.descricaoSessao}>
                      {item.descricaoAtendimento}
                    </Text>

                    <Text style={styles.observacaoSessao}>
                      {item.observacoesClinicas ||
                        "Sem observações clínicas registradas."}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            ListFooterComponent={
              <Card>
                <Text style={styles.observacaoImportanteTitulo}>
                  Observação
                </Text>

                <Text style={styles.observacaoImportanteTexto}>
                  Este indicador representa o nível de acompanhamento com base
                  na quantidade de sessões registradas. A avaliação clínica
                  continua sendo responsabilidade do terapeuta.
                </Text>
              </Card>
            }
          />
        )}
      </View>

      <BarraInferior
        onInicio={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
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
    gap: 18,
  },
  textoCarregando: {
    color: "#64748b",
    fontSize: 15,
  },
  abas: {
    flexDirection: "row",
    backgroundColor: "#eef5ff",
    borderRadius: 22,
    padding: 4,
  },
  aba: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
  },
  abaAtiva: {
    backgroundColor: "#ffffff",
  },
  textoAba: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
  },
  textoAbaAtiva: {
    color: "#1f2937",
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
  },
  infoLinha: {
    marginTop: 18,
    gap: 4,
  },
  label: {
    fontSize: 15,
    color: "#7b8496",
    fontWeight: "600",
  },
  valor: {
    fontSize: 17,
    color: "#1f2937",
    lineHeight: 24,
  },
  sessaoTopo: {
    gap: 12,
  },
  lista: {
    gap: 16,
    paddingBottom: 24,
  },
  cardSessaoTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoSessao: {
    flex: 1,
    gap: 8,
  },
  dataSessao: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2563eb",
  },
  descricaoSessao: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    lineHeight: 24,
  },
  observacaoSessao: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
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
  statusLinha: {
    marginTop: 18,
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  statusIcone: {
    fontSize: 34,
  },
  statusInfo: {
    flex: 1,
    gap: 6,
  },
  statusTitulo: {
    fontSize: 20,
    fontWeight: "800",
  },
  statusDescricao: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
  },
  resumoGrid: {
    marginTop: 18,
    gap: 12,
  },
  resumoItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  resumoNumero: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
  },
  resumoLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },
  tituloTimeline: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 14,
  },
  timelineMarcador: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
  },
  timelineNumero: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "800",
  },
  timelineConteudo: {
    flex: 1,
    gap: 8,
  },
  observacaoImportanteTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2937",
  },
  observacaoImportanteTexto: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
  },
});
