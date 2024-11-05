import AsyncStorage from "@react-native-async-storage/async-storage";
import { createFormData } from "../utils/bodyFile";
import Toast from "react-native-toast-message";

export default function useDocs() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const uploadDocs = async (files: any) => {
    try {
      const formData = createFormData(files);

      const response = await fetch(api + "/documents/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        Toast.show({
          text1: "Não foi possivel fazer upload dos seus documentos",
          type: "error",
        });
        return false;
      }
      Toast.show({
        text1: "Documentos enviados com sucesso!",
        type: "success",
      });
      return true;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    }
  };

  const uploadDoc = async (file: any) => {
    try {
      const result = await fetch(file.uri);
      const blob = await result.blob();

      const formData = new FormData();
      formData.append("file", blob, file.nome);

      const response = await fetch(api + "/documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        Toast.show({
          text1: "Não foi possível fazer upload do seu documento",
          type: "error",
        });
        return false;
      }

      Toast.show({
        text1: "Documento enviado com sucesso!",
        type: "success",
      });
      return true;
    } catch (error) {
      console.error("Erro ao fazer upload do documento:", error);
      return null;
    }
  };

  return { uploadDocs, uploadDoc };
}
