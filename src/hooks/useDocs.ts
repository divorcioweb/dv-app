import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";

export default function useDocs() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const uploadDocs = async (files: any) => {
    try {
      const response = await fetch(api + "/documents/several", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify(files),
      });

      if (!response.ok) {
        Toast.show({
          title: "Não foi possivel fazer upload dos seus documentos",
        });
        return;
      }
      Toast.show({
        title: "Documentos enviados com sucesso!",
      });
      console.log("TUDO CERTO", await response.json());
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  return { uploadDocs };
}
