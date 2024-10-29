import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return { saveEvent };
}
