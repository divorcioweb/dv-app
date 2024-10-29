import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Toast } from "native-base";
import { User } from "../utils/user";

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
          title: "Credenciais inválidas",
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
          title: "Não foi possivel fazer o cadastro do usuário!",
        });
        return;
      } else {
        const data = await response.json();
        Toast.show({
          title: data.message,
        });
        router.push("/upload");
        return data;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { signIn, register };
}
