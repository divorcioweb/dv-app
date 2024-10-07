import { Toast } from "native-base";
import { api } from "../services/api";

export default function useSignin() {
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
      return data;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { signIn };
}
