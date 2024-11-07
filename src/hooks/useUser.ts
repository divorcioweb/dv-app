import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const getUser = async (id: string) => {
    try {
      const response = await fetch(api + `/users/clientes/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { getUser };
}
