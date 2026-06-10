import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import HomeScreen from "../screens/HomeScreen";
import PacientesScreen from "../screens/PacientesScreen";
import FormPacienteScreen from "../screens/FormPacienteScreen";
import DetalhesPacienteScreen from "../screens/DetalhesPacienteScreen";
import FormSessaoScreen from "../screens/FormSessaoScreen";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { estaAutenticado } = useAuth();

  return (
    <Stack.Navigator>
      {!estaAutenticado ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pacientes" component={PacientesScreen} />
          <Stack.Screen name="FormPaciente" component={FormPacienteScreen} />
          <Stack.Screen
            name="DetalhesPaciente"
            component={DetalhesPacienteScreen}
          />
          <Stack.Screen name="FormSessao" component={FormSessaoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}