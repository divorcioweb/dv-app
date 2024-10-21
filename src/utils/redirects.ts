import { Linking } from "react-native";

export const redirectWhatsApp = (number: string) => {
  Linking.openURL(`https://api.whatsapp.com/send/?phone=+55${number}`);
};

