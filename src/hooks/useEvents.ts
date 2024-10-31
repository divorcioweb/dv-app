import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function useEvents() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const saveEvent = async ({
    data,
    titulo,
    status,
  }: {
    data: string;
    titulo: string;
    status: string;
  }) => {
    try {
      const response = await fetch(api + "/events/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          data,
          titulo,
          status,
        }),
      });

      console.log("TUDO CERTO", await response.json());
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const acceptContractEvent = async ({
    data,
    titulo,
    status,
  }: {
    data: string;
    titulo: string;
    status: string;
  }) => {
    try {
      const response = await fetch(api + "/events/status-provision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          data,
          titulo,
          status,
        }),
      });

      if (!response.ok) {
        Toast.show({
          text1: "Não foi possivel processar, tente novamente!",
          type: "error",
        });
      } else {
        Toast.show({
          text1: "Não foi possivel processar, tente novamente!",
          type: "success",
        });
        return await response.json();
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { saveEvent, acceptContractEvent };
}
