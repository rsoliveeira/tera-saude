import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import { loginTerapeuta } from "../services/terapeutaService";
import { Terapeuta } from "../types/Terapeuta";

interface AuthContextData {
  terapeuta: Terapeuta | null;
  token: string | null;
  carregando: boolean;
  estaAutenticado: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [terapeuta, setTerapeuta] = useState<Terapeuta | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDadosSalvos = async () => {
      const tokenSalvo = await AsyncStorage.getItem("@TeraSaude:token");
      const terapeutaSalvo = await AsyncStorage.getItem("@TeraSaude:terapeuta");

      if (tokenSalvo && terapeutaSalvo) {
        api.defaults.headers.common.Authorization = `Bearer ${tokenSalvo}`;
        setToken(tokenSalvo);
        setTerapeuta(JSON.parse(terapeutaSalvo));
      }

      setCarregando(false);
    };

    carregarDadosSalvos();
  }, []);

  const login = async (email: string, senha: string): Promise<void> => {
    const response = await loginTerapeuta({ email, senha });

    api.defaults.headers.common.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.setItem("@TeraSaude:token", response.token);
    await AsyncStorage.setItem(
      "@TeraSaude:terapeuta",
      JSON.stringify(response.terapeuta)
    );

    setToken(response.token);
    setTerapeuta(response.terapeuta);
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("@TeraSaude:token");
    await AsyncStorage.removeItem("@TeraSaude:terapeuta");

    delete api.defaults.headers.common.Authorization;

    setToken(null);
    setTerapeuta(null);
  };

  return (
    <AuthContext.Provider
      value={{
        terapeuta,
        token,
        carregando,
        estaAutenticado: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};