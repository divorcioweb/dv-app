import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../utils/user";
import Toast from "react-native-toast-message";

export default function useSign() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const signIn = async ({ email, senha }: { email: string; senha: string }) => {
    try {
      const response = await fetch(api + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Credenciais inválidas!",
        });
        return;
      }

      const data = await response.json();
      const { token } = data;
      AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("senha", senha);
      User.setUser(data);
      return data;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const register = async (body: any) => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(api + "/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Não foi possivel salvar informações do usuário!",
        });
        return;
      } else {
        const data = await response.json();
        Toast.show({
          text1: "Informações salva com sucesso!",
          type: "success",
        });
        return data;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const registerInit = async (body: any) => {
    try {
      const response = await fetch(api + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Não foi possivel fazer o cadastro do usuário!",
        });
        return;
      } else {
        const data = await response.json();
        Toast.show({
          text1: data.message,
        });
        return data;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { signIn, register, registerInit };
}
