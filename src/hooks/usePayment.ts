import AsyncStorage from "@react-native-async-storage/async-storage";

export default function usePayment() {
  const api = process.env.EXPO_PUBLIC_API_URL as string;

  const intentPayment = async (porcentagem: number) => {
    try {
      const response = await fetch(api + "/payment/intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify({ porcentagem }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during intent payment:", error);
      return null;
    }
  };

  return { intentPayment };
}
