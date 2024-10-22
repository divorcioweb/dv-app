import { Toast } from "native-base";

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
      return data;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const register = async ({
    email,
    senha,
    telefone,
  }: {
    email: string;
    senha: string;
    telefone: string;
  }) => {
    try {
      const response = await fetch(api + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, telefone }),
      });

      if (!response.ok) {
        Toast.show({
          title: "Não foi possivel fazer o cadastro do usuário!",
        });
        return;
      } else {
        Toast.show({
          title: "Usuário cadastrado com sucesso!",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { signIn, register };
}
