import Toast from "react-native-toast-message";

export default function useForgot() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const sendCode = async ({ email }: { email: string }) => {
    try {
      const response = await fetch(api + "/users/forgot-password/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Verifique se preencheu corretamente seu email",
          type: "error",
        });
        return false;
      }

      const result = await response.json();
      Toast.show({
        text1: result.message,
        type: "success",
      });
      return true;
    } catch (error) {
      Toast.show({
        text1: "Algo deu errado, tente novamente!",
        type: "error",
      });
      return null;
    }
  };

  const updatePass = async ({
    email,
    codigo,
    senha,
  }: {
    email: string;
    codigo: string;
    senha: string;
  }) => {
    try {
      const response = await fetch(api + "/users/forgot-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, codigo, senha }),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Algo deu errado, tente novamente!",
        });
        return false;
      } else {
        Toast.show({
          text1: "Senha atualizada com sucesso!",
          type: "success",
        });
        return true;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { sendCode, updatePass };
}
