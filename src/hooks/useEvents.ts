import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function useEvents() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const getEvents = async () => {
    try {
      const response = await fetch(api + "/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("TUDO ERRADO", error);
      return null;
    }
  };

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

      return response;
    } catch (error) {
      console.error("TUDO ERRADO", error);
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
        return await response.json();
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const preferenceSchedule = async ({
    preferencia_dia_da_semana,
    preferencia_turno,
  }: {
    preferencia_dia_da_semana: string;
    preferencia_turno: string;
  }) => {
    try {
      const response = await fetch(api + "/events/agendamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          preferencia_dia_da_semana,
          preferencia_turno,
        }),
      });

      return response;
    } catch (error) {
      console.error("TUDO ERRADO", error);
      return null;
    }
  };

  const getScriture = async () => {
    try {
      const response = await fetch(api + "/events/escritura", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return response.json();
    } catch (error) {
      console.error("TUDO ERRADO", error);
      return null;
    }
  };

  return {
    saveEvent,
    acceptContractEvent,
    getEvents,
    preferenceSchedule,
    getScriture,
  };
}
